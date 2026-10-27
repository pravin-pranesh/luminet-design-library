import {
  Accordion,
  AccordionItem,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Backdrop,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CircularProgress,
  ConfirmDialog,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  EmptyState,
  ErrorState,
  FieldMessage,
  Flex,
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
  Grid,
  Header,
  HeaderActions,
  Heading,
  IconButton,
  Link,
  Loading,
  Tab,
  TabList,
  TabPanel,
  Tabs,
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
  default: "sm",
  description: "Control sizing from the Luminet taxonomy.",
};

function FormSystemExample() {
  return (
    <FormField label="Email" helperText="We never share your email." isRequired>
      <TextInput id="form-demo" placeholder="you@example.com" />
    </FormField>
  );
}

export function FormControlDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FormControl" description="Context wrapper that wires id, invalid, required, and disabled state to child labels and messages.">
      <DocSection title="States">
        <div className="grid max-w-md gap-6">
          <FormControl>
            <FormLabel>Default</FormLabel>
            <TextInput placeholder="Plain control" />
            <FormHelperText>Optional helper.</FormHelperText>
          </FormControl>
          <FormControl isInvalid isRequired>
            <FormLabel>Invalid + required</FormLabel>
            <TextInput aria-invalid placeholder="Required" />
            <FormErrorMessage>This field is required.</FormErrorMessage>
          </FormControl>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "isInvalid", label: "isInvalid" }, { type: "boolean", key: "isRequired", label: "isRequired" }]}
        renderPreview={(v) => (
          <FormControl isInvalid={Boolean(v.isInvalid)} isRequired={Boolean(v.isRequired)} className="max-w-md">
            <FormLabel>Workspace name</FormLabel>
            <TextInput placeholder="Acme" />
            {v.isInvalid ? <FormErrorMessage>Name is taken.</FormErrorMessage> : <FormHelperText>Visible to your team.</FormHelperText>}
          </FormControl>
        )}
        buildSnippet={(v) =>
          `<FormControl${v.isInvalid ? " isInvalid" : ""}${v.isRequired ? " isRequired" : ""}>\n  <FormLabel>…</FormLabel>\n  <TextInput />\n</FormControl>`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "id", type: "string", description: "Control id passed to labels." },
            { name: "isInvalid", type: "boolean", default: "false", description: "Shows error message slot." },
            { name: "isRequired", type: "boolean", default: "false", description: "Shows required asterisk on label." },
            { name: "isDisabled", type: "boolean", default: "false", description: "Dims label styling." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FormFieldDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FormField" description="High-level field shell: label, control, helper or error message.">
      <DocSection title="Helper and error">
        <FormField label="Display name" helperText="Shown on your profile." className="max-w-md">
          <TextInput placeholder="Jane Doe" />
        </FormField>
        <FormField label="Username" errorMessage="Username is already taken." isInvalid className="mt-6 max-w-md">
          <TextInput aria-invalid defaultValue="jane" />
        </FormField>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Email" },
          { type: "boolean", key: "error", label: "error" },
        ]}
        renderPreview={(v) => (
          <FormField
            label={String(v.label)}
            helperText={v.error ? undefined : "Helper copy."}
            errorMessage={v.error ? "Invalid value." : undefined}
            isInvalid={Boolean(v.error)}
            className="max-w-md"
          >
            <TextInput placeholder="…" aria-invalid={Boolean(v.error)} />
          </FormField>
        )}
        buildSnippet={() => `<FormField label="Email" helperText="…">\n  <TextInput />\n</FormField>`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "label", type: "ReactNode", description: "Field label." }, { name: "helperText", type: "ReactNode", description: "Muted helper when valid." }, { name: "errorMessage", type: "ReactNode", description: "Error copy when invalid." }, { name: "optionalHint", type: "ReactNode", description: "Optional hint on label." }, ...Object.entries({ isInvalid: "boolean", isRequired: "boolean" }).map(([n, t]) => ({ name: n, type: t, description: "Forwarded to FormControl." }))]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function FormLabelDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FormLabel" description="Accessible label wired to FormControl context.">
      <DocSection title="States">
        <FormControl isRequired className="max-w-md">
          <FormLabel>Required field</FormLabel>
          <TextInput />
        </FormControl>
        <FormControl className="mt-4 max-w-md">
          <FormLabel optionalHint="Optional">Optional field</FormLabel>
          <TextInput />
        </FormControl>
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[{ name: "optionalHint", type: "ReactNode", description: "Trailing optional hint when not required." }, { name: "htmlFor", type: "string", description: "Overrides context control id." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function FormHelperTextDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FormHelperText" description="Muted helper line; hidden when the control is invalid.">
      <DocSection title="Example">
        <FormControl className="max-w-md">
          <FormLabel>Password</FormLabel>
          <TextInput type="password" />
          <FormHelperText>Use at least 12 characters.</FormHelperText>
        </FormControl>
      </DocSection>
      <DocSection title="Props"><PropsTable rows={[{ name: "children", type: "ReactNode", description: "Helper copy." }]} /></DocSection>
    </DocPageLayout>
  );
}

