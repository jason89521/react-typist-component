import React from 'react';

import type { Action, TypeStringAction, Backspace } from '../types/actions';

export const typeString = (str: string): TypeStringAction => ({
  type: 'TYPE_STRING',
  payload: str,
});

export const deleteAll = (num: number): Backspace => ({ type: 'BACKSPACE', payload: num });

export const getActions = (node: React.ReactNode) => {
  const actions: Action[] = [];

  const recurse = (node: React.ReactNode) => {
    React.Children.forEach(node, child => {
      if (React.isValidElement(child)) {
        React.Children.forEach(child.props.children, recurse);
      }

      if (typeof child === 'number') child = child.toString(10);
      if (typeof child === 'string') {
        actions.push(typeString(child));
        return;
      }
    });
  };

  recurse(node);

  return actions;
};
