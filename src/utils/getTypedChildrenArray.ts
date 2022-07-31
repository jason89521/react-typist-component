import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import type { Splitter, TypedLines } from '../types/TypistProps';
import Backspace from '../components/Backspace';
import getTypedChildren from './getTypedChildren';
import Paste from '../components/Paste';
import isNil from './isNil';
import Delay from '../components/Delay';

export default function getTypedChildrenArray(children: ReactNode, splitter: Splitter) {
  const typedLinesArray: TypedLines[] = [];
  const currentTypedLines: TypedLines = [];
  let isPaste = false;

  const recurse = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (isValidElement(child)) {
        if (child.type === Delay) return;

        if (child.type === Backspace) {
          let count = child.props.count as number;
          while (count--) {
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

          return;
        }

        if (child.type === Paste) {
          isPaste = true;
          Children.forEach(child.props.children, recurse);
          isPaste = false;

          return;
        }

        if (isNil(child.props.children)) {
          currentTypedLines.push(child);
          typedLinesArray.push([...currentTypedLines]);

          return;
        }

        Children.forEach(child.props.children, recurse);
      }

      const str = (() => {
        if (typeof child === 'number') return child.toString(10);
        if (typeof child === 'string') return child;
      })();

      if (str === undefined) return;

      if (isPaste) {
        currentTypedLines.push(str);
        typedLinesArray.push([...currentTypedLines]);

        return;
      }

      const tokens = splitter(str);
      const lastIndex = currentTypedLines.length;
      for (let tokenIndex = 1; tokenIndex <= tokens.length; tokenIndex++) {
        const newLine = tokens.slice(0, tokenIndex).join('');
        currentTypedLines[lastIndex] = newLine;
        typedLinesArray.push([...currentTypedLines]);
      }
    });
  };

  recurse(children);

  console.log(typedLinesArray);

  return typedLinesArray.map(typedLines => getTypedChildren(children, typedLines));
}
