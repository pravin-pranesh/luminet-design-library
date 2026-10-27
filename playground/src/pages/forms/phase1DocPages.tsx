import {
  ButtonGroupIcon,
  DatePicker,
  Dropdown,
  InputTextArea,
  MultiSelect,
  NoteTextArea,
  NumberInput,
  PinInput,
  RangeSlider,
  Search,
  SearchSelect,
  Select,
  type ToggleSwitchColor,
} from "@luminet/design-library";
import type React from "react";
import { useMemo, useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const DEMO_OPTIONS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

function Icon({ name }: { name: string }) {
  return (
    <span className="inline-flex size-4 items-center justify-center text-xs font-bold" aria-hidden>
      {name.slice(0, 1)}
    </span>
  );
}

const minimalProps = (extra: PropDefinition[] = []): PropDefinition[] => [
  { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "sm", description: "Control sizing." },
  { name: "label", type: "string", description: "Field label." },
  { name: "helperText", type: "string", description: "Helper copy." },
  { name: "error", type: "boolean", description: "Error state." },
  { name: "errorMessage", type: "string", description: "Error message." },
  ...extra,
];

export function NumberInputDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Number Input" description="Numeric field built on TextInput with optional stepper chrome.">
      <DocSection title="States">
        <div className="grid max-w-md gap-4">
          <NumberInput placeholder="0" />
          <NumberInput defaultValue={42} />
          <NumberInput error errorMessage="Enter a positive number." defaultValue={-1} />
        </div>
      </DocSection>
      <DocSection title="Sizes">
        <div className="grid max-w-md gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <NumberInput key={s} size={s} placeholder={s} />
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Quantity" },
          { type: "boolean", key: "showSteppers", label: "showSteppers" },
          { type: "boolean", key: "disabled", label: "disabled" },
        ]}
        renderPreview={(v) => (
          <NumberInput
            label={String(v.label)}
            showSteppers={Boolean(v.showSteppers)}
            disabled={Boolean(v.disabled)}
            defaultValue={1}
          />
        )}
        buildSnippet={() => '<NumberInput label="Quantity" defaultValue={1} />'}
      />
      <DocSection title="Props"><PropsTable rows={minimalProps([{ name: "showSteppers", type: "boolean", default: "false", description: "Shows increment/decrement chrome." }, { name: "min", type: "number", description: "Minimum value." }, { name: "max", type: "number", description: "Maximum value." }, { name: "step", type: "number", default: "1", description: "Step increment." }])} /></DocSection>
    </DocPageLayout>
  );
}

export function InputTextAreaDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Text Area" description="Multi-line text with the same border and size tokens as TextInput.">
      <DocSection title="States">
        <InputTextArea placeholder="Write a note…" className="max-w-md" />
        <InputTextArea className="mt-4 max-w-md" defaultValue="Filled content." />
      </DocSection>
      <DocSection title="Helper and error">
        <InputTextArea label="Description" helperText="Markdown not supported." className="max-w-md" />
        <InputTextArea label="Bio" error errorMessage="Bio is required." className="mt-4 max-w-md" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "size", label: "size", defaultValue: "sm", options: ["xs", "sm", "md", "lg"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => <InputTextArea size={v.size as "sm"} placeholder="Playground" className="max-w-md" />}
        buildSnippet={(v) => `<InputTextArea size="${v.size}" placeholder="…" />`}
      />
      <DocSection title="Props"><PropsTable rows={minimalProps([{ name: "borderVariant", type: "string", default: "default", description: "Border style variant." }])} /></DocSection>
    </DocPageLayout>
  );
}

export function SearchDocPage() {
  const [q, setQ] = useState("");
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Search" description="Search input with leading icon and optional clear.">
      <DocSection title="States">
        <Search placeholder="Search records…" className="max-w-md" value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)} onClear={() => setQ("")} />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "placeholder", label: "placeholder", defaultValue: "Search…" }]}
        renderPreview={(v) => <Search placeholder={String(v.placeholder)} className="max-w-md" />}
        buildSnippet={(v) => `<Search placeholder="${v.placeholder}" />`}
      />
      <DocSection title="Props"><PropsTable rows={minimalProps([{ name: "onClear", type: "() => void", description: "Shows clear control when value is set." }])} /></DocSection>
    </DocPageLayout>
  );
}

