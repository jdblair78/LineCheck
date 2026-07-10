"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import {
  mainNavigation,
  settingsNavigation,
} from "@/lib/constants/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();

  function isRouteActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  const navigationItems = [
    ...mainNavigation,
    settingsNavigation,
  ];

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            className="lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-72.5 p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>

            <span className="text-left">
              <span className="block text-base font-semibold">
                LineCheck
              </span>

              <span className="block text-xs font-normal text-muted-foreground">
                Food Safety Platform
              </span>
            </span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex h-[calc(100vh-73px)] flex-col p-4">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Operations
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item.href);

              return (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    />
                  }
                >
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
                  )}

                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </SheetClose>
              );
            })}
          </div>

          <div className="mt-auto rounded-xl border bg-muted/30 p-4">
            <p className="text-sm font-medium">
              Your Restaurant
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your Location
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-success" />
              Location online
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}