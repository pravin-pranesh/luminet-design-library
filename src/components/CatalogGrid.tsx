import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Grid } from "./layout/Grid";

export type CatalogGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
};

const colMap = { 2: 2, 3: 3, 4: 4 } as const;

export function CatalogGrid({ children, columns = 3, className }: CatalogGridProps) {
  return (
    <Grid columns={colMap[columns]} gap="4" className={cn(className)}>
      {children}
    </Grid>
  );
}
