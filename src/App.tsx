import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Typer from './components/Typer';

const arr = ['abc', 'def'];

function App() {
  return (
    <div className="App">
      <Typer>
        Text 1
        <br />
        Text 2
        <br />
        <div>Text wrapeed within div</div>
        {arr}
      </Typer>
    </div>
  );
}

export default App;
