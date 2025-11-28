import axios from "axios";

const BASE_URL = "https://api.github.com";

const getHeaders = () => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  return token ? { Authorization: `token ${token}` } : {};
};

// 🔹 Basic user fetch (still needed for profile clicks)
export const fetchUserData = async (username) => {
  return axios.get(`${BASE_URL}/users/${username}`, {
    headers: getHeaders(),
  });
};

// 🔹 ADVANCED SEARCH: username + location + min repos
export const fetchAdvancedUsers = async (query) => {
  return axios.get(`${BASE_URL}/search/users?q=${query}`, {
    headers: getHeaders(),
  });
};
