import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
  tone?: "default" | "success" | "warning" | "danger";
};

const toneStyles = {
  default: {
    icon: "bg-primary/10 text-primary",
    trend: "text-muted-foreground",
  },
  success: {
    icon: "bg-success/10 text-success",
    trend: "text-success",
  },
  warning: {
    icon: "bg-warning/15 text-warning-foreground",
    trend: "text-warning-foreground",
  },
  danger: {
    icon: "bg-destructive/10 text-destructive",
    trend: "text-destructive",
  },
};

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  tone = "default",
}: MetricCardProps) {
  const styles = toneStyles[tone];

  return (
    <article className="group rounded-2xl border bg-card p-5 text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            styles.icon
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        {trend && (
          <span className={cn("font-medium", styles.trend)}>
            {trend}
          </span>
        )}

        <span className="text-muted-foreground">
          {description}
        </span>
      </div>
    </article>
  );
}