export type TypeStringAction = {
  type: 'TYPE_STRING';
  payload: string;
};
export type BackspaceAction = { type: 'BACKSPACE'; payload: number };
export type PauseAction = { type: 'PAUSE'; payload: number };
export type PasteAction = { type: 'PASTE'; payload: string };
export type Action = TypeStringAction | BackspaceAction | PauseAction | PasteAction;
