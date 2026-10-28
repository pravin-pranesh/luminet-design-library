import {
  AddressCard,
  AddressCardGroup,
  Badge,
  Button,
  CalendarGrid,
  Center,
  ChoiceCard,
  ChoiceCardGroup,
  CustomModulesTable,
  DescriptionList,
  DetailSections,
  FilterBar,
  FilteredEmptyState,
  FilterSidebar,
  Flex,
  Grid,
  GridItem,
  KanbanBoard,
  List,
  ListIcon,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
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

const demoTable = (
  <Table striped>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Jordan Lee</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell>
          <Badge size="xs" variant="success">
            Active
          </Badge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sam Rivera</TableCell>
        <TableCell>Editor</TableCell>
        <TableCell>
          <Badge size="xs" variant="warning">
            Pending
          </Badge>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const octoberWeeks: (number | null)[][] = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];

export function TableDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="Table"
      description="Structured data with hover rows, optional striping, and responsive scroll."
    >
      <DocSection title="States">
        <StateExample title="Default">{demoTable}</StateExample>
        <div className="mt-6">
          <StateExample title="Striped">{demoTable}</StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "striped", label: "striped" }]}
        renderPreview={(v) => (
          <Table striped={Boolean(v.striped)}>
            <TableHead>
              <TableRow>
                <TableHeaderCell>SKU</TableHeaderCell>
                <TableHeaderCell>Qty</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>LUM-001</TableCell>
                <TableCell>24</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        buildSnippet={(v) => `<Table${v.striped ? " striped" : ""}>…</Table>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "striped", type: "boolean", default: "false", description: "Alternate row background." },
            { name: "children", type: "ReactNode", description: "TableHead, TableBody, rows, and cells." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ListDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="List"
      description="Vertical stacks for settings, menus, and record summaries."
    >
      <DocSection title="Variants">
        {(["plain", "divided", "inset"] as const).map((variant) => (
          <StateExample key={variant} title={variant}>
            <List variant={variant} className="mb-4 max-w-md">
              <ListItem>Notifications</ListItem>
              <ListItem>Security</ListItem>
              <ListItem>Billing</ListItem>
            </List>
          </StateExample>
        ))}
      </DocSection>
      <DocSection title="Sizes">
        <Flex gap="4" wrap>
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <List key={s} size={s} variant="divided" className="min-w-[10rem]">
              <ListItem size={s}>{s}</ListItem>
            </List>
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "variant",
            label: "variant",
            defaultValue: "divided",
            options: ["plain", "divided", "inset"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <List variant={v.variant as "divided"} className="max-w-xs">
            <ListItem interactive>Item A</ListItem>
            <ListItem interactive>Item B</ListItem>
          </List>
        )}
        buildSnippet={(v) => `<List variant="${v.variant}">…</List>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "variant", type: '"plain" | "divided" | "inset"', default: "plain", description: "List chrome." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ListItemDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="ListItem"
      description="Row with optional leading and trailing slots for icons and meta."
    >
      <DocSection title="Interactive">
        <List variant="divided" className="max-w-md">
          <ListItem interactive leading="◎" trailing={<Badge size="xs">3</Badge>}>
            Inbox
          </ListItem>
          <ListItem interactive leading="◇" trailing="→">
            Archive
          </ListItem>
        </List>
      </DocSection>
      <DocSection title="Sizes">
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <ListItem key={s} size={s} className="max-w-md rounded-md border border-border px-0">
            Size {s}
          </ListItem>
        ))}
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "interactive", label: "interactive" }]}
        renderPreview={(v) => (
          <ListItem interactive={Boolean(v.interactive)} className="max-w-xs rounded-md border border-border">
            Workspace settings
          </ListItem>
        )}
        buildSnippet={(v) => `<ListItem${v.interactive ? " interactive" : ""}>…</ListItem>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "leading", type: "ReactNode", description: "Icon or avatar before label." },
            { name: "trailing", type: "ReactNode", description: "Meta or chevron after label." },
            { name: "interactive", type: "boolean", default: "false", description: "Hover background for clickable rows." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M3 5a2 2 0 012-2h3.5l1 1H15a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  );
}

export function ListIconDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="ListIcon"
      description="Sized icon container for list rows and settings menus."
    >
      <DocSection title="Sizes">
        <Flex gap="3" align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <ListIcon key={s} size={s}>
              <FolderIcon />
            </ListIcon>
          ))}
        </Flex>
      </DocSection>
      <DocSection title="Semantic colour variants">
        <Flex gap="2" wrap>
          {(["neutral", "primary", "success", "warning", "destructive"] as const).map((tone) => (
            <ListIcon key={tone} tone={tone}>
              <FolderIcon />
            </ListIcon>
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "tone",
            label: "tone",
            defaultValue: "primary",
            options: ["neutral", "primary", "success", "warning", "destructive"].map((v) => ({
              value: v,
              label: v,
            })),
          },
        ]}
        renderPreview={(v) => (
          <ListIcon tone={v.tone as "primary"}>
            <FolderIcon />
          </ListIcon>
        )}
        buildSnippet={(v) => `<ListIcon tone="${v.tone}">…</ListIcon>`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "tone", type: "semantic tones", default: "neutral", description: "Background and icon color." }, sizeProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function DescriptionListDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="DescriptionList"
      description="Term/description pairs for record detail and checkout summaries."
    >
      <DocSection title="Columns">
        <DescriptionList
          className="max-w-xl"
          items={[
            { term: "Customer", description: "Acme Corp" },
            { term: "Plan", description: "Growth" },
            { term: "Renewal", description: "Apr 1, 2026" },
          ]}
        />
        <DescriptionList
          columns={2}
          className="mt-8 max-w-2xl"
          items={[
            { term: "Ship to", description: "221B Baker St" },
            { term: "Bill to", description: "Same as shipping" },
            { term: "PO", description: "#1042" },
            { term: "Terms", description: "Net 30" },
          ]}
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "columns",
            label: "columns",
            defaultValue: "1",
            options: [
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <DescriptionList
            columns={Number(v.columns) as 1 | 2}
            items={[
              { term: "Region", description: "US-East" },
              { term: "Owner", description: "Ops team" },
            ]}
          />
        )}
        buildSnippet={(v) => `<DescriptionList columns={${v.columns}} items={[…]} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "{ term, description }[]", description: "Rows to render." },
            { name: "columns", type: "1 | 2", default: "1", description: "Responsive column layout." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FilterBarDocPage() {
  const [chips, setChips] = useState([
    { id: "active", label: "Active", active: true },
    { id: "draft", label: "Draft", active: false },
    { id: "archived", label: "Archived", active: false },
  ]);
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="FilterBar"
      description="Horizontal filter toolbar with search and toggle chips."
    >
      <DocSection title="Example">
        <FilterBar
          chips={chips}
          onChipToggle={(id) =>
            setChips((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
          }
          onClear={() => setChips((prev) => prev.map((c) => ({ ...c, active: false })))}
          searchPlaceholder="Search records…"
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "chips", type: "FilterChip[]", description: "Toggle filter buttons." },
            { name: "onChipToggle", type: "(id) => void", description: "Chip click handler." },
            { name: "onSearch", type: "(query) => void", description: "Search input change." },
            { name: "onClear", type: "() => void", description: "Clear active chips." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FilterSidebarDocPage() {
  const [sections, setSections] = useState([
    {
      id: "status",
      title: "Status",
      options: [
        { id: "open", label: "Open", checked: true },
        { id: "closed", label: "Closed", checked: false },
      ],
    },
    {
      id: "owner",
      title: "Owner",
      options: [
        { id: "me", label: "Assigned to me", checked: false },
        { id: "team", label: "My team", checked: true },
      ],
    },
  ]);
  const activeCount = sections.reduce((n, s) => n + s.options.filter((o) => o.checked).length, 0);

  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="FilterSidebar"
      description="Vertical filter panel for dense list and catalog layouts."
    >
      <DocSection title="Example">
        <FilterSidebar
          sections={sections}
          activeCount={activeCount}
          onToggle={(sectionId, optionId) =>
            setSections((prev) =>
              prev.map((s) =>
                s.id !== sectionId
                  ? s
                  : {
                      ...s,
                      options: s.options.map((o) =>
                        o.id === optionId ? { ...o, checked: !o.checked } : o,
                      ),
                    },
              ),
            )
          }
          onClear={() =>
            setSections((prev) =>
              prev.map((s) => ({ ...s, options: s.options.map((o) => ({ ...o, checked: false })) })),
            )
          }
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "sections", type: "FilterSidebarSection[]", description: "Grouped checkbox filters." },
            { name: "onToggle", type: "(sectionId, optionId) => void", description: "Option change." },
            { name: "width", type: '"sm" | "md" | "lg"', default: "md", description: "Sidebar width preset." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FilteredEmptyStateDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="FilteredEmptyState"
      description="Empty view when filters hide all results — includes clear action."
    >
      <DocSection title="Example">
        <FilteredEmptyState activeFilterCount={3} onClearFilters={() => undefined} />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "count", label: "active filters", defaultValue: "2" }]}
        renderPreview={(v) => (
          <FilteredEmptyState
            activeFilterCount={Number(v.count) || 0}
            onClearFilters={() => undefined}
          />
        )}
        buildSnippet={() => `<FilteredEmptyState activeFilterCount={2} onClearFilters={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "onClearFilters", type: "() => void", description: "Clear filters action." },
            { name: "activeFilterCount", type: "number", description: "Shown in clear button label." },
            { name: "title", type: "ReactNode", description: "Headline (inherits EmptyState)." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function KanbanBoardDocPage() {
  const columns = [
    {
      id: "todo",
      title: "To do",
      accent: "neutral" as const,
      cards: [
        { id: "1", title: "Wire checkout", subtitle: "Due Fri" },
        { id: "2", title: "Review tokens", subtitle: "Design" },
      ],
    },
    {
      id: "progress",
      title: "In progress",
      accent: "primary" as const,
      cards: [{ id: "3", title: "Data display docs", subtitle: "Engineering" }],
    },
    {
      id: "done",
      title: "Done",
      accent: "success" as const,
      cards: [{ id: "4", title: "Forms parity", subtitle: "Shipped" }],
    },
  ];
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="Kanban Board"
      description="Column board for pipeline and workflow views."
    >
      <DocSection title="Example">
        <KanbanBoard columns={columns} />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "columns", type: "KanbanColumn[]", description: "Column title, cards, accent." },
            { name: "onCardClick", type: "(columnId, cardId) => void", description: "Optional card handler." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function DetailSectionsDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="DetailSections"
      description="Stacked detail blocks for record and order pages."
    >
      <DocSection title="Example">
        <DetailSections
          sections={[
            {
              id: "overview",
              title: "Overview",
              description: "High-level account metadata.",
              content: "Growth plan · 12 seats · Renewing Q2.",
            },
            {
              id: "billing",
              title: "Billing",
              content: "Invoice #8821 paid Mar 12.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[{ name: "sections", type: "DetailSection[]", description: "Title, optional description, content." }, sizeProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function AddressCardDocPage() {
  const [selected, setSelected] = useState("home");
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="AddressCard"
      description="Selectable shipping or billing address tile."
    >
      <DocSection title="States">
        <AddressCardGroup columns={2} className="max-w-2xl">
          <AddressCard
            name="Home"
            lines={["742 Evergreen Terrace", "Springfield, IL 62701"]}
            selected={selected === "home"}
            isDefault
            onSelect={() => setSelected("home")}
          />
          <AddressCard
            name="Office"
            lines={["100 Market St", "San Francisco, CA 94105"]}
            selected={selected === "office"}
            onSelect={() => setSelected("office")}
          />
        </AddressCardGroup>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "selected", label: "selected" }]}
        renderPreview={(v) => (
          <AddressCard
            name="Warehouse"
            lines={["Dock 3", "Portland, OR"]}
            selected={Boolean(v.selected)}
            className="max-w-sm"
          />
        )}
        buildSnippet={(v) => `<AddressCard name="…" lines={[…]}${v.selected ? " selected" : ""} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "name", type: "ReactNode", description: "Address label." },
            { name: "lines", type: "ReactNode[]", description: "Street, city lines." },
            { name: "selected", type: "boolean", description: "Primary border and ring." },
            { name: "isDefault", type: "boolean", description: "Shows default badge." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function AddressCardGroupDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="AddressCardGroup"
      description="Responsive grid wrapper for address selection."
    >
      <DocSection title="Layout">
        <AddressCardGroup label="Saved addresses" className="max-w-2xl">
          <AddressCard name="A" lines={["Line 1"]} />
          <AddressCard name="B" lines={["Line 1"]} selected />
        </AddressCardGroup>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "columns", type: "1 | 2", default: "2", description: "Grid columns." },
            { name: "label", type: "string", description: "radiogroup aria-label." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ChoiceCardDocPage() {
  const [plan, setPlan] = useState("pro");
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="ChoiceCard"
      description="Large selectable tile for plans, shipping, or payment method."
    >
      <DocSection title="Sizes">
        <ChoiceCardGroup className="max-w-md">
          {(["sm", "md", "lg"] as const).map((s) => (
            <ChoiceCard key={s} size={s} title={`Size ${s}`} description="Description copy." selected={s === "md"} />
          ))}
        </ChoiceCardGroup>
      </DocSection>
      <DocSection title="Selection">
        <ChoiceCardGroup label="Plans" className="max-w-lg">
          <ChoiceCard title="Starter" description="$9 / mo" selected={plan === "starter"} onSelect={() => setPlan("starter")} />
          <ChoiceCard title="Pro" description="$29 / mo" selected={plan === "pro"} onSelect={() => setPlan("pro")} />
        </ChoiceCardGroup>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "selected", label: "selected" }]}
        renderPreview={(v) => (
          <ChoiceCard title="Express shipping" description="1–2 business days" selected={Boolean(v.selected)} className="max-w-sm" />
        )}
        buildSnippet={(v) => `<ChoiceCard title="…"${v.selected ? " selected" : ""} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "ReactNode", description: "Primary label." },
            { name: "description", type: "ReactNode", description: "Supporting copy." },
            { name: "selected", type: "boolean", description: "Selected visual state." },
            { name: "disabled", type: "boolean", description: "Non-interactive." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ChoiceCardGroupDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="ChoiceCardGroup"
      description="Groups choice cards vertically or in a horizontal row."
    >
      <DocSection title="Orientation">
        <ChoiceCardGroup orientation="vertical" className="max-w-sm">
          <ChoiceCard title="Option A" selected />
          <ChoiceCard title="Option B" />
        </ChoiceCardGroup>
        <ChoiceCardGroup orientation="horizontal" className="mt-6 max-w-xl">
          <ChoiceCard title="Left" className="flex-1" />
          <ChoiceCard title="Right" className="flex-1" selected />
        </ChoiceCardGroup>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "orientation", type: '"vertical" | "horizontal"', default: "vertical", description: "Stack direction." },
            { name: "label", type: "string", description: "group aria-label." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CalendarGridDocPage() {
  const [day, setDay] = useState(28);
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="CalendarGrid"
      description="Month grid for date-picker building blocks and scheduling UIs."
    >
      <DocSection title="Example">
        <CalendarGrid monthLabel="October 2026" weeks={octoberWeeks} selectedDay={day} onDaySelect={setDay} />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "selected", label: "selected day", defaultValue: "15" }]}
        renderPreview={(v) => (
          <CalendarGrid
            monthLabel="October 2026"
            weeks={octoberWeeks}
            selectedDay={Number(v.selected) || undefined}
          />
        )}
        buildSnippet={() => `<CalendarGrid monthLabel="…" weeks={weeks} selectedDay={15} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "monthLabel", type: "string", description: "Header label." },
            { name: "weeks", type: "(number | null)[][]", description: "Week rows; null pads empty cells." },
            { name: "selectedDay", type: "number", description: "Highlighted day." },
            { name: "onDaySelect", type: "(day) => void", description: "Day click handler." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CustomModulesTableDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="CustomModulesTable"
      description="Opinionated module registry table with status badges."
    >
      <DocSection title="Example">
        <CustomModulesTable
          striped
          rows={[
            {
              id: "1",
              name: "Inventory sync",
              status: "active",
              updatedAt: "2h ago",
              actions: (
                <Button size="xs" variant="ghost">
                  Edit
                </Button>
              ),
            },
            {
              id: "2",
              name: "Legacy export",
              status: "archived",
              updatedAt: "Jan 4",
              actions: (
                <Button size="xs" variant="ghost">
                  Restore
                </Button>
              ),
            },
          ]}
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "rows", type: "CustomModuleRow[]", description: "Module name, status, updated, actions." },
            { name: "striped", type: "boolean", description: "Passed to underlying Table." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CenterDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="Center"
      description="Flexbox centering helper for empty states and icon stacks."
    >
      <DocSection title="Block vs inline">
        <Center className="h-32 rounded-md border border-dashed border-border bg-card">
          <Badge>Centered</Badge>
        </Center>
        <Center inline className="mt-4 rounded-md border border-border px-4 py-2">
          <span className="text-sm text-muted">inline-flex center</span>
        </Center>
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[{ name: "inline", type: "boolean", default: "false", description: "Use inline-flex instead of flex." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function GridItemDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Data display"
      componentLabel="GridItem"
      description="Grid cell with col-span and row-span presets."
    >
      <DocSection title="Span">
        <Grid columns={4} gap="2" className="max-w-lg">
          <GridItem colSpan={2} className="rounded-md border border-border bg-primary/10 p-4 text-sm">
            colSpan 2
          </GridItem>
          <GridItem className="rounded-md border border-border p-4 text-sm">
            1
          </GridItem>
          <GridItem className="rounded-md border border-border p-4 text-sm">
            1
          </GridItem>
          <GridItem colSpan="full" className="rounded-md border border-border bg-card p-4 text-sm">
            full width
          </GridItem>
        </Grid>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "colSpan",
            label: "colSpan",
            defaultValue: "2",
            options: ["1", "2", "3", "full"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <Grid columns={3} gap="2" className="max-w-xs">
            <GridItem colSpan={v.colSpan === "full" ? "full" : (Number(v.colSpan) as 1 | 2 | 3)} className="rounded-md border border-border p-3 text-sm">
              span
            </GridItem>
            <GridItem className="rounded-md border border-border p-3 text-sm">
              b
            </GridItem>
          </Grid>
        )}
        buildSnippet={(v) => `<GridItem colSpan={${v.colSpan === "full" ? '"full"' : v.colSpan}} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "colSpan", type: "1 | 2 | 3 | 4 | 6 | 12 | full", description: "Column span preset." },
            { name: "rowSpan", type: "1 | 2 | 3", description: "Row span preset." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
