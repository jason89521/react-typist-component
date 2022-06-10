import React from 'react';
import { createSlice } from 'use-case-reducers';

import type { TypedLines } from '../types/typedChildren';
import type { Splitter } from '../types/functions';

const {
  initialState,
  reducer,
  actions: { reset, append, updateLastLine, deleteLastChar },
} = createSlice([] as TypedLines, {
  reset: () => [],
  append: (lines, value: string | React.ReactElement) => {
    lines.push(value);
  },
  updateLastLine: (lines, newLine: string) => {
    const lastIdx = lines.length - 1;
    lines[lastIdx] = newLine;
  },
  deleteLastChar: (lines, splitter: Splitter, onLinesCleared: () => void) => {
    const typedLines = [...lines];
    let lineIdx = typedLines.length - 1;
    let lastLine = typedLines[lineIdx];
    while (lastLine === null && lineIdx > 0) {
      lineIdx -= 1;
      lastLine = typedLines[lineIdx];
    }

    // all lines are null means that there is nothing can be deleted
    if (typeof lastLine === null) onLinesCleared();
    if (typeof lastLine === 'object') typedLines[lineIdx] = null;
    if (typeof lastLine === 'string') {
      const splittedLine = splitter(lastLine);
      const newLine = splittedLine.slice(0, -1).join('');
      typedLines[lineIdx] = newLine === '' ? null : newLine;
    }

    return typedLines;
  },
});

export { initialState, reducer, reset, append, updateLastLine, deleteLastChar };
