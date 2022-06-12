export type TypedChildren = (string | React.ReactElement)[] | null | undefined;
export type TypedLines = (string | React.ReactElement | null)[];

export type CoreProps = {
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  loop?: boolean;
  pause?: boolean;
  restartKey?: any;
  onTypingDone?: () => void;
  splitter?: (str: string) => string[];
};

export type TypistProps = CoreProps & {
  // props below are used by `Typist` only
  cursor?: string | React.ReactElement;
  /** Show the final result if this property is `true` */
  disable?: boolean;
};
