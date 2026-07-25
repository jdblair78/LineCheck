"use client";

import { X } from "lucide-react";

import {
  checklistTaskTypes,
  type ChecklistTaskType,
} from "@/lib/checklist-task-types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type TaskTypePickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (type: ChecklistTaskType) => void;
};

export function TaskTypePicker({
  open,
  onClose,
  onSelect,
}: TaskTypePickerProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-type-picker-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            <h2
              id="task-type-picker-title"
              className="text-xl font-semibold tracking-tight"
            >
              Add a task
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose the type of task employees will complete.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close task type picker"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="grid gap-3 p-6 sm:grid-cols-2">
          {checklistTaskTypes.map((taskType) => {
            const Icon = taskType.icon;

            return (
              <button
                key={taskType.type}
                type="button"
                className="group rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => onSelect(taskType.type)}
              >
                <Card
                  hover
                  className="h-full transition-colors group-hover:border-primary/40"
                >
                  <CardContent className="flex h-full items-start gap-4 p-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {taskType.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {taskType.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        <footer className="flex justify-end border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </footer>
      </div>
    </div>
  );
}