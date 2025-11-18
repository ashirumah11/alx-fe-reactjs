// src/services/GithubService.js

// Base URL for GitHub's Search Users API
const GITHUB_SEARCH_URL = "https://api.github.com/search/users";

/**
 * Fetches user data using GitHub's Advanced Search API.
 * @param {string} query The constructed query string (e.g., "tom location:berlin repos:>=10").
 * @param {number} page The page number for results (default: 1).
 * @returns {Promise<object>} The search results object { total_count, incomplete_results, items: [users...] }.
 */
export async function fetchAdvancedUserData(query, page = 1) {
  // GitHub API recommends sending the search query in the 'q' parameter
  // We also include 'per_page' to control the number of results per page (max 100).
  const url = new URL(GITHUB_SEARCH_URL);
  url.searchParams.set('q', query);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', 30); // Use 30 results per page for manageable display

  try {
    const response = await fetch(url.toString(), {
      // It's good practice to set a User-Agent header for GitHub API requests
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Advanced-Search-App' // Replace with a meaningful name
      },
    });

    if (response.status === 403) {
      // Handle rate limit error specifically
      throw new Error("GitHub API rate limit exceeded. Please wait a moment before trying again.");
    }
    
    if (!response.ok) {
      // Throw an error for other bad responses (404, 500, etc.)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This contains { total_count, items: [...] }

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// NOTE: The previous single-user fetchUserData is no longer used, 
// so you can delete it or rename the file to reflect the new functionality.