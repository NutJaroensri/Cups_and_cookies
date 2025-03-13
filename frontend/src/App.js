import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo';
import AdminDashboard from './pages/AdminDashboard';
import MainPage from './pages/MainPage';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails'; 
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import './styles.css';

function App() {
  const token = localStorage.getItem('token');
  
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/personal-info" element={token ? <PersonalInfo /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />

        {/* Public Pages */}
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
