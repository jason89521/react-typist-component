import React from 'react';

import type { Action, TypeStringAction, DeleteAllAction } from '../types/actions';

export const typeString = (str: string): TypeStringAction => ({
  type: 'TYPE_STRING',
  payload: str,
});

export const deleteAll = (): DeleteAllAction => ({ type: 'DELETE_ALL' });

export const getActions = (node: React.ReactNode) => {
  const actions: Action[] = [];

  const recurse = (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      React.Children.forEach(child.props.children, recurse);
      return;
    }

    if (typeof child === 'number') child = child.toString(10);
    if (typeof child === 'string') {
      actions.push(typeString(child));
      return;
    }
  };

  React.Children.forEach(node, recurse);
  return actions;
};
