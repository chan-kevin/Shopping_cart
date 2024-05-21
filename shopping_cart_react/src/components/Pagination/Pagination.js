import React, { Component } from "react";
import "./Pagination.css";

export default class Pagination extends Component {
  render() {
    const { currentPage, totalPageNum, handleDisplayPage } = this.props;
    const pageButtons = [];

    for (let i = 0; i < totalPageNum; i++) {
      pageButtons.push(
        <button
          className="pagination__page-num"
          id={`page-${i}`}
          key={`page-${i}`}
          onClick={() => handleDisplayPage(i)}
          style={
            currentPage === i
              ? { color: "black", textDecoration: "none", fontWeight: "bold" }
              : {
                  color: "rgb(0, 153, 255)",
                  textDecoration: "underline",
                  fontWeight: "normal",
                }
          }
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination__prev-btn"
          onClick={() => handleDisplayPage(currentPage - 1)}
        >
          Prev
        </button>
        <div className="pagination__pages">{pageButtons}</div>
        <button
          className="pagination__next-btn"
          onClick={() => handleDisplayPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
}
