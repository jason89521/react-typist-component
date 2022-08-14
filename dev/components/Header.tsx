import React from 'react';

import Typist from '../../src';
import randomDelayGenerator from '../utils/randomDelayGenerator';

export default function Header() {
  return (
    <div>
      <header className='text-xl text-cyan-400'>
        <h1 className='mb-4 text-4xl font-bold'>React Typist Component</h1>
        <Typist typingDelay={randomDelayGenerator}>
          Use this component to create{' '}
          <span className='text-red-500'>typewriter effect</span> easily!
        </Typist>
      </header>
    </div>
  );
}
