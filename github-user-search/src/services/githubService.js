import axios from "axios";

const BASE_URL = "https://api.github.com/search/users?q=";

export const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  // Build GitHub search query
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const headers = token ? { Authorization: `token ${token}` } : {};

  // GitHub Search API
  return axios.get(`${BASE_URL}/search/users`, {
    params: { q: query.trim(), page, per_page: 10 },
    headers,
  });
};
