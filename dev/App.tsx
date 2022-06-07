import React, { useState } from 'react';
import './App.css';
import Typist from '../src';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <Typist typingDelay={100} cursor={<span className="cursor">|</span>}>
        This is a typo
        <br />
        <Typist.Backspace count={5} />
        <Typist.Pause ms={1500} />
        react component
        <Typist.Paste>
          <div>
            use
            <div>deeper div</div>
          </div>
        </Typist.Paste>
      </Typist>
    </div>
  );
}

export default App;
