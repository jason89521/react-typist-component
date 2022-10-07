export default function isToday(year: number, month: number, date: number) {
  const todayDate = new Date();

  return (
    todayDate.getFullYear() === year &&
    todayDate.getMonth() === month &&
    todayDate.getDate() === date
  );
}
