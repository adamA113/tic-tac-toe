import { useEffect, useState } from "react";
import './App.css';

function App() {
  console.log("start");
  const [resultX, setResultX] = useState(0);
  const [resultO, setResultO] = useState(0);

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
    const X = 'x';
    const CIRCLE = 'circle';
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const winningMessageElement = document.getElementById('winningMessage');
    const restartButton = document.getElementById('restart-btn');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    let circleTurn;

    startGame();
    restartButton.addEventListener('click', startGame);

    function startGame() {
      circleTurn = false;
      cellElements.forEach(cell => {
        cell.classList.remove(X);
        cell.classList.remove(CIRCLE);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
      })
      setBoardHover();
      winningMessageElement.classList.remove('show');
    }

    function handleClick(e) {
      // console.log("clicked");
      const cell = e.target;
      const currentClass = circleTurn ? CIRCLE : X;
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        swapTurns();
        setBoardHover();
      }
    }

    function placeMark(cell, currentClass) {
      cell.classList.add(currentClass);
    }

    function swapTurns() {
      circleTurn = !circleTurn;
    }

    function setBoardHover() {
      board.classList.remove(X);
      board.classList.remove(CIRCLE);
      if (circleTurn) {
        board.classList.add(CIRCLE);
      } else {
        board.classList.add(X);
      }
    }

    function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentClass);
        })
      })
    }
    function isDraw() {
      return [...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(CIRCLE);
      })
    }
    function endGame(draw) {
      if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
      } else {
        winningMessageTextElement.innerText = `${circleTurn ? "The O's" : "The X's"} Wins!`
        circleTurn ? setResultO(x => x + 1) : setResultX(x => x + 1);
      }
      winningMessageElement.classList.add('show')
    }
  },[]);

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
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
        <div className="o-result"> O's result is: <span>{resultO}</span></div>
        <button id="reset" onClick={() => { setResultO(x => x = 0); setResultX(x => x = 0) }}>Reset</button>
        <div className="x-result">X's result is: <span>{resultX}</span></div>
      </div>

      <div className="winning-message" id="winningMessage">
        <div data-winning-message-text></div>
        <button id="restart-btn" >Restart</button>
      </div>
    </div>
  );
}

export default App;
