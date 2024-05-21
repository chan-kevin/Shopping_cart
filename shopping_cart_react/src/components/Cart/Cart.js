import React, { Component } from "react";
import { getCart } from "../../APIs/ShoppingCartAPIs";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  async componentDidMount() {
    const data = await getCart();
    this.setState({ cart: data });
  }

  render() {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul className="cart">
            {this.state.cart.map((item) => {
              return (
                <li id="cart-${item.id}" class="item cart__item" key={item.id}>
                  <span class="cart__item-name">
                    {item.content} x {item.amount}
                  </span>
                  <button class="cart__delete-btn">delete</button>
                </li>
              );
            })}
          </ul>
          <button className="checkout-btn">checkout</button>
        </div>
      </div>
    );
  }
}
