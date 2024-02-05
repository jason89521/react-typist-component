import type { ReactElement } from 'react';

export type TypeTokenAction = {
  type: 'TYPE_TOKEN';
  payload: string | ReactElement;
};
export type BackspaceAction = { type: 'BACKSPACE'; payload: number };
export type DelayAction = { type: 'DELAY'; payload: number };
export type PasteAction = { type: 'PASTE'; payload: string | ReactElement };
export type Action = TypeTokenAction | BackspaceAction | DelayAction | PasteAction;
