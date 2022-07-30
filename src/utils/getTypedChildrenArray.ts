import type { ReactNode } from 'react';
import type { Splitter, TypedLines } from '../types/TypistProps';
import getActions from './getActions';
import getTypedChildren from './getTypedChildren';

export default function getTypedChildrenArray(children: ReactNode, splitter: Splitter) {
  const actions = getActions(children);
  const typedLinesArray: TypedLines[] = [];
  const currentTypedLines: TypedLines = [];
  for (const { type, payload } of actions) {
    if (type === 'TYPE_STRING') {
      const tokens = splitter(payload);
      const lastIndex = currentTypedLines.length;
      for (let tokenIndex = 1; tokenIndex <= tokens.length; tokenIndex++) {
        const newLine = tokens.slice(0, tokenIndex).join('');
        currentTypedLines[lastIndex] = newLine;
        typedLinesArray.push([...currentTypedLines]);
      }
    } else if (type === 'TYPE_ELEMENT') {
      currentTypedLines.push(payload);
      typedLinesArray.push([...currentTypedLines]);
    } else if (type === 'BACKSPACE') {
      let amount = payload;
      while (amount--) {
        let lineIndex = currentTypedLines.length - 1;
        let line = currentTypedLines[lineIndex];
        while (line === null && lineIndex > 0) {
          lineIndex -= 1;
          line = currentTypedLines[lineIndex];
        }
        if (line === null) break;
        if (typeof line === 'object') currentTypedLines[lineIndex] = null;
        if (typeof line === 'string') {
          const tokens = splitter(line);
          const newLine = tokens.slice(0, -1).join('');
          currentTypedLines[lineIndex] = newLine || null;
        }
        typedLinesArray.push([...currentTypedLines]);
      }
    } else if (type === 'PASTE') {
      currentTypedLines.push(payload);
      typedLinesArray.push([...currentTypedLines]);
    }
  }

  return typedLinesArray.map(typedLines => getTypedChildren(children, typedLines));
}
