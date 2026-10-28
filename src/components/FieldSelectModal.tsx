import { useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Search } from "./Search";

export type FieldOption = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  group?: string;
};

export type FieldSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fields: FieldOption[];
  onSelect: (field: FieldOption) => void;
  title?: ReactNode;
  description?: ReactNode;
  searchPlaceholder?: string;
  className?: string;
};

export function FieldSelectModal({
  isOpen,
  onClose,
  fields,
  onSelect,
  title = "Insert field",
  description = "Choose a merge field to insert at the cursor.",
  searchPlaceholder = "Search fields…",
  className,
}: FieldSelectModalProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fields;
    return fields.filter(
      (f) =>
        String(f.label).toLowerCase().includes(q) ||
        String(f.description ?? "").toLowerCase().includes(q) ||
        String(f.group ?? "").toLowerCase().includes(q),
    );
  }, [fields, query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description={description} size="md">
      <div className={cn("space-y-3", className)}>
        <Search
          size="sm"
          placeholder={searchPlaceholder}
          aria-label="Search fields"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border p-1">
          {filtered.map((field) => (
            <li key={field.id}>
              <button
                type="button"
                className="flex w-full flex-col rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-primary/[0.06] focus-visible:bg-primary/[0.06] focus-visible:outline-none"
                onClick={() => {
                  onSelect(field);
                  onClose();
                }}
              >
                <span className="font-medium text-foreground">{field.label}</span>
                {field.description ? <span className="text-xs text-muted">{field.description}</span> : null}
                {field.group ? (
                  <span className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">{field.group}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button type="button" size="sm" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
