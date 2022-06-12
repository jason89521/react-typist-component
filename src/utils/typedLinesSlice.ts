import React from 'react';
import { createSlice } from 'use-case-reducers';

import type { TypedLines } from '../types/TypistProps';
import getBackspacedLines from './getBackspacedLines';

const {
  initialState,
  reducer,
  actions: { reset, append, updateLastLine, deleteLastChar },
} = createSlice([] as TypedLines, {
  reset: (lines, newValue: TypedLines) => newValue,
  append: (lines, value: string | React.ReactElement) => {
    lines.push(value);
  },
  updateLastLine: (lines, newLine: string) => {
    const lastIdx = lines.length - 1;
    lines[lastIdx] = newLine;
  },
  deleteLastChar: getBackspacedLines,
});

export { initialState, reducer, reset, append, updateLastLine, deleteLastChar };
