import React, { Component } from 'react';
import './App.css';
import Game from './Game';

export default class App extends Component {

  render(){  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Copy Cat</h1>
        <Game />
      </header>
    </div>
  );
}
}