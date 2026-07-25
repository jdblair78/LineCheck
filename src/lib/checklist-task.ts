import type { ChecklistTaskType } from "@/lib/checklist-task-types";

export type ChecklistTask = {
  id: string;
  checklistId: string;
  type: ChecklistTaskType;
  title: string;
  instructions: string;
  required: boolean;
  position: number;
  createdAt: string;

  minimumValue?: number;
  maximumValue?: number;
  unit?: string;

  correctiveAction?: string;
};