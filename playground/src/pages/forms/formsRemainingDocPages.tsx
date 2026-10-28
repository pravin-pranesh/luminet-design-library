import {
  ContactForm,
  CopyButton,
  CouponField,
  Editor,
  FeedbackForm,
  FieldSelectModal,
  FileUpload,
  Flex,
  FormField,
  FormWrapper,
  TextInput,
} from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const sizeProp: PropDefinition = {
  name: "size",
  type: '"xs" | "sm" | "md" | "lg"',
  default: "md",
  description: "Control sizing from the Luminet taxonomy.",
};

const DEMO_FIELDS = [
  { id: "first_name", label: "First name", group: "Contact" },
  { id: "email", label: "Email", description: "Primary email address", group: "Contact" },
  { id: "order_id", label: "Order ID", group: "Commerce" },
];

export function EditorDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Editor"
      description="Lightweight rich text surface with formatting toolbar and Luminet focus ring."
    >
      <DocSection title="Sizes">
        <Flex direction="column" gap="4">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Editor key={s} size={s} label={`Size ${s}`} defaultValue="<p>Hello <strong>world</strong></p>" />
          ))}
        </Flex>
      </DocSection>
      <DocSection title="Helper and error">
        <Editor label="Body" helperText="Use the toolbar for basic formatting." className="max-w-xl" />
        <Editor label="Required" error errorMessage="Content is required." className="mt-6 max-w-xl" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "disabled", label: "disabled" }]}
        renderPreview={(v) => (
          <Editor label="Notes" placeholder="Write release notes…" disabled={Boolean(v.disabled)} className="max-w-md" />
        )}
        buildSnippet={(v) => `<Editor label="Notes"${v.disabled ? " disabled" : ""} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Field label." },
            { name: "value", type: "string", description: "Controlled HTML string." },
            { name: "onChange", type: "(html) => void", description: "Emits HTML on edit." },
            { name: "error", type: "boolean", description: "Error border and message slot." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FormWrapperDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="FormWrapper"
      description="Card-style form shell with title, grid/stack layout, and submit footer."
    >
      <DocSection title="Stack layout">
        <FormWrapper title="Profile" description="Update your public details." className="max-w-md">
          <FormField label="Display name">
            <TextInput placeholder="Jane Doe" />
          </FormField>
        </FormWrapper>
      </DocSection>
      <DocSection title="Grid layout">
        <FormWrapper layout="grid" title="Address" className="max-w-2xl">
          <FormField label="City">
            <TextInput id="city" />
          </FormField>
          <FormField label="Postal code">
            <TextInput id="zip" />
          </FormField>
        </FormWrapper>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "layout",
            label: "layout",
            defaultValue: "stack",
            options: [
              { value: "stack", label: "stack" },
              { value: "grid", label: "grid" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <FormWrapper layout={v.layout as "stack"} title="Demo" className="max-w-md">
            <TextInput placeholder="Field" />
          </FormWrapper>
        )}
        buildSnippet={(v) => `<FormWrapper layout="${v.layout}">…</FormWrapper>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "layout", type: '"stack" | "grid"', default: "stack", description: "Field arrangement." },
            { name: "submitLabel", type: "string", default: "Submit", description: "Primary footer button." },
            { name: "footer", type: "ReactNode", description: "Custom footer actions." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ContactFormDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="ContactForm"
      description="Pre-built contact layout using FormWrapper and Luminet inputs."
    >
      <DocSection title="Example">
        <ContactForm className="max-w-2xl" onSubmitSuccess={() => undefined} />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "onSubmitSuccess", type: "() => void", description: "Called after valid submit (demo)." },
            { name: "…form props", type: "FormHTMLAttributes", description: "Forwarded to underlying form." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FeedbackFormDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="FeedbackForm"
      description="Opinionated feedback capture with type select and details area."
    >
      <DocSection title="Example">
        <FeedbackForm className="max-w-lg" />
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[{ name: "onSubmit", type: "FormEventHandler", description: "Native form submit." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function CouponFieldDocPage() {
  const [applied, setApplied] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="CouponField"
      description="Promo code input with apply action and success/error feedback."
    >
      <DocSection title="States">
        <StateExample title="Default">
          <CouponField className="max-w-sm" onApply={() => setApplied("SAVE10")} />
        </StateExample>
        <StateExample title="Applied">
          <CouponField className="max-w-sm" appliedCode="SAVE10" defaultValue="SAVE10" />
        </StateExample>
        <StateExample title="Error">
          <CouponField className="max-w-sm" errorMessage="This code has expired." />
        </StateExample>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "error", label: "error" }]}
        renderPreview={(v) => (
          <CouponField
            className="max-w-sm"
            appliedCode={applied}
            errorMessage={v.error ? "Invalid code" : error}
            onApply={(code) => {
              if (code === "SAVE10") {
                setApplied(code);
                setError(undefined);
              } else {
                setApplied(undefined);
                setError("Invalid code");
              }
            }}
          />
        )}
        buildSnippet={() => `<CouponField onApply={…} appliedCode="SAVE10" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "onApply", type: "(code) => void", description: "Apply button handler." },
            { name: "appliedCode", type: "string", description: "Shows success state." },
            { name: "errorMessage", type: "string", description: "Inline error copy." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CopyButtonFormsDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="CopyButton"
      description="Copy snippet or ID to clipboard — useful beside install strips and tokens."
    >
      <DocSection title="Example">
        <CopyButton value="npm install @luminet/design-library" />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "value", label: "value", defaultValue: "pk_live_xxx" },
        ]}
        renderPreview={(v) => <CopyButton value={String(v.value)} />}
        buildSnippet={(v) => `<CopyButton value="${v.value}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "value", type: "string", description: "Text copied to clipboard." },
            { name: "copyLabel", type: "string", default: "Copy", description: "Default label." },
            { name: "copiedLabel", type: "string", default: "Copied", description: "Temporary success label." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FieldSelectModalDocPage() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="FieldSelectModal"
      description="Searchable modal for picking merge fields in templates."
    >
      <DocSection title="Interactive">
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          onClick={() => setOpen(true)}
        >
          Insert field
        </button>
        {picked ? <p className="mt-3 text-sm text-muted">Selected: {picked}</p> : null}
        <FieldSelectModal
          isOpen={open}
          onClose={() => setOpen(false)}
          fields={DEMO_FIELDS}
          onSelect={(f) => setPicked(String(f.label))}
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Modal visibility." },
            { name: "fields", type: "FieldOption[]", description: "Searchable field list." },
            { name: "onSelect", type: "(field) => void", description: "Choice handler." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

/** Forms section label variant — shared content with media FileUpload doc. */
export function FormsFileUploadDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="File Upload"
      description="Drag-and-drop file target with keyboard-accessible browse."
    >
      <DocSection title="Sizes">
        {(["sm", "md", "lg"] as const).map((s) => (
          <FileUpload key={s} size={s} label={`Upload (${s})`} helperText="PDF or PNG, max 10MB." className="mb-4 max-w-md" />
        ))}
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "multiple", label: "multiple" }]}
        renderPreview={(v) => (
          <FileUpload multiple={Boolean(v.multiple)} className="max-w-md" onFilesSelected={() => undefined} />
        )}
        buildSnippet={(v) => `<FileUpload${v.multiple ? " multiple" : ""} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "onFilesSelected", type: "(files) => void", description: "Drop or browse handler." },
            { name: "accept", type: "string", description: "Native accept filter." },
            { name: "multiple", type: "boolean", description: "Multi-file selection." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FileUploaderDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="File Uploader"
      description="Catalog alias for FileUpload — same API and behavior."
    >
      <DocSection title="Example">
        <FileUpload label="Attachments" helperText="Same component exported as FileUploader." className="max-w-md" />
      </DocSection>
      <DocSection title="Note">
        <p className="text-sm text-muted">
          Import <code className="rounded bg-foreground/5 px-1">FileUploader</code> from{" "}
          <code className="rounded bg-foreground/5 px-1">@luminet/design-library</code> — it is an alias of{" "}
          <code className="rounded bg-foreground/5 px-1">FileUpload</code>.
        </p>
      </DocSection>
    </DocPageLayout>
  );
}
