import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All"
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : product.category?.toLowerCase() === selectedCategory.toLowerCase() &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overlay">
      <div className="centered-container">
        {/* Top Bar */}
        <div className="top-controls">
          <button className="back-btn" onClick={() => navigate("/mainpage")}>←</button>
          <h2>Products</h2>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Buttons */}
        <div className="categories">
          {["All", "Coffee", "Cakes", "Pastries"].map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="item-list">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="item-card"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <img src={product.image || "default.jpg"} alt={product.name} className="item-img" />
              <h3>{product.name}</h3>
              <p>⭐ {product.rating || "4.5"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
