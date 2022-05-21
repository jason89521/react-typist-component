import React from 'react';
import Backspace from '../components/Backspace';
import Pause from '../components/Pause';

import type { TypedChildren } from '../types/typedChildren';

const isArray = (
  value: TypedChildren
): value is (string | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[] => {
  return Array.isArray(value);
};

const getTypedChildren = (children: React.ReactNode, lines: string[]) => {
  let lineIdx = 0;

  const recurse = (children: React.ReactNode): TypedChildren => {
    // React.Children.map will ignore null, if the mapping function return null.
    // For example, React.Children.map(children, () => null) will return [];

    const typedChildren = React.Children.map(children, child => {
      if (lineIdx >= lines.length) return null;

      if (React.isValidElement(child)) {
        // Remove Backspace and Pause from virtual DOM.
        if (child.type === Backspace || child.type === Pause) return null;

        const { children, ...props } = child.props;
        const t = recurse(children);
        if (isArray(t) && t.every(value => value === '')) {
          return null;
        }
        return React.cloneElement(child, props, t);
      }

      if (typeof child === 'string' || typeof child === 'number') return lines[lineIdx++];

      return null;
    });
    !Array.isArray(typedChildren) && console.log('not array');
    return typedChildren;
  };

  return recurse(children);
};

export default getTypedChildren;
