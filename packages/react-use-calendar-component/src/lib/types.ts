// useCalendarComponent
export type SelectType = 'single' | 'multiple';

export type Value<S extends SelectType> = S extends 'single'
  ? Date
  : S extends 'multiple'
  ? Date[]
  : never;

export type UseCalendarOptions<S extends SelectType = 'single'> = {
  initialDisplayedDate?: Date;
  selectType?: S;
  value?: Value<S>;
  onChange?: (value: Value<S>) => void;
};

export interface DateInfo {
  year: number;
  month: number;
  monthDay: number;
  weekDay: number;
  isToday: boolean;
  monthStatus: 'current' | 'next' | 'previous';
}

export interface DateCellInfo extends DateInfo {
  key: string;
  isSelected: boolean;
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
