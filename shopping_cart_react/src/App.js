import "./App.css";
import Inventory from "./components/Inventory/Inventory";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div id="app">
      <div className="container">
        <Inventory />
        <Cart />
      </div>
    </div>
  );
}

export default App;
