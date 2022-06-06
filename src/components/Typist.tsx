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
    (line: string, lineIdx: number) => {
      return new Promise<void>((resolve, reject) => {
        const splittedLine = spliter(line);
        let charIdx = 0;
        const clearId = setInterval(() => {
          charIdx += 1;
          const newLine = splittedLine.slice(0, charIdx).join('');
          setTypedLines(prev => prev.map((line, index) => (index === lineIdx ? newLine : line)));
          if (charIdx >= splittedLine.length) {
            resolve();
            clearInterval(clearId);
          }
        }, typingInterval);

        clearTimerRef.current = () => {
          clearInterval(clearId);
          reject('typeLine');
        };
      });
    },
    [typingInterval, spliter]
  );

  const backspace = useCallback(
    (amount: number) => {
      return new Promise<void>((resolve, reject) => {
        if (amount === 0) {
          resolve();
          return;
        }

        const clearId = setInterval(() => {
          setTypedLines(prev => {
            const typedLines = [...prev];
            let idx = typedLines.length - 1;
            let lastLine = typedLines[idx];
            while (lastLine.length === 0 && idx > 0) {
              idx -= 1;
              lastLine = typedLines[idx];
            }
            const splittedLine = spliter(lastLine);
            typedLines[idx] = splittedLine.join('').slice(0, -1);

            return typedLines;
          });

          amount -= 1;
          if (amount === 0) {
            resolve();
            clearInterval(clearId);
          }
        }, backspaceInterval);

        clearTimerRef.current = () => {
          clearInterval(clearId);
          reject('backspace');
        };
      });
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
