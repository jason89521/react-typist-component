import type { DateCellInfo } from '../../lib/types';

export default function CalendarCell({
  monthStatus,
  isSelected,
  isExcluded,
  isToday,
  monthDay,
  selectThisDate,
}: DateCellInfo) {
  const title = isToday ? 'today' : undefined;
  let className = 'rounded-full';
  if (monthStatus !== 'current' || isExcluded)
    className = `${className} text-slate-300`;

  // set background color
  const decorator = (() => {
    if (isSelected) return 'bg-green-200';
    if (isToday) return 'bg-amber-200';
    if (isExcluded) return 'bg-gray-100 cursor-not-allowed';
    return '';
  })();
  className = `${className} ${decorator}`;
  if (!isToday && !isSelected && !isExcluded)
    className = `${className} hover:bg-stone-100`;

  return (
    <button
      disabled={isExcluded}
      className={`${className} ${monthStatus}`}
      onClick={() => selectThisDate()}
      type='button'
      title={title}>
      {monthDay}
    </button>
  );
}
