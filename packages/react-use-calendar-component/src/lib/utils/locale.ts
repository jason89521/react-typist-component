export function getWeekDayList() {
  const list: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(1970, 1, 1 + i);
    list.push(date.toLocaleString(navigator.language, { weekday: 'short' }));
  }

  return list;
}

export function getMonthList() {
  const list: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(1970, 0 + i, 1);
    list.push(date.toLocaleString(navigator.language, { month: 'short' }));
  }

  return list;
}
