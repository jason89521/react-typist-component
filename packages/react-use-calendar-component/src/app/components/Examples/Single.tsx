import { useState } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import StateInfo from '../StateInfo';

export function Single() {
  const [value, setValue] = useState<Date | undefined>(new Date());
  const calendarControl = useCalendarComponent({ value, onChange: setValue });

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <StateInfo value={value ? [value] : []} />
      <button onClick={() => setValue(undefined)}>clear</button>
    </div>
  );
}
