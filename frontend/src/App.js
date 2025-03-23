import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // ✅ only once
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PersonalInfo from "./pages/PersonalInfo";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import MainPage from "./pages/MainPage";
import "./styles.css";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ fixed */}
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/personal-info" element={token ? <PersonalInfo /> : <Navigate to="/login" />} />
          <Route path="/admin-dashboard" element={token && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
