// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import SignIn from "./pages/SignIn";
import ProductPage from "./pages/ProductPage";
import Homepage from "./pages/Homepage";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import EditUserProfile from './pages/EditUserProfile'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productDetail" element={<ProductPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/edit-profile/:userId" element={<EditUserProfile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
