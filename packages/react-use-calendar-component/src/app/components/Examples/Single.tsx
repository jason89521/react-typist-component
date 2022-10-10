import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';

export function Single() {
  const calendarControl = useCalendarComponent();
  const { selectedDates } = calendarControl;

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
