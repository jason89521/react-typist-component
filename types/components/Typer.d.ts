import React from 'react';
declare type Props = {
    children: React.ReactNode;
    typingInterval?: number;
    backspaceInterval?: number;
    loop?: boolean;
};
declare const Typer: {
    ({ children, typingInterval, backspaceInterval, loop }: Props): JSX.Element;
    Backspace: (props: {
        amount: number;
    }) => null;
    Pause: (props: {
        duration: number;
    }) => null;
};
export default Typer;
