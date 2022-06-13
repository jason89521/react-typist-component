import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';

import Typist, { TypistProps } from './';

const pureChildren = (
  <div className="first">
    first
    <div className="second">second</div>
  </div>
);

/** Set delay to zero to reduce testing time */
const TestTypist = ({ children, typingDelay = 0, typingNoise = 0, ...rest }: TypistProps) => {
  return (
    <Typist typingDelay={typingDelay} typingNoise={typingNoise} {...rest}>
      {children}
    </Typist>
  );
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(cleanup);

test('should display children correctly', async () => {
  render(<TestTypist>{pureChildren}</TestTypist>);

  await screen.findByText('first');
  await screen.findByText('second');
});

test('should display children correctly after backspace', async () => {
  render(
    <TestTypist>
      {pureChildren}
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
      {pureChildren}
      <Typist.Backspace count={Infinity} />
    </TestTypist>
  );

  await waitFor(
    () => {
      expect(container.firstChild).toBeNull();
    },
    { interval: 0 }
  );
});

test('should show the final result immediately if disable is true', () => {
  render(<TestTypist disable>{pureChildren}</TestTypist>);
  screen.getByText('first');
  screen.getByText('second');
});
