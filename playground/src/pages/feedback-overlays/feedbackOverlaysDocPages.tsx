import {
  AlertDialog,
  Button,
  Collapse,
  FormDrawer,
  Hide,
  LazyWrapper,
  LimitReachedModal,
  Modal,
  Popover,
  TextInput,
  Toaster,
  Tooltip,
  type ToastItem,
} from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const SECTION = "Feedback & overlays";

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

export function ModalDocPage() {
  const [open, setOpen] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Modal"
      description="Centered dialog with backdrop, optional header, body, and footer slots."
    >
      <DocSection title="Interactive">
        <Button size="sm" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Invite teammate"
          description="They will receive an email with a link to join your workspace."
        >
          <TextInput placeholder="colleague@company.com" />
        </Modal>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: "Modal title" },
          {
            type: "select",
            key: "size",
            label: "size",
            defaultValue: "md",
            options: ["sm", "md", "lg"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <StateExample title="Static frame (open in demo above)">
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
              size={String(v.size)} · title="{String(v.title)}"
            </div>
          </StateExample>
        )}
        buildSnippet={(v) =>
          `<Modal isOpen={open} onClose={…} title="${v.title}" size="${v.size}">…</Modal>`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Controls visibility." },
            { name: "onClose", type: "() => void", description: "Dismiss handler (Escape and backdrop)." },
            { name: "title", type: "ReactNode", description: "Dialog heading." },
            { name: "description", type: "ReactNode", description: "Muted subtitle under title." },
            { name: "footer", type: "ReactNode", description: "Custom footer; default Close button when omitted." },
            { name: "size", type: '"sm" | "md" | "lg"', default: "md", description: "Max width token." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function TooltipDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Tooltip"
      description="Hover and focus tooltip anchored to inline triggers."
    >
      <DocSection title="Interactive">
        <Tooltip content="Saved to your workspace">
          <Button size="sm" variant="outline">
            Hover or focus me
          </Button>
        </Tooltip>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "content", label: "content", defaultValue: "Tooltip copy" },
          {
            type: "select",
            key: "placement",
            label: "placement",
            defaultValue: "top",
            options: [
              { value: "top", label: "top" },
              { value: "bottom", label: "bottom" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <Tooltip content={String(v.content)} placement={v.placement as "top"}>
            <Button size="sm" variant="ghost">
              Trigger
            </Button>
          </Tooltip>
        )}
        buildSnippet={(v) => `<Tooltip content="${v.content}" placement="${v.placement}">…</Tooltip>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "content", type: "ReactNode", description: "Tooltip body." },
            { name: "children", type: "ReactNode", description: "Focusable trigger." },
            { name: "placement", type: '"top" | "bottom"', default: "top", description: "Anchor position." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function AlertDialogDocPage() {
  const [open, setOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="AlertDialog"
      description="Modal with confirm and cancel actions; supports destructive tone."
    >
      <DocSection title="Interactive">
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => setOpen(true)}>
            Confirm action
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDestructiveOpen(true)}>
            Destructive confirm
          </Button>
        </div>
        <AlertDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Archive project?"
          description="You can restore archived projects within 30 days."
          confirmLabel="Archive"
        />
        <AlertDialog
          isOpen={destructiveOpen}
          onClose={() => setDestructiveOpen(false)}
          onConfirm={() => setDestructiveOpen(false)}
          tone="destructive"
          title="Remove member?"
          description="They will lose access immediately."
          confirmLabel="Remove"
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Controls visibility." },
            { name: "onClose", type: "() => void", description: "Cancel handler." },
            { name: "onConfirm", type: "() => void", description: "Primary confirm handler." },
            { name: "tone", type: '"default" | "destructive"', default: "default", description: "Confirm button variant." },
            { name: "confirmLabel", type: "string", default: "Confirm", description: "Primary button label." },
            { name: "cancelLabel", type: "string", default: "Cancel", description: "Secondary button label." },
            { name: "isLoading", type: "boolean", default: "false", description: "Disables actions while pending." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ToasterDocPage() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function pushToast(variant: ToastItem["variant"]) {
    const id = String(Date.now());
    setToasts((prev) => [
      ...prev,
      {
        id,
        title: variant === "success" ? "Changes saved" : "Notification",
        description: "Toast stack demo from the playground.",
        variant: variant ?? "info",
      },
    ]);
  }

  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Toaster"
      description="Fixed toast stack with semantic variants and dismiss controls."
    >
      <DocSection title="Interactive">
        <div className="flex flex-wrap gap-2">
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <Button key={v} size="sm" variant="outline" onClick={() => pushToast(v)}>
              Push {v}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={() => setToasts([])}>
            Clear all
          </Button>
        </div>
        <Toaster toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "position",
            label: "position",
            defaultValue: "bottom-right",
            options: [
              { value: "bottom-right", label: "bottom-right" },
              { value: "bottom-left", label: "bottom-left" },
              { value: "top-right", label: "top-right" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <Toaster
            position={v.position as "bottom-right"}
            toasts={[{ id: "demo", title: "Preview toast", description: "Fixed position demo.", variant: "info" }]}
          />
        )}
        buildSnippet={(v) => `<Toaster toasts={toasts} onDismiss={…} position="${v.position}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "toasts", type: "ToastItem[]", description: "Active toast list." },
            { name: "onDismiss", type: "(id: string) => void", description: "Remove toast by id." },
            {
              name: "position",
              type: '"bottom-right" | "bottom-left" | "top-right"',
              default: "bottom-right",
              description: "Viewport anchor.",
            },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function LimitReachedModalDocPage() {
  const [open, setOpen] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="LimitReachedModal"
      description="Upgrade prompt when a plan quota is exhausted."
    >
      <DocSection title="Interactive">
        <Button size="sm" onClick={() => setOpen(true)}>
          Show limit modal
        </Button>
        <LimitReachedModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onUpgrade={() => setOpen(false)}
          limitLabel="3 / 3 seats used on Starter"
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Controls visibility." },
            { name: "onClose", type: "() => void", description: "Dismiss without upgrading." },
            { name: "onUpgrade", type: "() => void", description: "Shows primary upgrade button when set." },
            { name: "title", type: "ReactNode", description: "Headline." },
            { name: "description", type: "ReactNode", description: "Supporting copy." },
            { name: "limitLabel", type: "ReactNode", description: "Highlighted limit summary." },
            { name: "upgradeLabel", type: "string", default: "Upgrade plan", description: "Primary CTA label." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PopoverDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Popover"
      description="Click-triggered floating panel for compact menus and forms."
    >
      <DocSection title="Interactive">
        <Popover
          trigger={
            <Button size="sm" variant="outline">
              Open popover
            </Button>
          }
          content={
            <div className="w-48 space-y-2 p-1 text-sm">
              <p className="font-medium text-foreground">Quick actions</p>
              <p className="text-muted">Duplicate, move, or archive this record.</p>
            </div>
          }
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "placement",
            label: "placement",
            defaultValue: "bottom-start",
            options: [
              { value: "bottom-start", label: "bottom-start" },
              { value: "bottom-end", label: "bottom-end" },
              { value: "top-start", label: "top-start" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <Popover
            placement={v.placement as "bottom-start"}
            trigger={<Button size="sm">Menu</Button>}
            content={<p className="p-2 text-sm">Popover content</p>}
          />
        )}
        buildSnippet={(v) => `<Popover placement="${v.placement}" trigger={…} content={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "trigger", type: "ReactNode", description: "Click target." },
            { name: "content", type: "ReactNode", description: "Panel body." },
            {
              name: "placement",
              type: '"bottom-start" | "bottom-end" | "top-start"',
              default: "bottom-start",
              description: "Panel position.",
            },
            classNameProp,
            { name: "contentClassName", type: "string", description: "Classes on the floating panel." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FormDrawerDocPage() {
  const [open, setOpen] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="FormDrawer"
      description="Drawer preset with save and cancel footer for short forms."
    >
      <DocSection title="Interactive">
        <Button size="sm" onClick={() => setOpen(true)}>
          Edit record
        </Button>
        <FormDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Edit contact"
          onSubmit={() => setOpen(false)}
        >
          <div className="space-y-4">
            <TextInput defaultValue="Jane Doe" aria-label="Name" />
            <TextInput defaultValue="jane@luminet.io" aria-label="Email" />
          </div>
        </FormDrawer>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Controls visibility." },
            { name: "onClose", type: "() => void", description: "Cancel / backdrop dismiss." },
            { name: "title", type: "ReactNode", description: "Drawer heading." },
            { name: "children", type: "ReactNode", description: "Form fields in drawer body." },
            { name: "onSubmit", type: "() => void", description: "Primary save handler." },
            { name: "submitLabel", type: "string", default: "Save", description: "Primary button label." },
            { name: "cancelLabel", type: "string", default: "Cancel", description: "Secondary button label." },
            { name: "isSubmitting", type: "boolean", description: "Disables footer actions." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CollapseDocPage() {
  const [open, setOpen] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Collapse"
      description="Single-panel expand/collapse with button header."
    >
      <DocSection title="Uncontrolled">
        <Collapse title="Shipping policy" defaultOpen className="max-w-lg">
          Free standard shipping on orders over $50. Express options available at checkout.
        </Collapse>
      </DocSection>
      <DocSection title="Controlled">
        <Collapse title="Advanced filters" isOpen={open} onOpenChange={setOpen} className="max-w-lg">
          Controlled panel — toggle with the header or programmatic state.
        </Collapse>
        <Button size="sm" variant="ghost" className="mt-3" onClick={() => setOpen((v) => !v)}>
          Toggle from outside
        </Button>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: "Section title" },
          { type: "boolean", key: "defaultOpen", label: "defaultOpen" },
        ]}
        renderPreview={(v) => (
          <Collapse title={String(v.title)} defaultOpen={Boolean(v.defaultOpen)} className="max-w-md">
            Collapse body content.
          </Collapse>
        )}
        buildSnippet={(v) =>
          `<Collapse title="${v.title}"${v.defaultOpen ? " defaultOpen" : ""}>…</Collapse>`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "ReactNode", description: "Header label." },
            { name: "children", type: "ReactNode", description: "Collapsible body." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state (uncontrolled)." },
            { name: "isOpen", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Open change callback." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "md", description: "Header type scale." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function LazyWrapperDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="LazyWrapper"
      description="Defers rendering children until the wrapper enters the viewport."
    >
      <DocSection title="Interactive">
        <p className="mb-4 text-sm text-muted">Scroll down to load the deferred block.</p>
        <div className="h-48 overflow-y-auto rounded-lg border border-border p-4">
          <div className="h-64 text-sm text-muted">Spacer — keep scrolling…</div>
          <LazyWrapper placeholder={<div className="h-24 animate-pulse rounded-lg bg-foreground/[0.06]" />}>
            <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-4 text-sm text-foreground">
              Content loaded after intersection.
            </div>
          </LazyWrapper>
        </div>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "children", type: "ReactNode", description: "Deferred content." },
            { name: "placeholder", type: "ReactNode", description: "Shown until visible." },
            { name: "rootMargin", type: "string", default: "100px", description: "IntersectionObserver root margin." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function HideDocPage() {
  const [hidden, setHidden] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Hide"
      description="Conditionally removes children from the tree when when is true."
    >
      <DocSection title="Interactive">
        <Button size="sm" variant="outline" onClick={() => setHidden((v) => !v)}>
          {hidden ? "Show panel" : "Hide panel"}
        </Button>
        <Hide when={hidden}>
          <div className="mt-4 max-w-md rounded-lg border border-border bg-card p-4 text-sm">
            This block unmounts when hidden is true.
          </div>
        </Hide>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "when", label: "when" }]}
        renderPreview={(v) => (
          <Hide when={Boolean(v.when)}>
            <span className="text-sm text-foreground">Visible content</span>
          </Hide>
        )}
        buildSnippet={(v) => `<Hide when={${v.when ? "true" : "false"}}>…</Hide>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "when", type: "boolean", default: "false", description: "When true, children are not rendered." },
            { name: "children", type: "ReactNode", description: "Content to hide." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
