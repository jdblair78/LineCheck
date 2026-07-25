"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ListChecks,
  MapPin,
  Plus,
} from "lucide-react";

import { TaskEditor } from "@/components/checklist/task-editor";
import { TaskTypePicker } from "@/components/checklist/task-type-picker";

import type { ChecklistTask } from "@/lib/checklist-task";
import type { ChecklistTaskType } from "@/lib/checklist-task-types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChecklistStatus = "active" | "inactive";

type Checklist = {
  id: string;
  name: string;
  restaurant: string;
  category: string;
  shift: string;
  taskCount: number;
  updatedAt: string;
  status: ChecklistStatus;
  estimatedMinutes?: string;
  description?: string;
};

const sampleChecklists: Checklist[] = [
  {
    id: "1",
    name: "Morning Opening",
    restaurant: "Main Street Location",
    category: "Opening",
    shift: "Morning",
    taskCount: 12,
    updatedAt: "Today",
    status: "active",
    estimatedMinutes: "20",
    description:
      "Complete all opening procedures before the restaurant begins service.",
  },
  {
    id: "2",
    name: "Kitchen Line Check",
    restaurant: "Main Street Location",
    category: "Food Safety",
    shift: "Afternoon",
    taskCount: 18,
    updatedAt: "Yesterday",
    status: "active",
    estimatedMinutes: "15",
    description:
      "Verify food temperatures, sanitizer levels, cleanliness, and line readiness.",
  },
  {
    id: "3",
    name: "Walk-In Cooler Inspection",
    restaurant: "Main Street Location",
    category: "Equipment",
    shift: "Evening",
    taskCount: 8,
    updatedAt: "3 days ago",
    status: "active",
    estimatedMinutes: "10",
    description:
      "Inspect cooler temperatures, storage conditions, cleanliness, and equipment operation.",
  },
  {
    id: "4",
    name: "Weekly Deep Clean",
    restaurant: "Main Street Location",
    category: "Cleaning",
    shift: "Weekly",
    taskCount: 22,
    updatedAt: "1 week ago",
    status: "inactive",
    estimatedMinutes: "60",
    description:
      "Complete the scheduled weekly cleaning and sanitation procedures.",
  },
];

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ChecklistDetailPage() {
  const params = useParams<{ id: string }>();

  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isTaskPickerOpen, setIsTaskPickerOpen] = useState(false);
  const [isTaskEditorOpen, setIsTaskEditorOpen] = useState(false);

  const [selectedTaskType, setSelectedTaskType] =
    useState<ChecklistTaskType | null>(null);

  const [tasks, setTasks] = useState<ChecklistTask[]>([]);

  useEffect(() => {
    try {
      const checklistId = params.id;

      const sampleChecklist = sampleChecklists.find(
        (item) => item.id === checklistId,
      );

      if (sampleChecklist) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setChecklist(sampleChecklist);
        return;
      }

      const storedChecklists = localStorage.getItem(
        "linecheck_demo_checklists",
      );

      if (!storedChecklists) {
        setChecklist(null);
        return;
      }

      const demoChecklists = JSON.parse(storedChecklists) as Checklist[];

      const demoChecklist = demoChecklists.find(
        (item) => item.id === checklistId,
      );

      if (!demoChecklist) {
        setChecklist(null);
        return;
      }

      setChecklist({
        ...demoChecklist,
        category: formatLabel(demoChecklist.category),
        shift: formatLabel(demoChecklist.shift),
        updatedAt: "Just now",
      });
    } catch (error) {
      console.error("Unable to load checklist:", error);
      setChecklist(null);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  /* eslint-disable react-hooks/set-state-in-effect */

useEffect(() => {
  try {
    const checklistId = params.id;

    const sampleChecklist = sampleChecklists.find(
      (item) => item.id === checklistId,
    );

    if (sampleChecklist) {
      setChecklist(sampleChecklist);
      return;
    }

    // remaining checklist-loading code...
  } finally {
    setIsLoading(false);
  }
}, [params.id]);

useEffect(() => {
  try {
    const storedTasks = localStorage.getItem(
      `linecheck_demo_tasks_${params.id}`,
    );

    if (!storedTasks) {
      return;
    }

    const parsedTasks = JSON.parse(
      storedTasks,
    ) as ChecklistTask[];

    setTasks(parsedTasks);

    setChecklist((currentChecklist) => {
      if (!currentChecklist) {
        return currentChecklist;
      }

      return {
        ...currentChecklist,
        taskCount: parsedTasks.length,
      };
    });
  } catch (error) {
    console.error("Unable to load checklist tasks:", error);
  }
}, [params.id]);

/* eslint-enable react-hooks/set-state-in-effect */
  function handleTaskTypeSelect(taskType: ChecklistTaskType) {
    setSelectedTaskType(taskType);
    setIsTaskPickerOpen(false);
    setIsTaskEditorOpen(true);
  }

  function handleTaskSave(task: ChecklistTask) {
    const updatedTasks = [...tasks, task];

    setTasks(updatedTasks);

    localStorage.setItem(
      `linecheck_demo_tasks_${params.id}`,
      JSON.stringify(updatedTasks),
    );

    setChecklist((currentChecklist) => {
      if (!currentChecklist) {
        return currentChecklist;
      }

      return {
        ...currentChecklist,
        taskCount: updatedTasks.length,
        updatedAt: "Just now",
      };
    });

    setIsTaskEditorOpen(false);
    setSelectedTaskType(null);
  }

  function handleTaskEditorClose() {
    setIsTaskEditorOpen(false);
    setSelectedTaskType(null);
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <Card>
          <CardContent className="flex min-h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading checklist...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          render={<Link href="/checklists" />}
        >
          <ArrowLeft />
          Back to checklists
        </Button>

        <Card>
          <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <ClipboardCheck className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-semibold">Checklist not found</h1>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              This checklist may have been removed, or the link may no longer be
              valid.
            </p>

            <Button className="mt-5" render={<Link href="/checklists" />}>
              View all checklists
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isActive = checklist.status === "active";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit"
        render={<Link href="/checklists" />}
      >
        <ArrowLeft />
        Back to checklists
      </Button>

      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="muted">{checklist.category}</Badge>

            <Badge variant="outline">
              <Clock3 />
              {checklist.shift}
            </Badge>

            <Badge variant={isActive ? "success" : "muted"}>
              {isActive && <CheckCircle2 />}
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            {checklist.name}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {checklist.description ||
              "Manage the checklist details and build the tasks employees will complete."}
          </p>
        </div>

        <Button type="button" onClick={() => setIsTaskPickerOpen(true)}>
          <Plus />
          Add task
        </Button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={MapPin}
          label="Restaurant"
          value={checklist.restaurant}
        />

        <InfoCard
          icon={Clock3}
          label="Estimated time"
          value={
            checklist.estimatedMinutes
              ? `${checklist.estimatedMinutes} minutes`
              : "Not set"
          }
        />

        <InfoCard
          icon={ListChecks}
          label="Tasks"
          value={`${checklist.taskCount}`}
        />

        <InfoCard
          icon={ClipboardCheck}
          label="Last updated"
          value={checklist.updatedAt}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Checklist tasks</CardTitle>

          <CardDescription>
            Add and organize the steps employees must complete.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {tasks.length === 0 ? (
            <EmptyTaskState onAddTask={() => setIsTaskPickerOpen(true)} />
          ) : (
            <TaskList tasks={tasks} />
          )}
        </CardContent>
      </Card>

      <TaskTypePicker
        open={isTaskPickerOpen}
        onClose={() => setIsTaskPickerOpen(false)}
        onSelect={handleTaskTypeSelect}
      />

      <TaskEditor
        open={isTaskEditorOpen}
        checklistId={params.id}
        taskType={selectedTaskType}
        position={tasks.length}
        onClose={handleTaskEditorClose}
        onSave={handleTaskSave}
      />
    </div>
  );
}

type InfoCardProps = {
  icon: typeof MapPin;
  label: string;
  value: string;
};

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>

          <p className="mt-1 truncate text-sm font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

type TaskListProps = {
  tasks: ChecklistTask[];
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <Card key={task.id}>
          <CardContent className="flex items-start gap-4 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
              {index + 1}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{task.title}</p>

                <Badge variant="muted">{formatLabel(task.type)}</Badge>

                {task.required && <Badge variant="outline">Required</Badge>}
              </div>

              {task.instructions && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {task.instructions}
                </p>
              )}

              {(task.minimumValue !== undefined ||
                task.maximumValue !== undefined) && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Accepted range: {task.minimumValue ?? "No minimum"} to{" "}
                  {task.maximumValue ?? "No maximum"} {task.unit}
                </p>
              )}

              {task.correctiveAction && (
                <div className="mt-3 rounded-lg border border-warning/30 bg-warning/10 p-3">
                  <p className="text-xs font-semibold">Corrective action</p>

                  <p className="mt-1 text-sm">{task.correctiveAction}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

type EmptyTaskStateProps = {
  onAddTask: () => void;
};

function EmptyTaskState({ onAddTask }: EmptyTaskStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ListChecks className="size-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">No tasks added yet</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Add the first task to begin building this checklist. You can add
        temperature checks, photos, notes, numbers, and standard checkbox tasks.
      </p>

      <Button type="button" className="mt-5" onClick={onAddTask}>
        <Plus />
        Add first task
      </Button>
    </div>
  );
}
