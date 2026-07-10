"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  mainNavigation,
  settingsNavigation,
} from "@/lib/constants/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  function isRouteActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <p className="text-base font-semibold leading-none">
            LineCheck
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Food Safety Platform
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col p-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Operations
        </p>

        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {active && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
                )}

                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={settingsNavigation.href}
            aria-current={
              isRouteActive(settingsNavigation.href)
                ? "page"
                : undefined
            }
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isRouteActive(settingsNavigation.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            {isRouteActive(settingsNavigation.href) && (
              <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
            )}

            <settingsNavigation.icon className="size-5" />
            <span>{settingsNavigation.label}</span>
          </Link>
        </div>
      </nav>

      <div className="border-t p-4">
        <div className="rounded-xl border bg-background p-3 shadow-sm">
          <p className="text-sm font-medium">
            My Restaurant
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your Location
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-success" />
            Location online
          </div>
        </div>
      </div>
    </aside>
  );
}