import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        RecipeShare
      </Link>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Home
        </Link>

        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Recipe
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
