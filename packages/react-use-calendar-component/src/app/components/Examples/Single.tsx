import { useState } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import SelectedDates from '../SelectedDates';

export function Single() {
  const [value, setValue] = useState(new Date());
  const calendarControl = useCalendarComponent({ value, onChange: setValue });
  const { selectedDates } = calendarControl;

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <SelectedDates selectedDates={selectedDates} />
    </div>
  );
}
