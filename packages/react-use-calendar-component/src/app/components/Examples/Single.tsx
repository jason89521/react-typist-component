import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';
import SelectedDates from '../SelectedDates';

export function Single() {
  const calendarControl = useCalendarComponent();
  const { selectedDates } = calendarControl;

  return (
    <div>
      <Calendar calendarControl={calendarControl} />
      <SelectedDates selectedDates={selectedDates} />
    </div>
  );
}
