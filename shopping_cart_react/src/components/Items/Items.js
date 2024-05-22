import React, { PureComponent } from "react";

export default class Items extends PureComponent {
  render() {
    const { handleAddToCart, handleAmount, item, handleDelete } = this.props;
    const { id, content, amount } = item;

    return (
      <>
        {handleAddToCart ? (
          //inventory items
          <li className="item inventory__item" key={id}>
            <span className="inventory__item-name">{content}</span>
            <button
              className="inventory__subtract cart__btn"
              onClick={() => handleAmount(item, "subtract")}
            >
              -
            </button>
            <span className="inventory__item-amount">{amount}</span>
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
        ) : (
          // cart items
          <li className="item cart__item" key={id}>
            <span className="cart__item-name">
              {content} x {amount}
            </span>
            <button
              className="cart__delete-btn"
              onClick={() => handleDelete(id)}
            >
              delete
            </button>
          </li>
        )}
      </>
    );
  }
}
