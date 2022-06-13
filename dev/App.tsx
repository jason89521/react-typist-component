import React, { useState } from 'react';
import './App.css';
import Typist from '../src';

const PureChildren = () => {
  return (
    <div className="first">
      first
      <div className="second">second</div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <Typist
        typingDelay={100}
        disable={count % 2 === 0}
        cursor={<span className="cursor">|</span>}
      >
        This is a typo
        <br />
        <PureChildren />
        <Typist.Backspace count={5} />
        <Typist.Pause ms={1500} />
        react component
        <Typist.Paste>
          <div>
            use
            <div>deeper div</div>
          </div>
        </Typist.Paste>
        <Typist.Pause ms={1500} />
      </Typist>
    </div>
  );
}

export default App;
