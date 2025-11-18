// src/components/Search.jsx

import { useState } from "react";
// Import the new advanced search function
import { fetchAdvancedUserData } from "../services/GithubService"; 

function Search() {
  // State for search parameters
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  // State for search results
  const [users, setUsers] = useState(null); // Changed from 'user' to 'users' for multiple results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // State for pagination (GitHub Search API returns a limited number of results per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); 

  // Combined function to build the search query string for the API
  const buildQuery = (page = 1) => {
    let query = username.trim();

    if (location.trim()) {
      query += ` location:${location.trim()}`;
    }

    // GitHub API query syntax for repositories: 'repos:>=10'
    if (minRepos && parseInt(minRepos) > 0) {
      query += ` repos:>=${parseInt(minRepos)}`;
    }
    
    // Check if the base query is empty after trimming
    if (!query.trim()) {
      setError(true);
      return null;
    }

    return { query, page };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset page for a new search
    setUsers(null);    // Clear previous results
    
    const params = buildQuery(1);
    if (!params) return;

    setLoading(true);
    setError(false);

    try {
      // Use the new service function
      const data = await fetchAdvancedUserData(params.query, params.page);
      
      // The GitHub Search API returns an object with `items` (the array of users) and `total_count`
      setUsers(data.items); 
      setHasMore(data.total_count > data.items.length);
      
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const params = buildQuery(nextPage);
    if (!params) return;

    setLoading(true);
    setError(false);

    try {
      const data = await fetchAdvancedUserData(params.query, params.page);
      
      // Append new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...data.items]);
      setCurrentPage(nextPage);
      
      // Update hasMore based on total items loaded vs. total available
      setHasMore(data.total_count > users.length + data.items.length);

    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        GitHub Advanced User Search 
      </h1>
      
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div className="md:col-span-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username/Name (Required)
            </label>
            <input
              id="username"
              type="text"
              placeholder="e.g., torvalds, js-dev..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g., London, Berlin"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              id="minRepos"
              type="number"
              placeholder="e.g., 10, 50"
              min="0"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 ease-in-out"
        >
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {/* Results and Status Display */}
      <div className="mt-8">
        {loading && <p className="text-center text-blue-600 text-xl">Loading results...</p>}
        {error && <p className="text-center text-red-600 text-xl">An error occurred or the search query was invalid. Try again!</p>}
        
        {/* Step 3: Display Results */}
        {users && users.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
              Search Results ({users.length} displayed)
            </h2>
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-blue-400"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800">{user.login}</h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Type:</span> {user.type}
                  </p>
                  {/* Note: Location and Repos count are only available in the full user object, 
                      not the search results. We would need a second API call per user (not 
                      recommended for performance) or rely only on the `repos:>=` filter.
                      For this task, we will display the fields that ARE available: */}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
            
            {/* Pagination / Load More Button */}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="py-2 px-6 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More Users'}
                </button>
              </div>
            )}
            
          </div>
        )}
        
        {users && users.length === 0 && !loading && (
          <p className="text-center text-gray-600 text-xl">No users found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Search;