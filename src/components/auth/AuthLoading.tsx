// src/components/auth/AuthLoading.tsx
export const AuthLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-foreground">Loading your culinary journey...</p>
      </div>
    </div>
  );
};