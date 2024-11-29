// src/App.js
import React,{ useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { syncCartWithLocalStorage } from "./redux/slices/cartSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncCartWithLocalStorage()); // Đồng bộ Redux với localStorage
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-detail" element={<SignIn />} />
          <Route path="/check-out" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
