import { useState } from 'react';

import { CALENDAR_CELLS_NUM } from '../constant';
import type {
  UseCalendarOptions,
  DateCellInfo,
  SelectDateOptions,
  SelectType,
} from '../types';
import { getDateInfoByIndex } from '../utils';
import useDisplayedDate from './useDisplayedDate';

export default function useCalendarComponent<S extends SelectType = 'single'>({
  initialDisplayedDate = new Date(),
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
  } = useDisplayedDate(initialDisplayedDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [value, setValue] = useState(defaultValue);

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
      key: `${dateYear}-${dateMonth}-${dayOfMonth}`,
      year: dateYear,
      month: dateMonth,
      dayOfMonth: dayOfMonth,
      isSelected: !!selectedDates.find(
        date =>
          date.toString() ===
          new Date(dateYear, dateMonth, dayOfMonth).toString()
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
    value,
    changeDisplayedYear,
    changeDisplayedMonth,
    getDateCellInfos,
  };
}
