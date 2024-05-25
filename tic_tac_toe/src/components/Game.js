import { React, useEffect, useState } from "react";
import Board from "./Board/Board";

const Game = () => {
  const row = 3;
  const col = 3;
  const createBoard = Array(row)
    .fill()
    .map(() => Array(col).fill(""));

  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [nextPlayer, setNextPlayer] = useState("O");
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (rowIndex, colIndex) => {
    if (!gameOver) {
      if (board[rowIndex][colIndex].length === 0) {
        setCurrentPlayer(nextPlayer);
        setNextPlayer(currentPlayer);

        const newBoard = board.map((row) => [...row]);
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);

        if (checkWinning(rowIndex, colIndex)) setGameOver(true);
      } else {
        alert("please select another tile");
      }
    }
  };

  const checkWinning = (rowIndex, colIndex) => {
    const directions = [
      //vertical
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      //horizontal
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      //diagonal
      { dx: 1, dy: 1 },
      { dx: -1, dy: -1 },
    ];

    for (let { dx, dy } of directions) {
      if (checkWinningHelper(rowIndex, colIndex, dx, dy, 1)) return true;
    }

    return false;
  };

  const checkWinningHelper = (rowIndex, colIndex, dx, dy, count) => {
    if (count === 3) return true;

    const nextRowIndex = rowIndex + dx;
    const nextColIndex = colIndex + dy;

    const rowInbound = nextRowIndex >= 0 && nextRowIndex < 3;
    const colInbound = nextColIndex >= 0 && nextColIndex < 3;

    if (
      rowInbound &&
      colInbound &&
      board[nextRowIndex][nextColIndex] === currentPlayer
    ) {
      return checkWinningHelper(nextRowIndex, nextColIndex, dx, dy, count + 1);
    }

    return false;
  };

  const handleReset = () => {
    setBoard(createBoard);
    setGameOver(false);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {gameOver ? (
        <>
          <h3>Player {nextPlayer} wins</h3>
          <button onClick={handleReset}>Reset</button>
        </>
      ) : (
        <h3>CurrentPlayer: {currentPlayer}</h3>
      )}
      <Board board={board} handleMove={handleMove} />
    </>
  );
};

export default Game;
