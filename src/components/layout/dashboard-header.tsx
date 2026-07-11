import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import ThemeToggle from "@/components/layout/theme-toggle";

import { SidebarTrigger } from "@/components/ui/sidebar";

import ProfileMenu from "@/components/layout/profile-menu";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3">
  <SidebarTrigger />

  <div className="h-5 w-px bg-border" />

  <div>
    <p className="text-sm font-medium">
      Your Restaurant
    </p>

    <p className="hidden text-xs text-muted-foreground sm:block">
      Your Location
    </p>
  </div>
</div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
        </Button>

        <ProfileMenu />
      </div>
    </header>
  );
}