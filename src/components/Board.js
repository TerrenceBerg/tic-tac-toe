import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonal
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isStalemate = (squares) => {
    return squares.every(square => square !== null) && !calculateWinner(squares);
  };

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} key={i} />;
  };

  const createBoard = () => {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(renderSquare(i * 3 + j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="board-container">
      {(winner || isStalemate(squares)) && (
        <div className={`game-message ${isStalemate(squares) ? 'stalemate' : 'winner'}`}>
          {winner ? (
            <>
              {winner === 'X' ? 'FIRE' : 'ICE'} WINS!<br/>
              GAME OVER
            </>
          ) : (
            <>
              STALEMATE<br/>
              NO WINNER
            </>
          )}
          <button className="reset-button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        </div>
      )}
      <div className="board">{createBoard()}</div>
    </div>
  );
};

export default Board;
