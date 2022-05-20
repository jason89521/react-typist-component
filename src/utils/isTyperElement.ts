import React from 'react';
import Backspace from '../components/Backspace';

type Element<T = unknown> = React.ReactElement<T, string | React.JSXElementConstructor<any>>;

export const isDeleteAll = (element: Element) => {
  return element.type === Backspace ? true : false;
};

export const isTyperElement = (element: Element) => {
  return isDeleteAll(element);
};
