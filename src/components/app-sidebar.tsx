import Image from "next/image";
import { Calendar, Home, Inbox, Search, Settings, Clock, Component, MessageSquareWarning } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    link: "/",
  },
  {
    title: "Timer",
    url: "#",
    icon: Clock,
    link: "/timer",
  },
  {
    title: "Categories",
    url: "#",
    icon: Component,
    link: "/categories",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    link: "/settings",
  },
  {
    title: "Contact",
    url: "#",
    icon: MessageSquareWarning,
    link: "/contact",
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded">
            <Image
              src="/android-chrome-192x192.png"
              alt="HabitTrack Logo"
              width={24}
              height={24}
              className="rounded"
            />
          </div>
          <span className="text-lg font-semibold">HabitTrack</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  
                  <SidebarMenuButton 
                    asChild 
                    size="lg"
                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    <Link href={item.link}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t px-4 py-3">
        <div className="text-xs text-muted-foreground">
          © 2025 HabitTrack
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}