import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import recipesData from "../data.json"; // ← Import JSON directly

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Find recipe by ID
  useEffect(() => {
    const selected = recipesData.find(
      (item) => item.id === parseInt(id)
    );
    setRecipe(selected);
  }, [id]);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600 text-lg">
        Loading recipe...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6">
        <img
          src={recipe.image} // ← Image correctly used
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-gray-700 mb-8">{recipe.summary}</p>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>1 tbsp salt</li>
            <li>2 cups flour</li>
            <li>1 tsp pepper</li>
            <li>Olive oil</li>
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Prepare all ingredients and heat your pan.</li>
            <li>Cook gently until flavors combine.</li>
            <li>Simmer for 10–15 minutes.</li>
            <li>Serve warm and enjoy.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
