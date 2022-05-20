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
      <Typer loop>
        qwertyuiopasdfghjklmnbvcxz
        <Typer.Pause duration={1500} />
        qwertyuiopasdfghjklmnbvcxz
        <Typer.Backspace amount={52} />
        {/* <div>After backspace</div> */}
      </Typer>
    </div>
  );
}

export default App;
