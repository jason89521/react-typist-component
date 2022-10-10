interface Props {
  selectedDates: Date[];
}

export default function SelectedDates({ selectedDates }: Props) {
  return (
    <p className='text-center mt-10 text-white flex flex-col'>
      {selectedDates.map(date => {
        return <span key={date.toString()}>{date.toLocaleDateString()}</span>;
      })}
    </p>
  );
}
