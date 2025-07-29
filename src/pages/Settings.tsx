import { Header } from "../components/header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { 
  Settings as SettingsIcon, 
  User, 
  Moon, 
  Sun, 
  Heart, 
  Trash2,
  LogOut,
  Info
} from "lucide-react";
import { useTheme } from "../components/ui/theme-provider";
import { getFavorites, clearAllFavorites } from "../lib/favorites";
import { toast } from "../hooks/use-toast";
import { useState } from "react";
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

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [favoritesCount] = useState(getFavorites().length);

  const handleClearFavorites = () => {
    if (clearAllFavorites()) {
      toast({
        title: "Favorites cleared",
        description: "All favorite recipes have been removed.",
      });
    }
  };

  const handleLogout = () => {
    // Mock logout functionality
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                Your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground">Member since 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-toggle" className="flex items-center gap-2 cursor-pointer">
                  <span>Dark mode</span>
                </Label>
                <Switch
                  id="theme-toggle"
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Data & Storage
              </CardTitle>
              <CardDescription>
                Manage your saved recipes and app data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Favorite Recipes</p>
                  <p className="text-sm text-muted-foreground">
                    {favoritesCount} recipes saved
                  </p>
                </div>
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
                        onClick={handleClearFavorites}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">App Version</span>
                <span className="text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Source</span>
                <span className="text-foreground">TheMealDB API</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <span className="text-foreground">React + TypeScript</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                variant="outline" 
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}