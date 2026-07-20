import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "whitespace-nowrap rounded-lg border border-transparent",
    "bg-clip-padding text-sm font-semibold",
    "transition-all duration-200",
    "outline-none select-none",
    "focus-visible:border-ring",
    "focus-visible:ring-3 focus-visible:ring-ring/30",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-xs",
          "hover:bg-primary/90 hover:shadow-sm",
        ],

        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "aria-expanded:bg-secondary",
          "aria-expanded:text-secondary-foreground",
        ],

        outline: [
          "border-border bg-background text-foreground",
          "shadow-xs",
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted",
          "dark:border-input dark:bg-input/30",
          "dark:hover:bg-input/50",
        ],

        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted",
          "dark:hover:bg-muted/50",
        ],

        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-xs",
          "hover:bg-destructive/90 hover:shadow-sm",
          "focus-visible:border-destructive",
          "focus-visible:ring-destructive/30",
        ],

        success: [
          "bg-success text-success-foreground",
          "shadow-xs",
          "hover:bg-success/90 hover:shadow-sm",
          "focus-visible:border-success",
          "focus-visible:ring-success/30",
        ],

        warning: [
          "bg-warning text-warning-foreground",
          "shadow-xs",
          "hover:bg-warning/90 hover:shadow-sm",
          "focus-visible:border-warning",
          "focus-visible:ring-warning/30",
        ],

        info: [
          "bg-info text-info-foreground",
          "shadow-xs",
          "hover:bg-info/90 hover:shadow-sm",
          "focus-visible:border-info",
          "focus-visible:ring-info/30",
        ],

        link: [
          "h-auto rounded-none border-0 bg-transparent p-0",
          "text-primary shadow-none",
          "underline-offset-4 hover:underline",
        ],
      },

      size: {
        default: [
          "h-10 gap-2 px-4",
          "has-data-[icon=inline-end]:pr-3",
          "has-data-[icon=inline-start]:pl-3",
        ],

        xs: [
          "h-7 gap-1.5 rounded-md px-2.5 text-xs",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        sm: [
          "h-9 gap-1.5 px-3 text-sm",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ],

        lg: [
          "h-11 gap-2 px-5 text-sm",
          "has-data-[icon=inline-end]:pr-4",
          "has-data-[icon=inline-start]:pl-4",
        ],

        icon: "size-10 p-0",
        "icon-xs": "size-7 rounded-md p-0",
        "icon-sm": "size-9 p-0",
        "icon-lg": "size-11 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    loadingText?: string;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={isLoading}
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    >
      {isLoading && (
        <Loader2
          className="size-4 animate-spin"
          aria-hidden="true"
        />
      )}

      {isLoading && loadingText
        ? loadingText
        : children}
    </ButtonPrimitive>
  );
}

export {
  Button,
  buttonVariants,
  type ButtonProps,
};