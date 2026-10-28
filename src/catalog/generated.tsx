import {
  forwardRef,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";
import { luminetMutedText, luminetSurfaceClass, type LuminetCommonProps } from "../lib/luminet-common";

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-foreground/[0.02] px-3 py-6 text-center text-sm text-muted">
      {label}
    </div>
  );
}


export const GettingStartedOverview = forwardRef<HTMLDivElement, LuminetCommonProps>(function GettingStartedOverview(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="GettingStartedOverview" />}
    </div>
  );
});

export const ThemingGuide = forwardRef<HTMLDivElement, LuminetCommonProps>(function ThemingGuide(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="ThemingGuide" />}
    </div>
  );
});

export const AppearanceSettings = forwardRef<HTMLDivElement, LuminetCommonProps>(function AppearanceSettings(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="AppearanceSettings" />}
    </div>
  );
});

export const Dashboard = forwardRef<HTMLDivElement, LuminetCommonProps>(function Dashboard(
  { size = "md", title = "Dashboard", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Recordslist = forwardRef<HTMLDivElement, LuminetCommonProps>(function Recordslist(
  { size = "md", title = "Recordslist", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Recorddetail = forwardRef<HTMLDivElement, LuminetCommonProps>(function Recorddetail(
  { size = "md", title = "Recorddetail", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Settings = forwardRef<HTMLDivElement, LuminetCommonProps>(function Settings(
  { size = "md", title = "Settings", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Profile = forwardRef<HTMLDivElement, LuminetCommonProps>(function Profile(
  { size = "md", title = "Profile", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Billing = forwardRef<HTMLDivElement, LuminetCommonProps>(function Billing(
  { size = "md", title = "Billing", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Inbox = forwardRef<HTMLDivElement, LuminetCommonProps>(function Inbox(
  { size = "md", title = "Inbox", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Splitview = forwardRef<HTMLDivElement, LuminetCommonProps>(function Splitview(
  { size = "md", title = "Splitview", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Kanbanpage = forwardRef<HTMLDivElement, LuminetCommonProps>(function Kanbanpage(
  { size = "md", title = "Kanbanpage", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Commercecheckout = forwardRef<HTMLDivElement, LuminetCommonProps>(function Commercecheckout(
  { size = "md", title = "Commercecheckout", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});

export const Editor = forwardRef<HTMLDivElement, LuminetCommonProps>(function Editor(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="Editor" />}
    </div>
  );
});

export const CouponField = forwardRef<HTMLDivElement, LuminetCommonProps>(function CouponField(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="CouponField" />}
    </div>
  );
});

export const FieldSelectModal = forwardRef<HTMLDivElement, LuminetCommonProps>(function FieldSelectModal(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="FieldSelectModal" />}
    </div>
  );
});

export const Toaster = forwardRef<HTMLDivElement, LuminetCommonProps>(function Toaster(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="Toaster" />}
    </div>
  );
});

export const LimitReachedModal = forwardRef<HTMLDivElement, LuminetCommonProps>(function LimitReachedModal(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="LimitReachedModal" />}
    </div>
  );
});

export const Popover = forwardRef<HTMLDivElement, LuminetCommonProps>(function Popover(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="Popover" />}
    </div>
  );
});

export const FormDrawer = forwardRef<HTMLDivElement, LuminetCommonProps>(function FormDrawer(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="FormDrawer" />}
    </div>
  );
});

export const Hide = forwardRef<HTMLDivElement, LuminetCommonProps & { when?: boolean }>(function Hide(
  { when = false, children, ...props },
  ref,
) {
  if (when) return null;
  return <div ref={ref} {...props}>{children}</div>;
});

export const FilePreviewTrigger = forwardRef<HTMLDivElement, LuminetCommonProps>(function FilePreviewTrigger(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="FilePreviewTrigger" />}
    </div>
  );
});

export const AudioRecorder = forwardRef<HTMLDivElement, LuminetCommonProps>(function AudioRecorder(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="AudioRecorder" />}
    </div>
  );
});

export const VideoPlayer = forwardRef<HTMLDivElement, LuminetCommonProps>(function VideoPlayer(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="VideoPlayer" />}
    </div>
  );
});

export const MediaGallery = forwardRef<HTMLDivElement, LuminetCommonProps>(function MediaGallery(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="MediaGallery" />}
    </div>
  );
});

export const ApexAreaChart = forwardRef<HTMLDivElement, LuminetCommonProps>(function ApexAreaChart(
  { size = "md", title, className, ...props },
  ref,
) {
  const bars = [40, 65, 45, 80, 55];
  return (
    <div ref={ref} role="img" aria-label={title ? String(title) : "ApexAreaChart preview"} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <p className="mb-3 font-medium">{title}</p> : null}
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
});

export const ApexBarChart = forwardRef<HTMLDivElement, LuminetCommonProps>(function ApexBarChart(
  { size = "md", title, className, ...props },
  ref,
) {
  const bars = [40, 65, 45, 80, 55];
  return (
    <div ref={ref} role="img" aria-label={title ? String(title) : "ApexBarChart preview"} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <p className="mb-3 font-medium">{title}</p> : null}
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
});

export const UpgradeButton = forwardRef<HTMLButtonElement, LuminetCommonProps & ButtonHTMLAttributes<HTMLButtonElement>>(function UpgradeButton(
  { size = "md", title, children, className, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} disabled={disabled} className={cn("inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors duration-150 hover:bg-primary-hover disabled:opacity-50", size === "xs" ? "text-xs px-2 py-1" : size === "lg" ? "text-base px-5 py-3" : "text-sm", className)} {...props}>
      {children ?? title ?? "UpgradeButton"}
    </button>
  );
});

export const PlanPill = forwardRef<HTMLDivElement, LuminetCommonProps>(function PlanPill(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="PlanPill" />}
    </div>
  );
});

export const UsageMeter = forwardRef<HTMLDivElement, LuminetCommonProps>(function UsageMeter(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="UsageMeter" />}
    </div>
  );
});

export const InvoiceRow = forwardRef<HTMLDivElement, LuminetCommonProps>(function InvoiceRow(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="InvoiceRow" />}
    </div>
  );
});

export const KbdShortcut = forwardRef<HTMLDivElement, LuminetCommonProps>(function KbdShortcut(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="KbdShortcut" />}
    </div>
  );
});

export const PinToggle = forwardRef<HTMLDivElement, LuminetCommonProps>(function PinToggle(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="PinToggle" />}
    </div>
  );
});

export const SortControl = forwardRef<HTMLDivElement, LuminetCommonProps>(function SortControl(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="SortControl" />}
    </div>
  );
});

export const ThemeToggle = forwardRef<HTMLDivElement, LuminetCommonProps>(function ThemeToggle(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="ThemeToggle" />}
    </div>
  );
});
