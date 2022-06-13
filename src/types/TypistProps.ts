export type TypedChildren = (string | React.ReactElement)[] | null | undefined;
export type TypedLines = (string | React.ReactElement | null)[];

export type CoreProps = {
  /** Contents that will be animated as a typewriter. */
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  loop?: boolean;
  /** Pause the current typing animation. */
  pause?: boolean;
  /** Called whenever the typing animation has been finished.*/
  onTypingDone?: () => void;
  /** Used to split a string. */
  splitter?: (str: string) => string[];
};

export type TypistProps = CoreProps & {
  /** Will be inserted after the last character. */
  cursor?: string | React.ReactElement;
  /** Whenever this value changes, recreate a TypistCore instance to restart the typing animation. */
  restartKey?: any;
  /** Stop the typing animation and show the final result if this property is `true` */
  disable?: boolean;
};
