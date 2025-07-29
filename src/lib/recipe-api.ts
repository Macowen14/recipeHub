// Recipe API integration using TheMealDB (free API)
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

export interface ApiResponse {
  meals: Recipe[] | null;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Get ingredients from recipe
export const getIngredients = (recipe: Recipe): Array<{ingredient: string, measure: string}> => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || ""
      });
    }
  }
  return ingredients;
};

// Search recipes by name
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data: ApiResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw new Error("Failed to search recipes");
  }
};

// Get random recipes
export const getRandomRecipes = async (count: number = 8): Promise<Recipe[]> => {
  try {
    const promises = Array(count).fill(null).map(() => 
      fetch(`${BASE_URL}/random.php`).then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    return results.map(result => result.meals?.[0]).filter(Boolean);
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    throw new Error("Failed to fetch random recipes");
  }
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data: ApiResponse = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};

// Get recipes by category
export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    const data: ApiResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    throw new Error("Failed to fetch recipes by category");
  }
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data: CategoriesResponse = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Search by ingredient
export const searchByIngredient = async (ingredient: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    const data: ApiResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error searching by ingredient:", error);
    throw new Error("Failed to search by ingredient");
  }
};