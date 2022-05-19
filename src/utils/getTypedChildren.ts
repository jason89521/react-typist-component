import React from 'react';

const isArray = (children: React.ReactNode): children is React.ReactNode[] => {
  return Array.isArray(children);
};

const getTypedChildren = (children: React.ReactNode, lines: string[]): React.ReactNode => {
  let lineIdx = 0;
  const recurse = (children: React.ReactNode): React.ReactNode => {
    const typedChildren = React.Children.map(children, child => {
      if (lineIdx >= lines.length) return null;

      if (React.isValidElement(child)) {
        const { children, ...props } = child.props;
        const t = recurse(children);
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
