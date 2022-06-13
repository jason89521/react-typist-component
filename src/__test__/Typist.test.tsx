import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { TestTypist, nestedChildren, Typist } from './utils';

beforeEach(() => {
  jest.useFakeTimers();
});

test('should display children correctly', async () => {
  render(<TestTypist>{nestedChildren}</TestTypist>);

  await screen.findByText('first');
  await screen.findByText('second');
});

test('should display children correctly after backspace', async () => {
  render(
    <TestTypist>
      {nestedChildren}
      <Typist.Backspace count={6} />
      third
    </TestTypist>
  );

  await screen.findByText('first');
  await screen.findByText('third');
});

test('should delete all text and element if the count of Backspace is Infinity', async () => {
  const { container } = render(
    <TestTypist>
      {nestedChildren}
      <Typist.Backspace count={Infinity} />
    </TestTypist>
  );

  await waitFor(() => {
    expect(container.firstChild).toBeNull();
  });
});

test('should show the final result immediately if disable is true', () => {
  render(<TestTypist disable>{nestedChildren}</TestTypist>);
  screen.getByText('first');
  screen.getByText('second');
});
