import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import getActions from '../utils/getActions';
import getTypedChildren from '../utils/getTypedChildren';
import insertCursor from '../utils/insertCursor';
import Backspace from './Backspace';
import Pause from './Pause';
import Paste from './Paste';

type TypistProps = {
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  loop?: boolean;
  cursor?: string | React.ReactElement;
  splitter?: (str: string) => string[];
};

const defaultSplitter = (str: string) => str.split('');

const delayGenerator = (delay: number, noise: number) => {
  const coefficient = Math.random() * 2 - 1; // -1 to <1
  return delay + coefficient * noise;
};

const Typist = ({
  children,
  typingDelay = 70,
  typingNoise = 20,
  loop = false,
  cursor,
  splitter = defaultSplitter,
}: TypistProps) => {
  const actions = useMemo(() => getActions(children), [children]);
  const [typedLines, setTypedLines] = useState<(string | React.ReactElement | null)[]>([]);
  const clearTimerRef = useRef(() => {
    return;
  });

  const typeString = useCallback(
    async (line: string) => {
      const splittedLine = splitter(line);
      setTypedLines(prev => [...prev, '']);
      for (let charIdx = 1; charIdx <= splittedLine.length; charIdx++) {
        const newLine = splittedLine.slice(0, charIdx).join('');
        await new Promise<void>((resolve, reject) => {
          const clearId = setTimeout(() => {
            setTypedLines(prev =>
              prev.map((line, index) => (index === prev.length - 1 ? newLine : line))
            );
            resolve();
          }, delayGenerator(typingDelay, typingNoise));

          clearTimerRef.current = () => {
            clearTimeout(clearId);
            reject('type string');
          };
        });
      }
    },
    [splitter, typingDelay, typingNoise]
  );

  const typeElement = useCallback(
    async (el: React.ReactElement) => {
      return new Promise<void>((resolve, reject) => {
        const clearId = setTimeout(() => {
          setTypedLines(prev => [...prev, el]);
          resolve();
        }, delayGenerator(typingDelay, typingNoise));

        clearTimerRef.current = () => {
          clearTimeout(clearId);
          reject('type element');
        };
      });
    },
    [typingDelay, typingNoise]
  );

  const backspace = useCallback(
    async (amount: number) => {
      while (amount > 0) {
        await new Promise<void>((resolve, reject) => {
          const clearId = setTimeout(() => {
            setTypedLines(prev => {
              const typedLines = [...prev];
              let lineIdx = typedLines.length - 1;
              let lastLine = typedLines[lineIdx];
              while (lastLine === null && lineIdx > 0) {
                lineIdx -= 1;
                lastLine = typedLines[lineIdx];
              }

              // all lines are null means that there is nothing can be deleted
              if (typeof lastLine === null) amount = 0;
              if (typeof lastLine === 'object') typedLines[lineIdx] = null;

              if (typeof lastLine === 'string') {
                const splittedLine = splitter(lastLine);
                const newLine = splittedLine.slice(0, -1).join('');
                typedLines[lineIdx] = newLine === '' ? null : newLine;
              }

              return typedLines;
            });

            amount -= 1;
            resolve();
          }, delayGenerator(typingDelay, typingNoise));

          clearTimerRef.current = () => {
            clearInterval(clearId);
            reject('backspace');
          };
        });
      }
    },
    [splitter, typingDelay, typingNoise]
  );

  const startTyping = useCallback(async () => {
    try {
      do {
        setTypedLines([]);
        for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
          const { type, payload } = actions[actionIdx];
          if (type === 'TYPE_STRING') await typeString(payload);
          else if (type === 'TYPE_ELEMENT') await typeElement(payload);
          else if (type === 'BACKSPACE') await backspace(payload);
          else if (type === 'PAUSE') {
            await new Promise((resolve, reject) => {
              const clearId = setTimeout(resolve, payload);
              clearTimerRef.current = () => {
                clearTimeout(clearId);
                reject('pause');
              };
            });
          } else if (type === 'PASTE') setTypedLines(prev => [...prev, payload]);
        }
      } while (loop);
    } catch (error) {
      console.log(`halt from ${error}`);
    }
  }, [actions, backspace, loop, typeElement, typeString]);

  useEffect(() => {
    startTyping();
    return () => {
      clearTimerRef.current();
    };
  }, [startTyping]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

Typist.Backspace = Backspace;
Typist.Pause = Pause;
Typist.Paste = Paste;
export default Typist;
export type { TypistProps };
