import type { DateInfo } from '../types';
import { getNumberOfDays } from './getNumberOfDays';
import { isToday } from './isToday';

function getPrevNumberOfDays(year: number, month: number) {
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  return getNumberOfDays(prevYear, prevMonth);
}

/**
 * Returns the info of the date at `index`.
 * @param year
 * @param month
 * @param index
 */
export function getDateInfoByIndex(
  year: number,
  month: number,
  index: number
): DateInfo {
  const weekDayOfFirstDay = new Date(year, month).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const prevNumberOfDays = getPrevNumberOfDays(year, month);
  // If this offset is less than 0, means that the date at the current index is in the previous month.
  // If this offset is larger than or equal to the `numberOfDays`, means that the date at the current index is in the next month.
  // Otherwise means that the date at the current index is at the target month.
  const offset = index - weekDayOfFirstDay;
  const monthDay =
    (offset < 0 ? prevNumberOfDays + offset : offset % numberOfDays) + 1;
  const monthOffset = offset < 0 ? -1 : offset >= numberOfDays ? 1 : 0;
  const { dateYear, dateMonth } = (() => {
    const monthCandidate = month + monthOffset;
    if (monthCandidate < 0)
      return {
        dateYear: year - 1,
        dateMonth: 11,
      };
    if (monthCandidate > 11)
      return {
        dateYear: year + 1,
        dateMonth: 0,
      };
    return {
      dateYear: year,
      dateMonth: monthCandidate,
    };
  })();
  const monthStatus = (() => {
    if (monthOffset === -1) return 'previous';
    if (monthOffset === 1) return 'next';
    return 'current';
  })();

  return {
    year: dateYear,
    month: dateMonth,
    weekDay: index % 7,
    monthDay,
    monthStatus,
    isToday: isToday(dateYear, dateMonth, monthDay),
  };
}
