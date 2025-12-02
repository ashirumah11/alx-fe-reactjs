import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipesData from "../data.json"; // ← Import JSON directly

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // Load JSON into state
  useEffect(() => {
    setRecipes(recipesData); // ← No fetch needed
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recipe Sharing Platform
      </h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={recipe.image} // ← Image correctly used
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>

              <Link
                to={`/recipe/${recipe.id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
