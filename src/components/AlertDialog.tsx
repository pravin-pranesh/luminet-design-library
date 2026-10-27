import type { ReactNode } from "react";
import { Button } from "./Button";
import { Modal, type ModalProps } from "./Modal";

export type AlertDialogProps = Omit<ModalProps, "footer"> & {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  tone?: "default" | "destructive";
  isLoading?: boolean;
};

export function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  isLoading = false,
  size = "sm",
}: AlertDialogProps) {
  const footer = (
    <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
      <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
        {cancelLabel}
      </Button>
      <Button
        size="sm"
        variant={tone === "destructive" ? "destructive" : "solid"}
        onClick={onConfirm}
        disabled={isLoading}
      >
        {confirmLabel}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      footer={footer}
    >
      {children as ReactNode}
    </Modal>
  );
}
