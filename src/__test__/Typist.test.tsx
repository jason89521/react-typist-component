import React from 'react';
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

    test('Contents should be null is the last child is Typist.Backspace and its count is Infinity', () => {
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

    test('Contents should be null is the last child is Typist.Backspace and its count is Infinity', async () => {
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
