import React, { useState } from 'react';

import getLines from '../utils/getLines';
import getTypedChildren from '../utils/getTypedChildren';

type Props = {
  children: React.ReactNode;
};

const Typer = ({ children }: Props) => {
  const [lines, setLines] = useState<string[]>(() => getLines(children));
  const typedChildren = getTypedChildren(children, lines);
  console.log(typedChildren);
  return <div>{typedChildren}</div>;
};

export default Typer;
