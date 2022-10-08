import { useState } from 'react';

import type { ChangeDisplayedValue } from '../types';

export default function useDisplayedDate(date: Date) {
  const [displayedYear, setDisplayedYear] = useState(date.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(date.getMonth());

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

  return {
    displayedYear,
    displayedMonth,
    setDisplayedYear,
    setDisplayedMonth,
    changeDisplayedYear,
    changeDisplayedMonth,
  };
}
