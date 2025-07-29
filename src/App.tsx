// src/App.tsx
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, useClerk } from "@clerk/clerk-react";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { UserProfilePage } from "./pages/auth/UserProfilePage";
import { AuthLoading } from "./components/auth/AuthLoading";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}

const ClerkProviderWithLoading = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const { loaded: clerkLoaded } = useClerk();

  useEffect(() => {
    if (clerkLoaded) {
      setLoaded(true);
    }
  }, [clerkLoaded]);

  if (!loaded) {
    return <AuthLoading />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="recipe-theme">
      <ClerkProvider
        publishableKey={clerkPubKey}
        appearance={{
          variables: {
            colorPrimary: "hsl(var(--primary))",
            colorText: "hsl(var(--foreground))",
            colorTextSecondary: "hsl(var(--muted-foreground))",
            colorBackground: "hsl(var(--background))",
            colorInputBackground: "hsl(var(--background))",
            colorInputText: "hsl(var(--foreground))",
          },
        }}
      >
        <ClerkProviderWithLoading>
          <TooltipProvider>
            <Sonner position="top-center" richColors />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ClerkProviderWithLoading>
      </ClerkProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;