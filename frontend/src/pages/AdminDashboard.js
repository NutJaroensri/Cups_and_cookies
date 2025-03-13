import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Product & Recipe States
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });
  const [productImage, setProductImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', steps: '' });
  const [recipeImage, setRecipeImage] = useState(null);

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        console.log("Stored Role:", role);
        console.log("Stored Token:", token);
  
        if (!token || role !== "admin") {
          setError("Unauthorized access. You must be an admin.");
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/admin/manage-users', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        console.log("API Response:", response.data);
  
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching users:", error.response);
        setError(error.response?.data?.msg || "Failed to load users.");
      }
    };
    fetchUsers();
  }, []);
  

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // ✅ Add Product
  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      if (productImage) {
        formData.append('image', productImage);
      }

      await axios.post('http://localhost:5000/api/admin/products', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Product added successfully!");
      setNewProduct({ name: '', price: '', category: '' });
      setProductImage(null);
    } catch (error) {
      alert("Error adding product: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // ✅ Add Recipe
  const handleAddRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('ingredients', newRecipe.ingredients);
      formData.append('steps', newRecipe.steps);
      if (recipeImage) {
        formData.append('image', recipeImage);
      }

      await axios.post('http://localhost:5000/api/admin/recipes', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Recipe added successfully!");
      setNewRecipe({ title: '', ingredients: '', steps: '' });
      setRecipeImage(null);
    } catch (error) {
      alert("Error adding recipe: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  return (
    <div className="admin-dashboard-container">
      <button className="back-btn" onClick={() => navigate("/mainpage")}>←</button>

      <div className="admin-card">
        <div className="admin-header">
          <h2 className="username">Admin Dashboard</h2>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button className={activeTab === "users" ? "active-tab" : ""} onClick={() => setActiveTab("users")}>👥 Manage Users</button>
          <button className={activeTab === "products" ? "active-tab" : ""} onClick={() => setActiveTab("products")}>🛒 Add Product</button>
          <button className={activeTab === "recipes" ? "active-tab" : ""} onClick={() => setActiveTab("recipes")}>📖 Add Recipe</button>
        </div>

        {/* Manage Users */}
        {activeTab === "users" && (
          <div className="admin-section">
            <h3>Manage Users</h3>
            {error && <p className="error-text">{error}</p>}
            <ul className="user-list">
              {users.length > 0 ? users.map(user => (
                <li key={user._id} className={`user-item ${user.role === 'admin' ? 'admin' : ''}`}>
                  {user.name} - {user.email} ({user.role})
                </li>
              )) : <p>No users found.</p>}
            </ul>
          </div>
        )}


        {/* Add Product */}
        {activeTab === "products" && (
          <div className="admin-section">
            <h3>Add Product</h3>
            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input type="text" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
            <button className="action-btn" onClick={handleAddProduct}>Add Product</button>
          </div>
        )}

        {/* Add Recipe */}
        {activeTab === "recipes" && (
          <div className="admin-section">
            <h3>Add Recipe</h3>
            <input type="text" placeholder="Recipe Title" value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} />
            <textarea placeholder="Ingredients" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} />
            <textarea placeholder="Steps" value={newRecipe.steps} onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} />
            <input type="file" onChange={(e) => setRecipeImage(e.target.files[0])} />
            <button className="action-btn" onClick={handleAddRecipe}>Add Recipe</button>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>🚪 Log Out</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
