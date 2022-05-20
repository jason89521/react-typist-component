export declare type TypeStringAction = {
    type: 'TYPE_STRING';
    payload: string;
};
export declare type BackspaceAction = {
    type: 'BACKSPACE';
    payload: number;
};
export declare type PauseAction = {
    type: 'PAUSE';
    payload: number;
};
export declare type Action = TypeStringAction | BackspaceAction | PauseAction;
