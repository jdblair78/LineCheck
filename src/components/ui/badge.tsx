import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex w-fit items-center gap-1.5",
    "rounded-full border border-transparent",
    "px-2.5 py-1",
    "text-xs font-semibold leading-none",
    "transition-colors",
    "[&_svg]:pointer-events-none",
    "[&_svg]:size-3.5",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",

        secondary: "bg-secondary text-secondary-foreground",

        outline: "border-border bg-background text-foreground",

        muted: "bg-muted text-muted-foreground",

        soft: "bg-muted/60 text-foreground",

        success: "bg-success/10 text-success",

        warning: "bg-warning/15 text-warning-foreground",

        danger: "bg-destructive/10 text-destructive",

        info: "bg-info/10 text-info",
      },

      size: {
        sm: "px-2 py-0.5 text-[11px]",
        default: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants, type BadgeProps };
