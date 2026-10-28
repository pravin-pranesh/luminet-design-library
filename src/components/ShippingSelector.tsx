import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { ChoiceCard } from "./ChoiceCard";
import { ChoiceCardGroup } from "./ChoiceCardGroup";

export type ShippingOption = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  price: ReactNode;
  eta?: ReactNode;
};

export type ShippingSelectorProps = {
  options: ShippingOption[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
  label?: string;
};

export function ShippingSelector({ options, value, onChange, className, label = "Shipping method" }: ShippingSelectorProps) {
  return (
    <ChoiceCardGroup label={label} className={cn(className)}>
      {options.map((opt) => (
        <ChoiceCard
          key={opt.id}
          title={opt.title}
          description={
            <>
              {opt.description ? <span>{opt.description}</span> : null}
              {opt.eta ? <span className="block text-xs text-muted">{opt.eta}</span> : null}
              <span className="mt-1 block font-semibold tabular-nums text-foreground">{opt.price}</span>
            </>
          }
          selected={value === opt.id}
          onSelect={() => onChange?.(opt.id)}
        />
      ))}
    </ChoiceCardGroup>
  );
}
