import React from 'react';
import Backspace from '../components/Backspace';
import Delay from '../components/Delay';

import type { TypedChildren } from '../types/TypistProps';
import isNil from './isNil';

/**
 * Determine whether to display contents by looking up the `lines` variable.
 * @param children
 * @param lines
 * @returns
 */
const getTypedChildren = (
  children: React.ReactNode,
  lines: (string | React.ReactElement | null)[]
) => {
  let lineIdx = 0;

  const recurse = (children: React.ReactNode): TypedChildren => {
    // React.Children.map will ignore null if the mapping function return null.
    // For example, React.Children.map(children, () => null) will return [];
    const typedChildren = React.Children.map(children, child => {
      if (lineIdx >= lines.length) return null;

      if (React.isValidElement(child)) {
        // Remove Backspace and Pause from virtual DOM.
        if (child.type === Backspace || child.type === Delay) return null;

        const { children, ...props } = child.props;
        // if children is nil, treat the element as a single line
        if (isNil(children)) return lines[lineIdx++];

        const newChildren = recurse(children);
        // If `newChildren` is an empty array, then we say that
        // this element's contents have been removed by backspace.
        if (newChildren && newChildren.length === 0) return null;

        return React.cloneElement(child, props, newChildren);
      }

      // Only number and string are valid contents that can be typed.
      if (typeof child === 'string' || typeof child === 'number') return lines[lineIdx++];

      return null;
    });

    return typedChildren;
  };

  return recurse(children);
};

export default getTypedChildren;
