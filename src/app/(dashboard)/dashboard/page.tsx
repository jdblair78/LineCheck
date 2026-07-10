import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

import MetricCard from "@/components/dashboard/metric-card";

const metrics = [
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

const checks = [
  {
    name: "Opening Check",
    time: "6:00 AM",
    status: "Complete",
    progress: "18 of 18 items",
  },
  {
    name: "Mid-Shift Check",
    time: "2:00 PM",
    status: "In progress",
    progress: "9 of 16 items",
  },
  {
    name: "Closing Check",
    time: "9:00 PM",
    status: "Upcoming",
    progress: "Not started",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Friday, July 10
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
        {metrics.map((metric) => (
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
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Today’s line checks
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Monitor scheduled checks and shift progress.
              </p>
            </div>

            <button className="text-sm font-medium text-primary hover:underline">
              View all
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {checks.map((check) => (
              <CheckRow
                key={check.name}
                name={check.name}
                time={check.time}
                status={check.status}
                progress={check.progress}
              />
            ))}
          </div>
        </article>

        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">
              Equipment alerts
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Equipment showing repeated unsafe readings.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="size-5 text-destructive" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      Prep Cooler
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Flagged twice in the last seven days.
                    </p>
                  </div>

                  <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                    High priority
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-lg border bg-background/70 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Latest reading
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      43°F
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Safe range
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      33–40°F
                    </p>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90">
                  Review corrective action
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Weekly compliance
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Completed checks during the current week.
          </p>

          <div className="mt-8 flex h-48 items-end justify-between gap-3">
            <ComplianceBar day="Mon" value={82} />
            <ComplianceBar day="Tue" value={94} />
            <ComplianceBar day="Wed" value={100} />
            <ComplianceBar day="Thu" value={88} />
            <ComplianceBar day="Fri" value={96} />
            <ComplianceBar day="Sat" value={72} />
            <ComplianceBar day="Sun" value={90} />
          </div>
        </article>

        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Recent activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest actions across your restaurant.
          </p>

          <div className="mt-6 space-y-5">
            <ActivityItem
              title="Opening Check completed"
              description="Joshua completed all 18 items."
              time="2 hours ago"
              status="success"
            />

            <ActivityItem
              title="Prep Cooler flagged"
              description="Temperature recorded at 43°F."
              time="3 hours ago"
              status="danger"
            />

            <ActivityItem
              title="Mid-Shift Check started"
              description="Nine of sixteen items completed."
              time="25 minutes ago"
              status="warning"
            />
          </div>
        </article>
      </section>
    </div>
  );
}

type CheckRowProps = {
  name: string;
  time: string;
  status: string;
  progress: string;
};

function CheckRow({
  name,
  time,
  status,
  progress,
}: CheckRowProps) {
  const statusClasses = {
    Complete: "bg-success/10 text-success",
    "In progress": "bg-warning/15 text-warning-foreground",
    Upcoming: "bg-muted text-muted-foreground",
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          <Clock3 className="size-5 text-muted-foreground" />
        </div>

        <div>
          <p className="font-medium">
            {name}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Scheduled for {time} · {progress}
          </p>
        </div>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {status}
      </span>
    </div>
  );
}

type ComplianceBarProps = {
  day: string;
  value: number;
};

function ComplianceBar({
  day,
  value,
}: ComplianceBarProps) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        {value}%
      </span>

      <div className="flex h-full w-full items-end overflow-hidden rounded-lg bg-muted">
        <div
          className="w-full rounded-lg bg-primary transition-all duration-500"
          style={{ height: `${value}%` }}
        />
      </div>

      <span className="text-xs text-muted-foreground">
        {day}
      </span>
    </div>
  );
}

type ActivityItemProps = {
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "danger";
};

function ActivityItem({
  title,
  description,
  time,
  status,
}: ActivityItemProps) {
  const dotClasses = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  };

  return (
    <div className="flex gap-4">
      <div className="mt-2">
        <div
          className={`size-2.5 rounded-full ${dotClasses[status]}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p className="font-medium">
            {title}
          </p>

          <p className="shrink-0 text-xs text-muted-foreground">
            {time}
          </p>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}