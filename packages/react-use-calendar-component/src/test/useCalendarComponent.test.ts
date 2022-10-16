import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';

import useCalendarComponent from '../lib';
import type { ExcludedDates } from '../lib/types';

// use 2022-10-01 to test
const now = new Date(2022, 9, 1);
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();
const sep25 = new Date(2022, 8, 25);
const nov05 = new Date(2022, 10, 5);

beforeEach(() => {
  jest.useFakeTimers({ now });
});

describe('useCalendarComponent', () => {
  it('should generate correct calendar cell', () => {
    const { result } = renderHook(() => useCalendarComponent());
    const cells = result.current.getDateCellInfos();
    const previousCells = cells.splice(0, 6);
    const currentCells = cells.splice(0, 31);
    const nextCells = cells;

    previousCells.forEach(({ year, month, monthDay, monthStatus }, index) => {
      expect(year).toBe(nowYear);
      expect(month).toBe(nowMonth - 1);
      expect(monthDay).toBe(25 + index);
      expect(monthStatus).toBe('previous');
    });
    currentCells.forEach(({ year, month, monthDay, monthStatus }, index) => {
      expect(year).toBe(nowYear);
      expect(month).toBe(nowMonth);
      expect(monthDay).toBe(1 + index);
      expect(monthStatus).toBe('current');
    });
    nextCells.forEach(({ year, month, monthDay, monthStatus }, index) => {
      expect(year).toBe(nowYear);
      expect(month).toBe(nowMonth + 1);
      expect(monthDay).toBe(1 + index);
      expect(monthStatus).toBe('next');
    });
  });

  it('should select the date cell correctly with single mode', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(now);
      return { ...useCalendarComponent({ value, onChange: setValue }), value };
    });
    let cells = result.current.getDateCellInfos();
    // 2022-10-01
    expect(cells[6]).toMatchObject({
      isToday: true,
      isSelected: true,
      isExcluded: false,
    });
    expect(result.current.value).toEqual(now);

    // select the date at previous month
    act(() => {
      // 2022-09-25
      cells[0]?.selectThisDate({ changeDisplayedValues: false });
    });
    expect(result.current.value).toEqual(sep25);
    cells = result.current.getDateCellInfos();
    // select the date at next month
    act(() => {
      // 2022-11-05
      cells.at(-1)?.selectThisDate({ changeDisplayedValues: false });
    });
    expect(result.current.value).toEqual(nov05);
  });

  it('should select the date cells correctly with multiple mode', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Date[]>([]);
      return {
        ...useCalendarComponent({
          selectType: 'multiple',
          value,
          onChange: setValue,
        }),
        value,
      };
    });
    let cells = result.current.getDateCellInfos();
    act(() => {
      cells[6]?.selectThisDate({ changeDisplayedValues: false });
    });
    expect(result.current.value).toEqual([now]);

    cells = result.current.getDateCellInfos();
    act(() => {
      cells[0]?.selectThisDate({ changeDisplayedValues: false });
    });
    expect(result.current.value).toEqual([now, sep25]);

    cells = result.current.getDateCellInfos();
    // unselect the date
    act(() => {
      cells[0]?.selectThisDate({ changeDisplayedValues: false });
    });
    expect(result.current.value).toEqual([now]);
  });

  it('should distinguish whether a date is excluded', () => {
    const excludedDates: ExcludedDates = {
      min: now,
      max: new Date(2022, 10, 1),
      arbitrary: [new Date(2022, 9, 15)],
    };
    const { result } = renderHook(
      excludedDates => useCalendarComponent({ excludedDates }),
      {
        initialProps: excludedDates,
      }
    );
    const cells = result.current.getDateCellInfos();
    const previousCells = cells.splice(0, 6);
    const currentCells = cells.splice(0, 31);
    const nextCells = cells;
    previousCells.forEach(({ isExcluded }) => {
      expect(isExcluded).toBe(true);
    });
    currentCells.forEach(({ monthDay, isExcluded }) => {
      if (monthDay === 15) expect(isExcluded).toBe(true);
      else expect(isExcluded).toBe(false);
    });
    nextCells.forEach(({ isExcluded }) => {
      expect(isExcluded).toBe(true);
    });
  });

  it('should not set internalValue if it is controlled by user', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<Date | undefined>(now);
      return {
        ...useCalendarComponent({ value, onChange: setValue }),
        value,
        setValue,
      };
    });
    act(() => {
      result.current.setValue(undefined);
    });
    const noSelectedDates = result.current
      .getDateCellInfos()
      .every(info => !info.isSelected);
    expect(noSelectedDates).toBe(true);
  });
});
