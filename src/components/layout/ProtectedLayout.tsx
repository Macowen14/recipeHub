// src/components/layout/ProtectedLayout.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { AuthNav } from "../auth/AuthNav";
import { Toaster } from "../ui/toaster";

const ProtectedLayout = () => {
  return (
    <>
      <SignedIn>
        <AuthNav />
        <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
          <Outlet />
          <Toaster />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedLayout;