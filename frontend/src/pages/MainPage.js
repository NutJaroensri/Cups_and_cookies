import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure styles are applied

const MainPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="main-page-container">
      {/* Top Navigation */}
      <div className="top-bar">
        <div className="user-icon" onClick={() => navigate("/dashboard")}>👤</div>
        <h1 className="welcome-text">Hey .., <span className="highlight">Good Afternoon!</span></h1>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for products or recipes..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Filters */}
      <div className="categories">
        {["All", "Coffees", "Cakes", "Pastries"].map((category) => (
          <button key={category} className="category-btn">
            {category}
          </button>
        ))}
      </div>

      {/* Main Sections */}
      <div className="main-sections">
        {/* Products Section */}
        <div className="section-card" onClick={() => navigate("/products")}>
          <img src="../../images/products.jpg" alt="Products" className="section-img" />
          <div className="section-content">
            <h2>Explore Products</h2>
            <p>Discover our fresh coffee, pastries, and desserts.</p>
          </div>
        </div>

        {/* Recipes Section */}
        <div className="section-card" onClick={() => navigate("/recipes")}>
          <img src="../../images/recipes.jpg" alt="Recipes" className="section-img" />
          <div className="section-content">
            <h2>View Recipes</h2>
            <p>Find delicious coffee and pastry recipes to try at home.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