export function FormErrorMessageDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FormErrorMessage" description="Error message with icon; only renders when FormControl is invalid.">
      <DocSection title="Example">
        <FormControl isInvalid className="max-w-md">
          <FormLabel>Terms</FormLabel>
          <TextInput aria-invalid />
          <FormErrorMessage>You must accept the terms.</FormErrorMessage>
        </FormControl>
      </DocSection>
      <DocSection title="Props"><PropsTable rows={[{ name: "children", type: "ReactNode", description: "Error copy." }]} /></DocSection>
    </DocPageLayout>
  );
}

export function FieldMessageDocPage() {
  return (
    <DocPageLayout sectionLabel="Forms & inputs" componentLabel="FieldMessage" description="Standalone message line for helper, error, success, and warning variants.">
      <DocSection title="Semantic variants">
        <div className="grid max-w-md gap-2">
          <FieldMessage variant="helper">Helper text</FieldMessage>
          <FieldMessage variant="error">Error text</FieldMessage>
          <FieldMessage variant="success">Saved successfully</FieldMessage>
          <FieldMessage variant="warning">Approaching limit</FieldMessage>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "variant", label: "variant", defaultValue: "helper", options: ["helper", "error", "success", "warning"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => <FieldMessage variant={v.variant as "helper"}>Message copy</FieldMessage>}
        buildSnippet={(v) => `<FieldMessage variant="${v.variant}">…</FieldMessage>`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "variant", type: '"helper" | "error" | "success" | "warning"', default: "helper", description: "Semantic tone." }, sizeProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function AlertDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="Alert" description="Inline status banner with semantic variants and optional accent bar.">
      <DocSection title="Semantic colour variants">
        <div className="grid gap-3">
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <Alert key={v} variant={v}>
              <AlertIcon variant={v} />
              <div>
                <AlertTitle>{v.charAt(0).toUpperCase() + v.slice(1)}</AlertTitle>
                <AlertDescription>Supporting description for the {v} alert.</AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      </DocSection>
      <DocSection title="Sizes">
        <div className="grid gap-3">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Alert key={s} size={s} variant="info">
              <AlertDescription>Size {s}</AlertDescription>
            </Alert>
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "variant", label: "variant", defaultValue: "info", options: ["info", "success", "warning", "error"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => (
          <Alert variant={v.variant as "info"} className="max-w-lg">
            <AlertIcon variant={v.variant as "info"} />
            <div>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Playground alert.</AlertDescription>
            </div>
          </Alert>
        )}
        buildSnippet={(v) => `<Alert variant="${v.variant}">…</Alert>`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "variant", type: '"info" | "success" | "warning" | "error"', default: "info", description: "Semantic tone." }, { name: "accentBar", type: "boolean", default: "true", description: "Left accent border." }, { name: "size", type: '"sm" | "md" | "lg"', default: "md", description: "Padding and type scale." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function AlertTitleDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="AlertTitle" description="Bold title line inside Alert.">
      <DocSection title="Example">
        <Alert variant="info" className="max-w-lg">
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>A new version is ready to install.</AlertDescription>
        </Alert>
      </DocSection>
    </DocPageLayout>
  );
}

export function AlertDescriptionDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="AlertDescription" description="Muted body copy inside Alert.">
      <DocSection title="Example">
        <Alert variant="success" className="max-w-lg">
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>Your changes were stored successfully.</AlertDescription>
        </Alert>
      </DocSection>
    </DocPageLayout>
  );
}

