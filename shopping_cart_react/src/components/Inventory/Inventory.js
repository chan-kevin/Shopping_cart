import React, { Component } from "react";
import "./Inventory.css";
import Pagination from "../Pagination/Pagination";
import Items from "../Items/Items";

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
              <Items
                handleAmount={handleAmount}
                handleAddToCart={handleAddToCart}
                item={item}
                key={`inventory-${item.id}`}
              />
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
