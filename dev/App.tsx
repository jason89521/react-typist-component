import React, { useState } from 'react';
import './App.css';
import Typer from '../src';

const arr = [<Typer.Pause duration={500} />, 'typo', <Typer.Backspace amount={4} />, 'component'];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <br />
      <br />
      <Typer>{arr}</Typer>
    </div>
  );
}

export default App;
