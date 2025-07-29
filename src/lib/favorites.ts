import { type Recipe } from "./recipe-api";

const FAVORITES_KEY = "recipe-favorites";

// Get all favorite recipes from localStorage
export const getFavorites = (): Recipe[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Add recipe to favorites
export const addToFavorites = (recipe: Recipe): boolean => {
  try {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (isAlreadyFavorite) {
      return false; // Already in favorites
    }
    
    const updatedFavorites = [...favorites, recipe];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return false;
  }
};

// Remove recipe from favorites
export const removeFromFavorites = (recipeId: string): boolean => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return false;
  }
};

// Check if recipe is in favorites
export const isFavorite = (recipeId: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.idMeal === recipeId);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

// Clear all favorites
export const clearAllFavorites = (): boolean => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing favorites:", error);
    return false;
  }
};