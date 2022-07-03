export type TypedChildren = (string | React.ReactElement)[] | null | undefined;
export type TypedLines = (string | React.ReactElement | null)[];
export type Splitter = (str: string) => string[];

export type TypistProps = {
  children: React.ReactNode;
  typingDelay?: number;
  backspaceDelay?: number;
  loop?: boolean;
  pause?: boolean;
  startDelay?: number;
  finishDelay?: number;
  onTypingDone?: () => void;
  splitter?: Splitter;
  cursor?: string | React.ReactElement;
  disabled?: boolean;
  restartKey?: any;
};
