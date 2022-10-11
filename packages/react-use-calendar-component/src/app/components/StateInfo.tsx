interface Props {
  value: Date[];
  selectedDates: Date[];
}

export default function StateInfo({ value, selectedDates }: Props) {
  return (
    <div className='text-white flex justify-between mt-5'>
      <div className='flex flex-col'>
        <div className='text-lg text-rose-300'>value:</div>
        {value.map((v, index) => (
          <span key={index}>{v.toLocaleDateString()}</span>
        ))}
      </div>
      <div className='flex flex-col'>
        <div className='text-lg text-rose-300'>selected dates:</div>
        {selectedDates.map((date, index) => {
          return <span key={index}>{date.toLocaleDateString()}</span>;
        })}
      </div>
    </div>
  );
}
