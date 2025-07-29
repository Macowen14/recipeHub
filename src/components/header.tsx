import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Heart, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
}

export function Header({ onSearch, searchValue = "" }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(search.trim());
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary-hover transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="hidden sm:inline">RecipeHub</span>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes, ingredients..."
              className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/favorites")}
            className="h-9 w-9"
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="h-9 w-9"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}