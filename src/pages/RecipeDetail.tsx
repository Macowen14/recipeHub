import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { LoadingSpinner } from "../components/ui/loading-spinner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/seperator";
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Users, 
  Globe, 
  BookOpen,
  Youtube,
  ChefHat
} from "lucide-react";
import { getRecipeById, getIngredients, type Recipe } from "../lib/recipe-api";
import { addToFavorites, removeFromFavorites, isFavorite } from "../lib/favorites";
import { toast } from "../hooks/use-toast";
import { cn } from "../lib/utils";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // Memoized loadRecipe function to prevent unnecessary re-renders
  const loadRecipe = useCallback(async (recipeId: string) => {
    try {
      setLoading(true);
      const data = await getRecipeById(recipeId);
      setRecipe(data);
      
      if (!data) {
        toast({
          title: "Recipe not found",
          description: "The requested recipe could not be found.",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipe details. Please try again.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  // Effect to load recipe when ID changes
  useEffect(() => {
    if (id) {
      loadRecipe(id);
    }
  }, [id, loadRecipe]);

  // Effect to update favorite status when recipe changes
  useEffect(() => {
    if (recipe) {
      setIsLiked(isFavorite(recipe.idMeal));
    }
  }, [recipe]);

  const handleFavoriteClick = () => {
    if (!recipe) return;
    
    if (isLiked) {
      if (removeFromFavorites(recipe.idMeal)) {
        setIsLiked(false);
        toast({
          title: "Removed from favorites",
          description: `${recipe.strMeal} has been removed from your favorites.`,
        });
      }
    } else {
      if (addToFavorites(recipe)) {
        setIsLiked(true);
        toast({
          title: "Added to favorites",
          description: `${recipe.strMeal} has been added to your favorites.`,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground mt-4">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Recipe Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(recipe);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recipe Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-medium">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {recipe.strMeal}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {recipe.strArea}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {recipe.strCategory}
                </Badge>
                {recipe.strTags && recipe.strTags.split(',').slice(0, 2).map((tag) => (
                  <Badge key={tag.trim()} variant="outline">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>30-45 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>4 servings</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleFavoriteClick}
                variant={isLiked ? "default" : "outline"}
                className={cn(
                  "flex-1",
                  isLiked && "bg-red-500 hover:bg-red-600 text-white"
                )}
              >
                <Heart className={cn("mr-2 h-4 w-4", isLiked && "fill-current")} />
                {isLiked ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              
              {recipe.strYoutube && (
                <Button
                  variant="outline"
                  onClick={() => window.open(recipe.strYoutube, '_blank')}
                  className="flex-shrink-0"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Watch
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ingredients.map((item, index) => (
                    <li key={index} className="flex justify-between items-start gap-2">
                      <span className="text-foreground">{item.ingredient}</span>
                      <span className="text-muted-foreground text-sm font-medium shrink-0">
                        {item.measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none dark:prose-invert">
                  {recipe.strInstructions.split(/\r?\n/).filter(line => line.trim()).map((step, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-foreground leading-relaxed pt-1">
                          {step.trim()}
                        </p>
                      </div>
                      {index < recipe.strInstructions.split(/\r?\n/).filter(line => line.trim()).length - 1 && (
                        <Separator className="my-4 ml-12" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}