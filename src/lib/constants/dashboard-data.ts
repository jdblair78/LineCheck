import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

export const dashboardMetrics = [
  {
    title: "Today’s Checks",
    value: "2 of 3",
    description: "one remaining today",
    trend: "67%",
    icon: ClipboardCheck,
    tone: "default" as const,
  },
  {
    title: "Completion Rate",
    value: "96%",
    description: "from last week",
    trend: "+4%",
    icon: TrendingUp,
    tone: "success" as const,
  },
  {
    title: "Flagged Items",
    value: "2",
    description: "need manager review",
    trend: "Action",
    icon: AlertTriangle,
    tone: "danger" as const,
  },
  {
    title: "Safe Day Streak",
    value: "14 days",
    description: "consecutive compliant days",
    trend: "Best",
    icon: CheckCircle2,
    tone: "success" as const,
  },
];

export const todaysChecks = [
  {
    id: 1,
    name: "Opening Check",
    time: "6:00 AM",
    status: "Complete" as const,
    progress: "18 of 18 items",
  },
  {
    id: 2,
    name: "Mid-Shift Check",
    time: "2:00 PM",
    status: "In progress" as const,
    progress: "9 of 16 items",
  },
  {
    id: 3,
    name: "Closing Check",
    time: "9:00 PM",
    status: "Upcoming" as const,
    progress: "Not started",
  },
];

export const weeklyComplianceData = [
  { day: "Mon", compliance: 82 },
  { day: "Tue", compliance: 94 },
  { day: "Wed", compliance: 100 },
  { day: "Thu", compliance: 88 },
  { day: "Fri", compliance: 96 },
  { day: "Sat", compliance: 72 },
  { day: "Sun", compliance: 90 },
];

export const recentActivity = [
  {
    id: 1,
    title: "Opening Check completed",
    description: "Joshua completed all 18 items.",
    time: "2 hours ago",
    status: "success" as const,
  },
  {
    id: 2,
    title: "Prep Cooler flagged",
    description: "Temperature recorded at 43°F.",
    time: "3 hours ago",
    status: "danger" as const,
  },
  {
    id: 3,
    title: "Mid-Shift Check started",
    description: "Nine of sixteen items completed.",
    time: "25 minutes ago",
    status: "warning" as const,
  },
];