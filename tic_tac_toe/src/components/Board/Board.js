import { React, useState, useEffect } from "react";
import "./Board.css";

const Board = ({ board }) => {
  // const row = 3;
  // const col = 3;
  // const newBoard = Array(row)
  //   .fill()
  //   .map(() => Array(col).fill(""));
  // const [board, setBoard] = useState(newBoard);

  // useEffect(() => {
  //   const row = 3;
  //   const col = 3;
  //   const newBoard = Array(row)
  //     .fill()
  //     .map(() => Array(col).fill(""));
  //   setBoard(newBoard);
  // }, []);

  return (
    <div className="board">
      {board?.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          return (
            <div
              className="tile"
              key={rowIndex.toString() + colIndex.toString()}
              id={rowIndex.toString() + colIndex.toString()}
            >
              {tile}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
