import { fireEvent, getByText, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import React, { useState, useMemo } from 'react';

import type { Splitter } from '../types/TypistProps';
import { defaultSplitter } from '../utils/defaultFuncs';
import getTypedChildrenArray from '../utils/getTypedChildrenArray';

import { BUTTON_ID, nestedChildren, textsArray, WRAPPER_ID } from './constant';

type Props = {
  children: ReactNode;
  splitter?: Splitter;
};

const App = ({ children, splitter = defaultSplitter }: Props) => {
  const typedChildrenArray = useMemo(
    () => getTypedChildrenArray(children, splitter),
    [children, splitter]
  );
  const [tick, setTick] = useState(0);

  return (
    <>
      <div data-testid={WRAPPER_ID}>{typedChildrenArray[tick]}</div>
      <button data-testid={BUTTON_ID} onClick={() => setTick(tick + 1)}>
        increment
      </button>
    </>
  );
};

test('display children correctly', () => {
  render(<App>{nestedChildren}</App>);
  const wrapper = screen.getByTestId(WRAPPER_ID);
  const button = screen.getByTestId(BUTTON_ID);

  textsArray.forEach(texts => {
    texts.forEach(text => {
      getByText(wrapper, text);
    });
    fireEvent.click(button);
  });
});
