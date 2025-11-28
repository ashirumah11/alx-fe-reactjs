import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);

    try {
      const results = await searchUsers(username, location, minRepos);
      setUsers(results.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        GitHub Advanced User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-5 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            placeholder="Kenya, USA, London..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Minimum Repositories
          </label>
          <input
            type="number"
            placeholder="10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error */}
      {error && (
        <p className="text-center mt-4 text-red-600">
          Something went wrong… try again.
        </p>
      )}

      {/* Results */}
      <div className="mt-6">
        {users.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No results yet.</p>
        )}

        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md border rounded-xl p-4 flex items-center gap-4 mb-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
