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
    selectedItems: [],
    displayItem: null,
  };

  componentDidMount() {
    const newGroup = { ...this.state.group };

    this.state.items?.forEach((item) => {
      if (!newGroup[item.category]) newGroup[item.category] = [];
      newGroup[item.category].push(item.name);
    });

    const defaultCategory = this.state.items[0]?.category;
    const defaultItems = newGroup[defaultCategory];

    this.setState({
      group: newGroup,
      selectedCategory: defaultCategory,
      selectedItems: defaultItems,
      displayItem: defaultItems ? defaultItems[0] : null,
    });
  }

  handleItems = (event) => {
    const newItems = this.state.group[event.target.value];
    this.setState({ selectedItems: newItems, displayItem: newItems[0] });
  };

  handleDisplayItem = (event) => {
    const displayItem = event.target.value;
    this.setState({ displayItem: displayItem });
  };

  render() {
    return (
      <div>
        <h1>
          {this.state.displayItem
            ? this.state.displayItem
            : "no items available"}
        </h1>
        <div className="selectboxes">
          <Category
            categories={Object.keys(this.state.group)}
            handleItems={this.handleItems}
          />
          <Item
            items={this.state.selectedItems}
            handleDisplayItem={this.handleDisplayItem}
          />
        </div>
      </div>
    );
  }
}
