// src/components/auth/AuthContainer.tsx
import { type ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthContainer = ({ children, title, subtitle }: AuthContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};