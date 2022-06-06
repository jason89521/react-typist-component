import React from 'react';
import Backspace from '../components/Backspace';
import Pause from '../components/Pause';
import Paste from '../components/Paste';

import type {
  Action,
  TypeStringAction,
  BackspaceAction,
  PauseAction,
  PasteAction,
} from '../types/actions';

const typeString = (str: string): TypeStringAction => ({
  type: 'TYPE_STRING',
  payload: str,
});

const backspace = (count: number): BackspaceAction => ({
  type: 'BACKSPACE',
  payload: count,
});

const pause = (ms: number): PauseAction => ({ type: 'PAUSE', payload: ms });

const paste = (str: string): PasteAction => ({ type: 'PASTE', payload: str });

/**
 * Returns an actions array generated from ReactNode.
 * `Typist` will use these actions to determine what it should do.
 * @param node
 * @returns
 */
const getActions = (node: React.ReactNode) => {
  const actions: Action[] = [];
  /**
   * If the child is a `Paste` element, then this variable will be set to true
   * such that `recurse` can determine whether it should call `typeString` or `paste`
   * when the type of the traversed child is string.
   */
  let isPaste = false;

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

        if (child.type === Paste) {
          isPaste = true;
          React.Children.forEach(child.props.children, recurse);
          // It should be set to false when its children have been traversed.
          isPaste = false;
          return;
        }

        React.Children.forEach(child.props.children, recurse);
      }

      if (typeof child === 'number') child = child.toString(10);
      if (typeof child === 'string') actions.push(isPaste ? paste(child) : typeString(child));
    });
  };

  recurse(node);

  return actions;
};

export default getActions;
