import React from 'react';
import Typist from '../src';

export const nestedChildren = (
  <div className="first">
    first
    <div className="second">second</div>
    <Typist.Backspace count={6} />
    <div className="third">third</div>
  </div>
);
