"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ComplianceDataPoint = {
  date: string;
  compliance: number;
};

type ComplianceChartProps = {
  data: ComplianceDataPoint[];
};

export default function ComplianceChart({ data }: ComplianceChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-border"
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}%`}
            width={50}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value) => {
              const numericValue = Number(value);

              return [
                `${Number.isNaN(numericValue) ? 0 : Math.round(numericValue)}%`,
                "Compliance",
              ];
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--card-foreground)",
            }}
          />

          <Line
            type="monotone"
            dataKey="compliance"
            stroke="var(--primary)"
            strokeWidth={3}
            isAnimationActive
            animationDuration={900}
            dot={{
              r: 4,
              fill: "var(--card)",
              stroke: "var(--primary)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "var(--primary)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