export function AlertIconDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="AlertIcon" description="Preset icons per alert variant.">
      <DocSection title="Variants">
        <Flex gap="4" wrap>
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <StateExample key={v} title={v}>
              <AlertIcon variant={v} />
            </StateExample>
          ))}
        </Flex>
      </DocSection>
    </DocPageLayout>
  );
}

export function ConfirmDialogDocPage() {
  const [open, setOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="ConfirmDialog" description="Modal confirmation with primary and destructive actions.">
      <DocSection title="States">
        <Flex gap="3">
          <Button size="sm" onClick={() => setOpen(true)}>
            Open default
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDestructiveOpen(true)}>
            Open destructive
          </Button>
        </Flex>
        <ConfirmDialog isOpen={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} title="Publish changes?" description="This will update the live workspace." />
        <ConfirmDialog
          isOpen={destructiveOpen}
          onClose={() => setDestructiveOpen(false)}
          onConfirm={() => setDestructiveOpen(false)}
          variant="destructive"
          title="Delete record?"
          description="This action cannot be undone."
          confirmLabel="Delete"
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "isOpen", type: "boolean", description: "Controls visibility." },
            { name: "onClose", type: "() => void", description: "Cancel / dismiss." },
            { name: "onConfirm", type: "() => void", description: "Confirm action." },
            { name: "variant", type: '"default" | "destructive"', default: "default", description: "Confirm button tone." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function BoxDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Box" description="Unstyled layout primitive — a typed div wrapper.">
      <DocSection title="Example">
        <Box className="rounded-md border border-border bg-card p-4">Box content</Box>
      </DocSection>
    </DocPageLayout>
  );
}

export function FlexDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Flex" description="Flexbox layout helper with direction, align, justify, and gap.">
      <DocSection title="Direction">
        <Flex gap="2" className="rounded-md border border-border p-3">
          <Badge>A</Badge>
          <Badge>B</Badge>
          <Badge>C</Badge>
        </Flex>
        <Flex direction="column" gap="2" className="mt-4 max-w-xs rounded-md border border-border p-3">
          <Badge>Row 1</Badge>
          <Badge>Row 2</Badge>
        </Flex>
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[{ name: "direction", type: "row | column | …", default: "row", description: "Flex direction." }, { name: "gap", type: "0 | 1 | 2 | …", default: "2", description: "Gap scale." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function GridDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Grid" description="CSS grid wrapper with column presets.">
      <DocSection title="Columns">
        <Grid columns={3} gap="3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} padding="sm" variant="outline">
              Cell {n}
            </Card>
          ))}
        </Grid>
      </DocSection>
      <DocSection title="Props"><PropsTable rows={[{ name: "columns", type: "1 | 2 | 3 | 4 | 6 | 12", default: "1", description: "grid-cols-* preset." }]} /></DocSection>
    </DocPageLayout>
  );
}

export function ContainerDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Container" description="Centered max-width page gutter.">
      <DocSection title="Example">
        <Container maxWidth="md" className="rounded-md border border-dashed border-border py-6 text-center text-sm text-muted">
          maxWidth=&quot;md&quot;
        </Container>
      </DocSection>
    </DocPageLayout>
  );
}

export function CardDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Card" description="Surface with outline, elevated, or ghost variants.">
      <DocSection title="Variants">
        <Grid columns={3} gap="4">
          <Card variant="outline">Outline</Card>
          <Card variant="elevated">Elevated</Card>
          <Card variant="ghost">Ghost</Card>
        </Grid>
      </DocSection>
      <DocSection title="Interactive">
        <Card variant="outline" interactive className="max-w-sm">
          Hover to elevate
        </Card>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "variant", label: "variant", defaultValue: "outline", options: ["outline", "elevated", "ghost"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => <Card variant={v.variant as "outline"}>Card</Card>}
        buildSnippet={(v) => `<Card variant="${v.variant}">…</Card>`}
      />
    </DocPageLayout>
  );
}

export function DividerDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="Divider" description="Horizontal or vertical separator.">
      <DocSection title="Orientation">
        <p className="text-sm">Above</p>
        <Divider className="my-3" />
        <p className="text-sm">Below</p>
        <Flex align="center" gap="3" className="mt-6 h-8">
          <span className="text-sm">Left</span>
          <Divider orientation="vertical" />
          <span className="text-sm">Right</span>
        </Flex>
      </DocSection>
    </DocPageLayout>
  );
}

