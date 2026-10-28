import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import { ChoiceCard } from "./ChoiceCard";
import { ChoiceCardGroup } from "./ChoiceCardGroup";

export type PaymentMethodOption = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
};

export type PaymentMethodProps = {
  options: PaymentMethodOption[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
};

export function PaymentMethod({ options, value, onChange, className }: PaymentMethodProps) {
  return (
    <ChoiceCardGroup label="Payment method" className={cn(className)}>
      {options.map((opt) => (
        <ChoiceCard
          key={opt.id}
          icon={opt.icon}
          title={opt.title}
          description={
            opt.badge ? (
              <>
                {opt.description}
                <Badge size="xs" variant="subtle" className="mt-1">
                  {opt.badge}
                </Badge>
              </>
            ) : (
              opt.description
            )
          }
          selected={value === opt.id}
          onSelect={() => onChange?.(opt.id)}
        />
      ))}
    </ChoiceCardGroup>
  );
}
