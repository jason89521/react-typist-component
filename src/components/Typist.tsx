import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import getActions from '../utils/getActions';
import getTypedChildren from '../utils/getTypedChildren';
import insertCursor from '../utils/insertCursor';
import Backspace from './Backspace';
import Pause from './Pause';
import Paste from './Paste';

type TypistProps = {
  children: React.ReactNode;
  typingInterval?: number;
  backspaceInterval?: number;
  loop?: boolean;
  cursor?: string | React.ReactElement;
  spliter?: (str: string) => string[];
};

const defaultSplitter = (str: string) => str.split('');

const Typist = ({
  children,
  typingInterval = 100,
  backspaceInterval = 50,
  loop = false,
  cursor,
  spliter = defaultSplitter,
}: TypistProps) => {
  const actions = useMemo(() => getActions(children), [children]);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const clearTimerRef = useRef(() => {
    return;
  });

  const typeLine = useCallback(
    async (line: string, lineIdx: number) => {
      const splittedLine = spliter(line);
      let charIndex = 0;
      while (charIndex < splittedLine.length) {
        charIndex += 1;
        const newLine = splittedLine.slice(0, charIndex).join('');
        await new Promise<void>((resolve, reject) => {
          const clearId = setTimeout(() => {
            setTypedLines(prev => prev.map((line, index) => (index === lineIdx ? newLine : line)));
            resolve();
          }, typingInterval);

          clearTimerRef.current = () => {
            clearTimeout(clearId);
            reject();
          };
        });
      }
    },
    [typingInterval, spliter]
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
              while (lastLine.length === 0 && lineIdx > 0) {
                lineIdx -= 1;
                lastLine = typedLines[lineIdx];
              }
              const splittedLine = spliter(lastLine);
              typedLines[lineIdx] = splittedLine.join('').slice(0, -1);
              return typedLines;
            });

            amount -= 1;
            resolve();
          }, backspaceInterval);

          clearTimerRef.current = () => {
            clearInterval(clearId);
            reject('backspace');
          };
        });
      }
    },
    [backspaceInterval, spliter]
  );

  useEffect(() => {
    const startTyping = async () => {
      try {
        do {
          let lineIdx = 0;
          setTypedLines([]);
          for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
            const { type, payload } = actions[actionIdx];
            if (type === 'TYPE_STRING') {
              setTypedLines(prev => [...prev, '']);
              await typeLine(payload, lineIdx);
              lineIdx += 1;
            } else if (type === 'BACKSPACE') {
              await backspace(payload);
            } else if (type === 'PAUSE') {
              await new Promise((resolve, reject) => {
                const clearId = setTimeout(resolve, payload);
                clearTimerRef.current = () => {
                  clearTimeout(clearId);
                  reject('pause');
                };
              });
            } else if (type === 'PASTE') {
              setTypedLines(prev => [...prev, payload]);
              lineIdx += 1;
            }
          }
        } while (loop);
      } catch (error) {
        console.log(`halt from ${error}`);
      }
    };

    startTyping();
    return () => {
      clearTimerRef.current();
    };
  }, [actions, loop, typeLine, backspace]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

Typist.Backspace = Backspace;
Typist.Pause = Pause;
Typist.Paste = Paste;
export default Typist;
export type { TypistProps };
