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
        <div className="green">
          <Typer.Pause duration={0} />
          green
          <div>deeper</div>
        </div>
        <div>haha</div>
        <Typer.Backspace amount={20} />
      </Typer>
    </div>
  );
}

export default App;
