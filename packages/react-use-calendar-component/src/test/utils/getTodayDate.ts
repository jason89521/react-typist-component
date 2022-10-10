export function getTodayDate() {
  const dateInstance = new Date();
  return {
    year: dateInstance.getFullYear(),
    month: dateInstance.getMonth(),
    dayOfMonth: dateInstance.getDate(),
    dateInstance,
  };
}
