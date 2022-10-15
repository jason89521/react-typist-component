import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Single } from '../app/components/Examples';
import { getLocaleMonth } from './utils';

const dateInstance = new Date(2022, 9, 1);
const idValue = 'value';

describe('common functionality', () => {
  it('should display correct year/month', async () => {
    jest.useFakeTimers({ now: dateInstance });
    const user = userEvent.setup({ delay: null });
    render(<Single />);
    const currentMonth = getLocaleMonth(dateInstance);
    const prevMonth = getLocaleMonth(new Date(2022, 8));

    expect(screen.getByText(2022)).toBeInTheDocument();
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');

    // click year button
    await user.click(screen.getByLabelText('sub-year'));
    expect(screen.getByText(2021)).toBeInTheDocument();
    expect(screen.queryByTitle('today')).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('add-year'));
    expect(screen.getByText(2022)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');

    // click month button
    await user.click(screen.getByLabelText('sub-month'));
    expect(screen.getByText(prevMonth)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');
    await user.click(screen.getByLabelText('add-month'));
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');

    // click date button
    const prev30 = screen
      .getAllByRole('button', { name: '30' })
      .find(element => element.classList.contains('previous'));
    if (!prev30) throw new Error('prev30 is `undefined`');
    await user.click(prev30);
    expect(screen.getByText(prevMonth)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');
    const next1 = screen
      .getAllByRole('button', { name: '1' })
      .find(element => element.classList.contains('next'));
    if (!next1) throw new Error('next1 is `undefined`');
    await user.click(next1);
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByTitle('today')).toHaveTextContent('1');
  });

  it('should change value and selected dates correctly', async () => {
    jest.useFakeTimers({ now: dateInstance });
    const user = userEvent.setup({ delay: null });
    render(<Single />);
    const valueBlock = screen.getByTestId(idValue);
    let testString = dateInstance.toDateString();
    expect(valueBlock).toHaveTextContent(testString);

    const date10 = screen.getByRole('button', { name: '10' });
    await user.click(date10);
    testString = new Date(2022, 9, 10).toDateString();
    expect(valueBlock).toHaveTextContent(testString);

    const date20 = screen.getByRole('button', { name: '20' });
    await user.click(date20);
    testString = new Date(2022, 9, 20).toDateString();
    expect(valueBlock).toHaveTextContent(testString);
  });
});
