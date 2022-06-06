import React, { useState } from 'react';
import './App.css';
import Typist from '../src';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <br />
      <br />
      <Typist typingInterval={100} cursor={<span className="cursor">|</span>}>
        This is a typo
        <Typist.Backspace count={4} />
        <Typist.Pause ms={1500} />
        <Typist.Paste>react component</Typist.Paste>
        <div>
          use
          <div>deeper div</div>
        </div>
      </Typist>
    </div>
  );
}

export default App;
