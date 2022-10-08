import useCalendarComponent from '../../../lib';
import Calendar from '../Calendar';

export default function Single() {
  const calendarControl = useCalendarComponent();

  return <Calendar calendarControl={calendarControl} />;
}
