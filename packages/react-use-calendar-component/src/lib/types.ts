export interface DateCellInfo {
  key: string;
  year: number;
  month: number;
  dayOfMonth: number;
  dayOfWeek: number;
  isToday: boolean;
  isSelected: boolean;
  monthStatus: 'current' | 'next' | 'previous';
  selectThisDate: (options?: SelectDateOptions) => void;
}

export interface SelectDateOptions {
  changeDisplayedValues?: boolean;
}

export type SelectDate = (date: DateUnit, options?: SelectDateOptions) => void;

export type ChangeDisplayedValue = (
  value: number,
  options?: { override?: boolean }
) => void;

export interface DateUnit {
  year: number;
  month: number;
  dayOfMonth: number;
}
