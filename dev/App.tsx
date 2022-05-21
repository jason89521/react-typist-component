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
        <div className="green">
          green background
          <div>deeper</div>
        </div>
        <div>haha</div>
        <Typer.Backspace amount={10} />
      </Typer>
    </div>
  );
}

export default App;
