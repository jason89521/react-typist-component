import React, { useState } from 'react';
import Typist from '..';

export const textsArray = [
  ['a'],
  ['ab'],
  ['ab', 'c'],
  ['ab', 'cd'],
  ['ab', 'c'],
  ['ab'],
  ['ab', 'e'],
  ['ab', 'ef'],
  ['ab', 'ef', 'gh'],
];

export const nestedChildren = (
  <div className='ab'>
    ab
    <div className='cd'>cd</div>
    <Typist.Backspace count={2} />
    <div className='ef'>ef</div>
    <Typist.Paste>
      <span>gh</span>
    </Typist.Paste>
  </div>
);

export const WRAPPER_ID = 'wrapper';
export const BUTTON_ID = 'button';

export const PauseTest = () => {
  const [pause, setPause] = useState(false);

  return (
    <>
      <Typist pause={pause}>ab</Typist>
      <button data-testid={BUTTON_ID} onClick={() => setPause(!pause)} />
    </>
  );
};
