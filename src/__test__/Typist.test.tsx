import React from 'react';
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
} from '@testing-library/react';

import Typist from '..';
import { nestedChildren, textsArray, PauseTest, BUTTON_ID } from './constant';
import { findByText, waitFor } from './utils';

afterEach(() => {
  jest.useRealTimers();
});

test('render children correctly', async () => {
  const { container } = render(<Typist>{nestedChildren}</Typist>);
  jest.useFakeTimers();

  for (const texts of textsArray) {
    for (const text of texts) {
      await findByText(container, text);
    }
    jest.runOnlyPendingTimers();
  }
});

test('pause the typing animation', async () => {
  const { container } = render(<PauseTest />);
  const button = getByTestId(container, BUTTON_ID);

  await findByText(container, 'a');
  fireEvent.click(button);
  let isPauseWork = true;
  try {
    await findByText(container, 'ab');
    isPauseWork = false;
  } catch (error) {
    // do nothing
  }
  if (!isPauseWork) throw new Error('Pause does not work!');
  fireEvent.click(button);
  await findByText(container, 'ab');
});
