import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Typer from './components/Typer';

const arr = ['abc', 'def'];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <br />
      <br />
      <Typer>
        Text 1
        <br />
        <div>
          Text wrapped within div
          <div>deeper div</div>
        </div>
        {arr}
        <Typer.Backspace amount={6} />
        <div>After backspace</div>
      </Typer>
    </div>
  );
}

export default App;
