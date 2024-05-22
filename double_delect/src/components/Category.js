import React, { Component } from "react";

export default class Category extends Component {
  render() {
    return (
      <div>
        <label for="category">category</label>
        <select name="category"></select>
      </div>
    );
  }
}
