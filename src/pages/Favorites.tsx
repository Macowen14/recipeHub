import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { RecipeCard } from "../components/recipe-card";
import { Button } from "../components/ui/button";
import { Heart, Trash2, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getFavorites, clearAllFavorites } from "../lib/favorites";
import {type Recipe } from "../lib/recipe-api";
import { toast } from "../hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favoritesData = getFavorites();
    setFavorites(favoritesData);
  };

  const handleClearAll = () => {
    if (clearAllFavorites()) {
      setFavorites([]);
      toast({
        title: "Favorites cleared",
        description: "All favorite recipes have been removed.",
      });
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground">
                {favorites.length} saved {favorites.length === 1 ? 'recipe' : 'recipes'}
              </p>
            </div>
          </div>
          
          {favorites.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all favorites?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove all 
                    your favorite recipes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleClearAll}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No favorite recipes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring recipes and add them to your favorites by clicking the heart icon.
            </p>
            <Button onClick={() => navigate("/")}>
              <Heart className="mr-2 h-4 w-4" />
              Discover Recipes
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}