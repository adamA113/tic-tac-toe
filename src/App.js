// import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {

  // useEffect(() => {
  // });
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const X_CLASS = 'x'
  const CIRCLE_CLASS = 'circle'
  const cellElements = document.querySelectorAll('[data-cell]')
  const board = document.getElementById('board')
  const winningMessageElement = document.getElementById('winningMessage')
  const restartButton = document.getElementById('restartButton')
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
  let circleTurn

  startGame()

  function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      // cell.classList.remove(X_CLASS)
      // cell.classList.remove(CIRCLE_CLASS)
      // cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    // setBoardHoverClass()
  }

  function handleClick(e) {
    console.log("clicked")
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    // if (checkWin(currentClass)) {
    //   endGame(false)
    // } else if (isDraw()) {
    //   endGame(true)
    // } else {
    //   swapTurns()
    //   setBoardHoverClass()
    // }
    // swapTurns()
    // setBoardHoverClass()
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }

  // function swapTurns() {
  //   circleTurn = !circleTurn
  // }

  // function setBoardHoverClass() {
  //   board.classList.remove(X_CLASS)
  //   board.classList.remove(CIRCLE_CLASS)
  //   if (circleTurn) {
  //     board.classList.add(CIRCLE_CLASS)
  //   } else {
  //     board.classList.add(X_CLASS)
  //   }
  // }


  return (
    <div className="App">
      <div className="board" id="board">
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
      </div>
    </div>
  );
}

export default App;
