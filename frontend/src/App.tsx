import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
// import MyOrders from "./pages/MyOrders";
// import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/MyOrders";
const App = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const saleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <Header
        homeRef={homeRef}
        saleRef={saleRef}
        servicesRef={servicesRef}
        productsRef={productsRef}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              homeRef={homeRef}
              saleRef={saleRef}
              servicesRef={servicesRef}
              productsRef={productsRef}
            />
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
