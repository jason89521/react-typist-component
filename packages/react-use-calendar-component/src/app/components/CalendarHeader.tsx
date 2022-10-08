import { getMonthList } from '../../lib/utils/locale';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const monthList = getMonthList();

interface Props {
  year: number;
  month: number;
  onYearClick: (value: number) => void;
  onMonthClick: (value: number) => void;
}

export default function CalendarHeader({
  year,
  month,
  onYearClick,
  onMonthClick,
}: Props) {
  return (
    <div className='flex justify-between items-center'>
      <LeftArrow arrowAmount={2} onClick={() => onYearClick(-1)} />
      <LeftArrow onClick={() => onMonthClick(-1)} />
      <div className='flex flex-col justify-center items-center'>
        <span className='text-lg'>{year}</span>
        <span className='text-sm'>{monthList[month]}</span>
      </div>
      <RightArrow onClick={() => onMonthClick(1)} />
      <RightArrow arrowAmount={2} onClick={() => onYearClick(1)} />
    </div>
  );
}
