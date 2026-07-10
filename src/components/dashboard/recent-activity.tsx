import { cn } from "@/lib/utils";

type ActivityStatus = "success" | "warning" | "danger";

type Activity = {
  id: number;
  title: string;
  description: string;
  time: string;
  status: ActivityStatus;
};

type RecentActivityProps = {
  activities: Activity[];
};

const dotClasses: Record<ActivityStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Recent activity
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Latest actions across your restaurant.
      </p>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-2">
              <div
                className={cn(
                  "size-2.5 rounded-full",
                  dotClasses[activity.status]
                )}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row">
                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="shrink-0 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}