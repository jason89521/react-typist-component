# React Use Calendar Component

This project is aimed to provide an easy-to-use API interface for those people who want to build their own calendar component with custom style.

## Caveat

This package is still under development, the API interface may change frequently.

## Todo

- [x] Generate 42 date cell information
- [x] Change displayed year/month when selected date is change
- [x] Select multiple dates
- [ ] Select with range
- [ ] Support disabled date
- [ ] Support displaying two calendar
- [ ] Support week, month, year selection

## Examples

- [Single Mode](./src/app/components/Examples/Single.tsx)
- [Multiple Mode](./src/app/components/Examples/Multiple.tsx)

## Install

```sh
npm install react-use-calendar-component
```

## API Reference

```ts
import useCalendarComponent from 'react-use-calendar-component';

const {
  selectedDates,
  displayedYear,
  displayedMonth,
  changeDisplayedYear,
  changeDisplayedMonth,
  getDateCellInfos,
} = useCalendarComponent({ initialDisplayedDate, selectType, value, onChange });
```

### Args

#### `initialDisplayedDate`

This value will be used to generate the date cells at beginning. Its default value is `new Date()`.

#### `selectType`

The selection type of the calendar, currently support `'single' | 'multiple'`. Its default value is `'single'`.

> This option must be set if you don't want to use `single` type.

#### `value`

Set it up to get the full control of the calendar. For `'single'` selection type, the type of this value should be `Date`. For `'multiple'` selection type, the type of this value should be `Date[]`.

#### `onChange`

```ts
type OnChange: (value: Date|Date[]) => void
```

For `single` selection type, the `value` is a `Date` instance. For `multiple` selection type, the `value` is an array of `Date` instances.

### Returns

#### `selectedDates`

An array contains the `Date` instances of all selected date.

#### `displayedYear`

The year of the calendar which should be rendered.

#### `displayedMonth`

The month of the calendar which should be rendered.

#### `changeDisplayedYear`

Call this function to add a value to `displayedYear`.

#### `changeDisplayedMonth`

Call this function to add a value to `displayedMonth`.

#### `getDateCellInfos`

```ts
interface DateCellInfo {
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
```

This function returns an array of `DateCellInfo`. It can be used to render your calendar.
