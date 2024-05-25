import { React } from "react";
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
              style={tile === "X" ? { color: "blue" } : { color: "red" }}
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
