import * as React from "react";

import { cn } from "@/lib/utils";

function FormField({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field"
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="form-label"
      className={cn(
        "text-sm font-medium leading-none text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;

  return (
    <p
      data-slot="form-message"
      role="alert"
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
};