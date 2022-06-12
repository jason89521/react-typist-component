export type CoreProps = {
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  loop?: boolean;
  pause?: boolean;
  onTypingDone?: () => void;
  splitter?: (str: string) => string[];
};

export type TypistProps = CoreProps & {
  // props below are used by `Typist` only
  cursor?: string | React.ReactElement;
  disable?: boolean;
};
