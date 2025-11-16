// src/recipeStore.js
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // 🔍 Search and filtering (from previous task)
  searchTerm: "",
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },
  filteredRecipes: [],
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // ❤️ Favorites and Recommendations
  favorites: [],
  addFavorite: (id) =>
    set((state) =>
      state.favorites.includes(id)
        ? state.favorites
        : [...state.favorites, id]
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  recommendations: [],
  generateRecommendations: () => {
    const state = get();
    const recommended = state.recipes.filter(
      (recipe) =>
        !state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));
