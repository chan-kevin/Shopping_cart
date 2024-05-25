import { React, useEffect, useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

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
  const [tileCount, setTileCount] = useState(0);

  const handleMove = (rowIndex, colIndex) => {
    if (!gameOver && tileCount < 9) {
      if (board[rowIndex][colIndex].length === 0) {
        setCurrentPlayer(nextPlayer);
        setNextPlayer(currentPlayer);
        setTileCount((prev) => prev + 1);

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
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
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
    setTileCount(0);
  };

  const handleGameFinished = () => {
    if (gameOver) {
      return (
        <>
          <h3>
            Player{" "}
            <span
              style={
                currentPlayer === "O" ? { color: "blue" } : { color: "red" }
              }
            >
              {nextPlayer}
            </span>{" "}
            wins
          </h3>
          <button onClick={handleReset} className="restart-btn">
            Restart
          </button>
        </>
      );
    } else if (tileCount === 9) {
      return (
        <>
          <h3>Draw</h3>
          <button onClick={handleReset} className="restart-btn">
            Restart
          </button>
        </>
      );
    }
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="stats">
        {gameOver || tileCount === 9 ? (
          handleGameFinished()
        ) : (
          <h3>
            CurrentPlayer:{" "}
            <span
              style={
                currentPlayer === "X" ? { color: "blue" } : { color: "red" }
              }
            >
              {currentPlayer}
            </span>
          </h3>
        )}
      </div>
      <Board board={board} handleMove={handleMove} />
    </>
  );
};

export default Game;
