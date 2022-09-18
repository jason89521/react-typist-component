/// <reference types="react" />
export declare type TypedChildren = (string | React.ReactElement)[] | null | undefined;
export declare type TypedLines = (string | React.ReactElement | null)[];
export declare type Delay = number | (() => number);
export declare type Splitter = (str: string) => string[];
export declare type TypistProps = {
    children: React.ReactNode;
    typingDelay?: Delay;
    backspaceDelay?: Delay;
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
//# sourceMappingURL=TypistProps.d.ts.map