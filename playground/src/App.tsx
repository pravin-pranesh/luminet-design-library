import type { ReactNode } from "react";
import { Button, TextInput } from "@luminet/design-library";

const buttonVariants = ["solid", "outline", "ghost", "link", "destructive"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Luminet Design Library
            </p>
            <h1 className="text-lg font-semibold text-foreground">Component playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Docs
            </Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <Shell>
      <Section title="Button — size × variant">
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-background/80">
                <th className="px-4 py-3 font-medium text-muted">Size</th>
                {buttonVariants.map((variant) => (
                  <th key={variant} className="px-4 py-3 font-medium capitalize text-muted">
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-b border-border last:border-0">
                  <td className="px-4 py-4 font-mono text-xs uppercase text-muted">{size}</td>
                  {buttonVariants.map((variant) => (
                    <td key={variant} className="px-4 py-4">
                      <Button
                        size={size}
                        variant={variant}
                        borderVariant={variant === "outline" ? "default" : "none"}
                      >
                        Label
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="TextInput — sizes & borders">
        <div className="grid max-w-xl gap-6">
          {sizes.map((size) => (
            <label key={size} className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                {size} — default border
              </span>
              <TextInput size={size} placeholder={`${size} input`} />
            </label>
          ))}
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Hairline</span>
            <TextInput borderVariant="hairline" placeholder="Hairline border" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Error state</span>
            <TextInput aria-invalid defaultValue="Invalid value" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Disabled</span>
            <TextInput disabled placeholder="Disabled" />
          </label>
        </div>
      </Section>
    </Shell>
  );
}
