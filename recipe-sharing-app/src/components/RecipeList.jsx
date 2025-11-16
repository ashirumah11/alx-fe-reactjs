// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  if (!recipes.length) {
    return <div>No recipes yet. Add one!</div>;
  }

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ padding: '8px 0' }}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
