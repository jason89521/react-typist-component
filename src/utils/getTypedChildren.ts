import React from 'react';
import Backspace from '../components/Backspace';
import Pause from '../components/Pause';

import type { TypedChildren } from '../types/typedChildren';

/**
 * Determine whether to display contents by looking up the `lines` variable.
 * @param children
 * @param lines
 * @returns
 */
const getTypedChildren = (children: React.ReactNode, lines: string[]) => {
  let lineIdx = 0;

  const recurse = (children: React.ReactNode): TypedChildren => {
    // React.Children.map will ignore null if the mapping function return null.
    // For example, React.Children.map(children, () => null) will return [];
    const typedChildren = React.Children.map(children, child => {
      if (lineIdx >= lines.length) return null;

      if (React.isValidElement(child)) {
        // Remove Backspace and Pause from virtual DOM.
        if (child.type === Backspace || child.type === Pause) return null;

        const { children, ...props } = child.props;
        // Ignore any element whose children is either undefined or null.
        // For example, <br />
        if (!children) return null;

        const newChildren = recurse(children);
        // If `newChildren` is an empty array or all its items are '',
        // then we say that this element's contents are been removed by backspace.
        if (newChildren && newChildren.every(value => value === '')) {
          return null;
        }
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
