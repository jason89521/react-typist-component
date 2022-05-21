import React from 'react';
import type { TypedChildren } from '../types/typedChildren';

const insertCursor = (
  typedChildren: TypedChildren,
  cursor: string | React.ReactElement
): TypedChildren => {
  if (typeof cursor !== 'string') {
    const { children, ...props } = cursor.props;
    if (!props.key) props.key = 'typer-cursor';
    cursor = React.cloneElement(cursor, props, children);
  }

  const recurse = (typedChildren: TypedChildren): TypedChildren => {
    if (!typedChildren) return typedChildren;

    // show cursor at the beginning or when all contents are deleted by backspace
    if (typedChildren.length === 0) return [cursor];

    const lastChild = typedChildren[typedChildren.length - 1];
    if (typeof lastChild === 'string') return [...typedChildren, cursor];

    const { children, ...props } = lastChild.props;
    // <div></div> or <div />
    if (!children) return typedChildren;

    const afterInsert = recurse([...children]);
    const el = React.cloneElement(lastChild, props, afterInsert);

    return [...typedChildren.slice(0, -1), el];
  };

  return recurse(typedChildren);
};

export default insertCursor;
