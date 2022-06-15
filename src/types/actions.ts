import React from 'react';

export type TypeStringAction = {
  type: 'TYPE_STRING';
  payload: string;
};
export type BackspaceAction = { type: 'BACKSPACE'; payload: number };
export type PauseAction = { type: 'PAUSE'; payload: number };
export type PasteAction = { type: 'PASTE'; payload: string | React.ReactElement };
export type TypeElementAction = { type: 'TYPE_ELEMENT'; payload: React.ReactElement };
export type Action =
  | TypeStringAction
  | BackspaceAction
  | PauseAction
  | PasteAction
  | TypeElementAction;