export function PinInputDocPage() {
  const [pin, setPin] = useState("");
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Pin Input" description="OTP / PIN cells with paste support.">
      <DocSection title="Default">
        <PinInput length={6} value={pin} onChange={setPin} label="Verification code" helperText="Paste a 6-digit code." />
      </DocSection>
      <DocSection title="Error">
        <PinInput length={4} error errorMessage="Invalid code." />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "length", label: "length", defaultValue: "6", options: ["4", "6"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => <PinInput length={Number(v.length)} />}
        buildSnippet={(v) => `<PinInput length={${v.length}} />`}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "length", type: "number", default: "6", description: "Number of cells." }, { name: "value", type: "string", description: "Controlled PIN string." }, { name: "onChange", type: "(value: string) => void", description: "Called when PIN changes." }, ...minimalProps()]} /></DocSection>
    </DocPageLayout>
  );
}

export function RangeSliderDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Range Slider" description="Native range input with semantic accent and optional ticks.">
      <DocSection title="Semantic colours">
        <div className="grid max-w-md gap-6">
          {(["primary", "success", "warning", "destructive"] as ToggleSwitchColor[]).map((c) => (
            <RangeSlider key={c} color={c} defaultValue={40} label={c} showTicks />
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "boolean", key: "showTicks", label: "showTicks", defaultValue: true },
          { type: "boolean", key: "showValue", label: "showValue", defaultValue: true },
        ]}
        renderPreview={(v) => (
          <RangeSlider showTicks={Boolean(v.showTicks)} showValue={Boolean(v.showValue)} defaultValue={25} />
        )}
        buildSnippet={() => "<RangeSlider defaultValue={25} showTicks />"}
      />
      <DocSection title="Props"><PropsTable rows={minimalProps([{ name: "color", type: "CheckboxColor", default: "primary", description: "Semantic accent for the thumb track." }, { name: "showTicks", type: "boolean", description: "Renders tick labels under the track." }, { name: "showValue", type: "boolean", description: "Shows current value between min and max." }])} /></DocSection>
    </DocPageLayout>
  );
}

export function DropdownDocPage() {
  const items = useMemo(
    () => [
      { id: "edit", label: "Edit", onSelect: () => undefined },
      { id: "dup", label: "Duplicate", onSelect: () => undefined },
      { id: "del", label: "Delete", destructive: true, onSelect: () => undefined },
    ],
    [],
  );
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Dropdown" description="Action menu only — not a value picker (use Select / SearchSelect).">
      <DocSection title="Action menu">
        <Dropdown label="Actions" items={items} />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "label", label: "label", defaultValue: "Actions" }]}
        renderPreview={(v) => <Dropdown label={String(v.label)} items={items} />}
        buildSnippet={(v) => `<Dropdown label="${v.label}" items={items} />`}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "items", type: "DropdownItem[]", description: "Menu actions with onSelect." }, { name: "align", type: '"start" | "end"', default: "start", description: "Menu alignment relative to trigger." }]} /></DocSection>
    </DocPageLayout>
  );
}

export function SelectDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Select" description="Native popup picker with Luminet field styling.">
      <DocSection title="States">
        <Select options={DEMO_OPTIONS} placeholder="Choose…" className="max-w-xs" />
        <Select options={DEMO_OPTIONS} defaultValue="b" className="mt-4 max-w-xs" label="Region" />
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <Select options={DEMO_OPTIONS} label="Option" defaultValue="a" className="max-w-xs" />}
        buildSnippet={() => '<Select options={options} label="Option" />'}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "options", type: "SelectOption[]", description: "value + label pairs." }, ...minimalProps()]} /></DocSection>
    </DocPageLayout>
  );
}

