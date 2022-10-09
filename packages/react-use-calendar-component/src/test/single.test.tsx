import { getByText, render } from '@testing-library/react';

describe('single', () => {
  const { container } = render(<div>123</div>);
  it('test', () => {
    getByText(container, '123');
  });
});
