import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Heading } from "./layout/Heading";
export type DetailSection = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  content: ReactNode;
};

export type DetailSectionsProps = {
  sections: DetailSection[];
  size?: "sm" | "md" | "lg";
  className?: string;
};

const titleSize = { sm: 5, md: 4, lg: 3 } as const;

export function DetailSections({ sections, size = "md", className }: DetailSectionsProps) {
  return (
    <div className={cn("divide-y divide-border rounded-lg border border-border bg-card", className)}>
      {sections.map((section, index) => (
        <section key={section.id} className="px-4 py-5 sm:px-6">
          <header className="mb-4">
            <Heading level={titleSize[size]} as="h3">
              {section.title}
            </Heading>
            {section.description ? (
              <p className="mt-1 text-sm text-muted">{section.description}</p>
            ) : null}
          </header>
          <div className="text-sm text-foreground">{section.content}</div>
          {index < sections.length - 1 ? null : null}
        </section>
      ))}
    </div>
  );
}
