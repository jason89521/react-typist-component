import type { DelayGenerator, Splitter } from '../types/functions';

const emptyFunc = () => {
  return;
};

const defaultSplitter: Splitter = str => str.split('');

const defaultDelayGenerator: DelayGenerator = (delay, noise) => {
  const coefficient = Math.random() * 2 - 1; // -1 to <1
  return delay + coefficient * noise;
};

export { emptyFunc, defaultSplitter, defaultDelayGenerator };
