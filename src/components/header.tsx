// src/components/Header.tsx
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Heart, Settings, Sun, Moon, Home } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import { useState } from "react";
import { dark } from "@clerk/themes";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
}

export function Header({ onSearch, searchValue = "" }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(search.trim());
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Recipes", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Favorites", path: "/favorites", icon: <Heart className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="hidden sm:inline text-xl font-bold text-primary">Recipe</span>
          <span className="hidden sm:inline text-xl font-bold text-foreground">Hub</span>
        </Link>

        {/* Navigation Links (visible when signed in) */}
        {isSignedIn && (
          <div className="hidden md:flex items-center gap-1 mx-4">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                asChild
                variant={pathname === link.path ? "secondary" : "ghost"}
                size="sm"
                className="hidden lg:flex" // Hide text on smaller screens
              >
                <Link to={link.path} className="flex items-center gap-2">
                  {link.icon}
                  <span className="hidden lg:inline">{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        )}

        {/* Search Bar (visible when signed in) */}
        {isSignedIn && (
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
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
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

          {isSignedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/favorites")}
                className="h-9 w-9 md:hidden" // Only show on mobile
              >
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                className="h-9 w-9 md:hidden" // Only show on mobile
              >
                <Settings className="h-4 w-4" />
              </Button>

              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  // Use Clerk's built-in dark theme when in dark mode
                  baseTheme: theme === 'dark' ? dark : undefined,
                  variables: {
                    // Override specific colors to match your design system
                    colorBackground: theme === 'dark' ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)',
                    colorText: theme === 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)',
                    colorTextSecondary: theme === 'dark' ? 'hsl(215 20.2% 65.1%)' : 'hsl(215.4 16.3% 46.9%)',
                    colorInputBackground: theme === 'dark' ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 98%)',
                    colorInputText: theme === 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)',
                    borderRadius: '0.5rem',
                  },
                  elements: {
                    // Avatar container styling
                    userButtonAvatarBox: {
                      width: '2.25rem',
                      height: '2.25rem',
                      border: theme === 'dark' 
                        ? '2px solid hsl(217.2 32.6% 17.5%)' 
                        : '2px solid hsl(214.3 31.8% 91.4%)',
                      backgroundColor: theme === 'dark' 
                        ? 'hsl(222.2 84% 4.9%)' 
                        : 'hsl(0 0% 100%)',
                      transition: 'all 0.2s ease',
                      ':hover': {
                        borderColor: theme === 'dark' 
                          ? 'hsl(210 40% 98%)' 
                          : 'hsl(222.2 47.4% 11.2%)',
                        boxShadow: theme === 'dark'
                          ? '0 0 0 3px hsl(210 40% 98% / 0.2)'
                          : '0 0 0 3px hsl(222.2 47.4% 11.2% / 0.2)',
                      },
                    },
                    
                    // Popover container - most important for visibility
                    userButtonPopoverCard: {
                      backgroundColor: theme === 'dark' 
                        ? 'hsl(222.2 84% 4.9%)' 
                        : 'hsl(0 0% 100%)',
                      borderColor: theme === 'dark' 
                        ? 'hsl(217.2 32.6% 17.5%)' 
                        : 'hsl(214.3 31.8% 91.4%)',
                      boxShadow: theme === 'dark'
                        ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      // Ensure proper z-index
                      zIndex: '9999',
                    },
                    
                    // Main identifier (user name/email)
                    userPreviewMainIdentifier: {
                      color: theme === 'dark' 
                        ? 'hsl(210 40% 98%)' 
                        : 'hsl(222.2 84% 4.9%)',
                    },
                    
                    // Secondary identifier
                    userPreviewSecondaryIdentifier: {
                      color: theme === 'dark' 
                        ? 'hsl(215 20.2% 65.1%)' 
                        : 'hsl(215.4 16.3% 46.9%)',
                    },
                    
                    // Action buttons (Manage account, Sign out, etc.)
                    userButtonPopoverActionButton: {
                      color: theme === 'dark' 
                        ? 'hsl(210 40% 98%)' 
                        : 'hsl(222.2 84% 4.9%)',
                      ':hover': {
                        backgroundColor: theme === 'dark' 
                          ? 'hsl(217.2 32.6% 17.5%)' 
                          : 'hsl(210 40% 96%)',
                      },
                    },
                    
                    // Action button text
                    userButtonPopoverActionButtonText: {
                      color: theme === 'dark' 
                        ? 'hsl(210 40% 98%)' 
                        : 'hsl(222.2 84% 4.9%)',
                    },
                    
                    // Action button icons
                    userButtonPopoverActionButtonIcon: {
                      color: theme === 'dark' 
                        ? 'hsl(210 40% 98%)' 
                        : 'hsl(222.2 84% 4.9%)',
                    },
                    
                    // Hide footer if not needed
                    userButtonPopoverFooter: {
                      display: 'none',
                    },

                    // Ensure the backdrop/overlay doesn't interfere
                    modalBackdrop: {
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                  }
                }}
              />
            </>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}