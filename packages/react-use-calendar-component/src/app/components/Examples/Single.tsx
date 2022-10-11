import { useState } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import StateInfo from '../StateInfo';

export function Single() {
  const [value, setValue] = useState(new Date());
  const calendarControl = useCalendarComponent({ value, onChange: setValue });
  const { selectedDates } = calendarControl;

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <StateInfo value={[value]} selectedDates={selectedDates} />
    </div>
  );
}
