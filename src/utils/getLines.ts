import React from 'react';

const getLines = (children: React.ReactNode) => {
  const lines: string[] = [];

  const recurse = (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      React.Children.forEach(child.props.children, recurse);
      return;
    }

    if (typeof child === 'number') child = child.toString(10);
    if (typeof child === 'string') {
      lines.push(child);
      return;
    }
  };

  React.Children.forEach(children, recurse);
  return lines;
};

export default getLines;
