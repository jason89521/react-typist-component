import React from 'react';
import { getByText, render } from '@testing-library/react';

import Typist from '..';
import { nestedChildren, textsArray } from './constant';
import { waitFor } from './utils';

beforeEach(() => {
  jest.useFakeTimers();
});

test('render children correctly', async () => {
  const { container } = render(<Typist>{nestedChildren}</Typist>);

  for (const texts of textsArray) {
    for (const text of texts) {
      await waitFor(() => {
        getByText(container, text);
      });
    }
    jest.runOnlyPendingTimers();
  }
});
