import React, { Component } from "react";
import "./Cart.css";
import Items from "../Items/Items";

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
                <Items
                  handleDelete={handleDelete}
                  item={item}
                  key={`cart-${item.id}`}
                />
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
