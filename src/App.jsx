import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import ProductDetail from './Components/ProductDetail';
import CartPage from './Components/CartPage';
import CheckoutPage from './Components/CheckoutPage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import AdminPanel from "./Components/AdminPanel";
import './App.css'


function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
