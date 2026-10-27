import {
  RadioButton,
  RadioButtonGroup,
  type RadioButtonColor,
  radioButtonColors,
} from "@luminet/design-library";
import { useMemo, useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const COLOR_ORDER: RadioButtonColor[] = [
  "primary",
  "success",
  "warning",
  "destructive",
  "accent",
  "neutral",
];

const SEMANTIC_LABELS: Record<RadioButtonColor, string> = {
  primary: "Primary",
  success: "Success",
  warning: "Warning",
  destructive: "Destructive",
  accent: "Accent",
  neutral: "Neutral",
};

const RADIO_PROPS: PropDefinition[] = [
  { name: "value", type: "string", description: "Option value submitted with the native input." },
  { name: "label", type: "ReactNode", description: "Label beside the control." },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: "md",
    description: "Outer ring and inner dot scale.",
  },
  {
    name: "color",
    type: '"primary" | "success" | "warning" | "destructive" | "accent" | "neutral"',
    default: "primary",
    description: "Semantic fill for the selected dot and ring.",
  },
  { name: "isDisabled", type: "boolean", default: "false", description: "Disables this option." },
  { name: "helperText", type: "ReactNode", description: "Muted helper below the option." },
  { name: "error", type: "boolean", description: "Error treatment when paired with errorMessage." },
  { name: "errorMessage", type: "ReactNode", description: "Error copy; replaces helper text." },
];

