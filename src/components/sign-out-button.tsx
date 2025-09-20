"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleSignOut}>
      <LogOut className="h-4 w-4" />
      <span className="sr-only">Sign Out</span>
    </Button>
  );
}
