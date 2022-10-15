import type { ExcludedDates } from '../types';
import { isSameDate } from './isSameDate';

function largerThan(a: Date, b: Date) {
  return a.getTime() > b.getTime();
}

export function isExcludedDate(
  date: Date,
  { min, max, arbitrary }: ExcludedDates
) {
  if (min && !largerThan(date, min)) return true;
  if (max && largerThan(date, max)) return true;
  if (arbitrary && !!arbitrary.find(d => isSameDate(d, date))) return true;

  return false;
}
