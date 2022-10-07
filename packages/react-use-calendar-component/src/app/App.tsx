import { useEffect } from 'react';

import useCalendarComponent from '../lib';
import { getWeekDayList, getMonthList } from '../lib/utils/locale';
import LeftArrow from './components/LeftArrow';
import RightArrow from './components/RightArrow';

const weekDayList = getWeekDayList();
const monthList = getMonthList();

function App() {
  const {
    displayedYear,
    displayedMonth,
    selectedDate,
    changeDisplayedMonth,
    changeDisplayedYear,
    getDateCellInfos,
  } = useCalendarComponent();

  useEffect(() => {
    const { year, month, dayOfMonth } = selectedDate;
    console.log(new Date(year, month, dayOfMonth).toLocaleString());
  }, [selectedDate]);

  const dateCells = getDateCellInfos().map(
    ({ key, monthStatus, dayOfMonth, isToday, isSelected, selectThisDate }) => {
      let className = 'rounded-full';
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
  );

  return (
    <div className='bg-white shadow-2xl rounded-3xl p-8 w-[500px]'>
      <div className='flex justify-between items-center'>
        <LeftArrow arrowAmount={2} onClick={() => changeDisplayedYear(-1)} />
        <LeftArrow onClick={() => changeDisplayedMonth(-1)} />
        <div className='flex flex-col justify-center items-center'>
          <span className='text-lg'>{displayedYear}</span>
          <span className='text-sm'>{monthList[displayedMonth]}</span>
        </div>
        <RightArrow onClick={() => changeDisplayedMonth(1)} />
        <RightArrow arrowAmount={2} onClick={() => changeDisplayedYear(1)} />
      </div>
      <div className='mt-5'>
        <div className='grid grid-cols-7 mb-4'>
          {weekDayList.map((d, i) => (
            <div key={i} className='flex items-center justify-center'>
              {d}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-y-4'>{dateCells}</div>
      </div>
    </div>
  );
}

export default App;
