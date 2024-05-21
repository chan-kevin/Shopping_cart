import React, { Component } from "react";
import "./Cart.css";

export default class Cart extends Component {
  render() {
    const { cart, handleDelete, handleCheckout } = this.props;

    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul className="cart">
            {cart.map((item) => {
              return (
                <li
                  id={`cart-${item.id}`}
                  className="item cart__item"
                  key={item.id}
                >
                  <span className="cart__item-name">
                    {item.content} x {item.amount}
                  </span>
                  <button
                    className="cart__delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="checkout-btn" onClick={handleCheckout}>
            checkout
          </button>
        </div>
      </div>
    );
  }
}
