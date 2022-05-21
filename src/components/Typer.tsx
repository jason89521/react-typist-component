import React, { useEffect, useState, useRef, useCallback } from 'react';

import getActions from '../utils/getActions';
import getTypedChildren from '../utils/getTypedChildren';
import Backspace from './Backspace';
import Pause from './Pause';

type TyperProps = {
  children: React.ReactNode;
  typingInterval?: number;
  backspaceInterval?: number;
  loop?: boolean;
};

const Typer = ({
  children,
  typingInterval = 100,
  backspaceInterval = 50,
  loop = false,
}: TyperProps) => {
  const [actions, setActions] = useState(() => getActions(children));
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const clearTimerRef = useRef(() => {
    return;
  });

  const typeLine = useCallback(
    (str: string, lineIdx: number) => {
      return new Promise<void>((resolve, reject) => {
        const splittedLine = str.split('');
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
    [typingInterval]
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
            const copiedLine = [...prev];
            let idx = copiedLine.length - 1;
            let lastLine = copiedLine[idx];
            while (lastLine.length === 0 && idx > 0) {
              idx -= 1;
              lastLine = copiedLine[idx];
            }
            copiedLine[idx] = lastLine.slice(0, -1);

            return copiedLine;
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
    [backspaceInterval]
  );

  useEffect(() => {
    const startTyping = async () => {
      try {
        do {
          let lineIdx = 0;
          let actionIdx = 0;
          setTypedLines([]);
          while (actionIdx < actions.length) {
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
            }
            actionIdx += 1;
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

  useEffect(() => {
    setActions(getActions(children));
  }, [children]);

  const typedChildren = getTypedChildren(children, typedLines);

  return <>{typedChildren}</>;
};

Typer.Backspace = Backspace;
Typer.Pause = Pause;
export default Typer;
export type { TyperProps };
