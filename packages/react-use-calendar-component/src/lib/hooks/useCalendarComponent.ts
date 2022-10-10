import { useState } from 'react';

import { CALENDAR_CELLS_NUM } from '../constant';
import type {
  UseCalendarOptions,
  DateCellInfo,
  SelectDateOptions,
  SelectType,
  Value,
} from '../types';
import { getDateInfoByIndex, isSameDate, noop } from '../utils';
import useDisplayedDate from './useDisplayedDate';

export default function useCalendarComponent<S extends SelectType = 'single'>({
  initialDisplayedDate = new Date(),
  selectType,
  value,
  onChange = noop,
}: UseCalendarOptions<S> = {}) {
  const {
    displayedYear,
    displayedMonth,
    setDisplayedYear,
    setDisplayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
  } = useDisplayedDate(initialDisplayedDate);
  const [internalValue, setInternalValue] = useState(value);
  const selectedDates = (() => {
    if (selectType === 'multiple') {
      if (value) return value as Date[];
      if (internalValue) return internalValue as Date[];
    }

    if (value) return [value] as Date[];
    if (internalValue) return [internalValue] as Date[];

    return [];
  })();

  const handleValueChange = (value: Value<S>) => {
    onChange(value);
    setInternalValue(value);
  };

  const getDateCellInfo = (
    year: number,
    month: number,
    cellIndex: number
  ): DateCellInfo => {
    const {
      year: dateYear,
      month: dateMonth,
      dayOfMonth,
      ...info
    } = getDateInfoByIndex(year, month, cellIndex);
    const selectThisDate = (options: SelectDateOptions = {}) => {
      const { changeDisplayedValues = true } = options;
      if (changeDisplayedValues) {
        setDisplayedYear(dateYear);
        setDisplayedMonth(dateMonth);
      }
      const selectedDate = new Date(dateYear, dateMonth, dayOfMonth);
      if (selectType === 'multiple') {
        const newDates = selectedDates.filter(
          date => !isSameDate(date, selectedDate)
        );
        if (newDates.length === selectedDates.length)
          newDates.push(selectedDate);
        newDates.sort((a, b) => a.getTime() - b.getTime());
        handleValueChange(newDates as any);

        return;
      }

      handleValueChange(selectedDate as any);
    };

    return {
      key: `${dateYear}-${dateMonth}-${dayOfMonth}`,
      year: dateYear,
      month: dateMonth,
      dayOfMonth: dayOfMonth,
      isSelected: !!selectedDates.find(date =>
        isSameDate(date, new Date(dateYear, dateMonth, dayOfMonth))
      ),
      selectThisDate,
      ...info,
    };
  };

  const getDateCellInfos = (
    year: number = displayedYear,
    month: number = displayedMonth
  ) => {
    const arr: DateCellInfo[] = [];
    for (let i = 0; i < CALENDAR_CELLS_NUM; i++) {
      arr.push(getDateCellInfo(year, month, i));
    }

    return arr;
  };

  return {
    selectedDates,
    displayedYear,
    displayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
  };
}
