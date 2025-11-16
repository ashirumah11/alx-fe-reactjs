// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
}));
