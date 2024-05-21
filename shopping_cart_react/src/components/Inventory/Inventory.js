import React, { Component } from "react";
import { getInventory } from "../../APIs/ShoppingCartAPIs";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
    };
  }

  async componentDidMount() {
    const data = await getInventory();
    this.setState({ inventory: data });
  }

  render() {
    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul className="inventory">
          {this.state.inventory.map((item) => {
            return (
              <li
                id="inventory-${item.id}"
                className="item inventory__item"
                key={item.id}
              >
                <span className="inventory__item-name">{item.content}</span>
                <button className="inventory__subtract cart__btn">-</button>
                <span className="inventory__item-amount">
                  {item.amount ? item.amount : 0}
                </span>
                <button className="inventory__plus cart__btn">+</button>
                <button className="inventory__add-btn cart__btn">
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
