import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { FilePreview, type FilePreviewProps } from "./FilePreview";

export type FilePreviewTriggerProps = FilePreviewProps & {
  triggerLabel?: ReactNode;
};

export function FilePreviewTrigger({ triggerLabel = "Open preview", className, ...preview }: FilePreviewTriggerProps) {
  return (
    <div className={cn("inline-flex flex-col gap-2", className)}>
      <FilePreview {...preview} />
      <Button type="button" size="sm" variant="outline">
        {triggerLabel}
      </Button>
    </div>
  );
}
