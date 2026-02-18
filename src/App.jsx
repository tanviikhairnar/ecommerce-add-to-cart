import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ecommerce from "./Componants/Ecommerce";
import Cart from "./Componants/Cart";
import useLocalStorage from "./Hooks/useLocalStorage";
import { useEffect } from "react";

function App() {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Ecommerce
              cart={cart}
              setCart={setCart}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              darkMode={darkMode}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




