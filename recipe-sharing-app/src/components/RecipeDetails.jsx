// src/components/RecipeDetails.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>Back to list</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/recipes/${recipe.id}/edit`}>
          <button>Edit</button>
        </Link>

        <DeleteRecipeButton
         recipeId={recipe.id} 
         onDeleted={() => navigate('/')} />
      </div>

      <hr />
      <Link to="/">← Back to recipes</Link>
    </div>
  );
};

export default RecipeDetails;
