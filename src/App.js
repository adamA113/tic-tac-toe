// import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [resultX, setResultX] = useState(0);
  const [resultO, setResultO] = useState(0);


  // useEffect(() =>{
  //   const reset = () => {
  //     console.log("kkkk")
  //     setResultO(0);
  //     setResultX(0)
  //   }
  // },[])

  useEffect(() => {
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
    restartButton.addEventListener('click', startGame)

    function startGame() {
      circleTurn = false
      cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
      })
      setBoardHoverClass()
      winningMessageElement.classList.remove('show')
    }

    function handleClick(e) {
      console.log("clicked")
      const cell = e.target
      const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
      placeMark(cell, currentClass)
      if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        swapTurns()
        setBoardHoverClass()
      }
    }
    function endGame(draw) {
      if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
      } else {
        winningMessageTextElement.innerText = `${circleTurn ? "The O's" : "The X's"} Wins!`
        circleTurn ? setResultO(resultO + 1) : setResultX(resultX + 1);
      }
      winningMessageElement.classList.add('show')
    }

    function isDraw() {
      return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
      })
    }

    function placeMark(cell, currentClass) {
      cell.classList.add(currentClass)
    }

    function swapTurns() {
      circleTurn = !circleTurn
    }

    function setBoardHoverClass() {
      board.classList.remove(X_CLASS)
      board.classList.remove(CIRCLE_CLASS)
      if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
      } else {
        board.classList.add(X_CLASS)
      }
    }

    function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentClass)
        })
      })
    }

  }, []);


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

      <div className="results" id="results">
        <div className="O-result"> O's result is: {resultO}</div>
        <div className="x-result">X's result is: {resultX}</div>
        <button id="reset" >Reset</button>
      </div>

      <div className="winning-message" id="winningMessage">
        <div data-winning-message-text></div>
        <button id="restartButton" >Restart</button>
      </div>
    </div>
  );
}

export default App;
