export interface DateCellInfo {
  key: string;
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  isToday: boolean;
  isSelected: boolean;
  monthStatus: 'current' | 'next' | 'previous';
}

export type SetSelectedDate = (
  date: DateUnit,
  options?: { shouldChangePanel?: boolean }
) => void;

export interface DateUnit {
  year: number;
  month: number;
  dayOfMonth: number;
}
