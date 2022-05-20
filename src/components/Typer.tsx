import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getActions } from '../utils/actions';

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
  const clearTimerRef = useRef(() => {});

  const typeAll = async () => {
    let lineIdx = 0;
    let actionIdx = 0;
    setTypedLines([]);
    try {
      while (actionIdx < actions.length) {
        const action = actions[actionIdx];
        if (action.type === 'TYPE_STRING') {
          setTypedLines(prev => [...prev, '']);
          await typeLine(action.payload, lineIdx);
          lineIdx += 1;
        } else if (action.type === 'BACKSPACE') {
          await backspace(action.payload);
        } else if (action.type === 'PAUSE') {
          await pause(action.payload);
        }
        actionIdx += 1;
      }

      if (loop) typeAll();
    } catch (error) {
      console.log(`halt from ${error}`);
    }
  };

  const typeLine = (str: string, lineIdx: number) => {
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
  };

  const backspace = (amount: number) => {
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
  };

  const pause = (duration: number) => {
    return new Promise((resolve, reject) => {
      const clearId = setTimeout(resolve, duration);
      clearTimerRef.current = () => {
        clearTimeout(clearId);
        reject('pause');
      };
    });
  };

  useEffect(() => {
    clearTimerRef.current();

    typeAll();
  }, [actions]);

  useEffect(() => {
    setActions(getActions(children));
  }, [children]);

  const typedChildren = getTypedChildren(children, typedLines);

  return <div className="typer">{typedChildren}</div>;
};

Typer.Backspace = Backspace;
Typer.Pause = Pause;
export default Typer;
export type { TyperProps };
