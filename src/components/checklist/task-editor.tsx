"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { ChecklistTask } from "@/lib/checklist-task";
import {
  checklistTaskTypes,
  type ChecklistTaskType,
} from "@/lib/checklist-task-types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

type TaskEditorProps = {
  open: boolean;
  checklistId: string;
  taskType: ChecklistTaskType | null;
  position: number;
  onClose: () => void;
  onSave: (task: ChecklistTask) => void;
};

export function TaskEditor({
  open,
  checklistId,
  taskType,
  position,
  onClose,
  onSave,
}: TaskEditorProps) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [required, setRequired] = useState(true);

  const [minimumValue, setMinimumValue] = useState("");
  const [maximumValue, setMaximumValue] = useState("");
  const [unit, setUnit] = useState("");

  const [correctiveAction, setCorrectiveAction] =
    useState("");

  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setTitle("");
    setInstructions("");
    setRequired(true);
    setMinimumValue("");
    setMaximumValue("");
    setUnit(getDefaultUnit(taskType));
    setCorrectiveAction("");
    setTitleError("");
  }, [open, taskType]);

  if (!open || !taskType) {
    return null;
  }

  const taskTypeOption = checklistTaskTypes.find(
    (option) => option.type === taskType,
  );

  const Icon = taskTypeOption?.icon;

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError("Enter a name for this task.");
      return;
    }

    const task: ChecklistTask = {
      id: crypto.randomUUID(),
      checklistId,
      type: taskType,
      title: title.trim(),
      instructions: instructions.trim(),
      required,
      position,
      createdAt: new Date().toISOString(),
      minimumValue: parseOptionalNumber(minimumValue),
      maximumValue: parseOptionalNumber(maximumValue),
      unit: unit.trim() || undefined,
      correctiveAction:
        correctiveAction.trim() || undefined,
    };

    onSave(task);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-editor-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b px-6 py-5">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="task-editor-title"
                  className="text-xl font-semibold tracking-tight"
                >
                  Add {taskTypeOption?.title}
                </h2>

                <Badge variant="muted">
                  {taskTypeOption?.title}
                </Badge>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Configure what employees must complete.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close task editor"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            <FormField>
              <FormLabel htmlFor="task-title">
                Task name
              </FormLabel>

              <Input
                id="task-title"
                value={title}
                hasError={Boolean(titleError)}
                placeholder={getTitlePlaceholder(taskType)}
                onChange={(event) => {
                  setTitle(event.target.value);

                  if (titleError) {
                    setTitleError("");
                  }
                }}
              />

              <FormDescription>
                Use a short, clear instruction employees can
                understand quickly.
              </FormDescription>

              {titleError && (
                <FormMessage>{titleError}</FormMessage>
              )}
            </FormField>

            <FormField>
              <FormLabel htmlFor="task-instructions">
                Instructions
              </FormLabel>

              <textarea
                id="task-instructions"
                value={instructions}
                rows={4}
                placeholder="Add any details employees need to complete this task correctly."
                className="flex w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                onChange={(event) =>
                  setInstructions(event.target.value)
                }
              />

              <FormDescription>
                Optional guidance, standards, or additional
                information.
              </FormDescription>
            </FormField>

            {taskType === "temperature" && (
              <TemperatureFields
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                unit={unit}
                onMinimumChange={setMinimumValue}
                onMaximumChange={setMaximumValue}
                onUnitChange={setUnit}
              />
            )}

            {taskType === "number" && (
              <NumberFields
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                unit={unit}
                onMinimumChange={setMinimumValue}
                onMaximumChange={setMaximumValue}
                onUnitChange={setUnit}
              />
            )}

            {taskType === "corrective-action" && (
              <FormField>
                <FormLabel htmlFor="corrective-action">
                  Required action
                </FormLabel>

                <textarea
                  id="corrective-action"
                  value={correctiveAction}
                  rows={4}
                  placeholder="Describe the action employees must take to resolve the issue."
                  className="flex w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  onChange={(event) =>
                    setCorrectiveAction(event.target.value)
                  }
                />
              </FormField>
            )}

            <Card>
              <CardContent className="p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={required}
                    className="mt-1 size-4 rounded border-input accent-primary"
                    onChange={(event) =>
                      setRequired(event.target.checked)
                    }
                  />

                  <span>
                    <span className="block text-sm font-medium">
                      Required task
                    </span>

                    <span className="mt-1 block text-sm text-muted-foreground">
                      Employees must complete this task before
                      submitting the checklist.
                    </span>
                  </span>
                </label>
              </CardContent>
            </Card>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save task
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}

