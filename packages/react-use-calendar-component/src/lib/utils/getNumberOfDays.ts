const MAGIC_NUMBER = 40;

export function getNumberOfDays(year: number, month: number) {
  return MAGIC_NUMBER - new Date(year, month, MAGIC_NUMBER).getDate();
}
