// src/App.js
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { syncCartWithLocalStorage } from "./redux/slices/cartSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";

import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

import ProductPage from "./pages/ProductPage";
import Homepage from "./pages/Homepage";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import EditUserProfile from "./pages/EditUserProfile";

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
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/product" element={<Product />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="/productDetail" element={<ProductPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/edit-profile/:userId" element={<EditUserProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
