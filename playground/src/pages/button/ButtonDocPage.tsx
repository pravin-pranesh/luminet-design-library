import { Button } from "@luminet/design-library";
import { useMemo } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const buttonVariants = ["solid", "outline", "ghost", "link", "destructive"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

const BUTTON_PROPS: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "Button label or content.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    default: "md",
    description: "Height, padding, and typography scale.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost" | "link" | "destructive"',
    default: "solid",
    description: "Visual style; uses semantic theme tokens (primary, destructive, etc.).",
  },
  {
    name: "borderVariant",
    type: '"none" | "hairline" | "default" | "emphasis" | "dashed"',
    default: "none",
    description: "Border treatment; outline and ghost variants respect borderVariant.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims the control.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    default: "button",
    description: "Native button type.",
  },
];

function StateExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {children}
      <span className="text-xs text-muted">{title}</span>
    </div>
  );
}

function buildButtonSnippet(values: Record<string, string | boolean>) {
  const lines: string[] = ["<Button"];
  if (values.size !== "md") lines.push(`  size="${values.size}"`);
  if (values.variant !== "solid") lines.push(`  variant="${values.variant}"`);
  if (values.borderVariant && values.borderVariant !== "none") {
    lines.push(`  borderVariant="${values.borderVariant}"`);
  }
  if (values.disabled) lines.push("  disabled");
  lines.push(`>${String(values.children)}</Button>`);
  return lines.join("\n");
}

export function ButtonDocPage() {
  const playgroundControls = useMemo(
    () => [
      {
        type: "text" as const,
        key: "children",
        label: "Label",
        defaultValue: "Save changes",
      },
      {
        type: "select" as const,
        key: "size",
        label: "Size",
        defaultValue: "md",
        options: sizes.map((s) => ({ value: s, label: s.toUpperCase() })),
      },
      {
        type: "select" as const,
        key: "variant",
        label: "Variant",
        defaultValue: "solid",
        options: buttonVariants.map((v) => ({ value: v, label: v })),
      },
      {
        type: "select" as const,
        key: "borderVariant",
        label: "borderVariant",
        defaultValue: "none",
        options: [
          { value: "none", label: "none" },
          { value: "hairline", label: "hairline" },
          { value: "default", label: "default" },
          { value: "emphasis", label: "emphasis" },
          { value: "dashed", label: "dashed" },
        ],
      },
      { type: "boolean" as const, key: "disabled", label: "disabled" },
    ],
    [],
  );

  return (
    <DocPageLayout
      sectionLabel="Actions & utilities"
      componentLabel="Button"
      description="Primary action control with size and variant matrix, semantic solid/destructive fills, and shared border tokens."
    >
      <DocSection title="States">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <StateExample title="Default">
            <Button>Label</Button>
          </StateExample>
          <StateExample title="Disabled">
            <Button disabled>Label</Button>
          </StateExample>
          <StateExample title="Destructive">
            <Button variant="destructive">Delete</Button>
          </StateExample>
          <StateExample title="Link">
            <Button variant="link">Learn more</Button>
          </StateExample>
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <div className="flex flex-wrap items-end justify-center gap-6">
          {sizes.map((size) => (
            <StateExample key={size} title={size.toUpperCase()}>
              <Button size={size}>Label</Button>
            </StateExample>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Semantic variants"
        description="Variant maps to Luminet roles — primary actions, outline/ghost surfaces, destructive, and link."
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {buttonVariants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              borderVariant={variant === "outline" ? "default" : "none"}
              className="capitalize"
            >
              {variant}
            </Button>
          ))}
        </div>
      </DocSection>

      <DocSection title="Size × variant">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-muted">Size</th>
                {buttonVariants.map((variant) => (
                  <th key={variant} className="px-3 py-2 capitalize text-muted">
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-mono text-xs uppercase text-muted">{size}</td>
                  {buttonVariants.map((variant) => (
                    <td key={variant} className="px-3 py-3">
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
      </DocSection>

      <ComponentPlayground
        controls={playgroundControls}
        renderPreview={(values) => (
          <Button
            size={values.size as (typeof sizes)[number]}
            variant={values.variant as (typeof buttonVariants)[number]}
            borderVariant={
              values.borderVariant as "none" | "hairline" | "default" | "emphasis" | "dashed"
            }
            disabled={Boolean(values.disabled)}
          >
            {String(values.children)}
          </Button>
        )}
        buildSnippet={buildButtonSnippet}
      />

      <DocSection title="Props">
        <PropsTable rows={BUTTON_PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
