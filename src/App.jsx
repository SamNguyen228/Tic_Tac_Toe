import React, { useState } from 'react';
import './App.css';

const BOARD_SIZE = 20;

function Square({ value, onClick, isHighlighted }) {
  const className = `square ${value} ${isHighlighted ? 'highlight' : ''}`;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [highlight, setHighlight] = useState(null);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setHighlight([row, col]);
    if (checkWinner(newBoard, row, col)) {
      setWinner(newBoard[row][col]);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const checkWinner = (board, row, col) => {
    const player = board[row][col];
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      for (let dir = -1; dir <= 1; dir += 2) {
        let x = row + dx * dir;
        let y = col + dy * dir;

        while (
          x >= 0 && x < BOARD_SIZE &&
          y >= 0 && y < BOARD_SIZE &&
          board[x][y] === player
        ) {
          count++;
          x += dx * dir;
          y += dy * dir;
        }
      }

      if (count >= 5) return true;
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>Caro Game</h1>
      <button className="reset-button" onClick={resetGame} style={{ margin: '10px', padding: '8px 16px' }}>
        🔁 Reset Game
      </button>
      {winner ? (
        <h2>🎉 Winner: {winner}</h2>
      ) : (
        <h2>Next: {xIsNext ? 'X' : 'O'}</h2>
      )}

      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="board-row">
            {row.map((cell, cIdx) => (
              <Square
                key={cIdx}
                value={cell}
                onClick={() => handleClick(rIdx, cIdx)}
                isHighlighted={highlight?.[0] === rIdx && highlight?.[1] === cIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
