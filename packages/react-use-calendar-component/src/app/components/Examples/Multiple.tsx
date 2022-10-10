import { useState } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import SelectedDates from '../SelectedDates';

export function Multiple() {
  const [value, setValue] = useState([new Date()]);
  console.log(value);
  const calendarControl = useCalendarComponent({
    selectType: 'multiple',
    value,
    onChange: setValue,
  });
  const { selectedDates } = calendarControl;

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <SelectedDates selectedDates={selectedDates} />
    </div>
  );
}
