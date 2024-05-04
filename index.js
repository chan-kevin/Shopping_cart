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
    #currentIndex;
    #itemsPerPage;
    #pageNum;
    #amount;
    #prevIndex;

    constructor() {
      this.#inventory = [];
      this.#cart = [];
      this.#currentIndex = 0;
      this.#itemsPerPage = 3;
      this.#pageNum = 0;
      this.#amount = 0;
      this.#prevIndex = this.#currentIndex;
    }

    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    get currentIndex() {
      return this.#currentIndex;
    }

    get itemsPerPage() {
      return this.#itemsPerPage;
    }

    get pageNum() {
      return this.#pageNum;
    }

    get amount() {
      return this.#amount;
    }

    get prevIndex() {
      return this.#prevIndex;
    }

    set prevIndex(newIndex) {
      this.#prevIndex = newIndex;
    }

    set currentIndex(newIndex) {
      this.#currentIndex = newIndex;
    }

    set pageNum(newPageNum) {
      this.#pageNum = newPageNum;
    }

    set cart(newCart) {
      this.#cart = newCart;
      this.#onChange();
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
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
  const pageButtonContainerEl = document.querySelector(".pagination__pages");
  const pageButtonEl = document.querySelector(".pagination");

  const renderPagination = (data, state, handlePageNum) => {
    const totalItemCount = data.length;
    state.pageNum = Math.ceil(totalItemCount / state.itemsPerPage);

    for (let i = 0; i < state.pageNum; i++) {
      let button = document.createElement("button");
      button.classList.add("pagination__page-num");
      button.setAttribute("id", `page-${i}`);
      button.addEventListener("click", () => {
        renderInventory(data, i, state);
        handlePageNum(i, state.prevIndex);
      })
      button.innerHTML = i + 1;
      pageButtonContainerEl.appendChild(button);
    }
  }

  const renderInventory = (data, pageIndex, state) => {
    let inventoryTemp = "";

    state.prevIndex = state.currentIndex;
    state.currentIndex = pageIndex;
    const start = pageIndex * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    for (let i = start; i < end; i++) {
      if (data[i]) {
        const item = data[i];
        const content = item.content;
        const liTemp = `<li id=${item.id} class="item inventory__item">
        <span class="inventory__item-name">${content}</span>
        <button class="inventory__subtract cart__btn">-</button>
        <span class="inventory__item-amount">${state.amount}</span>
        <button class="inventory__plus cart__btn">+</button>
        <button class="inventory__add-btn cart__btn">add to cart</button>
        </li>`
        inventoryTemp += liTemp;
      }
    }
    inventoryListEl.innerHTML = inventoryTemp;
  }

  const renderCart = (cart) => {
    let cartTemp = "";

    cart.forEach((item) => {
      const content = item.content;
      const amount = item.amount;

      const liTemp = `<li id=${item.id} class="item cart__item">
      <span class="cart__item-name">${content} x ${amount}</span>
      <button class="cart__delete-btn">delete</button>
      </li>`

      cartTemp += liTemp;
    })

    cartListEl.innerHTML = cartTemp;
  }

  return { renderCart, renderInventory, inventoryListEl, cartListEl, checkoutBtn, renderPagination, pageButtonEl };
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
      state.prevIndex = state.currentIndex;
      view.renderPagination(data, state, handlePageNum);
      view.renderInventory(data, state.currentIndex, state);
      handlePageNum(state.currentIndex);
    })
  };

  const handleUpdateAmount = () => {
    view.inventoryListEl.addEventListener("click", (event) => {
      const element = event.target;

      if (element.classList.contains("inventory__plus") || element.classList.contains("inventory__subtract")) {
        const parentEl = element.parentElement;
        const amountEl = parentEl.querySelector(".inventory__item-amount");
        const currentAmount = Number(amountEl.textContent);

        if (element.classList.contains("inventory__plus")) {
          const updatedAmount = currentAmount + 1;
          amountEl.textContent = updatedAmount;
        } else if (element.classList.contains("inventory__subtract") && currentAmount !== 0) {
          const updatedAmount = currentAmount - 1;
          amountEl.textContent = updatedAmount;
        }
      }
    })
  };

  const handleAddToCart = () => {
    view.inventoryListEl.addEventListener("click", (event) => {
      const element = event.target;

      if (element.classList.contains("inventory__add-btn")) {
        const parentEl = element.parentElement;
        const id = parentEl.getAttribute("id");
        const content = parentEl.querySelector(".inventory__item-name").textContent;
        const amount = parentEl.querySelector(".inventory__item-amount").textContent;
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

        if (update && Number(amount) !== 0) {
          model.addToCart(newItem).then((data) => {
            state.cart = [...state.cart, data];
          })
        }
      }
    })
  };

  const handleDelete = () => {
    view.cartListEl.addEventListener("click", (event) => {
      const element = event.target;
      const id = element.parentElement.getAttribute("id");

      if (element.classList.contains("cart__delete-btn")) {
        model.deleteFromCart(id).then((data) => {
          state.cart = state.cart.filter((item) => item.id !== id);
        })
      }
    })
  };

  const handleCheckout = () => {
    view.checkoutBtn.addEventListener("click", (event) => {
      model.checkout().then((data) => {
        state.cart = [];
      })
    })
  };

  const handlePage = () => {
    view.pageButtonEl.addEventListener("click", (event) => {
      const element = event.target;

      if (element.classList.contains("pagination__prev-btn") && state.currentIndex >= 1) {
        state.currentIndex -= 1;
        model.getInventory().then((data) => {
          view.renderInventory(data, state.currentIndex, state);
          handlePageNum(state.currentIndex, state.currentIndex + 1);
        })
      } else if (element.classList.contains("pagination__next-btn")) {
        state.currentIndex += 1;
        model.getInventory().then((data) => {
          view.renderInventory(data, state.currentIndex, state);
          handlePageNum(state.currentIndex, state.currentIndex - 1);
        })
      }
    })
  }

  const handlePageNum = (currentIndex, prevIndex) => {
    const currentId = `page-${currentIndex}`;
    const prevId = `page-${prevIndex}`;
    const currentButton = document.querySelector(`#${currentId}`);
    const prevButton = document.querySelector(`#${prevId}`);

    currentButton.style.color = "black";
    currentButton.style.textDecoration = "none";
    currentButton.style.fontWeight = "bold";

    if (prevIndex !== undefined) {
      prevButton.style.color = "rgb(0, 153, 255)";
      prevButton.style.textDecoration = "underline";
      prevButton.style.fontWeight = "normal";
    }
  }

  const bootstrap = () => {
    init();
    state.subscribe(() => {
      view.renderCart(state.cart);
    })
    handleUpdateAmount();
    handleAddToCart();
    handleDelete();
    handleCheckout();
    handlePage();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
