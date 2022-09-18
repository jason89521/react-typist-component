/// <reference types="react" />
declare const Typist: (({ cursor, disabled, restartKey, children, splitter, typingDelay, backspaceDelay, onTypingDone, startDelay, finishDelay, loop, pause, }: import("..").TypistProps) => JSX.Element) & {
    Delay: (props: {
        ms: number;
    }) => null;
    Backspace: (props: {
        count: number;
    }) => null;
    Paste: ({ children }: {
        children: import("react").ReactNode;
    }) => JSX.Element;
};
export default Typist;
//# sourceMappingURL=Typist.d.ts.map