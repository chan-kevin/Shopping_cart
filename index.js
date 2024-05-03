const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = () => {
    // define your method to get cart data
    return fetch(`${URL}/cart`).then((res) => res.json());
  };

  const getInventory = () => {
    // define your method to get inventory data
    return fetch(`${URL}/inventory`).then((res) => res.json());
  };

  const addToCart = (inventoryItem) => {
    // define your method to add an item to cart
    return fetch(`${URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inventoryItem)
    }).then((res) => res.json());
  };

  const updateCart = (id, newAmount) => {
    // define your method to update an item in cart
    return fetch(`${URL}/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAmount)
    }).then((res) => res.json());
  };

  const deleteFromCart = (id) => {
    // define your method to delete an item in cart
    return fetch(`${URL}/cart/${id}`, { method: "DELETE" }).then((res) => res.json());
  };

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      this.#cart = newCart;
      this.#onChange();
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
      this.#onChange();
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  // implement your logic for View
  const inventoryListEl = document.querySelector(".inventory");
  const cartListEl = document.querySelector(".cart");
  const checkoutBtn = document.querySelector(".checkout-btn");
  let addAmount = 0;

  const renderInventory = (inventory) => {
    let inventoryTemp = "";

    inventory.forEach((item) => {
      const content = item.content;
      const liTemp = `<li id=${item.id}>
      <span class="cart__item-name">${content}</span>
      <button class="cart__subtract">-</button>
      <span class="cart__item-amount">${addAmount}</span>
      <button class="cart__plus">+</button>
      <button class="cart__add-btn">add to cart</button>
      </li>`
      inventoryTemp += liTemp;
    })

    inventoryListEl.innerHTML = inventoryTemp;
  }

  const renderCart = (cart) => {
    let cartTemp = "";

    cart.forEach((item) => {
      const content = item.content;
      const amount = item.amount;

      const liTemp = `<li id=${item.id}>
      <span class="cart__item-name">${content}</span><span> x </span><span class="cart__item-amount">${amount}</span>
      <button class="cart__delete-btn">delete</button>
      </li>`

      cartTemp += liTemp;
    })

    cartListEl.innerHTML = cartTemp;
  }

  return { renderCart, renderInventory, inventoryListEl, cartListEl, checkoutBtn, addAmount };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = () => {
    model.getCart().then((data) => {
      state.cart = data;
    })

    model.getInventory().then((data) => {
      state.inventory = data;
    })
  };
  const handleUpdateAmount = () => { };

  const handleAddToCart = () => {
    view.inventoryListEl.addEventListener("click", (event) => {
      const element = event.target;

      if (element.className === "cart__plus") {
        const parentEl = element.parentElement;
        const amountEl = parentEl.querySelector(".cart__item-amount");
        const currentAmount = Number(amountEl.textContent);
        const updatedAmount = currentAmount + 1;

        amountEl.textContent = updatedAmount;

      }

      if (element.className === "cart__add-btn") {
        const parentEl = element.parentElement;
        const id = parentEl.getAttribute("id");
        const content = parentEl.querySelector(".cart__item-name").textContent;
        const amount = parentEl.querySelector(".cart__item-amount").textContent;
        const newItem = {
          id: id,
          content: content,
          amount: Number(amount),
        }

        let update = true;
        for (let item of state.cart) {
          if (item.id === id.toString()) {
            update = false;
            model.updateCart(id, { ...newItem, amount: item.amount + Number(amount) }).then((data) => {
              const updatedCart = state.cart.map((item) => {
                return item.id === id ? { ...item, amount: item.amount + Number(amount) } : item;
              })
              state.cart = updatedCart;
            })
          }
        }

        if (update) {
          model.addToCart(newItem).then((data) => {
            state.cart = [...state.cart, data];
          })
        }
      }
    })
  };

  const handleDelete = () => { };

  const handleCheckout = () => {
    view.checkoutBtn.addEventListener("click", (event) => {
      model.checkout().then((data) => {
        state.cart = [];
      })
    })
  };

  const bootstrap = () => {
    init();
    state.subscribe(() => {
      view.renderCart(state.cart);
      view.renderInventory(state.inventory);
    })
    handleAddToCart();
    handleCheckout();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
