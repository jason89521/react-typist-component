import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Typist from '../components/Typist';
import { nestedChildren } from './utils';

beforeEach(() => {
  jest.useFakeTimers();
});

describe('Display children correctly.', () => {
  // Since the way Typist generates its children is different when disabled is different,
  // we need to test it separately.
  describe('Disabled is true', () => {
    test('Nested children', () => {
      render(<Typist disabled>{nestedChildren}</Typist>);
      screen.getByText('first');
      expect(screen.queryByText('second')).toBeNull();
      screen.getByText('third');
    });

    test('clear all children if the count of the last backspace is Infinity', () => {
      const { container } = render(
        <Typist disabled>
          {nestedChildren}
          <Typist.Backspace count={Infinity} />
        </Typist>
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Disabled is false', () => {
    test('nested children', async () => {
      render(<Typist>{nestedChildren}</Typist>);
      await screen.findByText('first');
      await screen.findByText('second');
      await screen.findByText('third');
      expect(screen.queryByText('second')).toBeNull();
    });

    test('clear all childthe count of the last backspace is Infinity', async () => {
      const { container } = render(
        <Typist>
          {nestedChildren}
          <Typist.Backspace count={Infinity} />
        </Typist>
      );
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });
});

test('Dynamic children', async () => {
  const arr = ['text 1', 'text 2'];
  const App = () => {
    const [index, setIndex] = useState(0);
    return (
      <Typist
        loop
        onTypingDone={() => {
          setIndex(index === 0 ? 1 : 0);
        }}
      >
        {arr[index]}
      </Typist>
    );
  };

  render(<App />);
  await waitFor(() => {
    screen.getByText('text 1');
    expect(screen.queryByText('text 2')).toBeNull();
  });
  await waitFor(() => {
    screen.getByText('text 2');
    expect(screen.queryByText('text 1')).toBeNull();
  });
});
