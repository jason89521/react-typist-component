import React, { useEffect, useCallback, useState, useRef } from 'react';

import getLines from '../utils/getLines';
import getTypedChildren from '../utils/getTypedChildren';

type Props = {
  children: React.ReactNode;
  typingInterval?: number;
};

const Typer = ({ children, typingInterval = 100 }: Props) => {
  const [lines, setLines] = useState<string[]>(() => getLines(children));
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const clearIds = useRef<number[]>([]).current;

  const typeAll = async () => {
    let lineIdx = 0;
    setTypedLines([]);
    while (lineIdx < lines.length) {
      setTypedLines(prev => [...prev, '']);
      await typeLine(lineIdx);
      lineIdx += 1;
    }
  };

  const typeLine = (lineIdx: number) => {
    return new Promise<void>(resolve => {
      const splittedLine = lines[lineIdx].split('');
      let charIdx = 0;
      const clearId = setInterval(() => {
        charIdx += 1;
        const newLine = splittedLine.slice(0, charIdx).join('');
        setTypedLines(prev => prev.map((line, index) => (index === lineIdx ? newLine : line)));
        if (charIdx === splittedLine.length) {
          resolve();
          clearInterval(clearId);
        }

        clearIds.push(clearId);
      }, typingInterval);
    });
  };

  useEffect(() => {
    while (clearIds.length > 0) {
      const clearId = clearIds.shift();
      clearInterval(clearId);
    }

    typeAll();
  }, [lines]);

  useEffect(() => {
    setLines(getLines(children));
  }, [children]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <div className="typer">{typedChildren}</div>;
};

export default Typer;
