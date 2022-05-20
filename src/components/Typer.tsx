import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getActions } from '../utils/actions';

import getTypedChildren from '../utils/getTypedChildren';
import Backspace from './Backspace';

type Props = {
  children: React.ReactNode;
  typingInterval?: number;
  backspaceInterval?: number;
  loop?: boolean;
};

const Typer = ({
  children,
  typingInterval = 100,
  backspaceInterval = 100,
  loop = false,
}: Props) => {
  const [actions, setActions] = useState(() => getActions(children));
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const onClearIntervalRef = useRef(() => {});

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

      onClearIntervalRef.current = () => {
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

      onClearIntervalRef.current = () => {
        clearInterval(clearId);
        reject('backspace');
      };
    });
  };

  useEffect(() => {
    onClearIntervalRef.current();

    typeAll();
  }, [actions]);

  useEffect(() => {
    setActions(getActions(children));
  }, [children]);

  const typedChildren = getTypedChildren(children, typedLines);

  return <div className="typer">{typedChildren}</div>;
};

Typer.Backspace = Backspace;
export default Typer;
