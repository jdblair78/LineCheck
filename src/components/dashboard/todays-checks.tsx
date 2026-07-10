import Link from "next/link";
import { Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckStatus = "Complete" | "In progress" | "Upcoming";

type Check = {
  id: number;
  name: string;
  time: string;
  status: CheckStatus;
  progress: string;
};

type TodaysChecksProps = {
  checks: Check[];
};

const statusClasses: Record<CheckStatus, string> = {
  Complete: "bg-success/10 text-success",
  "In progress": "bg-warning/15 text-warning-foreground",
  Upcoming: "bg-muted text-muted-foreground",
};

export default function TodaysChecks({
  checks,
}: TodaysChecksProps) {
  return (
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

        <Link
          href="/checklists"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {checks.map((check) => (
          <div
            key={check.id}
            className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Clock3 className="size-5 text-muted-foreground" />
              </div>

              <div>
                <p className="font-medium">{check.name}</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Scheduled for {check.time} · {check.progress}
                </p>
              </div>
            </div>

            <span
              className={cn(
                "w-fit rounded-full px-3 py-1 text-xs font-medium",
                statusClasses[check.status]
              )}
            >
              {check.status}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}