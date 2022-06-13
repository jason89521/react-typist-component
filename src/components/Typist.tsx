import React, { useEffect, useReducer, useRef } from 'react';

import type { TypistProps } from '../types/TypistProps';
import { initialState, reducer, reset } from '../utils/typedLinesSlice';
import getTypedChildren from '../utils/getTypedChildren';
import insertCursor from '../utils/insertCursor';
import Backspace from './Backspace';
import Delay from './Delay';
import Paste from './Paste';

import TypistCore from '../TypistCore';

const Typist = (props: TypistProps) => {
  const { children, cursor, disable, restartKey } = props;
  const [typedLines, dispatch] = useReducer(reducer, initialState);
  const typistCoreRef = useRef<TypistCore>();

  useEffect(() => {
    // If disable is true, show the final result immediately.
    if (disable) {
      typistCoreRef.current = undefined;
      const finalTypedLines = new TypistCore(props, dispatch).finalTypedLines;
      dispatch(reset(finalTypedLines));
      return;
    }

    // Whenever `disable` is set to false or `restartKey` is changed,
    // create a new instance of `TypistCore` and restart the typing animation.
    const typistCore = new TypistCore(props, dispatch);
    typistCoreRef.current = typistCore;
    typistCore.startTyping();
    return () => {
      // Make sure the old instance will not change `typedLines`.
      typistCore.discard();
    };

    // Don't add `props` to the dependencies array because
    // it will cause re-creating instance whenever `props` changes.
  }, [disable, restartKey]);

  // Update the typistCore's props whenever component's props change
  useEffect(() => {
    const typistCore = typistCoreRef.current;
    if (!typistCore) return;

    typistCore.onPropsChanged(props);
  }, [props]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

export default Object.assign(Typist, { Backspace, Delay, Paste });
