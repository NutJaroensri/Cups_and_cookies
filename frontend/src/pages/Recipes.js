import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    selectedCategory === "All"
      ? recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      : recipe.category?.toLowerCase() === selectedCategory.toLowerCase() &&
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overlay"> {/* ✅ Background color applied */}
      <div className="centered-container"> {/* ✅ Enlarged blue box */}
        {/* Top Bar with Back Button */}
        <div className="top-controls">
          <button className="back-btn" onClick={() => navigate("/mainpage")}>←</button>
          <h2>Recipes</h2>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search recipes..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Filters */}
        <div className="categories">
          {["All", "Cheesecake", "Chocolate", "Carrot", "Espresso"].map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="item-list">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="item-card">
              <img src={recipe.image || "default.jpg"} alt={recipe.title} className="item-img" />
              <h3>{recipe.title}</h3>
              <p>⭐ {Math.floor(Math.random() * (5 - 4 + 1) + 4)}.0</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
