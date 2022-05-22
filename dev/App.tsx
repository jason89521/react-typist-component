import React, { useState } from 'react';
import './App.css';
import Typer from '../src';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <br />
      <br />
      <Typer typingInterval={100} cursor={<span className="cursor">|</span>}>
        This is a typo
        <Typer.Backspace count={4} />
        react component
        <Typer.Pause ms={1500} />
        <div>
          use
          <div>deeper div</div>
        </div>
      </Typer>
    </div>
  );
}

export default App;
