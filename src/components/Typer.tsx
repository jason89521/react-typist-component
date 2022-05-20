import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getActions } from '../utils/actions';

import getLines from '../utils/getLines';
import getTypedChildren from '../utils/getTypedChildren';
import DeleteAll from './DeleteAll';

type Props = {
  children: React.ReactNode;
  typingInterval?: number;
};

const Typer = ({ children, typingInterval = 100 }: Props) => {
  const [actions, setActions] = useState(() => getActions(children));
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const clearIds = useRef<number[]>([]).current;

  const typeAll = async () => {
    let lineIdx = 0;
    let actionIdx = 0;
    setTypedLines([]);
    while (actionIdx < actions.length) {
      const action = actions[actionIdx];
      if (action.type === 'TYPE_STRING') {
        setTypedLines(prev => [...prev, '']);
        await typeLine(action.payload, lineIdx);
        lineIdx += 1;
      }
      actionIdx += 1;
    }
  };

  const typeLine = (str: string, lineIdx: number) => {
    return new Promise<void>(resolve => {
      const splittedLine = str.split('');
      let charIdx = 0;
      const clearId = setInterval(() => {
        charIdx += 1;
        const newLine = splittedLine.slice(0, charIdx).join('');
        setTypedLines(prev => prev.map((line, index) => (index === lineIdx ? newLine : line)));
        if (charIdx === splittedLine.length) {
          resolve();
          clearInterval(clearId);
        }
      }, typingInterval);

      // append the registered interval id
      clearIds.push(clearId);
    });
  };

  useEffect(() => {
    // clears all interval to prevent old action from excuting
    while (clearIds.length > 0) {
      const clearId = clearIds.shift();
      clearInterval(clearId);
    }

    typeAll();
  }, [actions]);

  useEffect(() => {
    setActions(getActions(children));
  }, [children]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <div className="typer">{typedChildren}</div>;
};

Typer.DeleteAll = DeleteAll;
export default Typer;
