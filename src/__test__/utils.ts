import type { waitForOptions } from '@testing-library/react';
import { waitFor as originWaitFor } from '@testing-library/react';

export function waitFor<T>(callback: () => Promise<T> | T, options?: waitForOptions) {
  return originWaitFor(callback, { interval: 0, ...options });
}
