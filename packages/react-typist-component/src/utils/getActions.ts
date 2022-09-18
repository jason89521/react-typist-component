import type { ReactElement } from 'react';
import { Children, isValidElement } from 'react';

import type {
  Action,
  BackspaceAction,
  DelayAction,
  PasteAction,
  TypeTokenAction,
} from '../types/actions';
import type { Splitter } from '../types/TypistProps';

import isNil from './isNil';
import Backspace from '../components/Backspace';
import Delay from '../components/Delay';
import Paste from '../components/Paste';

const typeToken = (token: string | ReactElement): TypeTokenAction => ({
  type: 'TYPE_TOKEN',
  payload: token,
});

const backspace = (count: number): BackspaceAction => ({
  type: 'BACKSPACE',
  payload: count,
});

const pause = (ms: number): DelayAction => ({ type: 'DELAY', payload: ms });

const paste = (str: string): PasteAction => ({ type: 'PASTE', payload: str });

/**
 * Returns an actions array generated from ReactNode.
 * `Main` component will use these actions to determine what it should do.
 */
const getActions = (node: React.ReactNode, splitter: Splitter) => {
  const actions: Action[] = [];
  let isPaste = false;
  let tokensNumber = 0;

  const recurse = (node: React.ReactNode) => {
    Children.forEach(node, child => {
      if (isValidElement(child)) {
        if (child.type === Backspace) {
          const count = child.props.count as number;
          const payload = count > tokensNumber ? tokensNumber : count;
          tokensNumber -= payload;
          actions.push(backspace(payload));

          return;
        }

        if (child.type === Delay) {
          actions.push(pause(child.props.ms));
          return;
        }

        if (child.type === Paste) {
          isPaste = true;
          Children.forEach(child.props.children, recurse);
          isPaste = false;
          return;
        }

        // if children is undefined or null, treat the child as a single token
        if (isNil(child.props.children)) {
          tokensNumber += 1;
          actions.push(typeToken(child));
          return;
        }

        Children.forEach(child.props.children, recurse);
      }

      const str = (() => {
        if (typeof child === 'number') return child.toString(10);
        if (typeof child === 'string') return child;
      })();

      if (str === undefined) return;

      if (isPaste) {
        tokensNumber += splitter(str).length;
        actions.push(paste(str));

        return;
      }

      const tokens = splitter(str);
      tokensNumber += tokens.length;
      tokens.forEach(token => {
        actions.push(typeToken(token));
      });
    });
  };

  recurse(node);

  return actions;
};

export default getActions;
