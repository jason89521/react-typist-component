interface Props {
  value: Date[];
}

export default function StateInfo({ value }: Props) {
  return (
    <div className='text-white flex justify-between mt-5'>
      <div className='flex flex-col' data-testid='value'>
        <div className='text-lg text-rose-300'>value:</div>
        {value.map((v, index) => (
          <span key={index}>{v.toDateString()}</span>
        ))}
      </div>
    </div>
  );
}
