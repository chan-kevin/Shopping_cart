import React, { Component } from "react";
import "./Inventory.css";

export default class Inventory extends Component {
  render() {
    const pageButtons = [];

    for (let i = 0; i < this.props.totalPageNum; i++) {
      pageButtons.push(
        <button
          className="pagination__page-num"
          id={`page-${i}`}
          key={`page-${i}`}
          onClick={() => this.props.handleDisplayPage(i)}
        >
          {i + 1}
        </button>
      );
    }
    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul className="inventory">
          {this.props.inventory.map((item) => {
            return (
              <li
                id={`inventory-${item.id}`}
                className="item inventory__item"
                key={item.id}
              >
                <span className="inventory__item-name">{item.content}</span>
                <button
                  className="inventory__subtract cart__btn"
                  onClick={() => this.props.handleAmount(item, "subtract")}
                >
                  -
                </button>
                <span className="inventory__item-amount">{item.amount}</span>
                <button
                  className="inventory__plus cart__btn"
                  onClick={() => this.props.handleAmount(item, "increment")}
                >
                  +
                </button>
                <button
                  className="inventory__add-btn cart__btn"
                  onClick={() => this.props.handleAddToCart(item)}
                >
                  add to cart
                </button>
              </li>
            );
          })}
        </ul>
        <div className="pagination">
          <button
            className="pagination__prev-btn"
            onClick={() =>
              this.props.handleDisplayPage(this.props.currentPage - 1)
            }
          >
            Prev
          </button>
          <div className="pagination__pages">{pageButtons}</div>
          <button
            className="pagination__next-btn"
            onClick={() =>
              this.props.handleDisplayPage(this.props.currentPage + 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
