import React, { Component } from "react";
import Category from "./Category";
import Item from "./Item";

export default class DisplayPage extends Component {
  state = {
    items: [
      {
        name: "apple",
        category: "fruit",
      },
      {
        name: "Cucumber",
        category: "vegetable",
      },
      {
        name: "Banana",
        category: "fruit",
      },
      {
        name: "Celery",
        category: "vegetable",
      },
      {
        name: "orange",
        category: "fruit",
      },
      {
        name: "sausage",
        category: "meat",
      },
      {
        name: "bacon",
        category: "meat",
      },
    ],
    group: {},
    selectedCategory: null,
    selectedItem: null,
  };
  render() {
    return (
      <div>
        <h1>{this.state.selectedItem}</h1>;
        <Category />
        <Item />
      </div>
    );
  }
}
