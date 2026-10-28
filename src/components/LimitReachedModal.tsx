import type { ReactNode } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export type LimitReachedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  limitLabel?: ReactNode;
  upgradeLabel?: string;
};

export function LimitReachedModal({
  isOpen,
  onClose,
  onUpgrade,
  title = "You've reached your plan limit",
  description = "Upgrade to add more seats, records, or storage for your workspace.",
  limitLabel,
  upgradeLabel = "Upgrade plan",
}: LimitReachedModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex flex-col gap-2 border-t border-border px-5 py-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Not now
          </Button>
          {onUpgrade ? (
            <Button type="button" size="sm" onClick={onUpgrade}>
              {upgradeLabel}
            </Button>
          ) : null}
        </div>
      }
    >
      {limitLabel ? (
        <p className="rounded-md border border-primary/20 bg-primary/[0.05] px-3 py-2 text-sm text-foreground">
          {limitLabel}
        </p>
      ) : null}
    </Modal>
  );
}
