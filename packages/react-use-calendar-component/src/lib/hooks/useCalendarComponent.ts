import { useState } from 'react';

import type {
  DateCellInfo,
  SelectDate,
  ChangeDisplayedValue,
  SelectDateOptions,
} from '../types';
import getNumberOfDays from '../utils/getNumberOfDays';
import isToday from '../utils/isToday';

const dateInstance = new Date();

const CELLS_OF_PICKER = 42;

export default function useCalendarComponent(initialDate: Date = new Date()) {
  const [displayedYear, setDisplayedYear] = useState(initialDate.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(initialDate.getMonth());
  const [selectedDate, internalSetSelectedDate] = useState({
    year: displayedYear,
    month: displayedMonth,
    dayOfMonth: dateInstance.getDate(),
  });

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
        year === selectedDate.year &&
        month === selectedDate.month &&
        dayOfMonth === selectedDate.dayOfMonth,
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

  const changeDisplayedYear: ChangeDisplayedValue = (value, options = {}) => {
    const { override = false } = options;
    if (override) {
      setDisplayedYear(value);
      return;
    }

    if (displayedYear + value >= 0) setDisplayedYear(displayedYear + value);
    else setDisplayedYear(0);
  };

  const changeDisplayedMonth: ChangeDisplayedValue = (value, options = {}) => {
    const { override = false } = options;
    if (override) {
      setDisplayedMonth(value);
      return;
    }

    const nextMonth = displayedMonth + value;
    if (nextMonth < 0) {
      setDisplayedMonth(11);
      changeDisplayedYear(-1);
    } else if (nextMonth > 11) {
      setDisplayedMonth(0);
      changeDisplayedYear(1);
    } else setDisplayedMonth(nextMonth);
  };

  const selectDate: SelectDate = (dateUnit, options = {}) => {
    const { changeDisplayedValues = false } = options;
    internalSetSelectedDate(dateUnit);
    if (changeDisplayedValues) {
      setDisplayedYear(dateUnit.year);
      setDisplayedMonth(dateUnit.month);
    }
  };

  return {
    displayedYear,
    displayedMonth,
    selectedDate,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
    selectDate,
  };
}
