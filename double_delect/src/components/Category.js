import React, { Component } from "react";

export default class Category extends Component {
  render() {
    const { categories, handleItems } = this.props;
    return (
      <div>
        <label htmlFor="category">category</label>
        <select
          name="category"
          onChange={handleItems}
          defaultValue={categories[0]}
        >
          {categories?.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
