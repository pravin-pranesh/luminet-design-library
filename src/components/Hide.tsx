import type { ReactNode } from "react";

export type HideProps = {
  when?: boolean;
  children: ReactNode;
};

/** Renders children only when `when` is false (hide when condition is true). */
export function Hide({ when = false, children }: HideProps) {
  if (when) return null;
  return <>{children}</>;
}
