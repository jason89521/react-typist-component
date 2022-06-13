import React from 'react';
import type { Action as DispatchAction } from 'use-case-reducers';

import type { CoreProps } from './types/TypistProps';
import { reset, append, updateLastLine, deleteLastChar } from './utils/typedLinesSlice';
import { defaultSplitter, emptyFunc } from './utils/defaultFuncs';
import getActions from './utils/getActions';

type Props = Required<CoreProps>;

export default class TypistCore {
  #children: React.ReactNode;
  #typingDelay!: number;
  #backspaceDelay!: number;
  #loop!: boolean;
  #pause!: boolean;
  #onTypingDone!: () => void;
  #splitter!: (str: string) => string[];
  /** This value is used to set up `Typist`'s state */
  #dispatch: React.Dispatch<DispatchAction>;

  /**
   * `null` means that there is no typing animation being excuted
   */
  #clearTimer: (() => void) | null = null;

  constructor(props: Props, dispatch: React.Dispatch<DispatchAction>) {
    this.#setUpProps(props);
    this.#dispatch = dispatch;
  }

  /**
   * Clear the scheduled timer and make updating component's state invalid in this instance.
   */
  get discard() {
    return () => {
      this.#clearTimer && this.#clearTimer();
      this.#dispatch = () => {
        throw 'The component has been unmounted.';
      };
    };
  }

  get onPropsChanged() {
    return this.#setUpProps;
  }

  startTyping = async () => {
    this.#clearTimer && this.#clearTimer();
    try {
      do {
        const actions = getActions(this.#children);
        this.#dispatch(reset([]));
        for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
          const { type, payload } = actions[actionIdx];
          if (type === 'TYPE_STRING') await this.#typeString(payload);
          else if (type === 'TYPE_ELEMENT') await this.#typeElement(payload);
          else if (type === 'BACKSPACE') await this.#backspace(payload);
          else if (type === 'PAUSE') await this.#timeoutPromise(payload);
          else if (type === 'PASTE') this.#dispatch(append(payload));
        }
        this.#onTypingDone();
        this.#clearTimer = null;
      } while (this.#loop);
    } catch (error) {
      this.#clearTimer = null;
    }
  };

  #setUpProps = ({
    children,
    typingDelay,
    backspaceDelay,
    loop,
    pause,
    onTypingDone = emptyFunc,
    splitter = defaultSplitter,
  }: Props) => {
    this.#children = children;
    this.#typingDelay = typingDelay;
    this.#backspaceDelay = backspaceDelay;
    this.#loop = loop;
    this.#pause = pause;
    this.#onTypingDone = onTypingDone;
    this.#splitter = splitter;
  };

  #timeoutPromise = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
      let intervalId: NodeJS.Timeout;
      const timeoutId = setTimeout(() => {
        if (this.#pause) intervalId = setInterval(() => !this.#pause && resolve());
        else resolve();
      }, delay);

      this.#clearTimer = () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        reject();
      };
    });
  };

  #typeString = async (line: string) => {
    const splittedLine = this.#splitter(line);
    this.#dispatch(append(''));
    for (let charIdx = 1; charIdx <= splittedLine.length; charIdx++) {
      await this.#timeoutPromise(this.#typingDelay);
      const newLine = splittedLine.slice(0, charIdx).join('');
      this.#dispatch(updateLastLine(newLine));
    }
  };

  #typeElement = async (el: React.ReactElement) => {
    await this.#timeoutPromise(this.#typingDelay);
    this.#dispatch(append(el));
  };

  #backspace = async (amount: number) => {
    while (amount > 0) {
      await this.#timeoutPromise(this.#backspaceDelay);
      this.#dispatch(deleteLastChar(this.#splitter, () => (amount = 0)));
      amount -= 1;
    }
  };
}
