import { ArrowUpRight, Target } from "lucide-react";

import ComplianceChart from "@/components/dashboard/compliance-chart";

type ComplianceDataPoint = {
  date: string;
  compliance: number;
};

type CompliancePanelProps = {
  data: ComplianceDataPoint[];
};

export default function CompliancePanel({
  data,
}: CompliancePanelProps) {
  const latest = data.at(-1)?.compliance ?? 0;
  const previous = data.at(-2)?.compliance ?? 0;
  const change = latest - previous;

  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col justify-between gap-5 border-b p-6 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
        </div>

        <div className="sm:text-right">
          <p className="text-3xl font-bold tracking-tight">
            {latest}%
          </p>

          <div className="mt-1 flex items-center gap-1 text-sm sm:justify-end">
            <ArrowUpRight className="size-4 text-success" />

            <span className="font-semibold text-success">
              {change >= 0 ? "+" : ""}
              {change}%
            </span>

            <span className="text-muted-foreground">
              from yesterday
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <ComplianceChart data={data} />
      </div>

      <div className="grid border-t sm:grid-cols-3">
        <ComplianceStat
          label="Weekly average"
          value={`${Math.round(
            data.reduce(
              (total, item) => total + item.compliance,
              0
            ) / data.length
          )}%`}
        />

        <ComplianceStat
          label="Goal"
          value="95%"
          bordered
        />

        <ComplianceStat
          label="Best day"
          value={`${Math.max(
            ...data.map((item) => item.compliance)
          )}%`}
          bordered
        />
      </div>
    </article>
  );
}

type ComplianceStatProps = {
  label: string;
  value: string;
  bordered?: boolean;
};

function ComplianceStat({
  label,
  value,
  bordered = false,
}: ComplianceStatProps) {
  return (
    <div
      className={[
        "px-6 py-4",
        bordered ? "border-t sm:border-l sm:border-t-0" : "",
      ].join(" ")}
    >
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}