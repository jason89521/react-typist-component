import React from 'react';
import type { Action as DispatchAction } from 'use-case-reducers';

import type { CoreProps, TypedLines } from './types/TypistProps';
import { reset, append, updateLastLine, deleteLastChar } from './utils/typedLinesSlice';
import { defaultDelayGenerator, defaultSplitter, emptyFunc } from './utils/defaultFuncs';
import getActions from './utils/getActions';
import getBackspacedLines from './utils/getBackspacedLines';

export default class TypistCore {
  #children: React.ReactNode;

  #typingDelay!: number;

  #typingNoise!: number;

  #loop!: boolean;

  /** Whether to pause the typing animation */
  #pause!: boolean;

  /** When this value changes, restart the typing animation */
  #restartKey: any;

  #onTypingDone!: () => void;

  #splitter!: (str: string) => string[];

  /** This value is used to set up `Typist`'s state */
  #dispatch: React.Dispatch<DispatchAction>;

  #finalTypedLines!: TypedLines;

  /**
   * `null` means that there is no typing animation being excuted
   */
  #clearTimer: (() => void) | null = null;

  constructor(props: CoreProps, dispatch: React.Dispatch<DispatchAction>) {
    this.#setUpProps(props);
    this.#dispatch = dispatch;
  }

  get finalTypedLines() {
    return this.#finalTypedLines;
  }

  get clearTimer() {
    return this.#clearTimer ? this.#clearTimer : emptyFunc;
  }

  startTyping = async () => {
    // Clear all timer before starting typing animation.
    this.clearTimer();
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
    const { loop, restartKey } = props;

    // previous typing was done and `loop` is going to be changed to `true`
    const restartFinished = this.#clearTimer === null && this.#loop !== loop && loop;

    const restartKeyChanged = this.#restartKey !== restartKey;
    const shouldRestart = restartKeyChanged || restartFinished;
    this.#setUpProps(props);

    // restart should be called after setUpProps because we need to ensure that all properties are latest
    if (shouldRestart) this.startTyping();
  };

  #setUpProps = ({
    children,
    typingDelay = 70,
    typingNoise = 25,
    loop = false,
    pause = false,
    restartKey,
    onTypingDone = emptyFunc,
    splitter = defaultSplitter,
  }: CoreProps) => {
    this.#children = children;
    this.#typingDelay = typingDelay;
    this.#typingNoise = typingNoise;
    this.#loop = loop;
    this.#pause = pause;
    this.#restartKey = restartKey;
    this.#onTypingDone = onTypingDone;
    this.#splitter = splitter;

    let lines: TypedLines = [];
    getActions(this.#children).forEach(action => {
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

  #timeoutPromise = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
      let intervalId: number;
      const timeoutId = setTimeout(() => {
        if (this.#pause) intervalId = window.setInterval(() => !this.#pause && resolve());
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
}
