import { useState } from 'react';

import type { DateCellInfo, SetSelectedDate } from '../types';
import getNumberOfDays from '../utils/getNumberOfDays';
import isToday from '../utils/isToday';

const dateInstance = new Date();

const CELLS_OF_PICKER = 42;

export function useCalendarComponent(initialDate: Date = new Date()) {
  const [displayedYear, setDisplayedYear] = useState(initialDate.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(initialDate.getMonth());
  const [selectedDate, internalSetSelectedDate] = useState({
    year: displayedYear,
    month: displayedMonth,
    dayOfMonth: dateInstance.getDate(),
  });

  const getDateCellInfo = (cellIndex: number): DateCellInfo => {
    const numberOfDays = getNumberOfDays(displayedYear, displayedMonth);
    const firstWeekDay = new Date(displayedYear, displayedMonth).getDay();
    const weekDay = cellIndex % 7;
    const prevMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;
    const prevYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const offset = cellIndex - firstWeekDay;
    const cellDayOfMonth =
      (offset < 0 ? prevMonthNumberOfDays + offset : offset % numberOfDays) + 1;
    const monthOffset = offset < 0 ? -1 : offset >= numberOfDays ? 1 : 0;

    const { cellYear, cellMonth } = (() => {
      const targetMonth = displayedMonth + monthOffset;
      if (targetMonth < 0)
        return {
          cellYear: displayedYear - 1,
          cellMonth: 11,
        };

      if (targetMonth > 11)
        return {
          cellYear: displayedYear + 1,
          cellMonth: 0,
        };

      return {
        cellYear: displayedYear,
        cellMonth: targetMonth,
      };
    })();

    return {
      key: `${cellYear}-${cellMonth}-${cellDayOfMonth}`,
      year: cellYear,
      month: cellMonth,
      dayOfMonth: cellDayOfMonth,
      dayOfWeek: weekDay,
      isToday: isToday(cellYear, cellMonth, cellDayOfMonth),
      isSelected:
        cellYear === selectedDate.year &&
        cellMonth === selectedDate.month &&
        cellDayOfMonth === selectedDate.dayOfMonth,
      monthStatus:
        monthOffset < 0 ? 'previous' : monthOffset > 0 ? 'next' : 'current',
    };
  };

  const getDateCellInfos = () => {
    const arr: DateCellInfo[] = [];
    for (let i = 0; i < CELLS_OF_PICKER; i++) {
      arr.push(getDateCellInfo(i));
    }

    return arr;
  };

  const addYear = (offset: number) => {
    if (displayedYear + offset >= 0) setDisplayedYear(displayedYear + offset);
    else setDisplayedYear(0);
  };

  const addMonth = (offset: number) => {
    const nextMonth = displayedMonth + offset;
    if (nextMonth < 0) {
      setDisplayedMonth(11);
      addYear(-1);
    } else if (nextMonth > 11) {
      setDisplayedMonth(0);
      addYear(1);
    } else setDisplayedMonth(nextMonth);
  };

  const setSelectedDate: SetSelectedDate = (
    dateUnit,
    { shouldChangePanel = false } = {}
  ) => {
    internalSetSelectedDate(dateUnit);
    if (shouldChangePanel) {
      setDisplayedYear(dateUnit.year);
      setDisplayedMonth(dateUnit.month);
    }
  };

  return {
    displayedYear,
    displayedMonth,
    selectedDate,
    addYear,
    addMonth,
    getDateCellInfos,
    setSelectedDate,
  };
}
