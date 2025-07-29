// src/pages/auth/UserProfilePage.tsx
import { UserProfile } from "@clerk/clerk-react";
import { AuthContainer } from "../../components/auth/AuthContainer";
import { useTheme } from "../../components/ui/theme-provider";

export const UserProfilePage = () => {
  const { theme } = useTheme();

  const getThemeVariables = () => {
    return theme === 'dark' ? {
      colorBackground: 'hsl(var(--background))',
      colorText: 'hsl(var(--foreground))',
      colorTextSecondary: 'hsl(var(--muted-foreground))',
      colorInputBackground: 'hsl(var(--background))',
      colorInputText: 'hsl(var(--foreground))',
    } : {
      colorBackground: 'hsl(var(--background))',
      colorText: 'hsl(var(--foreground))',
      colorTextSecondary: 'hsl(var(--muted-foreground))',
      colorInputBackground: 'hsl(var(--background))',
      colorInputText: 'hsl(var(--foreground))',
    };
  };

  return (
    <AuthContainer 
      title="Your Profile" 
      subtitle="Manage your account settings"
    >
      <UserProfile
        appearance={{
          baseTheme: theme === 'dark' ? undefined : undefined, // Clerk handles dark/light themes
          variables: getThemeVariables(),
          elements: {
            rootBox: "w-full",
            card: "shadow-none bg-transparent w-full p-0",
            navbar: "hidden",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            profileSectionTitleText: "text-foreground",
            profileSectionTitleTextDanger: "text-destructive",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent",
            formButtonPrimary: "bg-primary hover:bg-primary-hover text-primary-foreground",
            formButtonReset: "text-muted-foreground hover:text-foreground",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-primary hover:text-primary-hover",
            badge: "bg-success/10 text-success-foreground",
          }
        }}
        path="/profile"
        routing="path"
      />
    </AuthContainer>
  );
};