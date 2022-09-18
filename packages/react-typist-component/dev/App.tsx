import React from 'react';
import Typist from '../src';
import Header from './components/Header';
import Section from './components/Section';
import PauseExample from './components/PauseExample';

function App() {
  return (
    <div className='min-h-screen bg-slate-600 px-12 py-10 text-white'>
      <Header />
      <Section title='Support Looping'>
        <Typist loop>
          The typing animation will be restarted automatically...
        </Typist>
      </Section>
      <PauseExample />
      <Section title='Support Delay, Backspacing and Pasting'>
        <Typist>
          The typing animation can be delayed adn bac
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={6} />
          nd backspaced
          <br />
          Furthermore,
          <Typist.Paste> the text can be pasted directly!</Typist.Paste>
        </Typist>
      </Section>
    </div>
  );
}

export default App;
