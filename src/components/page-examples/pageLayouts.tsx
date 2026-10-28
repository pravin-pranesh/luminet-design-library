import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Card } from "../layout/Card";
import { Header } from "../Header";
import { Breadcrumbs } from "../Breadcrumbs";
import { Flex } from "../layout/Flex";
import { Button } from "../Button";

export type PageLayoutProps = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

function PageShell({ title, description, children, className }: PageLayoutProps) {
  return (
    <div className={cn("mx-auto max-w-6xl space-y-6 p-4", className)}>
      <Header
        title={title}
        subtitle={description}
        breadcrumbs={<Breadcrumbs items={[{ label: "Examples", href: "#" }, { label: String(title), current: true }]} />}
        actions={
          <Button size="sm" variant="outline">
            Export
          </Button>
        }
      />
      {children}
    </div>
  );
}

export function Dashboard(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Dashboard"} description={props.description ?? "KPIs and recent activity."} className={props.className}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Revenue", "Orders", "Conversion", "Returns"].map((k) => (
          <Card key={k} variant="outline" padding="md">
            <p className="text-xs text-muted">{k}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">—</p>
          </Card>
        ))}
      </div>
      <Card variant="outline" padding="md">
        {props.children ?? "Chart or table region"}
      </Card>
    </PageShell>
  );
}

export function Recordslist(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Records"} description={props.description ?? "Filter, sort, and bulk actions."} className={props.className}>
      <Card variant="outline" padding="none">
        <div className="border-b border-border px-4 py-3 text-sm font-medium">All records</div>
        <div className="divide-y divide-border">{props.children ?? <div className="p-6 text-sm text-muted">Table placeholder</div>}</div>
      </Card>
    </PageShell>
  );
}

export function Recorddetail(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Record detail"} description={props.description} className={props.className}>
      <Flex gap="4" className="flex-col lg:flex-row">
        <Card variant="outline" className="flex-1" padding="md">
          {props.children ?? "Detail sections"}
        </Card>
        <Card variant="outline" className="w-full lg:w-72" padding="md">
          Activity
        </Card>
      </Flex>
    </PageShell>
  );
}

export function Settings(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Settings"} description={props.description ?? "Workspace preferences."} className={props.className}>
      <Card variant="outline" padding="md">
        {props.children ?? "Settings form"}
      </Card>
    </PageShell>
  );
}

export function Profile(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Profile"} description={props.description} className={props.className}>
      <Card variant="outline" padding="md">
        {props.children ?? "Avatar and profile fields"}
      </Card>
    </PageShell>
  );
}

export function Billing(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Billing"} description={props.description ?? "Plan, usage, and invoices."} className={props.className}>
      {props.children ?? "Billing modules"}
    </PageShell>
  );
}

export function Inbox(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Inbox"} description={props.description} className={props.className}>
      <Flex className="min-h-[20rem] flex-col gap-0 overflow-hidden rounded-lg border border-border lg:flex-row">
        <div className="w-full border-b border-border p-3 lg:w-64 lg:border-b-0 lg:border-r">Threads</div>
        <div className="flex-1 p-4">{props.children ?? "Message view"}</div>
      </Flex>
    </PageShell>
  );
}

export function Splitview(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Split view"} description={props.description} className={props.className}>
      <Flex className="min-h-[20rem] flex-col gap-0 overflow-hidden rounded-lg border border-border lg:flex-row">
        <div className="flex-1 border-b border-border p-4 lg:border-b-0 lg:border-r">Master</div>
        <div className="flex-1 p-4">{props.children ?? "Detail"}</div>
      </Flex>
    </PageShell>
  );
}

export function Kanbanpage(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Kanban"} description={props.description ?? "Pipeline board."} className={props.className}>
      <div className="flex gap-4 overflow-x-auto pb-2">{props.children ?? "Kanban columns"}</div>
    </PageShell>
  );
}

export function Commercecheckout(props: PageLayoutProps) {
  return (
    <PageShell title={props.title ?? "Checkout"} description={props.description ?? "Bag, shipping, and payment."} className={props.className}>
      <Flex className="flex-col gap-6 lg:flex-row">
        <Card variant="outline" className="flex-1" padding="md">
          {props.children ?? "Checkout steps"}
        </Card>
        <Card variant="outline" className="w-full lg:w-96" padding="md">
          Order summary
        </Card>
      </Flex>
    </PageShell>
  );
}
