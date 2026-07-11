type DashboardMetric = {
  title: string;
  value: string;
  description: string;
  trend: string;
  progress: number;
  icon:
    | "clipboard-check"
    | "trending-up"
    | "alert-triangle"
    | "check-circle-2";
  tone: "default" | "success" | "warning" | "danger";
};

type TodaysCheck = {
  id: number;
  name: string;
  time: string;
  status: "Complete" | "In progress" | "Upcoming";
  progress: string;
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Today’s Checks",
    value: "2 of 3",
    description: "one remaining today",
    trend: "67%",
    progress: 67,
    icon: "clipboard-check",
    tone: "default",
  },
  {
    title: "Completion Rate",
    value: "96%",
    description: "from last week",
    trend: "+4%",
    progress: 96,
    icon: "trending-up",
    tone: "success",
  },
  {
    title: "Flagged Items",
    value: "2",
    description: "need manager review",
    trend: "Action",
    progress: 40,
    icon: "alert-triangle",
    tone: "danger",
  },
  {
    title: "Safe Day Streak",
    value: "14 days",
    description: "consecutive compliant days",
    trend: "Best",
    progress: 78,
    icon: "check-circle-2",
    tone: "success",
  },
];

export function getWeeklyComplianceData() {
  const today = new Date();

  const complianceValues = [82, 94, 100, 88, 96, 72, 90];

  return complianceValues.map((value, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (6 - index));

    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      compliance: value,
    };
  });
}

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

export const todaysChecks: TodaysCheck[] = [
  {
    id: 1,
    name: "Opening Line Check",
    time: "8:00 AM",
    status: "Complete",
    progress: "18 of 18 items",
  },
  {
    id: 2,
    name: "Mid-Shift Line Check",
    time: "1:00 PM",
    status: "In progress",
    progress: "9 of 16 items",
  },
  {
    id: 3,
    name: "Closing Line Check",
    time: "9:30 PM",
    status: "Upcoming",
    progress: "0 of 14 items",
  },
];