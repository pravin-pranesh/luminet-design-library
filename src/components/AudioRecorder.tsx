import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

const recorderVariants = cva("flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4", {
  variants: {
    size: {
      sm: "max-w-xs text-sm",
      md: "max-w-sm text-sm",
      lg: "max-w-md text-base",
    },
  },
  defaultVariants: { size: "md" },
});

export type AudioRecorderProps = VariantProps<typeof recorderVariants> & {
  onStart?: () => void;
  onStop?: () => void;
  maxDurationLabel?: string;
  className?: string;
};

export function AudioRecorder({
  onStart,
  onStop,
  maxDurationLabel = "Max 2:00",
  size,
  className,
}: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);

  return (
    <div className={cn(recorderVariants({ size }), className)}>
      <div
        className={cn(
          "flex size-16 items-center justify-center rounded-full border-2 transition-colors duration-150",
          recording ? "border-destructive bg-destructive/10 text-destructive" : "border-primary/30 bg-primary/[0.06] text-primary",
        )}
        aria-hidden
      >
        ●
      </div>
      <p className="font-medium text-foreground">{recording ? "Recording…" : "Tap to record"}</p>
      <p className="text-xs text-muted">{maxDurationLabel}</p>
      <Button
        type="button"
        size="sm"
        variant={recording ? "destructive" : "solid"}
        onClick={() => {
          if (recording) {
            setRecording(false);
            onStop?.();
          } else {
            setRecording(true);
            onStart?.();
          }
        }}
      >
        {recording ? "Stop" : "Record"}
      </Button>
    </div>
  );
}

export { recorderVariants };
