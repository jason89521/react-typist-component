import React from 'react';

import type { Splitter, TypedLines, TypistProps } from './types/TypistProps';
import { defaultSplitter, emptyFunc } from './utils/defaultFuncs';
import getActions from './utils/getActions';

type T = Omit<TypistProps, 'cursor' | 'restartKey' | 'disabled'>;
type CoreProps = Required<T>;
type SetTypedLines = React.Dispatch<React.SetStateAction<TypedLines>>;

export default class TypistCore {
  #children: React.ReactNode;
  #typingDelay!: number;
  #backspaceDelay!: number;
  #loop!: boolean;
  #pause!: boolean;
  #startDelay!: number;
  #onTypingDone!: () => void;
  #splitter!: Splitter;

  /**
   * `null` means that there is no typing animation being excuted
   */
  #clearTimer: (() => void) | null = null;
  #typedLines: TypedLines = [];
  #setTypedLines: SetTypedLines;

  constructor(props: CoreProps, setTypedLines: SetTypedLines) {
    this.#setUpProps(props);
    this.#setTypedLines = setTypedLines;
  }

  /**
   * Clear the scheduled timer and make updating component's state invalid in this instance.
   */
  get discard() {
    return () => {
      this.#clearTimer && this.#clearTimer();
      this.#setTypedLines = () => {
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
        // Clear previours typed lines first to prevent weird behaviour.
        const actions = getActions(this.#children);
        this.#updateTypedLines([]);
        this.#startDelay > 0 && (await this.#timeoutPromise(this.#startDelay));
        for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
          this.#pause && (await this.#pausePromise());
          const { type, payload } = actions[actionIdx];
          if (type === 'TYPE_STRING') await this.#typeString(payload);
          else if (type === 'TYPE_ELEMENT') await this.#typeElement(payload);
          else if (type === 'BACKSPACE') await this.#backspace(payload);
          else if (type === 'PAUSE') await this.#timeoutPromise(payload);
          else if (type === 'PASTE') this.#updateTypedLines([...this.#typedLines, payload]);
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
    startDelay,
    onTypingDone = emptyFunc,
    splitter = defaultSplitter,
  }: CoreProps) => {
    this.#children = children;
    this.#typingDelay = typingDelay;
    this.#backspaceDelay = backspaceDelay;
    this.#loop = loop;
    this.#pause = pause;
    this.#startDelay = startDelay;
    this.#onTypingDone = onTypingDone;
    this.#splitter = splitter;
  };

  #timeoutPromise = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(resolve, delay);
      this.#clearTimer = () => {
        clearTimeout(timeoutId);
        reject();
      };
    });
  };

  #pausePromise = () => {
    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(() => !this.#pause && resolve());
      this.#clearTimer = () => {
        clearInterval(intervalId);
        reject();
      };
    });
  };

  /**
   * Make sure that `this.#typedLines` can only be set here, and `this.#setTypedLines` can only be called here too.
   * @param newTypedLines
   */
  #updateTypedLines = (newTypedLines: TypedLines) => {
    this.#typedLines = newTypedLines;
    this.#setTypedLines(this.#typedLines);
  };

  #typeString = async (line: string) => {
    const splittedLine = this.#splitter(line);
    this.#updateTypedLines([...this.#typedLines, '']);
    const lastIdx = this.#typedLines.length - 1;
    for (let charIdx = 1; charIdx <= splittedLine.length; charIdx++) {
      const newLine = splittedLine.slice(0, charIdx).join('');
      const newTypedLines = [...this.#typedLines];
      newTypedLines[lastIdx] = newLine;
      this.#updateTypedLines(newTypedLines);
      await this.#timeoutPromise(this.#typingDelay);
    }
  };

  #typeElement = async (el: React.ReactElement) => {
    this.#updateTypedLines([...this.#typedLines, el]);
    await this.#timeoutPromise(this.#typingDelay);
  };

  #backspace = async (amount: number) => {
    while (amount > 0) {
      const typedLines = [...this.#typedLines];
      let lineIndex = typedLines.length - 1;
      let line = typedLines[lineIndex];
      while (line === null && lineIndex > 0) {
        lineIndex -= 1;
        line = typedLines[lineIndex];
      }

      if (line === null) amount = 0;
      if (typeof line === 'object') typedLines[lineIndex] = null;
      if (typeof line === 'string') {
        const splittedLine = this.#splitter(line);
        const newLine = splittedLine.slice(0, -1).join('');
        typedLines[lineIndex] = newLine === '' ? null : newLine;
      }

      this.#updateTypedLines(typedLines);
      amount -= 1;

      await this.#timeoutPromise(this.#backspaceDelay);
    }
  };
}
