import axios from 'axios';

const BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL || 'https://api.github.com';
const API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

// Create axios instance with default config
const githubAPI = axios.create({
  baseURL: BASE_URL,
  headers: API_TOKEN ? {
    'Authorization': `token ${API_TOKEN}`
  } : {}
});

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search
 * @returns {Promise} User data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'User not found');
  }
};

/**
 * Advanced search for GitHub users with filters
 * @param {Object} params - Search parameters
 * @param {string} params.username - GitHub username to search
 * @param {string} params.location - User location
 * @param {number} params.minRepos - Minimum number of repositories
 * @returns {Promise} Search results
 */
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    let query = '';
    
    if (username) {
      query += username;
    }
    
    if (location) {
      query += `+location:${location}`;
    }
    
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }

    if (!query) {
      return { items: [] };
    }

    const response = await githubAPI.get(`/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};

export default githubAPI;