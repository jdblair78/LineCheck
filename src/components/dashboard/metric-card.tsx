"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricIcon =
  | "clipboard-check"
  | "trending-up"
  | "alert-triangle"
  | "check-circle-2";

type MetricTone = "default" | "success" | "warning" | "danger";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: MetricIcon;
  trend?: string;
  tone?: MetricTone;
  progress?: number;
  featured?: boolean;
};

const metricIcons: Record<MetricIcon, LucideIcon> = {
  "clipboard-check": ClipboardCheck,
  "trending-up": TrendingUp,
  "alert-triangle": AlertTriangle,
  "check-circle-2": CheckCircle2,
};

const toneStyles: Record<
  MetricTone,
  {
    icon: string;
    glow: string;
    trend: string;
    progress: string;
  }
> = {
  default: {
    icon: "bg-primary/10 text-primary",
    glow: "bg-primary/20",
    trend: "text-primary",
    progress: "bg-primary",
  },
  success: {
    icon: "bg-success/10 text-success",
    glow: "bg-success/20",
    trend: "text-success",
    progress: "bg-success",
  },
  warning: {
    icon: "bg-warning/15 text-warning-foreground",
    glow: "bg-warning/20",
    trend: "text-warning-foreground",
    progress: "bg-warning",
  },
  danger: {
    icon: "bg-destructive/10 text-destructive",
    glow: "bg-destructive/20",
    trend: "text-destructive",
    progress: "bg-destructive",
  },
};

function getNumericValue(value: string) {
  const match = value.match(/\d+/);

  return match ? Number(match[0]) : null;
}

function formatAnimatedValue(originalValue: string, currentValue: number) {
  if (originalValue.includes("%")) {
    return `${currentValue}%`;
  }

  if (originalValue.includes("days")) {
    return `${currentValue} days`;
  }

  if (originalValue.includes("of")) {
    const total = originalValue.split("of")[1]?.trim();

    return total ? `${currentValue} of ${total}` : String(currentValue);
  }

  return String(currentValue);
}

export default function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  tone = "default",
  progress,
  featured = false,
}: MetricCardProps) {
  const styles = toneStyles[tone];
  const Icon = metricIcons[icon];
  const numericTarget = getNumericValue(value);

  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (numericTarget === null) {
      return;
    }

    const target = numericTarget;
    let frameId: number;
    const duration = 700;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const percentage = Math.min(elapsed / duration, 1);
      const nextValue = Math.round(target * percentage);

      setAnimatedValue(nextValue);

      if (percentage < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [numericTarget]);

  const displayedValue =
    numericTarget === null ? value : formatAnimatedValue(value, animatedValue);

  return (
    <article
  className={cn(
    "group relative overflow-hidden rounded-2xl border bg-card p-5 text-card-foreground",
    "shadow-sm transition-all duration-300",
    "hover:-translate-y-1 hover:shadow-lg",
    featured && "border-primary/30"
  )}
>
  <div
    className={cn(
      "pointer-events-none absolute -right-8 -top-10 size-28 rounded-full blur-3xl",
      "opacity-0 transition-opacity duration-300 group-hover:opacity-35",
      styles.progress
    )}
  />

  <div className="relative">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          {featured && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              Today
            </span>
          )}
        </div>

        <p className="mt-3 text-3xl font-bold tracking-tight">
          {displayedValue}
        </p>
      </div>

      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-sm",
          "transition-transform duration-300 group-hover:scale-110",
          styles.icon
        )}
      >
        <Icon className="size-5" />
      </div>
    </div>

    <div className="mt-4 flex min-h-5 items-center gap-2 text-sm">
      {trend && (
        <span className={cn("font-semibold", styles.trend)}>
          {trend}
        </span>
      )}

      <span className="text-muted-foreground">
        {description}
      </span>
    </div>

    {typeof progress === "number" && (
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Progress
          </span>

          <span className="font-medium">
            {progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              "group-hover:brightness-110",
              styles.progress
            )}
            style={{
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
            }}
          />
        </div>
      </div>
    )}
  </div>
</article>
  );
}
