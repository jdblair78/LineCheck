"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ListChecks,
  MapPin,
  Plus,
  CheckSquare,
  Camera,
  FileText,
  Hash,
  Thermometer,
  TriangleAlert,
  Trash2,
  Pencil,
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

function getTaskTypeIcon(type: ChecklistTaskType) {
  switch (type) {
    case "checkbox":
      return CheckSquare;

    case "temperature":
      return Thermometer;

    case "photo":
      return Camera;

    case "notes":
      return FileText;

    case "number":
      return Hash;

    case "time":
      return Clock3;

    case "corrective-action":
      return TriangleAlert;

    default:
      return CheckSquare;
  }
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ChecklistDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isTaskPickerOpen, setIsTaskPickerOpen] = useState(false);

  useEffect(() => {
  const shouldOpenTaskPicker =
    searchParams.get("addTask") === "true";

  if (!shouldOpenTaskPicker) {
    return;
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsTaskPickerOpen(true);

  router.replace(`/checklists/${params.id}`);
}, [searchParams, router, params.id]);

  const [isTaskEditorOpen, setIsTaskEditorOpen] = useState(false);

  const [selectedTaskType, setSelectedTaskType] =
    useState<ChecklistTaskType | null>(null);

  const [tasks, setTasks] = useState<ChecklistTask[]>([]);

  const [editingTask, setEditingTask] = useState<ChecklistTask | null>(null);

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

      const parsedTasks = JSON.parse(storedTasks) as ChecklistTask[];

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
    const updatedTasks = editingTask
      ? tasks.map((currentTask) =>
          currentTask.id === task.id ? task : currentTask,
        )
      : [...tasks, task];

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
    setEditingTask(null);
  }

  function handleTaskDelete(taskId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId);

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
  }

  function handleTaskEdit(task: ChecklistTask) {
    setEditingTask(task);
    setSelectedTaskType(task.type);
    setIsTaskEditorOpen(true);
  }

  function handleTaskEditorClose() {
    setIsTaskEditorOpen(false);
    setSelectedTaskType(null);
    setEditingTask(null);
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

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setIsTaskPickerOpen(true)}
          >
            <Plus />
            Add task
          </Button>
        </div>
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
            <TaskList
              tasks={tasks}
              onEdit={handleTaskEdit}
              onDelete={handleTaskDelete}
            />
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
        existingTask={editingTask}
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
  onEdit: (task: ChecklistTask) => void;
  onDelete: (taskId: string) => void;
};

function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => {
        const TaskIcon = getTaskTypeIcon(task.type);

        const hasRange =
          task.minimumValue !== undefined || task.maximumValue !== undefined;

        return (
          <div
            key={task.id}
            className="group rounded-xl border bg-card p-4 transition-colors hover:bg-muted/30"
          >
            <div className="flex items-start gap-4">
              {/* Task icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                <TaskIcon className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Task information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Task {index + 1}
                  </span>

                  <Badge variant="outline">{formatLabel(task.type)}</Badge>

                  {task.required && <Badge variant="warning">Required</Badge>}
                </div>

                <h3 className="mt-2 font-semibold text-foreground">
                  {task.title}
                </h3>

                {task.instructions && (
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {task.instructions}
                  </p>
                )}

                {/* Minimum / maximum values */}
                {hasRange && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {task.minimumValue !== undefined && (
                      <div className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        Min:{" "}
                        <span className="font-medium text-foreground">
                          {task.minimumValue}
                          {task.unit ? ` ${task.unit}` : ""}
                        </span>
                      </div>
                    )}

                    {task.maximumValue !== undefined && (
                      <div className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        Max:{" "}
                        <span className="font-medium text-foreground">
                          {task.maximumValue}
                          {task.unit ? ` ${task.unit}` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Corrective action */}
                {task.correctiveAction && (
                  <div className="mt-3 flex gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
                    <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />

                    <div>
                      <p className="text-xs font-semibold">Corrective action</p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.correctiveAction}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Edit ${task.title}`}
                title="Edit task"
                onClick={() => onEdit(task)}
              >
                <Pencil />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive"
                aria-label={`Delete ${task.title}`}
                title="Delete task"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        );
      })}
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
