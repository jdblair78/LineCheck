import ComplianceChart from "@/components/dashboard/compliance-chart";
import EquipmentAlert from "@/components/dashboard/equipment-alert";
import MetricCard from "@/components/dashboard/metric-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import TodaysChecks from "@/components/dashboard/todays-checks";
import DashboardHero from "@/components/dashboard/dashboard-hero";

import {
  dashboardMetrics,
  recentActivity,
  todaysChecks,
  getWeeklyComplianceData,
} from "@/lib/constants/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardHero />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {dashboardMetrics.map((metric) => (
    <MetricCard
      key={metric.title}
      title={metric.title}
      value={metric.value}
      description={metric.description}
      trend={metric.trend}
      progress={metric.progress}
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