import React, { useState, useEffect } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1>Cups & Cookies</h1>
      <h2>Recipes:</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.name} - Ingredients: {recipe.ingredients.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