export function HeadingDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Heading" description="Semantic heading levels with shared type scale.">
      <DocSection title="Levels">
        {([1, 2, 3, 4, 5, 6] as const).map((l) => (
          <Heading key={l} level={l} className="mb-2">
            Level {l}
          </Heading>
        ))}
      </DocSection>
    </DocPageLayout>
  );
}

export function EmptyStateDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="EmptyState" description="Placeholder when a list or view has no data.">
      <DocSection title="Example">
        <EmptyState title="No projects yet" description="Create a project to get started." actionLabel="New project" onAction={() => undefined} />
      </DocSection>
    </DocPageLayout>
  );
}

export function ErrorStateDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="ErrorState" description="Full-width error panel with optional retry.">
      <DocSection title="Example">
        <ErrorState onRetry={() => undefined} />
      </DocSection>
    </DocPageLayout>
  );
}

export function BadgeDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Badge" description="Compact status and count chip.">
      <DocSection title="Sizes">
        <Flex gap="2" align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Badge key={s} size={s}>
              {s}
            </Badge>
          ))}
        </Flex>
      </DocSection>
      <DocSection title="Semantic colour variants">
        <Flex gap="2" wrap>
          {(["solid", "outline", "subtle", "success", "warning", "destructive"] as const).map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "variant", label: "variant", defaultValue: "subtle", options: ["solid", "outline", "subtle", "success", "warning", "destructive"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => <Badge variant={v.variant as "subtle"}>Badge</Badge>}
        buildSnippet={(v) => `<Badge variant="${v.variant}">Badge</Badge>`}
      />
    </DocPageLayout>
  );
}

export function LinkDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Link" description="Styled anchor with underline modes.">
      <DocSection title="Variants">
        <Flex direction="column" gap="2" align="start">
          <Link href="#">Default link</Link>
          <Link href="#" variant="muted">
            Muted link
          </Link>
          <Link href="#" underline="always">
            Always underlined
          </Link>
        </Flex>
      </DocSection>
    </DocPageLayout>
  );
}

export function IconButtonDocPage() {
  return (
    <DocPageLayout sectionLabel="Actions & utilities" componentLabel="IconButton" description="Square icon-only button using Button variants.">
      <DocSection title="Sizes">
        <Flex gap="2" align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <IconButton key={s} size={s} aria-label="Settings">
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-full max-w-[1em]">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </IconButton>
          ))}
        </Flex>
      </DocSection>
      <DocSection title="Props"><PropsTable rows={[{ name: "aria-label", type: "string", description: "Required accessible name." }, { name: "variant", type: "Button variants", default: "ghost", description: "Visual style." }, sizeProp]} /></DocSection>
    </DocPageLayout>
  );
}

export function BreadcrumbsDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Breadcrumbs" description="Hierarchy trail with optional links.">
      <DocSection title="Example">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Design library", current: true },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function HeaderDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Header" description="Page header with title, subtitle, breadcrumbs, and actions.">
      <DocSection title="Example">
        <Header
          breadcrumbs={
            <Breadcrumbs items={[{ label: "Settings", href: "#" }, { label: "Team", current: true }]} />
          }
          title="Team members"
          subtitle="Manage who has access to this workspace."
          actions={
            <>
              <Button size="sm" variant="outline">
                Export
              </Button>
              <Button size="sm">Invite</Button>
            </>
          }
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function HeaderActionsDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="HeaderActions" description="Toolbar cluster for header action buttons.">
      <DocSection title="Example">
        <HeaderActions>
          <Button size="sm" variant="ghost">
            Filter
          </Button>
          <Button size="sm">Save</Button>
        </HeaderActions>
      </DocSection>
    </DocPageLayout>
  );
}

export function AccordionDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Accordion" description="Expand/collapse sections — single or multiple open.">
      <DocSection title="Single">
        <Accordion defaultValue={["a"]} className="max-w-lg">
          <AccordionItem id="a" title="What is Luminet?">
            Luminet is a design system for product teams.
          </AccordionItem>
          <AccordionItem id="b" title="How do I theme it?">
            Import theme.css and override CSS variables.
          </AccordionItem>
        </Accordion>
      </DocSection>
    </DocPageLayout>
  );
}

