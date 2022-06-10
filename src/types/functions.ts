export type Splitter = (str: string) => string[];
export type DelayGenerator = (delay: number, noise: number) => number;
export type PromiseExecutor = (
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void
) => void;
