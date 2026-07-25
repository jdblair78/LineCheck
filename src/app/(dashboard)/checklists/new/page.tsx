"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Clock3, Save } from "lucide-react";

type DemoChecklist = ChecklistForm & {
  id: string;
  status: "active";
  taskCount: number;
  createdAt: string;
  updatedAt: string;
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

type ChecklistForm = {
  name: string;
  restaurant: string;
  category: string;
  shift: string;
  estimatedMinutes: string;
  description: string;
};

const initialForm: ChecklistForm = {
  name: "",
  restaurant: "",
  category: "",
  shift: "",
  estimatedMinutes: "",
  description: "",
};

export default function NewChecklistPage() {
  const router = useRouter();
  const isDemoMode = true;

  function saveDemoChecklist() {
    const newChecklist: DemoChecklist = {
      ...form,
      id: crypto.randomUUID(),
      status: "active",
      taskCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const storedChecklists = localStorage.getItem("linecheck_demo_checklists");

    const existingChecklists: DemoChecklist[] = storedChecklists
      ? JSON.parse(storedChecklists)
      : [];

    localStorage.setItem(
      "linecheck_demo_checklists",
      JSON.stringify([...existingChecklists, newChecklist]),
    );

    return newChecklist;
  }

  const [form, setForm] = useState<ChecklistForm>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ChecklistForm, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof ChecklistForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof ChecklistForm, string>> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Enter a checklist name.";
    }

    if (!form.restaurant.trim()) {
      nextErrors.restaurant = "Enter or select a restaurant.";
    }

    if (!form.category) {
      nextErrors.category = "Select a category.";
    }

    if (!form.shift) {
      nextErrors.shift = "Select a shift.";
    }

    if (form.estimatedMinutes && Number(form.estimatedMinutes) < 1) {
      nextErrors.estimatedMinutes = "Estimated time must be at least 1 minute.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isDemoMode) {
        const newChecklist = saveDemoChecklist();

        router.push(`/checklists/${newChecklist.id}`);
        return;
      }

      // Supabase save will go here for real accounts.
      console.log("Save checklist to Supabase:", form);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          render={<Link href="/checklists" />}
        >
          <ArrowLeft />
          Back to checklists
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <Badge variant="info">
              <ClipboardCheck />
              Checklist setup
              {isDemoMode && <Badge variant="warning">Demo data</Badge>}
            </Badge>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Create checklist
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {isDemoMode
                ? "Create a sample checklist. Demo changes are stored only in this browser."
                : "Add the basic checklist details first. You will add sections and individual tasks in the checklist builder."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Checklist details</CardTitle>

            <CardDescription>
              Define where, when, and how this checklist will be used.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField>
              <FormLabel htmlFor="name">Checklist name</FormLabel>

              <Input
                id="name"
                name="name"
                placeholder="Example: Morning Opening"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                hasError={Boolean(errors.name)}
              />

              <FormDescription>
                Use a clear name employees will recognize quickly.
              </FormDescription>

              <FormMessage>{errors.name}</FormMessage>
            </FormField>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField>
                <FormLabel htmlFor="restaurant">Restaurant</FormLabel>

                <Input
                  id="restaurant"
                  name="restaurant"
                  placeholder="Main Street Location"
                  value={form.restaurant}
                  onChange={(event) =>
                    updateField("restaurant", event.target.value)
                  }
                  hasError={Boolean(errors.restaurant)}
                />

                <FormMessage>{errors.restaurant}</FormMessage>
              </FormField>

              <FormField>
                <FormLabel htmlFor="estimatedMinutes">Estimated time</FormLabel>

                <div className="relative">
                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="estimatedMinutes"
                    name="estimatedMinutes"
                    type="number"
                    min="1"
                    placeholder="15"
                    className="pl-9 pr-16"
                    value={form.estimatedMinutes}
                    onChange={(event) =>
                      updateField("estimatedMinutes", event.target.value)
                    }
                    hasError={Boolean(errors.estimatedMinutes)}
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    minutes
                  </span>
                </div>

                <FormMessage>{errors.estimatedMinutes}</FormMessage>
              </FormField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField>
                <FormLabel htmlFor="category">Category</FormLabel>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  aria-invalid={Boolean(errors.category)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-all duration-200 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                >
                  <option value="">Select a category</option>
                  <option value="opening">Opening</option>
                  <option value="closing">Closing</option>
                  <option value="food-safety">Food Safety</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="equipment">Equipment</option>
                  <option value="inspection">Inspection</option>
                </select>

                <FormMessage>{errors.category}</FormMessage>
              </FormField>

              <FormField>
                <FormLabel htmlFor="shift">Shift</FormLabel>

                <select
                  id="shift"
                  name="shift"
                  value={form.shift}
                  onChange={(event) => updateField("shift", event.target.value)}
                  aria-invalid={Boolean(errors.shift)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-all duration-200 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                >
                  <option value="">Select a shift</option>
                  <option value="morning">Morning</option>
                  <option value="mid">Mid shift</option>
                  <option value="evening">Evening</option>
                  <option value="closing">Closing</option>
                  <option value="weekly">Weekly</option>
                  <option value="any">Any time</option>
                </select>

                <FormMessage>{errors.shift}</FormMessage>
              </FormField>
            </div>

            <FormField>
              <FormLabel htmlFor="description">Description</FormLabel>

              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Explain when this checklist should be completed and what it covers."
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                className="min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              />

              <FormDescription>
                This will help managers and employees understand the checklist
                purpose.
              </FormDescription>
            </FormField>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            render={<Link href="/checklists" />}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            <Save />
            Save and continue
          </Button>
        </div>
      </form>
    </div>
  );
}