const GROUP_PROPS: PropDefinition[] = [
  { name: "name", type: "string", description: "Shared name for native radio inputs; auto-generated if omitted." },
  { name: "value", type: "string", description: "Controlled selected value." },
  { name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
  { name: "onValueChange", type: "(value: string) => void", description: "Called when selection changes." },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: "vertical",
    description: "Layout direction for grouped options.",
  },
  { name: "isDisabled", type: "boolean", description: "Disables every option in the group." },
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

function buildRadioSnippet(values: Record<string, string | boolean>) {
  return [
    "<RadioButtonGroup",
    `  defaultValue="${values.groupValue}"`,
    `  orientation="${values.orientation}"`,
    ">",
    "  <RadioButton",
    `    value="a"`,
    `    label="${String(values.labelA).replace(/"/g, '\\"')}"`,
    values.color !== "primary" ? `    color="${values.color}"` : "",
    `    size="${values.size}"`,
    "  />",
    "  <RadioButton value=\"b\" label=\"Option B\" />",
    "</RadioButtonGroup>",
  ]
    .filter(Boolean)
    .join("\n");
}

export function RadioButtonDocPage() {
  const [plan, setPlan] = useState("pro");

  const playgroundControls = useMemo(
    () => [
      {
        type: "text" as const,
        key: "labelA",
        label: "Option A label",
        defaultValue: "Option A",
      },
      {
        type: "select" as const,
        key: "size",
        label: "Size",
        defaultValue: "md",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
      {
        type: "select" as const,
        key: "color",
        label: "Semantic color",
        defaultValue: "primary",
        options: COLOR_ORDER.map((c) => ({ value: c, label: SEMANTIC_LABELS[c] })),
      },
      {
        type: "select" as const,
        key: "orientation",
        label: "Group orientation",
        defaultValue: "vertical",
        options: [
          { value: "vertical", label: "vertical" },
          { value: "horizontal", label: "horizontal" },
        ],
      },
      { type: "text" as const, key: "groupValue", label: "defaultValue", defaultValue: "a" },
    ],
    [],
  );

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Radio Button"
      description="Single-select options with RadioButtonGroup for layout (horizontal or vertical), semantic colors, and helper or error messaging."
    >
      <DocSection title="States">
        <div className="flex flex-wrap items-start justify-center gap-10">
          <StateExample title="Unselected">
            <RadioButtonGroup defaultValue="">
              <RadioButton value="idle" label="Unselected" />
            </RadioButtonGroup>
          </StateExample>
          <StateExample title="Selected">
            <RadioButtonGroup defaultValue="on">
              <RadioButton value="on" label="Selected" />
            </RadioButtonGroup>
          </StateExample>
          <StateExample title="Disabled">
            <RadioButtonGroup defaultValue="">
              <RadioButton value="off" label="Disabled" isDisabled />
            </RadioButtonGroup>
          </StateExample>
          <StateExample title="Disabled selected">
            <RadioButtonGroup defaultValue="on">
              <RadioButton value="on" label="Disabled selected" isDisabled />
            </RadioButtonGroup>
          </StateExample>
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <RadioButtonGroup defaultValue="md" orientation="horizontal">
          <RadioButton size="sm" value="sm" label="Small" />
          <RadioButton size="md" value="md" label="Medium" />
          <RadioButton size="lg" value="lg" label="Large" />
        </RadioButtonGroup>
      </DocSection>

      <DocSection
        title="Semantic variants"
        description="Selected state uses Luminet semantic tokens; unchecked keeps a neutral border."
      >
        <div className="space-y-6">
          {COLOR_ORDER.map((color) => (
            <RadioButtonGroup key={color} defaultValue="on" orientation="horizontal">
              <span className="w-24 self-center text-sm font-medium text-foreground">
                {SEMANTIC_LABELS[color]}
              </span>
              <RadioButton value="off" color={color} label="Off" />
              <RadioButton value="on" color={color} label="On" />
              <span
                className="hidden size-3 self-center rounded-full sm:inline-block"
                style={{ backgroundColor: radioButtonColors[color] }}
              />
            </RadioButtonGroup>
          ))}
        </div>
      </DocSection>

      <DocSection title="RadioButtonGroup orientation">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Vertical</p>
            <RadioButtonGroup defaultValue="email">
              <RadioButton value="email" label="Email" />
              <RadioButton value="sms" label="SMS" />
              <RadioButton value="push" label="Push notification" />
            </RadioButtonGroup>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Horizontal</p>
            <RadioButtonGroup defaultValue="monthly" orientation="horizontal">
              <RadioButton value="monthly" label="Monthly" />
              <RadioButton value="yearly" label="Yearly" />
            </RadioButtonGroup>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Helper and error text"
        description="Per-option helper or error copy sits below the control."
      >
        <RadioButtonGroup defaultValue="standard">
          <RadioButton value="standard" label="Standard shipping" helperText="5–7 business days" />
          <RadioButton
            value="express"
            label="Express shipping"
            error
            errorMessage="Not available for your address"
          />
        </RadioButtonGroup>
      </DocSection>

      <DocSection title="Controlled group">
        <RadioButtonGroup value={plan} onValueChange={setPlan} orientation="horizontal">
          <RadioButton value="starter" label="Starter" />
          <RadioButton value="pro" label="Pro" />
          <RadioButton value="enterprise" label="Enterprise" />
        </RadioButtonGroup>
        <p className="mt-3 text-sm text-muted">
          Selected plan: <span className="font-medium text-foreground">{plan}</span>
        </p>
      </DocSection>

      <ComponentPlayground
        controls={playgroundControls}
        renderPreview={(values) => (
          <RadioButtonGroup
            defaultValue={String(values.groupValue)}
            orientation={values.orientation as "horizontal" | "vertical"}
          >
            <RadioButton
              value="a"
              label={String(values.labelA)}
              size={values.size as "sm" | "md" | "lg"}
              color={values.color as RadioButtonColor}
            />
            <RadioButton value="b" label="Option B" size={values.size as "sm" | "md" | "lg"} />
          </RadioButtonGroup>
        )}
        buildSnippet={buildRadioSnippet}
      />

      <DocSection title="RadioButton props">
        <PropsTable rows={RADIO_PROPS} />
      </DocSection>

      <DocSection title="RadioButtonGroup props">
        <PropsTable rows={GROUP_PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
