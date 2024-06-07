import React, { Component } from "react";

export default class Item extends Component {
  render() {
    const { items, handleDisplayItem } = this.props;
    return (
      <div>
        <label htmlFor="item">item</label>
        <select name="item" onChange={handleDisplayItem}>
          {items?.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
