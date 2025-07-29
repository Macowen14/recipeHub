// src/pages/auth/SignUpPage.tsx
import { SignUp } from "@clerk/clerk-react";
import { AuthContainer } from "../../components/auth/AuthContainer";

export const SignUpPage = () => {
  return (
    <AuthContainer 
      title="Join Our Community" 
      subtitle="Create an account to save and share your favorite recipes"
    >
      <SignUp 
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none bg-transparent w-full p-0",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "border-border hover:bg-accent/50",
            socialButtonsBlockButtonText: "text-foreground",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent",
            formButtonPrimary: "bg-primary hover:bg-primary-hover text-primary-foreground",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-primary hover:text-primary-hover",
          }
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </AuthContainer>
  );
};