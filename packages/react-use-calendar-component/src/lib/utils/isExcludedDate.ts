import type { ExcludedDates } from '../types';
import { isSameDate } from './isSameDate';

function lessThan(a: Date, b: Date) {
  return a.getTime() < b.getTime();
}

export function isExcludedDate(
  date: Date,
  { min, max, arbitrary }: ExcludedDates
) {
  if (min && lessThan(date, min)) return true;
  if (max && !lessThan(date, max)) return true;
  if (arbitrary && !!arbitrary.find(d => isSameDate(d, date))) return true;

  return false;
}
