interface Props {
  selectedDates: Date[];
}

export default function SelectedDates({ selectedDates }: Props) {
  return (
    <div className='flex flex-col'>
      {selectedDates.map(date => {
        return <span key={date.toString()}>{date.toLocaleDateString()}</span>;
      })}
    </div>
  );
}
