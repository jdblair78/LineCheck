import {
  BarChart3,
  ClipboardCheck,
  History,
  LayoutDashboard,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainNavigation: NavigationItem[] = [
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

export const settingsNavigation: NavigationItem = {
  label: "Settings",
  href: "/settings",
  icon: Settings,
};