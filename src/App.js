import React, { Component } from 'react';
import './App.css';

import { generateBoard, updateBoard } from "./functions/board";
import { findPath } from "./functions/knight";
import { currentField, visitedField } from "./functions/field";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paths: [],
      loaded: false,
      board: [],
      solution: 0,
      timeout: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // Create and empty 5x5 board
      const initialBoard = generateBoard(5, 5);

      // Place knight to the middle of the board
      const startingBoard = updateBoard(initialBoard, 0, 0, currentField);

      const possiblePaths = findPath(startingBoard);

      this.setState({
        paths: possiblePaths,
        board: startingBoard,
        loaded: true,
        startingBoard,
      });
    }, 0);
  }

  componentWillUnmount() {
    const { timeout } = this.state;

    clearTimeout(timeout);
  }

  startAnimation(pathIndex) {
    const {
      paths,
    } = this.state;

    this.restartAnimation();
    
    const recursion = (index = 0) => {
      const coordinates = paths[pathIndex][index];
      
      const timeout = setTimeout(() => {
        this.updateBoard(coordinates);
        if (paths[pathIndex].length -1 !== index) recursion(index + 1);
      }, 1000);

      this.setState({
        timeout,
      });
    };
    
    recursion();
  }

  restartAnimation() {
    this.stopAnimation();

    this.setState(state => {
      return {
        board: state.startingBoard,
      }
    });
  }

  stopAnimation() {
    const { timeout } = this.state;

    clearTimeout(timeout);

    this.setState(state => {
      return {
        timeout: null,
      }
    });
  }

  updateBoard(coordinates) {
    this.setState(state => {
      return {
        board: updateBoard(state.board, coordinates.x, coordinates.y, visitedField),
      }
    })
  }

  changeSolution(amount) {
    this.restartAnimation();

    this.setState(state => {
      const updatedSolution = state.solution + amount;

      if (updatedSolution < 0) {
        return {
          solution: state.paths.length - 1,
        }
      }

      if (updatedSolution > state.paths.length - 1) {
        return {
          solution: 0,
        }
      }

      return {
        solution: state.solution + amount,
      }
    })
  }

  render() {
    const {
      board,
      loaded,
      solution,
      paths,
    } = this.state;

    console.log(loaded);

    return (
      <div className="app">
        {loaded ?
          <div className="container">
            <p className="solution-text">Solution {solution + 1}/{paths.length}</p>
            <div className="board-container">
              <i
                className="material-icons lg"
                onClick={() => this.changeSolution(-1)}
              >keyboard_arrow_left</i>
              <div>
                {board.map(columns => {
                  return (
                    <div className="board-column">
                      {columns.map(field => {
                        const background = field.visited ? '#1976D2' : '#E64A19';

                        return (
                          <span className="field" style={{ background }}/>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              <i
                className="material-icons lg"
                onClick={() => this.changeSolution(1)}
              >keyboard_arrow_right</i>
            </div>
            <div className="controls">
              <i
                className="material-icons md"
                onClick={() => this.startAnimation(solution)}
              >play_arrow</i>
              <i
                className="material-icons md"
                onClick={() => this.stopAnimation()}
              >stop</i>
              <i
                className="material-icons md"
                onClick={() => this.restartAnimation()}
              >repeat</i>
            </div>
          </div>
          :
          <div className="spinner" />
        }
      </div>
    );
  }
}

export default App;
