import { useEffect } from 'react';

import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';

export default function Multiple() {
  const calendarControl = useCalendarComponent({ selectType: 'multiple' });
  const { selectedDates, value } = calendarControl;
  // const { year, month, dayOfMonth } = selectedDate;

  useEffect(() => {
    console.log('value:', value);
  }, [value]);

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <p className='text-center mt-10 text-white flex flex-col'>
        {selectedDates.map(date => {
          const localeString = date.toLocaleString(navigator.language, {
            dateStyle: 'long',
          });
          return <span key={localeString}>{localeString}</span>;
        })}
      </p>
    </div>
  );
}
