import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ padding: "10px 0" }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
