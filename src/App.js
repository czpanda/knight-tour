import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { generateBoard, updateBoard, generateRandomCoordinates } from "./functions/board";

class App extends Component {
  render() {
    const height = 10;
    const width = 10;

    let board = generateBoard(width, height);

    const c = generateRandomCoordinates(10, 10);
    console.log(updateBoard(board, c.x, c.y));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
