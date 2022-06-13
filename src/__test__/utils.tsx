import React from 'react';
import Typist, { TypistProps } from '..';

export { Typist };

export const nestedChildren = (
  <div className="first">
    first
    <div className="second">second</div>
  </div>
);

/** Set delay to zero to reduce testing time */
export const TestTypist = ({
  children,
  typingDelay = 0,
  typingNoise = 0,
  ...rest
}: TypistProps) => {
  return (
    <Typist typingDelay={typingDelay} typingNoise={typingNoise} {...rest}>
      {children}
    </Typist>
  );
};
