import type { TypedLines } from '../types/TypistProps';
import type { Splitter } from '../types/functions';

const getBackspacedLines = (lines: TypedLines, splitter: Splitter, onLinesCleared: () => void) => {
  const typedLines = [...lines];
  let lineIdx = typedLines.length - 1;
  let lastLine = typedLines[lineIdx];
  while (lastLine === null && lineIdx > 0) {
    lineIdx -= 1;
    lastLine = typedLines[lineIdx];
  }

  // all lines are null means that there is nothing can be deleted
  if (lastLine === null) onLinesCleared();
  if (typeof lastLine === 'object') typedLines[lineIdx] = null;
  if (typeof lastLine === 'string') {
    const splittedLine = splitter(lastLine);
    const newLine = splittedLine.slice(0, -1).join('');
    typedLines[lineIdx] = newLine === '' ? null : newLine;
  }

  return typedLines;
};

export default getBackspacedLines;
