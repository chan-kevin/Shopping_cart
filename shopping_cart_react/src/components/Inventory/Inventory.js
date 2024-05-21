import React, { Component } from "react";
import "./Inventory.css";
import Pagination from "../Pagination/Pagination";

export default class Inventory extends Component {
  render() {
    const {
      handleDisplayPage,
      handleAmount,
      handleAddToCart,
      currentPage,
      totalPageNum,
      inventory,
    } = this.props;

    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul className="inventory">
          {inventory.map((item) => {
            return (
              <li
                id={`inventory-${item.id}`}
                className="item inventory__item"
                key={item.id}
              >
                <span className="inventory__item-name">{item.content}</span>
                <button
                  className="inventory__subtract cart__btn"
                  onClick={() => handleAmount(item, "subtract")}
                >
                  -
                </button>
                <span className="inventory__item-amount">{item.amount}</span>
                <button
                  className="inventory__plus cart__btn"
                  onClick={() => handleAmount(item, "increment")}
                >
                  +
                </button>
                <button
                  className="inventory__add-btn cart__btn"
                  onClick={() => handleAddToCart(item)}
                >
                  add to cart
                </button>
              </li>
            );
          })}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPageNum={totalPageNum}
          handleDisplayPage={handleDisplayPage}
        />
      </div>
    );
  }
}
