import {
  Camera,
  CheckSquare2,
  Clock3,
  FileText,
  Hash,
  ShieldAlert,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

export type ChecklistTaskType =
  | "checkbox"
  | "temperature"
  | "photo"
  | "notes"
  | "number"
  | "time"
  | "corrective-action";

export type ChecklistTaskTypeOption = {
  type: ChecklistTaskType;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const checklistTaskTypes: ChecklistTaskTypeOption[] = [
  {
    type: "checkbox",
    title: "Checkbox task",
    description: "A simple task employees mark as complete.",
    icon: CheckSquare2,
  },
  {
    type: "temperature",
    title: "Temperature check",
    description: "Record a temperature with safe minimum and maximum limits.",
    icon: Thermometer,
  },
  {
    type: "photo",
    title: "Photo required",
    description: "Require an employee to upload a photo before completing the task.",
    icon: Camera,
  },
  {
    type: "notes",
    title: "Notes",
    description: "Allow an employee to enter written details or observations.",
    icon: FileText,
  },
  {
    type: "number",
    title: "Number",
    description: "Record a numeric value such as quantity, weight, or measurement.",
    icon: Hash,
  },
  {
    type: "time",
    title: "Time",
    description: "Record a specific time for an operational event.",
    icon: Clock3,
  },
  {
    type: "corrective-action",
    title: "Corrective action",
    description: "Document the action taken when a safety or operational issue occurs.",
    icon: ShieldAlert,
  },
];