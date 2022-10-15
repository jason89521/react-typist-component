import type { Value, SelectType } from '../types';

export function normalizeValue<S extends SelectType>(
  selectType?: S,
  value?: Value<S>
): Date[] {
  if (!value) return [];
  if (selectType === 'multiple') {
    return value as Value<'multiple'>;
  }

  return [value as Value<'single'>];
}
