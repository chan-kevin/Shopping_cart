import { React } from "react";
import "./Board.css";

const Board = ({ board, handleMove, gameOver }) => {
  const selected = (tile) => {
    return tile === "X" || tile === "O" || gameOver;
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          return (
            <div
              className={`tile ${selected(tile) ? "selected" : "non-selected"}`}
              key={rowIndex.toString() + colIndex.toString()}
              onClick={() => !selected(tile) && handleMove(rowIndex, colIndex)}
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
