import React, { useEffect, useReducer, useState } from 'react';

import type { TypistProps } from '../types/TypistProps';
import { initialState, reducer, reset } from '../utils/typedLinesSlice';
import getTypedChildren from '../utils/getTypedChildren';
import insertCursor from '../utils/insertCursor';
import Backspace from './Backspace';
import Pause from './Pause';
import Paste from './Paste';

import TypistCore from '../typistCore';

const Typist = (props: TypistProps) => {
  const { children, cursor, disable } = props;
  const [typedLines, dispatch] = useReducer(reducer, initialState);
  const [typistCore] = useState(() => new TypistCore(props, dispatch));

  useEffect(() => {
    if (disable) {
      dispatch(reset(typistCore.finalTypedLines));
      return;
    }

    typistCore.startTyping();
    return () => {
      typistCore.clearTimer();
    };
  }, [typistCore, disable]);

  useEffect(() => {
    typistCore.onPropsChanged(props);
  }, [props, typistCore]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

Typist.Backspace = Backspace;
Typist.Pause = Pause;
Typist.Paste = Paste;
export default Typist;
export type { TypistProps };
