import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type StepperStep = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
};

export type StepperProps = {
  steps: StepperStep[];
  activeStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

const stepCircle = cva(
  "flex shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors duration-150",
  {
    variants: {
      state: {
        complete: "border-primary bg-primary text-white",
        active: "border-primary bg-card text-primary",
        upcoming: "border-border bg-card text-muted",
      },
      size: {
        sm: "size-7 text-xs",
        md: "size-8 text-sm",
        lg: "size-9 text-sm",
      },
    },
    defaultVariants: { state: "upcoming", size: "md" },
  },
);

export function Stepper({ steps, activeStep, className, orientation = "horizontal" }: StepperProps) {
  return (
    <ol
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row flex-wrap items-start gap-4" : "flex-col gap-4",
        className,
      )}
      aria-label="Progress"
    >
      {steps.map((step, index) => {
        const state = index < activeStep ? "complete" : index === activeStep ? "active" : "upcoming";
        return (
          <li key={step.id} className={cn("flex min-w-0 gap-3", orientation === "horizontal" && "flex-1")}>
            <span className={cn(stepCircle({ state }))} aria-current={state === "active" ? "step" : undefined}>
              {index < activeStep ? "✓" : index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={cn("text-sm font-medium", state === "upcoming" ? "text-muted" : "text-foreground")}>
                {step.label}
              </p>
              {step.description ? <p className="text-xs text-muted">{step.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { stepCircle };
