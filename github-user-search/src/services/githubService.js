import axios from "axios";

const API_URL = "https://api.github.com/users/";

export const fetchUserData = async (username) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  const headers = token
    ? { Authorization: `token ${token}` }
    : {};

  return axios.get(`${API_URL}${username}`, { headers });
};
