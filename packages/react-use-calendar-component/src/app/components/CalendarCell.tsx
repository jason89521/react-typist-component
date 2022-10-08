import type { DateCellInfo } from '../../lib/types';

interface Props {
  dateCellInfo: DateCellInfo;
}

export default function CalendarCell({ dateCellInfo }: Props) {
  const { key, monthStatus, dayOfMonth, isToday, isSelected, selectThisDate } =
    dateCellInfo;
  let className = 'rounded-full hover:bg-stone-100';
  if (monthStatus !== 'current') className = `${className} text-slate-300`;
  if (isSelected) className = `${className} bg-green-200`;
  if (isToday && !isSelected) className = `${className} bg-amber-200`;

  return (
    <button
      key={key}
      className={className}
      onClick={() => {
        selectThisDate({ changeDisplayedValues: true });
      }}>
      <div className='flex items-center justify-center'>
        <span>{dayOfMonth}</span>
      </div>
    </button>
  );
}
