import { useCalendarComponent } from '../lib';
import { getWeekDayList } from '../lib/utils/locale';

const weekDayList = getWeekDayList();

function App() {
  const {
    displayedYear,
    displayedMonth,
    addMonth,
    addYear,
    getDateCellInfos,
    setSelectedDate,
  } = useCalendarComponent();

  const dateCells = getDateCellInfos().map(
    ({ key, year, month, monthStatus, dayOfMonth, isToday, isSelected }) => {
      let className = 'c-day-container';
      if (monthStatus !== 'current') className = `${className} disabled`;
      if (isToday) className = `${className} highlight`;
      if (isSelected) className = `${className} highlight-green`;

      return (
        <div
          key={key}
          className={className}
          onClick={() => {
            setSelectedDate(
              {
                year,
                month,
                dayOfMonth,
              },
              { shouldChangePanel: true }
            );
          }}>
          <div className='cdc-day'>
            <span>{dayOfMonth}</span>
          </div>
        </div>
      );
    }
  );

  return (
    <div className='mdp-container'>
      <div className='mdpc-head'>
        <div className='mdpch-button'>
          <div className='mdpchb-inner' onClick={() => addYear(-1)}>
            <span className='mdpchbi-left-arrows'></span>
          </div>
        </div>
        <div className='mdpch-button'>
          <div className='mdpchb-inner' onClick={() => addMonth(-1)}>
            <span className='mdpchbi-left-arrow'></span>
          </div>
        </div>
        <div className='mdpch-container'>
          <div className='mdpchc-year'>{displayedYear}</div>
          <div className='mdpchc-month'>{displayedMonth + 1}</div>
        </div>
        <div className='mdpch-button'>
          <div className='mdpchb-inner' onClick={() => addMonth(1)}>
            <span className='mdpchbi-right-arrow'></span>
          </div>
        </div>
        <div className='mdpch-button' onClick={() => addYear(1)}>
          <div className='mdpchb-inner'>
            <span className='mdpchbi-right-arrows'></span>
          </div>
        </div>
      </div>
      <div className='mdpc-body'>
        <div className='c-container'>
          <div className='cc-head'>
            {weekDayList.map((d, i) => (
              <div key={i} className='cch-name'>
                {d}
              </div>
            ))}
          </div>
          <div className='cc-body'>{dateCells}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
