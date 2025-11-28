import axios from "axios";

const BASE_URL = "https://api.github.com";

// ================================
// 1. BASIC USER FETCH (by username)
// ================================
export const fetchUserData = async (username) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  const headers = token
    ? { Authorization: `token ${token}` }
    : {};

  return axios.get(`${BASE_URL}/users/${username}`, { headers });
};

// =====================================
// 2. ADVANCED SEARCH (location, repos)
// =====================================
export const searchAdvancedUsers = async ({ username, location, minRepos }) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  const headers = token
    ? { Authorization: `token ${token}` }
    : {};

  // Build GitHub Search API query
  // (username optional — GitHub allows q to contain multiple search fields)
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  query = query.trim();

  // GitHub Search API endpoint (REQUIRED)
  return axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`, {
    headers,
  });
};
