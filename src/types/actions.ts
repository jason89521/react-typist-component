export type TypeStringAction = {
  type: 'TYPE_STRING';
  payload: string;
};
export type BackspaceAction = { type: 'BACKSPACE'; payload: number };
export type Action = TypeStringAction | BackspaceAction;
