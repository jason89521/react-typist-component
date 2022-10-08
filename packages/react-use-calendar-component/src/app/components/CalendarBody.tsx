import type { DateCellInfo } from '../../lib/types';
import { getWeekDayList } from '../../lib/utils/locale';
import CalendarCell from './CalendarCell';

const weekDayList = getWeekDayList();

interface Props {
  dateCellInfos: DateCellInfo[];
}

export default function CalendarBody({ dateCellInfos }: Props) {
  return (
    <div className='mt-5'>
      <div className='grid grid-cols-7 mb-4'>
        {weekDayList.map((d, i) => (
          <div key={i} className='flex items-center justify-center'>
            {d}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-y-4'>
        {dateCellInfos.map(
          ({
            key,
            monthStatus,
            isSelected,
            isToday,
            dayOfMonth,
            selectThisDate,
          }) => {
            let className = 'rounded-full';
            if (monthStatus !== 'current')
              className = `${className} text-slate-300`;
            if (isSelected) className = `${className} bg-green-200`;
            if (isToday && !isSelected) className = `${className} bg-amber-200`;
            if (!isToday && !isSelected)
              className = `${className} hover:bg-stone-100`;

            return (
              <CalendarCell
                key={key}
                onClick={selectThisDate}
                className={className}
                dayOfMonth={dayOfMonth}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
