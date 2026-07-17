import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Target,
} from "lucide-react";

import ComplianceChart from "@/components/dashboard/compliance-chart";

type ComplianceDataPoint = {
  date: string;
  compliance: number;
};

type CompliancePanelProps = {
  data: ComplianceDataPoint[];
};

const COMPLIANCE_GOAL = 100;

export default function CompliancePanel({
  data,
}: CompliancePanelProps) {
  const hasData = data.length > 0;

  const latest = data.at(-1)?.compliance ?? 0;
  const previous = data.at(-2)?.compliance ?? latest;
  const change = latest - previous;

  const weeklyAverage = hasData
    ? Math.round(
        data.reduce(
          (total, item) => total + item.compliance,
          0
        ) / data.length
      )
    : 0;

  const bestDay = hasData
    ? data.reduce((best, current) =>
        current.compliance > best.compliance
          ? current
          : best
      )
    : null;

  const TrendIcon =
    change > 0
      ? ArrowUpRight
      : change < 0
        ? ArrowDownRight
        : ArrowRight;

  const trendColor =
    change > 0
      ? "text-success"
      : change < 0
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col justify-between gap-5 border-b p-6 sm:flex-row sm:items-start">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="size-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Weekly compliance
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Completed checks across the last seven days.
            </p>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-3xl font-bold tracking-tight">
            {latest}%
          </p>

          <div
            className={`mt-1 flex items-center gap-1 text-sm sm:justify-end ${trendColor}`}
          >
            <TrendIcon className="size-4" />

            <span className="font-semibold">
              {change > 0 ? "+" : ""}
              {change}%
            </span>

            <span className="text-muted-foreground">
              from yesterday
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {hasData ? (
          <ComplianceChart data={data} />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed">
            <p className="text-sm text-muted-foreground">
              No compliance data is available yet.
            </p>
          </div>
        )}
      </div>

      <div className="grid border-t sm:grid-cols-3">
        <ComplianceStat
          label="Weekly average"
          value={`${weeklyAverage}%`}
          description={
            weeklyAverage >= COMPLIANCE_GOAL
              ? "Goal achieved"
              : `${COMPLIANCE_GOAL - weeklyAverage}% below goal`
          }
        />

        <ComplianceStat
          label="Goal"
          value={`${COMPLIANCE_GOAL}%`}
          description="Weekly target"
          bordered
        />

        <ComplianceStat
          label="Best day"
          value={
            bestDay
              ? `${bestDay.compliance}%`
              : "—"
          }
          description={bestDay?.date ?? "No data yet"}
          bordered
        />
      </div>
    </article>
  );
}

type ComplianceStatProps = {
  label: string;
  value: string;
  description?: string;
  bordered?: boolean;
};

function ComplianceStat({
  label,
  value,
  description,
  bordered = false,
}: ComplianceStatProps) {
  return (
    <div
      className={[
        "px-6 py-4",
        bordered
          ? "border-t sm:border-l sm:border-t-0"
          : "",
      ].join(" ")}
    >
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}