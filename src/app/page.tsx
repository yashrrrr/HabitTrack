"use client";

import { useAuth } from "@/lib/firebase/AuthContext";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, loading } = useAuth();

  // Show a loading message while the auth state is being determined
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="  items-center justify-center p-5">
      
      {/* If user is logged in, show welcome message and sign out button */}
      {user ? (
        <>
          Hi
        </>
      ) : (
        // If user is not logged in, show message and link to login page
        <>
          <h1 className="text-4xl font-bold mb-4">HabitTrack</h1>
          <div className="text-center">
            <p className="mb-4">Please sign in to track your habits.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

