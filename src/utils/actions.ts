import React from 'react';
import Backspace from '../components/Backspace';

import type { Action, TypeStringAction, BackspaceAction } from '../types/actions';

export const typeString = (str: string): TypeStringAction => ({
  type: 'TYPE_STRING',
  payload: str,
});

export const backspace = (num: number): BackspaceAction => ({ type: 'BACKSPACE', payload: num });

export const getActions = (node: React.ReactNode) => {
  const actions: Action[] = [];

  const recurse = (node: React.ReactNode) => {
    React.Children.forEach(node, child => {
      if (React.isValidElement(child)) {
        if (child.type === Backspace) {
          actions.push(backspace(child.props.amount));
          return;
        }

        React.Children.forEach(child.props.children, recurse);
      }

      if (typeof child === 'number') child = child.toString(10);
      if (typeof child === 'string') actions.push(typeString(child));
    });
  };

  recurse(node);

  return actions;
};
