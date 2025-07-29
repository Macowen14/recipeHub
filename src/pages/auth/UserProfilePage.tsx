// src/pages/auth/UserProfilePage.tsx
import { UserProfile } from "@clerk/clerk-react";
import { AuthContainer } from "../../components/auth/AuthContainer";

export const UserProfilePage = () => {
  return (
    <AuthContainer 
      title="Your Profile" 
      subtitle="Manage your account settings"
    >
      <UserProfile
        appearance={{
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