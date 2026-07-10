import ComplianceChart from "@/components/dashboard/compliance-chart";
import EquipmentAlert from "@/components/dashboard/equipment-alert";
import MetricCard from "@/components/dashboard/metric-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import TodaysChecks from "@/components/dashboard/todays-checks";

import {
  dashboardMetrics,
  recentActivity,
  todaysChecks,
  getWeeklyComplianceData,
} from "@/lib/constants/dashboard-data";

export default function DashboardPage() {
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {todayLabel}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
            Good afternoon, Joshua
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here is today’s food safety and operations overview.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
          <span className="size-2 rounded-full bg-success" />

          <span className="font-medium">
            Restaurant operating normally
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            trend={metric.trend}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <TodaysChecks checks={todaysChecks} />
        <EquipmentAlert />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Weekly compliance
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Completed checks during the current week.
          </p>

          <div className="mt-6">
            <ComplianceChart data={getWeeklyComplianceData()} />
          </div>
        </article>

        <RecentActivity activities={recentActivity} />
      </section>
    </div>
  );
}