import { useState } from 'react';

import getNumberOfDays from '../utils/getNumberOfDays';
import Portal from './Portal';

interface Coordinate {
  left: number;
  top: number;
}

interface DayDetails {
  date: number;
  dayMonth: number;
  day: number;
}

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function DateTimePicker() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [showPortal, setShowPortal] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate>({ left: 0, top: 0 });

  const getDayDetails = (index: number) => {
    const numberOfDays = getNumberOfDays(year, month);
    const firstDay = new Date(year, month).getDay();
    const offset = index - firstDay;
    const day = index % 7;
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = month - 1 < 0 ? year - 1 : year;
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const date =
      (offset < 0 ? prevMonthNumberOfDays + offset : offset % numberOfDays) + 1;
    const dayMonth = offset < 0 ? -1 : index >= numberOfDays ? 1 : 0;
    return {
      date,
      dayMonth,
      day,
    };
  };

  const getMonthDetails = () => {
    const arr: DayDetails[] = [];
    for (let i = 0; i < 42; i++) {
      arr.push(getDayDetails(i));
    }
    return arr;
  };

  const handleMonthChange = (value: number) => {
    const targetMonth = month + value;
    if (targetMonth === -1) {
      setMonth(11);
      setYear(year - 1);
    } else if (targetMonth === 12) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(targetMonth);
  };

  const getMonthStr = () =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const renderCalendar = () => {
    const dayCells = getMonthDetails().map((dayDetails, index) => {
      return (
        <div key={index} className='c-day-container'>
          <div className='cdc-day'>
            <span>{dayDetails.date}</span>
          </div>
        </div>
      );
    });

    return (
      <div className='c-container'>
        <div className='cc-head'>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
            <div key={i} className='cch-name'>
              {d}
            </div>
          ))}
        </div>
        <div className='cc-body'>{dayCells}</div>
      </div>
    );
  };

  return (
    <div className='MyDatePicker'>
      <div className='mdp-input'>
        <input
          type='date'
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCoordinate({
              left: rect.x,
              top: rect.y + rect.height,
            });
            setShowPortal(!showPortal);
          }}
        />
      </div>
      {showPortal && (
        <Portal>
          <div style={{ position: 'absolute', ...coordinate }}>
            <div className='mdp-container'>
              <div className='mdpc-head'>
                <div className='mdpch-button'>
                  <div
                    className='mdpchb-inner'
                    onClick={() => setYear(year - 1)}>
                    <span className='mdpchbi-left-arrows'></span>
                  </div>
                </div>
                <div className='mdpch-button'>
                  <div
                    className='mdpchb-inner'
                    onClick={() => handleMonthChange(-1)}>
                    <span className='mdpchbi-left-arrow'></span>
                  </div>
                </div>
                <div className='mdpch-container'>
                  <div className='mdpchc-year'>{year}</div>
                  <div className='mdpchc-month'>{getMonthStr()}</div>
                </div>
                <div className='mdpch-button'>
                  <div
                    className='mdpchb-inner'
                    onClick={() => handleMonthChange(1)}>
                    <span className='mdpchbi-right-arrow'></span>
                  </div>
                </div>
                <div className='mdpch-button' onClick={() => setYear(year + 1)}>
                  <div className='mdpchb-inner'>
                    <span className='mdpchbi-right-arrows'></span>
                  </div>
                </div>
              </div>
              <div className='mdpc-body'>{renderCalendar()}</div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
