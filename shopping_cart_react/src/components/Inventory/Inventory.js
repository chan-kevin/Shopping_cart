import React, { Component } from "react";

export default class Inventory extends Component {
  render() {
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
          <button className="pagination__prev-btn">Prev</button>
          <div className="pagination__pages"></div>
          <button className="pagination__next-btn">Next</button>
        </div>
      </div>
    );
  }
}
