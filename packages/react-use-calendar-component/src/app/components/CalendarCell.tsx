interface Props {
  className: string;
  onClick: () => void;
  dayOfMonth: number;
}

export default function CalendarCell({
  className,
  onClick,
  dayOfMonth,
}: Props) {
  return (
    <button className={className} onClick={onClick}>
      <div className='flex items-center justify-center'>
        <span>{dayOfMonth}</span>
      </div>
    </button>
  );
}
