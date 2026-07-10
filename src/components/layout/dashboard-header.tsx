import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import ThemeToggle from "@/components/layout/theme-toggle";

import MobileNavigation from "@/components/layout/mobile-navigation";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <MobileNavigation />
      </div>
      
      <div>
        <p className="text-sm font-medium">
          Your Restaurant
        </p>

        <p className="text-xs text-muted-foreground">
          Your Location
        </p>
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

        <button
          type="button"
          className="ml-1 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
          aria-label="Open user menu"
        >
          JB
        </button>
      </div>
    </header>
  );
}