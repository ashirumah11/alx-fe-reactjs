import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import recipes from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const selectedRecipe = recipes.find(
      (recipe) => recipe.id === parseInt(id)
    );
    setRecipe(selectedRecipe);
  }, [id]);

  if (!recipe) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <Link to="/" className="text-blue-600 hover:underline block mb-6">
        ← Back to Home
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-gray-700 mb-8">{recipe.summary}</p>

        {/* INGREDIENTS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>1 tbsp salt</li>
            <li>2 cups flour</li>
            <li>1 tsp pepper</li>
            <li>Olive oil</li>
          </ul>
        </section>

        {/* INSTRUCTIONS */}
        <section>
          <h2 className="text-xl font-semibold mb-3">instructions</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Prepare all ingredients.</li>
            <li>Heat your pan and start cooking.</li>
            <li>Simmer for 10 minutes.</li>
            <li>Serve & enjoy.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
