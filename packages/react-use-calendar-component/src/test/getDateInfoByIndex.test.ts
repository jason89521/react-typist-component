import { CALENDAR_CELLS_NUM } from '../lib/constant';
import { getDateInfoByIndex } from '../lib/utils';

describe('getDateInfoByIndex', () => {
  const testYear = 2022;
  const testMonth = 9; // october
  const indexes = [...Array(CALENDAR_CELLS_NUM)].map((_, index) => index);
  const previousIndexes = indexes.splice(0, 6);
  const currentIndexes = indexes.splice(0, 31);
  const nextIndexes = indexes;

  it('should determine the date is at the previous month', () => {
    previousIndexes.forEach((value, index) => {
      const {
        year,
        month,
        monthDay: dayOfMonth,
        monthStatus,
      } = getDateInfoByIndex(testYear, testMonth, value);
      expect(year).toBe(testYear);
      expect(month).toBe(testMonth - 1);
      expect(dayOfMonth).toBe(25 + index);
      expect(monthStatus).toBe('previous');
    });
  });
  it('should determine the date is at the current month', () => {
    currentIndexes.forEach((value, index) => {
      const {
        year,
        month,
        monthDay: dayOfMonth,
        monthStatus,
      } = getDateInfoByIndex(testYear, testMonth, value);
      expect(year).toBe(testYear);
      expect(month).toBe(testMonth);
      expect(dayOfMonth).toBe(1 + index);
      expect(monthStatus).toBe('current');
    });
  });
  it('should determine the date is at the next month', () => {
    nextIndexes.forEach((value, index) => {
      const {
        year,
        month,
        monthDay: dayOfMonth,
        monthStatus,
      } = getDateInfoByIndex(testYear, testMonth, value);
      expect(year).toBe(testYear);
      expect(month).toBe(testMonth + 1);
      expect(dayOfMonth).toBe(1 + index);
      expect(monthStatus).toBe('next');
    });
  });
});
