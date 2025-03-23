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
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    category: '', 
    quantity: 0 
  });
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]); // State to store products

  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', steps: '' });
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipes, setRecipes] = useState([]); // State to store recipes

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Unauthorized access.");
          return;
        }

        const response = await axios.get('http://localhost:5000/api/admin/manage-users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Invalid data format from API");
        }
      } catch (error) {
        setError("Failed to load users. Make sure you have admin privileges.");
      }
    };

    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (activeTab === "recipes") {
      fetchRecipes();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Add Product
  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('quantity', newProduct.quantity);
      if (productImage) {
        formData.append('image', productImage);
      }

      const response = await axios.post('http://localhost:5000/api/admin/products', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Product added successfully!");
      setNewProduct({ name: '', description: '', price: '', category: '', quantity: 0 });
      setProductImage(null);
      setProducts([...products, response.data]); // Update products list
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // Update Product
  const handleUpdateProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('quantity', newProduct.quantity);
      if (productImage) {
        formData.append('image', productImage);
      }

      const response = await axios.put(`http://localhost:5000/api/admin/products/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Product updated successfully!");
      setProducts(products.map(product => product._id === id ? response.data : product)); // Update products list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Product deleted successfully!");
      setProducts(products.filter(product => product._id !== id)); // Update products list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // Add Recipe
  const handleAddRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('ingredients', newRecipe.ingredients);
      formData.append('instructions', newRecipe.steps);
      if (recipeImage) {
        formData.append('image', recipeImage);
      }

      const response = await axios.post('http://localhost:5000/api/admin/recipes', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Recipe added successfully!");
      setNewRecipe({ title: '', ingredients: '', steps: '' });
      setRecipeImage(null);
      setRecipes([...recipes, response.data]); // Update recipes list
    } catch (error) {
      alert("Error adding recipe: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // Update Recipe
  const handleUpdateRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('ingredients', newRecipe.ingredients);
      formData.append('instructions', newRecipe.steps);
      if (recipeImage) {
        formData.append('image', recipeImage);
      }

      const response = await axios.put(`http://localhost:5000/api/admin/recipes/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Recipe updated successfully!");
      setRecipes(recipes.map(recipe => recipe._id === id ? response.data : recipe)); // Update recipes list
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error updating recipe: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  // Delete Recipe
  const handleDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Recipe deleted successfully!");
      setRecipes(recipes.filter(recipe => recipe._id !== id)); // Update recipes list
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe: " + (error.response?.data?.msg || "Unknown error"));
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
          <button className={activeTab === "products" ? "active-tab" : ""} onClick={() => setActiveTab("products")}>🛒 Manage Products</button>
          <button className={activeTab === "recipes" ? "active-tab" : ""} onClick={() => setActiveTab("recipes")}>📖 Manage Recipes</button>
        </div>

        {/* Manage Users */}
        {activeTab === "users" && (
          <div className="admin-section">
            <h3>Manage Users</h3>
            {error && <p className="error-text">{error}</p>}
            <ul className="user-list">
              {users.length > 0 ? users.map(user => (
                <li key={user._id} className="user-item">
                  {user.name} - {user.email} ({user.role})
                </li>
              )) : <p>No users found.</p>}
            </ul>
          </div>
        )}

        {/* Manage Products */}
        {activeTab === "products" && (
          <div className="admin-section">
            <h3>Manage Products</h3>
            <input 
              type="text" 
              placeholder="Product Name" 
              value={newProduct.name} 
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
            />
            <textarea 
              placeholder="Description" 
              value={newProduct.description} 
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Price" 
              value={newProduct.price} 
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Category" 
              value={newProduct.category} 
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
            />
            <input 
              type="number" 
              placeholder="Quantity" 
              value={newProduct.quantity} 
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
            />
            <input 
              type="file" 
              onChange={(e) => setProductImage(e.target.files[0])} 
            />
            <button className="action-btn" onClick={handleAddProduct}>Add Product</button>

            {/* Product List */}
            <div className="product-list">
              {products.map(product => (
                <div key={product._id} className="product-item">
                  <img src={product.image || "default.jpg"} alt={product.name} className="item-img" />
                  <div className="item-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                  <div className="item-actions">
                    <button className="update-btn" onClick={() => handleUpdateProduct(product._id)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Recipes */}
        {activeTab === "recipes" && (
          <div className="admin-section">
            <h3>Manage Recipes</h3>
            <input 
              type="text" 
              placeholder="Recipe Title" 
              value={newRecipe.title} 
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} 
            />
            <textarea 
              placeholder="Ingredients" 
              value={newRecipe.ingredients} 
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} 
            />
            <textarea 
              placeholder="Steps" 
              value={newRecipe.steps} 
              onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} 
            />
            <input 
              type="file" 
              onChange={(e) => setRecipeImage(e.target.files[0])} 
            />
            <button className="action-btn" onClick={handleAddRecipe}>Add Recipe</button>

            {/* Recipe List */}
            <div className="recipe-list">
              {recipes.map(recipe => (
                <div key={recipe._id} className="recipe-item">
                  <img src={recipe.image || "default.jpg"} alt={recipe.title} className="item-img" />
                  <div className="item-info">
                    <h4>{recipe.title}</h4>
                    <p>{recipe.description}</p>
                  </div>
                  <div className="item-actions">
                    <button className="update-btn" onClick={() => handleUpdateRecipe(recipe._id)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>🚪 Log Out</button>
      </div>
    </div>
  );
}

export default AdminDashboard;