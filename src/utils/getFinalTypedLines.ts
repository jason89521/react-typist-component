import React from 'react';

import type { TypedLines } from '../types/TypistProps';
import getActions from './getActions';
import getBackspacedLines from './getBackspacedLines';

const getFinalTypedLines = (children: React.ReactNode, splitter: (s: string) => string[]) => {
  let finalTypedLines: TypedLines = [];
  getActions(children).forEach(action => {
    const { type, payload } = action;
    if (type === 'TYPE_STRING' || type === 'TYPE_ELEMENT' || type === 'PASTE')
      finalTypedLines.push(payload);
    else if (type === 'BACKSPACE') {
      let amount = payload;
      while (amount > 0) {
        finalTypedLines = getBackspacedLines(finalTypedLines, splitter, () => (amount = 0));
        amount -= 1;
      }
    }
  });

  return finalTypedLines;
};

export default getFinalTypedLines;
