import type { DateCellInfo } from '../../lib/types';

export default function CalendarCell({
  monthStatus,
  isSelected,
  isToday,
  monthDay,
  selectThisDate,
}: DateCellInfo) {
  const title = isToday ? 'today' : undefined;
  let className = 'rounded-full';
  if (monthStatus !== 'current') className = `${className} text-slate-300`;
  if (isSelected) className = `${className} bg-green-200 selected`;
  if (isToday && !isSelected) className = `${className} bg-amber-200`;
  if (!isToday && !isSelected) className = `${className} hover:bg-stone-100`;

  return (
    <button
      className={`${className} ${monthStatus}`}
      onClick={() => selectThisDate()}
      type='button'
      title={title}>
      {monthDay}
    </button>
  );
}
