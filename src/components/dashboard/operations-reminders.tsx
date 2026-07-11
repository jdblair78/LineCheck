"use client";

import {
  AlertTriangle,
  CalendarDays,
  Package,
  ShoppingBasket,
  Truck,
} from "lucide-react";

type ReminderTone =
  | "default"
  | "success"
  | "warning"
  | "danger";

type ReminderPriority = 1 | 2 | 3;

type Reminder = {
  id: number;
  label: string;
  value: string;
  detail: string;
  dueDay: number;
  icon: typeof AlertTriangle;
  tone: ReminderTone;
  priority: ReminderPriority;
  alwaysShow?: boolean;
};

const reminders: Reminder[] = [
  {
    id: 1,
    label: "Corrective Actions",
    value: "1 Outstanding",
    detail: "Prep Cooler requires review",
    dueDay: 0,
    icon: AlertTriangle,
    tone: "danger",
    priority: 1,
    alwaysShow: true,
  },
  {
    id: 2,
    label: "Produce Order",
    value: "Due Today",
    detail: "Review inventory before 2:00 PM",
    dueDay: 2,
    icon: ShoppingBasket,
    tone: "warning",
    priority: 2,
  },
  {
    id: 3,
    label: "Truck Order",
    value: "Due Today",
    detail: "Finalize order before 8:00 PM",
    dueDay: 4,
    icon: Truck,
    tone: "default",
    priority: 2,
  },
  {
    id: 4,
    label: "Smallwares Order",
    value: "Due Today",
    detail: "Cups, lids, gloves, and cleaning supplies",
    dueDay: 5,
    icon: Package,
    tone: "success",
    priority: 3,
  },
  {
    id: 5,
    label: "Post Schedule",
    value: "Due Today",
    detail: "Publish next week’s employee schedule",
    dueDay: 0,
    icon: CalendarDays,
    tone: "warning",
    priority: 2,
  },
];

const toneStyles: Record<ReminderTone, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-destructive/10 text-destructive",
};

const priorityLabels: Record<ReminderPriority, string> = {
  1: "High priority",
  2: "Due today",
  3: "Upcoming",
};

const showAllReminders = true; // Set to true to show all reminders regardless of due day

export default function OperationsReminders() {
  const today = new Date().getDay();

  const visibleReminders = reminders
    .filter((reminder) => {
      if (showAllReminders) {
        return true;
      }

      return (
        reminder.alwaysShow ||
        reminder.dueDay === today
      );
    })
    .sort((a, b) => a.priority - b.priority);

  return (
    <aside className="w-full rounded-2xl border bg-background/85 p-4 shadow-sm backdrop-blur xl:max-w-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">
            Today&apos;s priorities
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Tasks and follow-ups requiring attention
          </p>
        </div>

        <div className="rounded-full bg-warning/15 px-3 py-1.5 text-xs font-medium text-warning-foreground">
          {visibleReminders.length} items
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {visibleReminders.map((reminder) => {
          const Icon = reminder.icon;

          return (
            <button
              key={reminder.id}
              type="button"
              className="rounded-xl border bg-card/80 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                    toneStyles[reminder.tone]
                  }`}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {reminder.label}
                    </p>

                    {reminder.priority === 1 && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                        {priorityLabels[reminder.priority]}
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 font-semibold">
                    {reminder.value}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {reminder.detail}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}