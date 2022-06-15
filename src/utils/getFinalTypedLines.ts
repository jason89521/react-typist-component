import React from 'react';

import type { Splitter, TypedLines } from '../types/TypistProps';
import getActions from './getActions';

const getFinalTypedLines = (children: React.ReactNode, splitter: Splitter) => {
  const finalTypedLines: TypedLines = [];
  getActions(children).forEach(action => {
    const { type, payload } = action;
    if (type === 'TYPE_STRING' || type === 'TYPE_ELEMENT' || type === 'PASTE')
      finalTypedLines.push(payload);
    else if (type === 'BACKSPACE') {
      let amount = payload;
      while (amount > 0) {
        let lineIdx = finalTypedLines.length - 1;
        let lastLine = finalTypedLines[lineIdx];
        while (lastLine === null && lineIdx > 0) {
          lineIdx -= 1;
          lastLine = finalTypedLines[lineIdx];
        }

        // all lines are null means that there is nothing can be deleted
        if (lastLine === null) amount = 0;
        if (typeof lastLine === 'object') finalTypedLines[lineIdx] = null;
        if (typeof lastLine === 'string') {
          const splittedLine = splitter(lastLine);
          const newLine = splittedLine.slice(0, -1).join('');
          finalTypedLines[lineIdx] = newLine === '' ? null : newLine;
        }

        amount -= 1;
      }
    }
  });

  return finalTypedLines;
};

export default getFinalTypedLines;
