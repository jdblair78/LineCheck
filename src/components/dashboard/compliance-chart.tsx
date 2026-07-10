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
  day: string;
  compliance: number;
};

type ComplianceChartProps = {
  data: ComplianceDataPoint[];
};

export default function ComplianceChart({
  data,
}: ComplianceChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-border"
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            className="text-xs"
          />

          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            className="text-xs"
          />

          <Tooltip
            formatter={(value) => [`${value}%`, "Compliance"]}
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
            dot={{
              r: 4,
              fill: "var(--card)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}