import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function EquipmentAlert() {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Equipment alerts
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Equipment showing repeated unsafe readings.
      </p>

      <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <p className="font-semibold">Prep Cooler</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Flagged twice in the last seven days.
                </p>
              </div>

              <span className="w-fit rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                High priority
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border bg-background/70 p-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Latest reading
                </p>

                <p className="mt-1 text-xl font-bold">43°F</p>
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

            <Link
              href="/equipment"
              className="mt-4 block w-full rounded-lg bg-destructive px-4 py-2.5 text-center text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
            >
              Review corrective action
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}