import React from 'react';
import DeleteAll from '../components/DeleteAll';

type Element<T = unknown> = React.ReactElement<T, string | React.JSXElementConstructor<any>>;

export const isDeleteAll = (element: Element) => {
  return element.type === DeleteAll ? true : false;
};

export const isTyperElement = (element: Element) => {
  return isDeleteAll(element);
};
