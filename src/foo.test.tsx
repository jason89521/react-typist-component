import React from 'react';

import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';

const Foo = () => {
  return <div>foo</div>;
};

test('should ', () => {
  render(<Foo />);
  expect(screen.getByText('foo')).toHaveTextContent('foo');
});
