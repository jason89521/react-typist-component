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
      <Typer loop>
        qwertyuiopasdfghjklmnbvcxz qwertyuiopasdfghjklmnbvcxz
        <Typer.Backspace amount={53} />
        {/* <div>After backspace</div> */}
      </Typer>
    </div>
  );
}

export default App;
