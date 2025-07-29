import { Recipe } from "@/lib/recipe-api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart, Clock, Users } from "lucide-react";
import { useState } from "react";
import { addToFavorites, removeFromFavorites, isFavorite } from "../lib/favorites";
import { toast } from "../hooks/use-toast";
import { cn } from "../lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(isFavorite(recipe.idMeal));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
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

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 overflow-hidden bg-gradient-card border-border/50"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200",
            isLiked && "text-red-500 hover:text-red-600"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </Button>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {recipe.strMeal}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {recipe.strArea} • {recipe.strCategory}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>4 servings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}