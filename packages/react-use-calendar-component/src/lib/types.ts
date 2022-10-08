// useCalendarComponent
export interface SingleOptions {
  defaultSelectedDate?: Date;
  type: 'single';
}

export interface MultipleOptions {
  defaultSelectedDate?: Date[];
  type: 'multiple';
}

export interface RangeOptions {
  defaultRange?: [Date, Date];
  type: 'range';
}

export type ControlOptions = SingleOptions | MultipleOptions;
export type SelectedDate<C extends ControlOptions> = C extends SingleOptions
  ? SingleOptions['defaultSelectedDate']
  : C extends MultipleOptions
  ? MultipleOptions['defaultSelectedDate']
  : never;

export type UseCalendarOptions<C extends ControlOptions> = {
  displayedDate?: Date;
  controlOptions?: C;
};

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
