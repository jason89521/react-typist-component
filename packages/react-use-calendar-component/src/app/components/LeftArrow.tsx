export default function LeftArrow({
  arrowAmount = 1,
  onClick,
}: {
  arrowAmount?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className='w-10 h-10 flex justify-center items-center'>
      {[...Array(arrowAmount)].map((_, index) => (
        <div
          key={index}
          className='w-2 h-2 border-t-2 border-l-2 border-black -rotate-45'
        />
      ))}
    </button>
  );
}
