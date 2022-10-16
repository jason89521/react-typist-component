import { useEffect, useRef, useState } from 'react';

import { CALENDAR_CELLS_NUM } from '../constant';
import type {
  UseCalendarOptions,
  DateCellInfo,
  SelectDateOptions,
  SelectType,
  Value,
} from '../types';
import {
  getDateInfoByIndex,
  isSameDate,
  isExcludedDate,
  noop,
  normalizeValue,
} from '../utils';
import useDisplayedDate from './useDisplayedDate';

export default function useCalendarComponent<S extends SelectType = 'single'>({
  initialDisplayedDate = new Date(),
  selectType,
  value: userValue,
  onChange = noop,
  excludedDates = {},
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
  const isControlledRef = useRef(false);

  const handleValueChange = (value: Value<S>) => {
    onChange(value);
    if (!isControlledRef.current) setInternalValue(value);
  };

  useEffect(() => {
    if (typeof userValue !== 'undefined') {
      setInternalValue(undefined);
      isControlledRef.current = true;
    }
  }, [userValue]);

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
    const thisDate = new Date(dateYear, dateMonth, monthDay);
    const isSelected = !!selectedDates.find(d => isSameDate(d, thisDate));
    const isExcluded = isExcludedDate(thisDate, excludedDates);
    const selectThisDate = (options: SelectDateOptions = {}) => {
      const { changeDisplayedValues = true } = options;
      if (changeDisplayedValues) {
        setDisplayedYear(dateYear);
        setDisplayedMonth(dateMonth);
      }
      if (selectType === 'multiple') {
        const newDates = selectedDates.filter(d => !isSameDate(d, thisDate));
        if (newDates.length === selectedDates.length) newDates.push(thisDate);
        handleValueChange(newDates as any);

        return;
      }
      handleValueChange(thisDate as any);
    };

    return {
      key: `${dateYear}-${dateMonth}-${monthDay}`,
      year: dateYear,
      month: dateMonth,
      monthDay,
      isSelected,
      isExcluded,
      selectThisDate,
      ...info,
    };
  };

  const getDateCellInfos = (year = displayedYear, month = displayedMonth) => {
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
