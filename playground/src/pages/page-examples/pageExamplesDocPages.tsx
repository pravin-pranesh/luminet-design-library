import {
  Billing,
  Commercecheckout,
  Dashboard,
  Inbox,
  Kanbanpage,
  Profile,
  Recorddetail,
  Recordslist,
  Settings,
  Splitview,
} from "@luminet/design-library";
import type { ReactNode } from "react";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable } from "../../doc/PropsTable";

const SECTION = "Page examples";

const fullWidthClass = "mx-auto max-w-none w-full p-0";

function FullLayoutSection({ children }: { children: ReactNode }) {
  return (
    <DocSection title="Full layout preview">
      <div className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-6 sm:w-[calc(100%+3rem)]">{children}</div>
    </DocSection>
  );
}

const layoutProps = [
  { name: "title", type: "ReactNode", description: "Override default page title." },
  { name: "description", type: "ReactNode", description: "Subtitle under the header." },
  { name: "children", type: "ReactNode", description: "Main content slot." },
  { name: "className", type: "string", description: "Classes on the page shell." },
];

export function DashboardDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Dashboard"
      description="KPI grid and chart region for executive summaries."
    >
      <FullLayoutSection>
        <Dashboard className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function RecordslistDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Records list"
      description="Filterable table shell with bulk action header."
    >
      <FullLayoutSection>
        <Recordslist className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function RecorddetailDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Record detail"
      description="Two-column detail layout with activity sidebar."
    >
      <FullLayoutSection>
        <Recorddetail className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function SettingsDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Settings"
      description="Single-card settings form layout."
    >
      <FullLayoutSection>
        <Settings className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function ProfileDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Profile"
      description="Profile and identity fields in a focused card."
    >
      <FullLayoutSection>
        <Profile className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function BillingDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Billing"
      description="Plan, usage, and invoice modules for account billing."
    >
      <FullLayoutSection>
        <Billing className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function InboxDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Inbox"
      description="Master-detail messaging layout for support and chat."
    >
      <FullLayoutSection>
        <Inbox className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function SplitviewDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Split view"
      description="Master-detail split for records and documents."
    >
      <FullLayoutSection>
        <Splitview className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function KanbanpageDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Kanban page"
      description="Horizontal pipeline board page shell."
    >
      <FullLayoutSection>
        <Kanbanpage className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}

export function CommercecheckoutDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Commerce checkout"
      description="Checkout steps with sticky order summary column."
    >
      <FullLayoutSection>
        <Commercecheckout className={fullWidthClass} />
      </FullLayoutSection>
      <DocSection title="Props">
        <PropsTable rows={layoutProps} />
      </DocSection>
    </DocPageLayout>
  );
}
