import React, { useState } from 'react';

import Typist from '../../src';
import Section from './Section';

export default function PauseExample() {
  const [isPause, setIsPause] = useState(false);

  console.log(isPause);

  return (
    <Section title='Support Pausing'>
      <div className='mb-2 flex'>
        <label htmlFor='pause' className='mr-2'>
          pause
        </label>
        <input
          id='pause'
          type='checkbox'
          checked={isPause}
          onChange={(e) => setIsPause(e.currentTarget.checked)}
        />
      </div>
      <Typist loop pause={isPause}>
        The typing animation will be paused if you check the input.
      </Typist>
    </Section>
  );
}
