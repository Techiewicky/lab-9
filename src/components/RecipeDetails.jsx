import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const apiKey = '0c6204b3e45b47988582e48c76e0b346';
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
      );
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={{ width: '300px' }} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}

export default RecipeDetails;
