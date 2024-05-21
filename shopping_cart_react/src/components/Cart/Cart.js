import React, { Component } from "react";
import "./Cart.css";

export default class Cart extends Component {
  render() {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul className="cart">
            {this.props.cart.map((item) => {
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
                    onClick={() => this.props.handleDelete(item.id)}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="checkout-btn" onClick={this.props.handleCheckout}>
            checkout
          </button>
        </div>
      </div>
    );
  }
}
