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
        {dateCellInfos.map(info => (
          <CalendarCell key={info.key} dateCellInfo={info} />
        ))}
      </div>
    </div>
  );
}
