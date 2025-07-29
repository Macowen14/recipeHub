import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { RecipeCard } from "../components/recipe-card";
import { LoadingSpinner } from "../components/ui/loading-spinner";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ChefHat, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  getRandomRecipes, 
  searchRecipes, 
  getRecipesByCategory, 
  getCategories, 
  type Recipe, 
  type Category 
} from "../lib/recipe-api";
import { toast } from "../hooks/use-toast";
import heroImage from "@/assets/hero-food.jpg";

const POPULAR_CATEGORIES = ["Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Vegetarian"];

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [recipesData, categoriesData] = await Promise.all([
        getRandomRecipes(12),
        getCategories()
      ]);
      
      setRecipes(recipesData);
      setCategories(categoriesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadInitialData();
      setSelectedCategory(null);
      return;
    }

    try {
      setLoading(true);
      setSearchQuery(query);
      setSelectedCategory(null);
      const results = await searchRecipes(query);
      setRecipes(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No recipes found for "${query}". Try a different search term.`,
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to search recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: string) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      setSearchQuery("");
      const results = await getRecipesByCategory(category);
      setRecipes(results);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load ${category} recipes. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} searchValue={searchQuery} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Amazing
              <span className="block text-accent">Recipes</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Explore thousands of delicious recipes from around the world. 
              Find your next favorite dish and start cooking today!
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow animate-pulse-glow"
              onClick={() => document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChefHat className="mr-2 h-5 w-5" />
              Start Exploring
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" id="recipes-section">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Browse Categories</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
                loadInitialData();
              }}
            >
              All Recipes
            </Button>
            {POPULAR_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          {searchQuery && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-muted-foreground">Search results for:</span>
              <Badge variant="secondary">{searchQuery}</Badge>
            </div>
          )}
          {selectedCategory && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-muted-foreground">Category:</span>
              <Badge variant="secondary">{selectedCategory}</Badge>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${recipes.length} recipes found`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground mt-4">Loading delicious recipes...</p>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? `Try searching for something else or browse our categories.`
                : "Something went wrong loading recipes. Please try again."
              }
            </p>
            <Button onClick={loadInitialData}>
              Try Again
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}