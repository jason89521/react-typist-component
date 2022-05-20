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
      <Typer>
        <div className="deeper">
          text
          <Typer.Backspace amount={4} />
        </div>
      </Typer>
    </div>
  );
}

export default App;
