"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Checklist = {
  id: string;
  name: string;
  restaurant: string;
  category: string;
  shift: string;
  taskCount: number;
  updatedAt: string;
  status: "active" | "inactive";
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
  },
];

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ChecklistsPage() {
  const checklists = useMemo(() => {
    try {
      const storedChecklists = localStorage.getItem(
        "linecheck_demo_checklists",
      );

      if (!storedChecklists) {
        return sampleChecklists;
      }

      const demoChecklists = JSON.parse(storedChecklists) as Checklist[];

      const formattedDemoChecklists: Checklist[] = demoChecklists.map(
        (checklist) => ({
          ...checklist,
          category: formatLabel(checklist.category),
          shift: formatLabel(checklist.shift),
          updatedAt: "Just now",
        }),
      );

      return [...formattedDemoChecklists, ...sampleChecklists];
    } catch (error) {
      console.error("Unable to load demo checklists:", error);

      return sampleChecklists;
    }
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">Operations</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Checklists</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage operational checklists for your restaurants.
          </p>
        </div>

        <Button render={<Link href="/checklists/new" />}>
          <Plus className="size-4" />
          Create checklist
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {checklists.map((checklist) => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </section>
    </div>
  );
}

type ChecklistCardProps = {
  checklist: Checklist;
};

function ChecklistCard({ checklist }: ChecklistCardProps) {
  const isActive = checklist.status === "active";

  return (
    <Card hover className="overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-5" />
          </div>

          <div>
            <CardTitle className="text-base">{checklist.name}</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {checklist.restaurant}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Open actions for ${checklist.name}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
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

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Tasks</p>

            <p className="mt-1 text-sm font-semibold">{checklist.taskCount}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Last updated</p>

            <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <Clock3 className="size-3.5 text-muted-foreground" />
              {checklist.updatedAt}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          render={<Link href={`/checklists/${checklist.id}`} />}
        >
          View checklist
        </Button>
      </CardContent>
    </Card>
  );
}
