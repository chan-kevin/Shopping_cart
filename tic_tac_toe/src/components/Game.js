import { React, useEffect, useState } from "react";
import Board from "./Board/Board";

const Game = () => {
  const row = 3;
  const col = 3;
  const createBoard = Array(row)
    .fill()
    .map(() => Array(col).fill(""));

  const [board, setBoard] = useState(createBoard);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <h3>CurrentPlayer:</h3>
      <Board board={board} />
    </>
  );
};

export default Game;
