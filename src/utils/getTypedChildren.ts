import React from 'react';
import Backspace from '../components/Backspace';

const getTypedChildren = (children: React.ReactNode, lines: string[]): React.ReactNode => {
  let lineIdx = 0;

  const recurse = (children: React.ReactNode): React.ReactNode => {
    // React.Children.map will ignore null, if the mapping function return null.
    // For example, React.Children.map(children, () => null) will return [];
    const typedChildren = React.Children.map(children, child => {
      if (lineIdx >= lines.length) return null;

      if (React.isValidElement(child) && child.type !== Backspace) {
        const { children, ...props } = child.props;
        const t = recurse(children);
        // t is [] means that it doesn't contain children.
        // t is [''] means that its text content is deleted.
        if (Array.isArray(t) && t.length === 1 && t[0] === '') {
          return null;
        }

        return React.cloneElement(child, props, t);
      }

      if (typeof child === 'string' || typeof child === 'number') return lines[lineIdx++];

      return null;
    });

    return typedChildren;
  };

  return recurse(children);
};

export default getTypedChildren;
