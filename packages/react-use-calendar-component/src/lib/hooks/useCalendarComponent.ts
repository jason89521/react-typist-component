import { useState } from 'react';

import type {
  UseCalendarOptions,
  DateCellInfo,
  SelectDate,
  SelectDateOptions,
  SelectType,
} from '../types';
import { getNumberOfDays, isToday } from '../utils';
import useDisplayedDate from './useDisplayedDate';

const CELLS_OF_PICKER = 42;

export default function useCalendarComponent<S extends SelectType>({
  displayedDate = new Date(),
  selectType,
}: UseCalendarOptions<S> = {}) {
  console.log(selectType);
  const {
    displayedYear,
    displayedMonth,
    setDisplayedYear,
    setDisplayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
  } = useDisplayedDate(displayedDate);
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const getDateCellInfo = (cellIndex: number): DateCellInfo => {
    const prevMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;
    const prevYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const weekDayOfFirstDay = new Date(displayedYear, displayedMonth).getDay();
    const offset = cellIndex - weekDayOfFirstDay;
    const numberOfDays = getNumberOfDays(displayedYear, displayedMonth);
    const dayOfMonth =
      (offset < 0 ? prevMonthNumberOfDays + offset : offset % numberOfDays) + 1;
    const monthOffset = offset < 0 ? -1 : offset >= numberOfDays ? 1 : 0;

    const { year, month } = (() => {
      const targetMonth = displayedMonth + monthOffset;
      if (targetMonth < 0)
        return {
          year: displayedYear - 1,
          month: 11,
        };

      if (targetMonth > 11)
        return {
          year: displayedYear + 1,
          month: 0,
        };

      return {
        year: displayedYear,
        month: targetMonth,
      };
    })();
    const weekDay = cellIndex % 7;
    const selectThisDate = (options?: SelectDateOptions) => {
      selectDate({ year, month, dayOfMonth }, options);
    };

    return {
      key: `${year}-${month}-${dayOfMonth}`,
      year,
      month,
      dayOfMonth: dayOfMonth,
      dayOfWeek: weekDay,
      isToday: isToday(year, month, dayOfMonth),
      isSelected:
        year === selectedDate[0]?.getFullYear() &&
        month === selectedDate[0]?.getMonth() &&
        dayOfMonth === selectedDate[0]?.getDate(),
      monthStatus:
        monthOffset < 0 ? 'previous' : monthOffset > 0 ? 'next' : 'current',
      selectThisDate,
    };
  };

  const getDateCellInfos = () => {
    const arr: DateCellInfo[] = [];
    for (let i = 0; i < CELLS_OF_PICKER; i++) {
      arr.push(getDateCellInfo(i));
    }

    return arr;
  };

  const selectDate: SelectDate = (
    { year, month, dayOfMonth },
    options = {}
  ) => {
    const { changeDisplayedValues = false } = options;
    setSelectedDate([new Date(year, month, dayOfMonth)]);
    if (changeDisplayedValues) {
      setDisplayedYear(year);
      setDisplayedMonth(month);
    }
  };

  return {
    displayedYear,
    displayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
  };
}
