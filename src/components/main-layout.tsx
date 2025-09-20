"use client";

import { useAuth } from "@/lib/firebase/AuthContext";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SignOutButton } from "@/components/sign-out-button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // If there is no user, just render the children.
    // This will be the login page.
    return <>{children}</>;
  }

  // If there is a user, render the sidebar and header
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-[3] flex h-16 shrink-0 items-center border-b px-2 bg-background">
          <SidebarTrigger className="h-8 w-8" />
          <div className="h-4 w-px bg-border mx-2" />
          <h1 className="text-lg font-semibold">HabitTrack</h1>
          <div className="flex-grow" />
          <SignOutButton />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
