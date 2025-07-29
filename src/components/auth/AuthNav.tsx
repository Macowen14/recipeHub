// src/components/auth/AuthNav.tsx
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Home, Heart, Settings } from "lucide-react";

export const AuthNav = () => {
  const { isSignedIn } = useUser();
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Recipes", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Favorites", path: "/favorites", icon: <Heart className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">Recipe</span>
          <span className="text-2xl font-bold text-foreground">Book</span>
        </Link>

        {isSignedIn && (
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                asChild
                variant={pathname === link.path ? "secondary" : "ghost"}
                size="sm"
              >
                <Link to={link.path} className="flex items-center gap-2">
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                  userButtonPopoverCard: "bg-card border-border",
                  userPreviewMainIdentifier: "text-foreground",
                  userButtonPopoverActionButtonText: "text-foreground",
                  userButtonPopoverActionButtonIcon: "text-foreground",
                  userButtonPopoverFooter: "hidden",
                }
              }}
            />
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};