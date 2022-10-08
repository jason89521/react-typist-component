import { useEffect } from 'react';

import useCalendarComponent from '../../lib';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

interface Props {
  calendarControl: ReturnType<typeof useCalendarComponent>;
}

export default function Calendar({ calendarControl }: Props) {
  const {
    displayedYear,
    displayedMonth,
    selectedDate,
    changeDisplayedMonth,
    changeDisplayedYear,
    getDateCellInfos,
  } = calendarControl;

  useEffect(() => {
    const { year, month, dayOfMonth } = selectedDate;
    console.log(new Date(year, month, dayOfMonth).toLocaleString());
  }, [selectedDate]);

  return (
    <div className='bg-white shadow-2xl rounded-3xl p-8 w-[500px]'>
      <CalendarHeader
        onYearClick={changeDisplayedYear}
        onMonthClick={changeDisplayedMonth}
        year={displayedYear}
        month={displayedMonth}
      />
      <CalendarBody dateCellInfos={getDateCellInfos()} />
    </div>
  );
}