type MeasurementFieldsProps = {
  minimumValue: string;
  maximumValue: string;
  unit: string;
  onMinimumChange: (value: string) => void;
  onMaximumChange: (value: string) => void;
  onUnitChange: (value: string) => void;
};

function TemperatureFields({
  minimumValue,
  maximumValue,
  unit,
  onMinimumChange,
  onMaximumChange,
  onUnitChange,
}: MeasurementFieldsProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-3">
      <FormField>
        <FormLabel htmlFor="minimum-temperature">
          Minimum
        </FormLabel>

        <Input
          id="minimum-temperature"
          type="number"
          value={minimumValue}
          placeholder="34"
          onChange={(event) =>
            onMinimumChange(event.target.value)
          }
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="maximum-temperature">
          Maximum
        </FormLabel>

        <Input
          id="maximum-temperature"
          type="number"
          value={maximumValue}
          placeholder="41"
          onChange={(event) =>
            onMaximumChange(event.target.value)
          }
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="temperature-unit">
          Unit
        </FormLabel>

        <select
          id="temperature-unit"
          value={unit}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          onChange={(event) =>
            onUnitChange(event.target.value)
          }
        >
          <option value="°F">°F</option>
          <option value="°C">°C</option>
        </select>
      </FormField>
    </div>
  );
}

function NumberFields({
  minimumValue,
  maximumValue,
  unit,
  onMinimumChange,
  onMaximumChange,
  onUnitChange,
}: MeasurementFieldsProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-3">
      <FormField>
        <FormLabel htmlFor="minimum-number">
          Minimum
        </FormLabel>

        <Input
          id="minimum-number"
          type="number"
          value={minimumValue}
          placeholder="0"
          onChange={(event) =>
            onMinimumChange(event.target.value)
          }
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="maximum-number">
          Maximum
        </FormLabel>

        <Input
          id="maximum-number"
          type="number"
          value={maximumValue}
          placeholder="100"
          onChange={(event) =>
            onMaximumChange(event.target.value)
          }
        />
      </FormField>

      <FormField>
        <FormLabel htmlFor="number-unit">
          Unit
        </FormLabel>

        <Input
          id="number-unit"
          value={unit}
          placeholder="Cases, pounds, count..."
          onChange={(event) =>
            onUnitChange(event.target.value)
          }
        />
      </FormField>
    </div>
  );
}

function getDefaultUnit(
  taskType: ChecklistTaskType | null,
) {
  if (taskType === "temperature") {
    return "°F";
  }

  return "";
}

function getTitlePlaceholder(
  taskType: ChecklistTaskType,
) {
  const placeholders: Record<ChecklistTaskType, string> = {
    checkbox: "Confirm handwashing station is stocked",
    temperature: "Record walk-in cooler temperature",
    photo: "Upload a photo of the cleaned grill",
    notes: "Document any maintenance concerns",
    number: "Record the number of prepared trays",
    time: "Record when the delivery arrived",
    "corrective-action":
      "Resolve food held outside the safe temperature range",
  };

  return placeholders[taskType];
}

function parseOptionalNumber(value: string) {
  if (!value.trim()) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue)
    ? undefined
    : parsedValue;
}