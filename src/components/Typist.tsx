import React, { useEffect, useRef, useState } from 'react';

import type { TypedLines, TypistProps } from '../types/TypistProps';
import getTypedChildren from '../utils/getTypedChildren';
import getFinalTypedLines from '../utils/getFinalTypedLines';
import insertCursor from '../utils/insertCursor';
import { defaultSplitter } from '../utils/defaultFuncs';
import Backspace from './Backspace';
import Delay from './Delay';
import Paste from './Paste';

import TypistCore from '../TypistCore';

const Main = ({ cursor, disabled = false, restartKey, ...coreProps }: TypistProps) => {
  const { children, splitter = defaultSplitter } = coreProps;
  const [typedLines, setTypedLines] = useState<TypedLines>([]);
  const typistCoreRef = useRef<TypistCore>();

  useEffect(() => {
    // If disable is true, show the final result immediately.
    if (disabled) {
      typistCoreRef.current = undefined;
      const finalTypedLines = getFinalTypedLines(children, splitter);
      setTypedLines(finalTypedLines);
      return;
    }

    // Whenever `disable` is set to false,
    // create a new instance of `TypistCore` and restart the typing animation.
    const typistCore = new TypistCore(coreProps, setTypedLines);
    typistCoreRef.current = typistCore;
    typistCore.startTyping();
    return () => {
      // Make sure the old instance will not change `typedLines`.
      typistCore.discard();
    };

    // Don't add other properties to the dependencies array because
    // it will cause re-creating instance whenever `props` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, restartKey]);

  // Update the typistCore's props whenever component's props change
  useEffect(() => {
    typistCoreRef.current?.updateProps(coreProps);
  }, [coreProps]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

const Typist = Object.assign(Main, { Backspace, Delay, Paste });

export default Typist;