export function DrawerDocPage() {
  const [open, setOpen] = useState(false);
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="Drawer" description="Slide-over panel with header, body, and footer slots.">
      <DocSection title="Interactive">
        <Button size="sm" onClick={() => setOpen(true)}>
          Open drawer
        </Button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Filters">
          <DrawerBody>
            <FormSystemExample />
          </DrawerBody>
          <DrawerFooter>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </DrawerFooter>
        </Drawer>
      </DocSection>
    </DocPageLayout>
  );
}

export function DrawerHeaderDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="DrawerHeader" description="Top bar inside Drawer — use with DrawerBody and DrawerFooter.">
      <DocSection title="Composition">
        <Card variant="outline" padding="none" className="max-w-md overflow-hidden">
          <DrawerHeader className="border-b px-4 py-3">
            <Heading level={5} as="h3">
              Static preview
            </Heading>
            <IconButton aria-label="Close" size="sm" variant="ghost">
              ×
            </IconButton>
          </DrawerHeader>
          <DrawerBody>Body content</DrawerBody>
        </Card>
      </DocSection>
    </DocPageLayout>
  );
}

export function DrawerBodyDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="DrawerBody" description="Scrollable main region of a drawer.">
      <DocSection title="Example">
        <DrawerBody className="max-h-40 rounded-md border border-border">Scrollable drawer body content.</DrawerBody>
      </DocSection>
    </DocPageLayout>
  );
}

export function DrawerFooterDocPage() {
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="DrawerFooter" description="Action row pinned to the bottom of a drawer.">
      <DocSection title="Example">
        <DrawerFooter className="rounded-md border border-border">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </DrawerFooter>
      </DocSection>
    </DocPageLayout>
  );
}

export function BackdropDocPage() {
  const [show, setShow] = useState(false);
  return (
    <DocPageLayout sectionLabel="Feedback & overlays" componentLabel="Backdrop" description="Dimmed overlay for modals and drawers.">
      <DocSection title="Example">
        <Button size="sm" onClick={() => setShow((s) => !s)}>
          Toggle backdrop
        </Button>
        <Backdrop isOpen={show} className="!fixed" onClick={() => setShow(false)} />
      </DocSection>
    </DocPageLayout>
  );
}

export function LoadingDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="Loading" description="Spinner with label; optional full-screen overlay.">
      <DocSection title="Inline">
        <Loading />
      </DocSection>
    </DocPageLayout>
  );
}

export function CircularProgressDocPage() {
  return (
    <DocPageLayout sectionLabel="Data display" componentLabel="CircularProgress" description="Indeterminate spinner using primary brand color.">
      <DocSection title="Sizes">
        <Flex gap="4" align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <CircularProgress key={s} size={s} />
          ))}
        </Flex>
      </DocSection>
    </DocPageLayout>
  );
}

export function TabsDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Tabs" description="Basic tablist with underline active indicator.">
      <DocSection title="Example">
        <Tabs defaultValue="one" className="max-w-lg">
          <TabList>
            <Tab value="one">Overview</Tab>
            <Tab value="two">Settings</Tab>
            <Tab value="three" disabled>
              Billing
            </Tab>
          </TabList>
          <TabPanel value="one">Overview panel content.</TabPanel>
          <TabPanel value="two">Settings panel content.</TabPanel>
        </Tabs>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "select", key: "size", label: "size", defaultValue: "md", options: ["sm", "md", "lg"].map((v) => ({ value: v, label: v })) }]}
        renderPreview={(v) => (
          <Tabs defaultValue="a" size={v.size as "md"}>
            <TabList>
              <Tab value="a">Tab A</Tab>
              <Tab value="b">Tab B</Tab>
            </TabList>
            <TabPanel value="a">Panel A</TabPanel>
            <TabPanel value="b">Panel B</TabPanel>
          </Tabs>
        )}
        buildSnippet={() => `<Tabs defaultValue="one">\n  <TabList>…</TabList>\n  <TabPanel value="one">…</TabPanel>\n</Tabs>`}
      />
    </DocPageLayout>
  );
}
