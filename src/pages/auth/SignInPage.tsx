// src/pages/auth/SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";
import { AuthContainer } from "../../components/auth/AuthContainer";

export const SignInPage = () => {
  return (
    <AuthContainer 
      title="Welcome back!" 
      subtitle="Sign in to access your recipes and favorites"
    >
      <SignIn 
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
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </AuthContainer>
  );
};