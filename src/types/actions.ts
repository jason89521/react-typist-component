export type TypeStringAction = {
  type: 'TYPE_STRING';
  payload: string;
};
export type Backspace = { type: 'BACKSPACE'; payload: number };
export type Action = TypeStringAction | Backspace;
