import type { ReactNode } from "react";
import { Button } from "./Button";
import { Drawer, DrawerBody, DrawerFooter } from "./Drawer";

export type FormDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
};

export function FormDrawer({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting,
}: FormDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      <DrawerBody>{children}</DrawerBody>
      <DrawerFooter>
        <Button type="button" size="sm" variant="outline" onClick={onClose} disabled={isSubmitting}>
          {cancelLabel}
        </Button>
        <Button type="button" size="sm" onClick={onSubmit} disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </DrawerFooter>
    </Drawer>
  );
}
