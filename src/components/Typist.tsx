import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { TypedLines, TypistProps } from '../types/TypistProps';
import getTypedChildren from '../utils/getTypedChildren';
import getFinalTypedLines from '../utils/getFinalTypedLines';
import insertCursor from '../utils/insertCursor';
import { defaultSplitter, emptyFunc } from '../utils/defaultFuncs';
import Backspace from './Backspace';
import Delay from './Delay';
import Paste from './Paste';

import TypistCore from '../TypistCore';

const Typist = ({
  children,
  typingDelay = 75,
  backspaceDelay = 75,
  loop = false,
  pause = false,
  startDelay = 0,
  finishDelay = 0,
  onTypingDone = emptyFunc,
  splitter = defaultSplitter,
  cursor,
  restartKey,
  disabled = false,
}: TypistProps) => {
  const [typedLines, setTypedLines] = useState<TypedLines>([]);
  const typistCoreRef = useRef<TypistCore>();
  const coreProps = useMemo(
    () => ({
      children,
      typingDelay,
      backspaceDelay,
      loop,
      pause,
      startDelay,
      finishDelay,
      onTypingDone,
      splitter,
    }),
    [
      children,
      typingDelay,
      backspaceDelay,
      loop,
      pause,
      startDelay,
      finishDelay,
      onTypingDone,
      splitter,
    ]
  );

  useEffect(() => {
    // If disable is true, show the final result immediately.
    if (disabled) {
      typistCoreRef.current = undefined;
      const finalTypedLines = getFinalTypedLines(children, splitter);
      setTypedLines(finalTypedLines);
      return;
    }

    // Whenever `disable` is set to false or `restartKey` is changed,
    // create a new instance of `TypistCore` and restart the typing animation.
    const typistCore = new TypistCore(coreProps, setTypedLines);
    typistCoreRef.current = typistCore;
    typistCore.startTyping();
    return () => {
      // Make sure the old instance will not change `typedLines`.
      typistCore.discard();
    };

    // Don't add `props` to the dependencies array because
    // it will cause re-creating instance whenever `props` changes.
  }, [disabled, restartKey]);

  // Update the typistCore's props whenever component's props change
  useEffect(() => {
    const typistCore = typistCoreRef.current;
    typistCore?.setUpProps(coreProps);
  }, [coreProps]);

  const typedChildren = getTypedChildren(children, typedLines);
  return <>{cursor ? insertCursor(typedChildren, cursor) : typedChildren}</>;
};

export default Object.assign(Typist, { Backspace, Delay, Paste });
