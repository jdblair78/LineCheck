"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardCheck,
  History,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Checklists",
    href: "/checklists",
    icon: ClipboardCheck,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Equipment",
    href: "/equipment",
    icon: Wrench,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Operations
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-auto">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              pathname.startsWith("/settings")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      <div className="border-t p-4">
        <div className="rounded-xl border bg-background p-3">
          <p className="text-sm font-medium">
            Penn Station
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Louisville Location
          </p>
        </div>
      </div>
    </aside>
  );
}