export function SearchSelectDocPage() {
  const [val, setVal] = useState("a");
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Search Select" description="Filterable listbox combobox for single selection.">
      <SearchSelect options={DEMO_OPTIONS} value={val} onChange={setVal} label="Assignee" className="max-w-md" />
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <SearchSelect options={DEMO_OPTIONS} defaultValue="b" className="max-w-md" />}
        buildSnippet={() => "<SearchSelect options={options} />"}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "options", type: "SelectOption[]", description: "Selectable options." }, { name: "value", type: "string", description: "Controlled selected value." }, { name: "onChange", type: "(value: string) => void", description: "Called when selection changes." }, ...minimalProps()]} /></DocSection>
    </DocPageLayout>
  );
}

export function MultiSelectDocPage() {
  const [emails, setEmails] = useState<string[]>(["dev@luminet.app"]);
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Multi Select" description="Email chip input — type addresses and press Enter; no options list.">
      <MultiSelect value={emails} onChange={setEmails} label="Recipients" helperText="Press Enter to add each email." />
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <MultiSelect defaultValue={["a@luminet.app"]} />}
        buildSnippet={() => "<MultiSelect defaultValue={['a@luminet.app']} />"}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "value", type: "string[]", description: "Controlled email list." }, { name: "onChange", type: "(emails: string[]) => void", description: "Called when chips change." }, ...minimalProps()]} /></DocSection>
    </DocPageLayout>
  );
}

export function DatePickerDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Date Picker" description="Styled native date input.">
      <DatePicker label="Start date" helperText="Uses browser calendar UI." />
      <ComponentPlayground
        controls={[{ type: "boolean", key: "error", label: "error" }]}
        renderPreview={(v) => <DatePicker label="Due date" error={Boolean(v.error)} errorMessage="Invalid date." />}
        buildSnippet={() => '<DatePicker label="Due date" />'}
      />
      <DocSection title="Props"><PropsTable rows={minimalProps()} /></DocSection>
    </DocPageLayout>
  );
}

export function ButtonGroupIconDocPage() {
  const [active, setActive] = useState("bold");
  const items = [
    { id: "bold", label: "Bold", icon: <Icon name="B" />, isActive: active === "bold", onClick: () => setActive("bold") },
    { id: "italic", label: "Italic", icon: <Icon name="I" />, isActive: active === "italic", onClick: () => setActive("italic") },
    { id: "link", label: "Link", icon: <Icon name="L" />, isActive: active === "link", onClick: () => setActive("link") },
  ];
  return (
    <DocPageLayout sectionLabel="Actions & utilities" componentLabel="Button Group Icon" description="Segmented icon actions with active state.">
      <DocSection title="Sizes">
        <div className="flex flex-wrap gap-4">
          {(["xs", "sm", "md"] as const).map((s) => (
            <ButtonGroupIcon key={s} size={s} items={items} aria-label={`Toolbar ${s}`} />
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <ButtonGroupIcon items={items} />}
        buildSnippet={() => "<ButtonGroupIcon items={items} />"}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "items", type: "ButtonGroupIconItem[]", description: "icon, label, isActive, onClick." }, { name: "size", type: "Button size", default: "sm", description: "Size passed to each icon button." }]} /></DocSection>
    </DocPageLayout>
  );
}

export function NoteTextAreaDocPage() {
  const [title, setTitle] = useState("Weekly sync");
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="Note Area" description="Title + body + attach stub for plain-text notes.">
      <NoteTextArea
        title={title}
        onTitleChange={setTitle}
        defaultValue="Discuss roadmap and blockers."
        label="Meeting note"
        helperText="Rich text belongs in Editor."
        onAttach={() => undefined}
      />
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <NoteTextArea titlePlaceholder="Title" placeholder="Body…" />}
        buildSnippet={() => "<NoteTextArea titlePlaceholder=\"Title\" />"}
      />
      <DocSection title="Props"><PropsTable rows={[{ name: "title", type: "string", description: "Title field value." }, { name: "onTitleChange", type: "(title: string) => void", description: "Title change handler." }, { name: "onAttach", type: "(files: FileList) => void", description: "Attach file stub." }, ...minimalProps()]} /></DocSection>
    </DocPageLayout>
  );
}
