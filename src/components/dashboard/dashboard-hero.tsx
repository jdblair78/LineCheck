"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ClipboardCheck,
  Users,
} from "lucide-react";

const overviewItems = [
  {
    label: "Line checks",
    value: "3 scheduled",
    icon: ClipboardCheck,
    tone: "success",
  },
  {
    label: "Equipment alerts",
    value: "1 needs review",
    icon: AlertTriangle,
    tone: "danger",
  },
  {
    label: "Team members",
    value: "6 scheduled",
    icon: Users,
    tone: "default",
  },
  {
    label: "Next inspection",
    value: "12 days",
    icon: CalendarDays,
    tone: "warning",
  },
] as const;

const toneStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-destructive/10 text-destructive",
};

function getGreeting(date: Date) {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default function DashboardHero() {
  const [currentDate] = useState<Date>(() => new Date());

  const greeting = currentDate
    ? getGreeting(currentDate)
    : "Welcome back";

  const formattedDate = currentDate
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(currentDate)
    : "Loading today’s overview...";

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="relative px-6 py-7 md:px-8 md:py-9">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">
              {formattedDate}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {greeting}, Joshua
              <span aria-hidden="true"> 👋</span>
            </h1>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Here is today’s food safety, team, and restaurant
              operations overview.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>

            <span className="font-medium">
              Restaurant operating normally
            </span>
          </div>
        </div>
      </div>

      <div className="grid border-t sm:grid-cols-2 xl:grid-cols-4">
        {overviewItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={[
                "flex items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/40",
                index > 0 ? "border-t sm:border-t-0" : "",
                index === 1 ? "sm:border-l" : "",
                index === 2
                  ? "xl:border-l"
                  : "",
                index === 3
                  ? "sm:border-l xl:border-l"
                  : "",
                index === 2
                  ? "sm:border-t xl:border-t-0"
                  : "",
                index === 3
                  ? "sm:border-t xl:border-t-0"
                  : "",
              ].join(" ")}
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                  toneStyles[item.tone]
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>

                <p className="mt-0.5 font-semibold">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}