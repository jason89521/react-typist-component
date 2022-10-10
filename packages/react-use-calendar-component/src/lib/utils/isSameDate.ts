export function isSameDate(a: Date, b: Date) {
  if (a.getFullYear() !== b.getFullYear()) return false;
  if (a.getMonth() !== b.getMonth()) return false;
  if (a.getDate() !== b.getDate()) return false;
  return true;
}
