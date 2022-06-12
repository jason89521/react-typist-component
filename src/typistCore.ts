import React from 'react';
import type { Action as DispatchAction } from 'use-case-reducers';

import type { CoreProps } from './types/TypistProps';
import type { TypedLines } from './types/typedChildren';
import { reset, append, updateLastLine, deleteLastChar } from './utils/typedLinesSlice';
import { defaultDelayGenerator, defaultSplitter, emptyFunc } from './utils/defaultFuncs';
import getActions from './utils/getActions';
import getBackspacedLines from './utils/getBackspacedLines';

export default class TypistCore {
  #children: React.ReactNode;
  #typingDelay!: number;
  #typingNoise!: number;
  #loop!: boolean;
  #pause!: boolean;
  #onTypingDone!: () => void;
  #splitter!: (str: string) => string[];
  #dispatch: React.Dispatch<DispatchAction>;
  #finalTypedLines!: TypedLines;

  /**
   * `null` means that there is no typing animation being excuted
   */
  #clearTimer: (() => void) | null = null;

  constructor(props: CoreProps, dispatch: React.Dispatch<DispatchAction>) {
    this.#setUpProps(props);
    this.#dispatch = dispatch;
    this.#setFinalTypedLines();
  }

  get finalTypedLines() {
    return this.#finalTypedLines;
  }

  get clearTimer() {
    return this.#clearTimer ? this.#clearTimer : emptyFunc;
  }

  startTyping = async () => {
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

  onPropsChanged = (props: CoreProps) => {
    const { loop } = props;
    // restart the typing animation when the typing animation is stopped and new loop is changed to true
    if (this.#clearTimer === null && this.#loop !== loop && loop === true) this.startTyping();

    this.#setUpProps(props);
  };

  #setUpProps = ({
    children,
    typingDelay = 70,
    typingNoise = 25,
    loop = false,
    pause = false,
    onTypingDone = emptyFunc,
    splitter = defaultSplitter,
  }: CoreProps) => {
    this.#children = children;
    this.#typingDelay = typingDelay;
    this.#typingNoise = typingNoise;
    this.#loop = loop;
    this.#pause = pause;
    this.#onTypingDone = onTypingDone;
    this.#splitter = splitter;
  };

  #timeoutPromise = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
      let intervalId: number;
      const timeoutId = setTimeout(() => {
        if (!this.#pause) {
          resolve();
          return;
        }

        intervalId = setInterval(() => {
          if (!this.#pause) resolve();
        });
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
      await this.#timeoutPromise(defaultDelayGenerator(this.#typingDelay, this.#typingNoise));
      const newLine = splittedLine.slice(0, charIdx).join('');
      this.#dispatch(updateLastLine(newLine));
    }
  };

  #typeElement = async (el: React.ReactElement) => {
    await this.#timeoutPromise(defaultDelayGenerator(this.#typingDelay, this.#typingNoise));
    this.#dispatch(append(el));
  };

  #backspace = async (amount: number) => {
    while (amount > 0) {
      await this.#timeoutPromise(defaultDelayGenerator(this.#typingDelay, this.#typingNoise));
      this.#dispatch(deleteLastChar(this.#splitter, () => (amount = 0)));
      amount -= 1;
    }
  };

  #setFinalTypedLines = () => {
    const actions = getActions(this.#children);
    let lines: TypedLines = [];
    actions.forEach(action => {
      const { type, payload } = action;
      if (type === 'TYPE_STRING' || type === 'TYPE_ELEMENT' || type === 'PASTE')
        lines.push(payload);
      else if (type === 'BACKSPACE') {
        let amount = payload;
        while (amount > 0) {
          lines = getBackspacedLines(lines, this.#splitter, () => (amount = 0));
          amount -= 1;
        }
      }
    });
    this.#finalTypedLines = lines;
  };
}
