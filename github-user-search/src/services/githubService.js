import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";

export const searchUsers = async (username, location, minRepos) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>${minRepos}`;

  const headers = token ? { Authorization: `token ${token}` } : {};

  const response = await axios.get(`${SEARCH_URL}?q=${encodeURIComponent(query)}`, {
    headers,
  });

  return response.data;
};
