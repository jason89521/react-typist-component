export function getLocaleMonth(date: Date) {
  return date.toLocaleString(navigator.language, { month: 'short' });
}
