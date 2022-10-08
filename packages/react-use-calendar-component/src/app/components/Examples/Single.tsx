import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';

export default function Single() {
  const calendarControl = useCalendarComponent();
  // const { selectedDate } = calendarControl;
  // const { year, month, dayOfMonth } = selectedDate;

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      {/* <p className='text-center mt-10 text-white'>
        {new Date(year, month, dayOfMonth).toLocaleString(navigator.language, {
          dateStyle: 'long',
        })}
      </p> */}
    </div>
  );
}
