import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { List, ListItem } from "./List";

export type OrderHistoryEntry = {
  id: string;
  orderNumber: ReactNode;
  date: ReactNode;
  total: ReactNode;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  onView?: () => void;
};

export type OrderHistoryProps = {
  orders: OrderHistoryEntry[];
  className?: string;
};

const statusVariant = {
  processing: "warning" as const,
  shipped: "subtle" as const,
  delivered: "success" as const,
  cancelled: "destructive" as const,
};

export function OrderHistory({ orders, className }: OrderHistoryProps) {
  return (
    <List variant="divided" className={cn("max-w-2xl", className)}>
      {orders.map((order) => (
        <ListItem
          key={order.id}
          interactive={Boolean(order.onView)}
          trailing={
            order.onView ? (
              <Button type="button" size="xs" variant="ghost" onClick={order.onView}>
                View
              </Button>
            ) : null
          }
          onClick={order.onView}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">{order.orderNumber}</span>
            <Badge size="xs" variant={statusVariant[order.status]}>
              {order.status}
            </Badge>
            <span className="text-xs text-muted">{order.date}</span>
            <span className="ml-auto text-sm font-semibold tabular-nums text-foreground">{order.total}</span>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
