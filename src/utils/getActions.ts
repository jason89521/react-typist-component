import React from 'react';
import Backspace from '../components/Backspace';
import Pause from '../components/Pause';

import type { Action, TypeStringAction, BackspaceAction, PauseAction } from '../types/actions';

const typeString = (str: string): TypeStringAction => ({
  type: 'TYPE_STRING',
  payload: str,
});

const backspace = (amount: number): BackspaceAction => ({
  type: 'BACKSPACE',
  payload: amount,
});

const pause = (duration: number): PauseAction => ({ type: 'PAUSE', payload: duration });

const getActions = (node: React.ReactNode) => {
  const actions: Action[] = [];

  const recurse = (node: React.ReactNode) => {
    React.Children.forEach(node, child => {
      if (React.isValidElement(child)) {
        if (child.type === Backspace) {
          actions.push(backspace(child.props.count));
          return;
        }

        if (child.type === Pause) {
          actions.push(pause(child.props.ms));
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

export default getActions;
