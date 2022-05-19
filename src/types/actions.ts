export type TypeStringAction = {
  type: 'TYPE_STRING';
  payload: string;
};
export type DeleteAllAction = { type: 'DELETE_ALL' };
export type Action = TypeStringAction | DeleteAllAction;
