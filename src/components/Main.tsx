import { useCallback, useEffect, useRef, useState } from 'react';

import type { Delay, TypedChildren, TypistProps } from '../types/TypistProps';
import insertCursor from '../utils/insertCursor';
import { defaultSplitter, emptyFunc } from '../utils/defaultFuncs';

import getTypedChildrenArray from '../utils/getTypedChildrenArray';
import getActions from '../utils/getActions';

const Main = ({
  cursor,
  disabled = false,
  restartKey,
  children,
  splitter = defaultSplitter,
  typingDelay = 75,
  backspaceDelay = typingDelay,
  onTypingDone,
  startDelay = 0,
  finishDelay = 0,
  loop = false,
  pause = false,
}: TypistProps) => {
  const [typedChildrenArray, setTypedChildrenArray] = useState<TypedChildren[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const clearTimerRef = useRef(emptyFunc);
  const loopRef = useRef(loop);
  const pauseRef = useRef(pause);

  const timeoutPromise = useCallback((delay: Delay) => {
    return new Promise((resolve, reject) => {
      const ms = typeof delay === 'number' ? delay : delay();
      const timeoutId = setTimeout(resolve, ms);
      clearTimerRef.current = () => {
        clearTimeout(timeoutId);
        reject();
      };
    });
  }, []);

  const pausePromise = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (!pauseRef.current) {
          clearInterval(intervalId);
          resolve();
        }
      });
      clearTimerRef.current = () => {
        clearInterval(intervalId);
        reject();
      };
    });
  }, []);

  const loopPromise = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (loopRef.current) {
          clearInterval(intervalId);
          resolve();
        }
      });
      clearTimerRef.current = () => {
        clearInterval(intervalId);
        reject();
      };
    });
  }, []);

  useEffect(() => {
    loopRef.current = loop;
    pauseRef.current = pause;
  }, [loop, pause]);

  useEffect(() => {
    const typedChildrenArray = getTypedChildrenArray(children, splitter);
    setTypedChildrenArray(typedChildrenArray);
    if (disabled) {
      setCurrentIndex(typedChildrenArray.length - 1);
      return;
    }

    (async () => {
      try {
        do {
          setCurrentIndex(-1);
          const actions = getActions(children, splitter);
          if (startDelay > 0) await timeoutPromise(startDelay);
          for (const { type, payload } of actions) {
            if (pauseRef.current) await pausePromise();
            if (type === 'TYPE_TOKEN') {
              setCurrentIndex(prev => prev + 1);
              await timeoutPromise(typingDelay);
            } else if (type === 'BACKSPACE') {
              let amount = payload;
              while (amount--) {
                setCurrentIndex(prev => prev + 1);
                await timeoutPromise(backspaceDelay);
              }
            } else if (type === 'PASTE') {
              setCurrentIndex(prev => prev + 1);
            } else if (type === 'DELAY') {
              await timeoutPromise(payload);
            }
          }
          onTypingDone?.();
          if (finishDelay > 0) await timeoutPromise(finishDelay);
          if (!loopRef.current) await loopPromise();
        } while (loopRef.current);
      } catch (error) {
        // do nothing
      }
    })();

    return () => {
      clearTimerRef.current();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartKey, disabled]);

  const typedChildren = typedChildrenArray[currentIndex];
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

export default Main;
