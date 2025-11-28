import { useState } from "react";
import  {fetchUserData}  from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e, resetPage = true) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    if (resetPage) setPage(1);

    try {
      const response = await fetchUserData({
        username,
        location,
        minRepos,
        page: resetPage ? 1 : page,
      });

      const items = response.data.items || [];

      if (resetPage) {
        setResults(items);
      } else {
        setResults((prev) => [...prev, ...items]);
      }

      // GitHub search API returns up to 30 items by default
      setHasMore(items.length > 0);
    } catch (err) {
      setError("Looks like we cant find the user.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    await handleSearch({ preventDefault: () => {} }, false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Advanced GitHub User Search
      </h1>

      {/* Form */}
      <form
        onSubmit={(e) => handleSearch(e)}
        className="bg-white shadow p-6 rounded-lg space-y-4"
      >
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Minimum Repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
          >
            <img
              src={user.avatar_url}
              className="w-16 h-16 rounded-full mr-4"
              alt="avatar"
            />
            <div>
              <h2 className="font-semibold">{user.login}</h2>
              <a
                className="text-blue-600 underline"
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && !loading && (
        <button
          onClick={loadMore}
          className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}
