import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

export type CustomModuleRow = {
  id: string;
  name: ReactNode;
  status: "active" | "draft" | "archived";
  updatedAt?: ReactNode;
  actions?: ReactNode;
};

export type CustomModulesTableProps = {
  rows: CustomModuleRow[];
  className?: string;
  striped?: boolean;
};

const statusVariant = {
  active: "success" as const,
  draft: "warning" as const,
  archived: "subtle" as const,
};

export function CustomModulesTable({ rows, className, striped }: CustomModulesTableProps) {
  return (
    <Table striped={striped} className={cn(className)}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Module</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Updated</TableHeaderCell>
          <TableHeaderCell className="text-right">Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>
              <Badge size="xs" variant={statusVariant[row.status]}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted">{row.updatedAt ?? "—"}</TableCell>
            <TableCell className="text-right">{row.actions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
