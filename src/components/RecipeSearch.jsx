import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const apiKey = '0c6204b3e45b47988582e48c76e0b346';
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
    );
    const data = await response.json();
    setRecipes(data.results);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search for Recipes</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., pasta"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
