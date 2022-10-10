import { useEffect } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import SelectedDates from '../SelectedDates';

export function Multiple() {
  const calendarControl = useCalendarComponent({ selectType: 'multiple' });
  const { selectedDates, value } = calendarControl;
  // const { year, month, dayOfMonth } = selectedDate;

  useEffect(() => {
    console.log('value:', value);
  }, [value]);

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <SelectedDates selectedDates={selectedDates} />
    </div>
  );
}
