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
import { normalizeValue } from '../utils/normalizeValue';
import useDisplayedDate from './useDisplayedDate';

export default function useCalendarComponent<S extends SelectType = 'single'>({
  initialDisplayedDate = new Date(),
  selectType,
  value: userValue,
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
  const [internalValue, setInternalValue] = useState(userValue);
  const selectedDates = normalizeValue(selectType, userValue || internalValue);

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
      monthDay,
      ...info
    } = getDateInfoByIndex(year, month, cellIndex);

    const isSelected = !!selectedDates.find(date =>
      isSameDate(date, new Date(dateYear, dateMonth, monthDay))
    );
    const selectThisDate = (options: SelectDateOptions = {}) => {
      const { changeDisplayedValues = true } = options;
      if (changeDisplayedValues) {
        setDisplayedYear(dateYear);
        setDisplayedMonth(dateMonth);
      }
      const selectedDate = new Date(dateYear, dateMonth, monthDay);
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
      key: `${dateYear}-${dateMonth}-${monthDay}`,
      year: dateYear,
      month: dateMonth,
      monthDay,
      isSelected,
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
    displayedYear,
    displayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
  };
}
