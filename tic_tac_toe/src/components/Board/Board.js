import { React, useState, useEffect } from "react";
import "./Board.css";

const Board = ({ board, handleMove }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          return (
            <div
              className="tile"
              key={rowIndex.toString() + colIndex.toString()}
              onClick={() => handleMove(rowIndex, colIndex)}
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
