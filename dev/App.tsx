import React, { useState } from 'react';
import './App.css';
import Typist from '../src';
import Header from './components/Header';
import Section from './components/Section';
import PauseExample from './components/PauseExample';

function App() {
  const [count, setCount] = useState(0);
  const [key, setKey] = useState(1);

  return (
    <div className='min-h-screen bg-slate-600 px-12 py-10 text-white'>
      <Header />
      <Section title='Support Looping'>
        <Typist loop>
          The typing animation will be restarted automatically...
        </Typist>
      </Section>
      <PauseExample />
      <button onClick={() => setKey(key + 1)}>key</button>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <Typist
        typingDelay={100}
        disabled={count % 2 === 0}
        cursor={<span className='cursor'>|</span>}
        restartKey={key}
      >
        This is a typo
        <br />
        <Typist.Backspace count={5} />
        <Typist.Delay ms={1500} />
        react component
        <Typist.Paste>
          <div>
            use
            <div>deeper div</div>
          </div>
        </Typist.Paste>
        <Typist.Delay ms={1500} />
      </Typist>
    </div>
  );
}

export default App;
