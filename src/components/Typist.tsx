import React, { useEffect, useRef, useCallback, useMemo, useReducer } from 'react';

import type { PromiseExecutor } from '../types/functions';
import {
  initialState,
  reducer,
  reset,
  append,
  updateLastLine,
  deleteLastChar,
} from '../utils/typedLinesSlice';
import getActions from '../utils/getActions';
import getTypedChildren from '../utils/getTypedChildren';
import insertCursor from '../utils/insertCursor';
import { emptyFunc, defaultSplitter, defaultDelayGenerator } from '../utils/defaultFuncs';
import Backspace from './Backspace';
import Pause from './Pause';
import Paste from './Paste';

type TypistProps = {
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  cursor?: string | React.ReactElement;
  onTypingDone?: () => boolean | void;
  splitter?: (str: string) => string[];
};

const Typist = ({
  children,
  typingDelay = 70,
  typingNoise = 25,
  cursor,
  onTypingDone = emptyFunc,
  splitter = defaultSplitter,
}: TypistProps) => {
  const actions = useMemo(() => getActions(children), [children]);
  const [typedLines, dispatch] = useReducer(reducer, initialState);
  const clearTimerRef = useRef(emptyFunc);
  const timeoutPromise = useCallback((func: PromiseExecutor, delay: number) => {
    return new Promise<void>((resolve, reject) => {
      const clearId = window.setTimeout(() => func(resolve, reject), delay);
      clearTimerRef.current = () => {
        clearTimeout(clearId);
        reject();
      };
    });
  }, []);

  const typeString = useCallback(
    async (line: string) => {
      const splittedLine = splitter(line);
      dispatch(append(''));
      for (let charIdx = 1; charIdx <= splittedLine.length; charIdx++) {
        const newLine = splittedLine.slice(0, charIdx).join('');
        await timeoutPromise(resolve => {
          dispatch(updateLastLine(newLine));
          resolve();
        }, defaultDelayGenerator(typingDelay, typingNoise));
      }
    },
    [splitter, timeoutPromise, typingDelay, typingNoise]
  );

  const typeElement = useCallback(
    (el: React.ReactElement) => {
      return timeoutPromise(resolve => {
        dispatch(append(el));
        resolve();
      }, defaultDelayGenerator(typingDelay, typingNoise));
    },
    [timeoutPromise, typingDelay, typingNoise]
  );

  const backspace = useCallback(
    async (amount: number) => {
      while (amount > 0) {
        await timeoutPromise(resolve => {
          dispatch(deleteLastChar(splitter, () => (amount = 0)));
          amount -= 1;
          resolve();
        }, defaultDelayGenerator(typingDelay, typingNoise));
      }
    },
    [splitter, timeoutPromise, typingDelay, typingNoise]
  );

  const startTyping = useCallback(async () => {
    try {
      do {
        dispatch(reset());
        for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
          const { type, payload } = actions[actionIdx];
          if (type === 'TYPE_STRING') await typeString(payload);
          else if (type === 'TYPE_ELEMENT') await typeElement(payload);
          else if (type === 'BACKSPACE') await backspace(payload);
          else if (type === 'PAUSE') await timeoutPromise(resolve => resolve(), payload);
          else if (type === 'PASTE') dispatch(append(payload));
        }
      } while (onTypingDone());
    } catch (error) {
      // do nothing
    }
  }, [actions, backspace, onTypingDone, timeoutPromise, typeElement, typeString]);

  useEffect(() => {
    startTyping();
    return () => clearTimerRef.current();
  }, [startTyping]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

Typist.Backspace = Backspace;
Typist.Pause = Pause;
Typist.Paste = Paste;
export default Typist;
export type { TypistProps };
