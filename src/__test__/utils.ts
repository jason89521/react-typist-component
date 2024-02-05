import type {
  waitForOptions,
  Matcher,
  SelectorMatcherOptions,
} from '@testing-library/react';
import {
  waitFor as originWaitFor,
  findByText as originFindByText,
} from '@testing-library/react';

export function waitFor<T>(
  callback: () => Promise<T> | T,
  options?: waitForOptions
) {
  return originWaitFor(callback, { interval: 0, ...options });
}

export function findByText<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  id: Matcher,
  options?: SelectorMatcherOptions,
  waitForElementOptions?: waitForOptions
) {
  return originFindByText<T>(container, id, options, {
    interval: 0,
    ...waitForElementOptions,
  });
}
