import React, { Component } from "react";
import Inventory from "../Inventory/Inventory";
import Cart from "../Cart/Cart";
import {
  addToCart,
  checkout,
  deleteFromCart,
  getCart,
  getInventory,
  updateCart,
} from "../../APIs/ShoppingCartAPIs";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      cart: [],
    };
  }
  async componentDidMount() {
    const inventoryData = await getInventory();
    const cartData = await getCart();
    this.setState({
      inventory: inventoryData.map((item) => {
        return { ...item, amount: 0 };
      }),
      cart: cartData,
    });
  }

  handleAmount = (targetItem, action) => {
    this.setState({
      inventory: this.state.inventory.map((item) => {
        if (item.id === targetItem.id) {
          if (action === "subtract" && item.amount !== 0) {
            return { ...item, amount: item.amount - 1 };
          } else if (action === "subtract" && item.amount === 0) {
            return item;
          } else if (action === "increment") {
            return { ...item, amount: item.amount + 1 };
          }
        } else {
          return item;
        }
      }),
    });
  };

  handleAddToCart = async (newItem) => {
    const existedItem = this.state.cart.find((item) => item.id === newItem.id);

    if (existedItem) {
      try {
        const newAmount = newItem.amount + existedItem.amount;
        await updateCart(newItem.id, { amount: newAmount });
        this.setState({
          cart: this.state.cart.map((item) => {
            if (item.id === newItem.id) {
              return { ...item, amount: newAmount };
            } else {
              return item;
            }
          }),
        });
      } catch (err) {
        alert("failed to update cart");
      }
    } else {
      if (newItem.amount !== 0) {
        try {
          await addToCart(newItem);
          this.setState({ cart: [...this.state.cart, newItem] });
        } catch (err) {
          alert("failed to add to cart");
        }
      }
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteFromCart(id);
      this.setState({
        cart: this.state.cart.filter((item) => {
          return item.id !== id;
        }),
      });
    } catch (err) {
      alert("failed to delete item");
    }
  };

  handleCheckout = async () => {
    try {
      await checkout();
      this.setState({
        cart: [],
      });
    } catch (err) {
      alert("failed to checkout");
    }
  };

  render() {
    return (
      <div className="container">
        <Inventory
          inventory={this.state.inventory}
          handleAmount={this.handleAmount}
          handleAddToCart={this.handleAddToCart}
        />
        <Cart
          cart={this.state.cart}
          handleDelete={this.handleDelete}
          handleCheckout={this.handleCheckout}
        />
      </div>
    );
  }
}
