export type ComponentStatus = "live" | "planned";

export type NavLeaf = {
  id: string;
  label: string;
  path: string;
  status: ComponentStatus;
};

export type NavSection = {
  id: string;
  label: string;
  icon: string;
  children: NavLeaf[];
};

function leaf(
  sectionId: string,
  id: string,
  label: string,
  status: ComponentStatus = "planned",
): NavLeaf {
  return { id, label, path: `/c/${sectionId}/${id}`, status };
}

export const componentRegistry: NavSection[] = [
  {
    id: "getting-started",
    label: "Getting started",
    icon: "◆",
    children: [
      leaf("getting-started", "overview", "Overview", "live"),
      leaf("getting-started", "theming", "Theming"),
      leaf("getting-started", "appearance-settings", "AppearanceSettings"),
    ],
  },
  {
    id: "page-examples",
    label: "Page examples",
    icon: "▦",
    children: [
      leaf("page-examples", "dashboard", "Dashboard"),
      leaf("page-examples", "records-list", "Records list"),
      leaf("page-examples", "record-detail", "Record detail"),
      leaf("page-examples", "settings", "Settings"),
      leaf("page-examples", "profile", "Profile"),
      leaf("page-examples", "billing", "Billing"),
      leaf("page-examples", "inbox", "Inbox"),
      leaf("page-examples", "split-view", "Split view"),
      leaf("page-examples", "kanban-page", "Kanban page"),
      leaf("page-examples", "commerce-checkout", "Commerce checkout"),
    ],
  },
  {
    id: "forms-inputs",
    label: "Forms & inputs",
    icon: "☰",
    children: [
      leaf("forms-inputs", "text-input", "Text Input", "live"),
      leaf("forms-inputs", "note-text-area", "Note Area"),
      leaf("forms-inputs", "input-text-area", "Text Area"),
      leaf("forms-inputs", "toggle-switch", "Toggle Switch"),
      leaf("forms-inputs", "checkbox", "Checkbox", "live"),
      leaf("forms-inputs", "radio-button", "Radio Button"),
      leaf("forms-inputs", "radio-button-group", "Radio Button Group"),
      leaf("forms-inputs", "select", "Select"),
      leaf("forms-inputs", "search-select", "Search Select"),
      leaf("forms-inputs", "multi-select", "Multi Select"),
      leaf("forms-inputs", "number-input", "Number Input"),
      leaf("forms-inputs", "pin-input", "Pin Input"),
      leaf("forms-inputs", "range-slider", "Range Slider"),
      leaf("forms-inputs", "date-picker", "Date Picker"),
      leaf("forms-inputs", "search", "Search"),
      leaf("forms-inputs", "dropdown", "Dropdown"),
      leaf("forms-inputs", "editor", "Editor"),
      leaf("forms-inputs", "form-control", "FormControl"),
      leaf("forms-inputs", "form-field", "FormField"),
      leaf("forms-inputs", "form-label", "FormLabel"),
      leaf("forms-inputs", "form-helper-text", "FormHelperText"),
      leaf("forms-inputs", "form-error-message", "FormErrorMessage"),
      leaf("forms-inputs", "field-message", "FieldMessage"),
      leaf("forms-inputs", "form-wrapper", "FormWrapper"),
      leaf("forms-inputs", "contact-form", "ContactForm"),
      leaf("forms-inputs", "feedback-form", "FeedbackForm"),
      leaf("forms-inputs", "coupon-field", "CouponField"),
      leaf("forms-inputs", "copy-button", "CopyButton"),
      leaf("forms-inputs", "field-select-modal", "FieldSelectModal"),
      leaf("forms-inputs", "file-upload", "File Upload"),
      leaf("forms-inputs", "file-uploader", "File Uploader"),
    ],
  },
  {
    id: "data-display",
    label: "Data display",
    icon: "▤",
    children: [
      leaf("data-display", "accordion", "Accordion"),
      leaf("data-display", "table", "Table"),
      leaf("data-display", "kanban-board", "Kanban Board"),
      leaf("data-display", "empty-state", "EmptyState"),
      leaf("data-display", "error-state", "ErrorState"),
      leaf("data-display", "filtered-empty-state", "FilteredEmptyState"),
      leaf("data-display", "loading", "Loading"),
      leaf("data-display", "badge", "Badge"),
      leaf("data-display", "description-list", "DescriptionList"),
      leaf("data-display", "detail-sections", "DetailSections"),
      leaf("data-display", "card", "Card"),
      leaf("data-display", "address-card", "AddressCard"),
      leaf("data-display", "address-card-group", "AddressCardGroup"),
      leaf("data-display", "choice-card", "ChoiceCard"),
      leaf("data-display", "choice-card-group", "ChoiceCardGroup"),
      leaf("data-display", "list", "List"),
      leaf("data-display", "list-item", "ListItem"),
      leaf("data-display", "list-icon", "ListIcon"),
      leaf("data-display", "heading", "Heading"),
      leaf("data-display", "calendar-grid", "CalendarGrid"),
      leaf("data-display", "custom-modules-table", "CustomModulesTable"),
      leaf("data-display", "filter-bar", "FilterBar"),
      leaf("data-display", "filter-sidebar", "FilterSidebar"),
      leaf("data-display", "circular-progress", "CircularProgress"),
      leaf("data-display", "box", "Box"),
      leaf("data-display", "center", "Center"),
      leaf("data-display", "container", "Container"),
      leaf("data-display", "flex", "Flex"),
      leaf("data-display", "grid", "Grid"),
      leaf("data-display", "grid-item", "GridItem"),
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: "🛒",
    children: [
      leaf("commerce", "product-card", "ProductCard"),
      leaf("commerce", "cart-item", "CartItem"),
      leaf("commerce", "bag-bar", "BagBar"),
      leaf("commerce", "bulk-selection-bar", "BulkSelectionBar"),
      leaf("commerce", "checkout-summary", "CheckoutSummary"),
      leaf("commerce", "order-line", "OrderLine"),
      leaf("commerce", "price-display", "PriceDisplay"),
      leaf("commerce", "quantity-stepper", "QuantityStepper"),
      leaf("commerce", "promo-banner", "PromoBanner"),
      leaf("commerce", "shipping-selector", "ShippingSelector"),
      leaf("commerce", "payment-method", "PaymentMethod"),
      leaf("commerce", "wishlist-item", "WishlistItem"),
      leaf("commerce", "catalog-grid", "CatalogGrid"),
      leaf("commerce", "catalog-filters", "CatalogFilters"),
      leaf("commerce", "mini-cart", "MiniCart"),
      leaf("commerce", "order-history", "OrderHistory"),
      leaf("commerce", "subscription-plan", "SubscriptionPlan"),
      leaf("commerce", "inventory-badge", "InventoryBadge"),
      leaf("commerce", "compare-bar", "CompareBar"),
      leaf("commerce", "review-stars", "ReviewStars"),
      leaf("commerce", "delivery-estimate", "DeliveryEstimate"),
      leaf("commerce", "gift-wrap", "GiftWrap"),
      leaf("commerce", "loyalty-points", "LoyaltyPoints"),
      leaf("commerce", "return-label", "ReturnLabel"),
      leaf("commerce", "tax-breakdown", "TaxBreakdown"),
      leaf("commerce", "vendor-card", "VendorCard"),
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: "⌁",
    children: [
      leaf("navigation", "tabs", "Tabs"),
      leaf("navigation", "header", "Header"),
      leaf("navigation", "header-actions", "HeaderActions"),
      leaf("navigation", "breadcrumbs", "Breadcrumbs"),
      leaf("navigation", "app-switcher", "AppSwitcher"),
      leaf("navigation", "link", "Link"),
      leaf("navigation", "launcher-trigger", "LauncherTrigger"),
      leaf("navigation", "launcher-search", "LauncherSearchEngine"),
      leaf("navigation", "pagination", "Pagination"),
      leaf("navigation", "stepper", "Stepper"),
      leaf("navigation", "sidebar-nav", "SidebarNav"),
      leaf("navigation", "mobile-nav", "MobileNav"),
      leaf("navigation", "context-menu", "ContextMenu"),
    ],
  },
  {
    id: "feedback-overlays",
    label: "Feedback & overlays",
    icon: "◉",
    children: [
      leaf("feedback-overlays", "modal", "Modal"),
      leaf("feedback-overlays", "drawer", "Drawer"),
      leaf("feedback-overlays", "drawer-header", "DrawerHeader"),
      leaf("feedback-overlays", "drawer-body", "DrawerBody"),
      leaf("feedback-overlays", "drawer-footer", "DrawerFooter"),
      leaf("feedback-overlays", "toaster", "Toaster"),
      leaf("feedback-overlays", "tooltip", "Tooltip"),
      leaf("feedback-overlays", "alert", "Alert"),
      leaf("feedback-overlays", "alert-title", "AlertTitle"),
      leaf("feedback-overlays", "alert-description", "AlertDescription"),
      leaf("feedback-overlays", "alert-icon", "AlertIcon"),
      leaf("feedback-overlays", "alert-dialog", "AlertDialog"),
      leaf("feedback-overlays", "confirm-dialog", "ConfirmDialog"),
      leaf("feedback-overlays", "limit-reached-modal", "LimitReachedModal"),
      leaf("feedback-overlays", "backdrop", "Backdrop"),
      leaf("feedback-overlays", "popover", "Popover"),
      leaf("feedback-overlays", "form-drawer", "FormDrawer"),
      leaf("feedback-overlays", "collapse", "Collapse"),
      leaf("feedback-overlays", "lazy-wrapper", "LazyWrapper"),
      leaf("feedback-overlays", "hide", "Hide"),
      leaf("feedback-overlays", "divider", "Divider"),
    ],
  },
  {
    id: "media-files",
    label: "Media & files",
    icon: "▣",
    children: [
      leaf("media-files", "file-upload", "FileUpload"),
      leaf("media-files", "file-preview", "FilePreview"),
      leaf("media-files", "file-preview-trigger", "FilePreviewTrigger"),
      leaf("media-files", "audio-recorder", "AudioRecorder"),
      leaf("media-files", "image", "Image"),
      leaf("media-files", "icon", "Icon"),
      leaf("media-files", "video-player", "VideoPlayer"),
      leaf("media-files", "media-gallery", "MediaGallery"),
    ],
  },
  {
    id: "charts",
    label: "Charts",
    icon: "📈",
    children: [
      leaf("charts", "apex-area-chart", "ApexAreaChart"),
      leaf("charts", "apex-bar-chart", "ApexBarChart"),
    ],
  },
  {
    id: "billing-plans",
    label: "Billing & plans",
    icon: "💳",
    children: [
      leaf("billing-plans", "upgrade-button", "UpgradeButton"),
      leaf("billing-plans", "plan-pill", "PlanPill"),
      leaf("billing-plans", "usage-meter", "UsageMeter"),
      leaf("billing-plans", "invoice-row", "InvoiceRow"),
    ],
  },
  {
    id: "actions-utilities",
    label: "Actions & utilities",
    icon: "⚡",
    children: [
      leaf("actions-utilities", "button", "Button", "live"),
      leaf("actions-utilities", "button-group-icon", "ButtonGroupIcon"),
      leaf("actions-utilities", "icon-button", "IconButton"),
      leaf("actions-utilities", "kbd", "Kbd"),
      leaf("actions-utilities", "kbd-shortcut", "KbdShortcut"),
      leaf("actions-utilities", "copy-button-util", "CopyButton"),
      leaf("actions-utilities", "pin-toggle", "PinToggle"),
      leaf("actions-utilities", "sort-control", "SortControl"),
      leaf("actions-utilities", "theme-toggle", "ThemeToggle"),
    ],
  },
];

export function countRegistryLeaves(sections = componentRegistry): number {
  return sections.reduce((sum, section) => sum + section.children.length, 0);
}

export function findNavLeaf(sectionId: string, componentId: string): NavLeaf | undefined {
  const section = componentRegistry.find((s) => s.id === sectionId);
  return section?.children.find((c) => c.id === componentId);
}

export function findNavSection(sectionId: string): NavSection | undefined {
  return componentRegistry.find((s) => s.id === sectionId);
}
