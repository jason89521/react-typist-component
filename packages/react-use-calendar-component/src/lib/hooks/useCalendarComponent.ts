import { useState } from 'react';

import type {
  UseCalendarOptions,
  DateCellInfo,
  SelectDateOptions,
  SelectType,
} from '../types';
import { getNumberOfDays, isToday } from '../utils';
import useDisplayedDate from './useDisplayedDate';

const CELLS_OF_PICKER = 42;

export default function useCalendarComponent<S extends SelectType = 'single'>({
  displayedDate = new Date(),
  selectType,
  defaultValue,
}: UseCalendarOptions<S> = {}) {
  const {
    displayedYear,
    displayedMonth,
    setDisplayedYear,
    setDisplayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
  } = useDisplayedDate(displayedDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [value, setValue] = useState(defaultValue);

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
    const selectThisDate = (options: SelectDateOptions = {}) => {
      const { changeDisplayedValues = true } = options;
      if (changeDisplayedValues) {
        setDisplayedYear(year);
        setDisplayedMonth(month);
      }
      const selectedDate = new Date(year, month, dayOfMonth);
      if (selectType === 'multiple') {
        const newDates = selectedDates.filter(
          date => date.toString() !== selectedDate.toString()
        );
        if (newDates.length === selectedDates.length)
          newDates.push(selectedDate);
        newDates.sort((a, b) => a.getTime() - b.getTime());
        setSelectedDates(newDates);
        setValue(newDates as any);

        return;
      }

      setSelectedDates([selectedDate]);
      setValue(selectedDate as any);
    };

    return {
      key: `${year}-${month}-${dayOfMonth}`,
      year,
      month,
      dayOfMonth: dayOfMonth,
      dayOfWeek: weekDay,
      isToday: isToday(year, month, dayOfMonth),
      isSelected: !!selectedDates.find(
        date =>
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === dayOfMonth
      ),
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

  return {
    selectedDates,
    displayedYear,
    displayedMonth,
    value,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
  };
}
