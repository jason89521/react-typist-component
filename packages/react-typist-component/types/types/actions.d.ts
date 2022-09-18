import type { ReactElement } from 'react';
export declare type TypeTokenAction = {
    type: 'TYPE_TOKEN';
    payload: string | ReactElement;
};
export declare type BackspaceAction = {
    type: 'BACKSPACE';
    payload: number;
};
export declare type DelayAction = {
    type: 'DELAY';
    payload: number;
};
export declare type PasteAction = {
    type: 'PASTE';
    payload: string | ReactElement;
};
export declare type Action = TypeTokenAction | BackspaceAction | DelayAction | PasteAction;
//# sourceMappingURL=actions.d.ts.map