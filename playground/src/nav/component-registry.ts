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
  status: ComponentStatus = "live",
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
      leaf("forms-inputs", "note-text-area", "Note Area", "live"),
      leaf("forms-inputs", "input-text-area", "Text Area", "live"),
      leaf("forms-inputs", "toggle-switch", "Toggle Switch", "live"),
      leaf("forms-inputs", "checkbox", "Checkbox", "live"),
      leaf("forms-inputs", "radio-button", "Radio Button", "live"),
      leaf("forms-inputs", "radio-button-group", "Radio Button Group", "live"),
      leaf("forms-inputs", "select", "Select", "live"),
      leaf("forms-inputs", "search-select", "Search Select", "live"),
      leaf("forms-inputs", "multi-select", "Multi Select", "live"),
      leaf("forms-inputs", "number-input", "Number Input", "live"),
      leaf("forms-inputs", "pin-input", "Pin Input", "live"),
      leaf("forms-inputs", "range-slider", "Range Slider", "live"),
      leaf("forms-inputs", "date-picker", "Date Picker", "live"),
      leaf("forms-inputs", "search", "Search", "live"),
      leaf("forms-inputs", "dropdown", "Dropdown", "live"),
      leaf("forms-inputs", "editor", "Editor"),
      leaf("forms-inputs", "form-control", "FormControl", "live"),
      leaf("forms-inputs", "form-field", "FormField", "live"),
      leaf("forms-inputs", "form-label", "FormLabel", "live"),
      leaf("forms-inputs", "form-helper-text", "FormHelperText", "live"),
      leaf("forms-inputs", "form-error-message", "FormErrorMessage", "live"),
      leaf("forms-inputs", "field-message", "FieldMessage", "live"),
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
      leaf("data-display", "accordion", "Accordion", "live"),
      leaf("data-display", "table", "Table", "live"),
      leaf("data-display", "kanban-board", "Kanban Board", "live"),
      leaf("data-display", "empty-state", "EmptyState", "live"),
      leaf("data-display", "error-state", "ErrorState", "live"),
      leaf("data-display", "filtered-empty-state", "FilteredEmptyState", "live"),
      leaf("data-display", "loading", "Loading", "live"),
      leaf("data-display", "badge", "Badge", "live"),
      leaf("data-display", "description-list", "DescriptionList", "live"),
      leaf("data-display", "detail-sections", "DetailSections", "live"),
      leaf("data-display", "card", "Card", "live"),
      leaf("data-display", "address-card", "AddressCard", "live"),
      leaf("data-display", "address-card-group", "AddressCardGroup", "live"),
      leaf("data-display", "choice-card", "ChoiceCard", "live"),
      leaf("data-display", "choice-card-group", "ChoiceCardGroup", "live"),
      leaf("data-display", "list", "List", "live"),
      leaf("data-display", "list-item", "ListItem", "live"),
      leaf("data-display", "list-icon", "ListIcon", "live"),
      leaf("data-display", "heading", "Heading", "live"),
      leaf("data-display", "calendar-grid", "CalendarGrid", "live"),
      leaf("data-display", "custom-modules-table", "CustomModulesTable", "live"),
      leaf("data-display", "filter-bar", "FilterBar", "live"),
      leaf("data-display", "filter-sidebar", "FilterSidebar", "live"),
      leaf("data-display", "circular-progress", "CircularProgress", "live"),
      leaf("data-display", "box", "Box", "live"),
      leaf("data-display", "center", "Center", "live"),
      leaf("data-display", "container", "Container", "live"),
      leaf("data-display", "flex", "Flex", "live"),
      leaf("data-display", "grid", "Grid", "live"),
      leaf("data-display", "grid-item", "GridItem", "live"),
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: "🛒",
    children: [
      leaf("commerce", "product-card", "ProductCard", "live"),
      leaf("commerce", "cart-item", "CartItem", "live"),
      leaf("commerce", "bag-bar", "BagBar", "live"),
      leaf("commerce", "bulk-selection-bar", "BulkSelectionBar", "live"),
      leaf("commerce", "checkout-summary", "CheckoutSummary", "live"),
      leaf("commerce", "order-line", "OrderLine", "live"),
      leaf("commerce", "price-display", "PriceDisplay", "live"),
      leaf("commerce", "quantity-stepper", "QuantityStepper", "live"),
      leaf("commerce", "promo-banner", "PromoBanner", "live"),
      leaf("commerce", "shipping-selector", "ShippingSelector", "live"),
      leaf("commerce", "payment-method", "PaymentMethod", "live"),
      leaf("commerce", "wishlist-item", "WishlistItem", "live"),
      leaf("commerce", "catalog-grid", "CatalogGrid", "live"),
      leaf("commerce", "catalog-filters", "CatalogFilters", "live"),
      leaf("commerce", "mini-cart", "MiniCart", "live"),
      leaf("commerce", "order-history", "OrderHistory", "live"),
      leaf("commerce", "subscription-plan", "SubscriptionPlan", "live"),
      leaf("commerce", "inventory-badge", "InventoryBadge", "live"),
      leaf("commerce", "compare-bar", "CompareBar", "live"),
      leaf("commerce", "review-stars", "ReviewStars", "live"),
      leaf("commerce", "delivery-estimate", "DeliveryEstimate", "live"),
      leaf("commerce", "gift-wrap", "GiftWrap", "live"),
      leaf("commerce", "loyalty-points", "LoyaltyPoints", "live"),
      leaf("commerce", "return-label", "ReturnLabel", "live"),
      leaf("commerce", "tax-breakdown", "TaxBreakdown", "live"),
      leaf("commerce", "vendor-card", "VendorCard", "live"),
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: "⌁",
    children: [
      leaf("navigation", "tabs", "Tabs", "live"),
      leaf("navigation", "header", "Header", "live"),
      leaf("navigation", "header-actions", "HeaderActions", "live"),
      leaf("navigation", "breadcrumbs", "Breadcrumbs", "live"),
      leaf("navigation", "app-switcher", "AppSwitcher", "live"),
      leaf("navigation", "link", "Link", "live"),
      leaf("navigation", "launcher-trigger", "LauncherTrigger", "live"),
      leaf("navigation", "launcher-search", "LauncherSearchEngine", "live"),
      leaf("navigation", "pagination", "Pagination", "live"),
      leaf("navigation", "stepper", "Stepper", "live"),
      leaf("navigation", "sidebar-nav", "SidebarNav", "live"),
      leaf("navigation", "mobile-nav", "MobileNav", "live"),
      leaf("navigation", "context-menu", "ContextMenu", "live"),
    ],
  },
  {
    id: "feedback-overlays",
    label: "Feedback & overlays",
    icon: "◉",
    children: [
      leaf("feedback-overlays", "modal", "Modal"),
      leaf("feedback-overlays", "drawer", "Drawer", "live"),
      leaf("feedback-overlays", "drawer-header", "DrawerHeader", "live"),
      leaf("feedback-overlays", "drawer-body", "DrawerBody", "live"),
      leaf("feedback-overlays", "drawer-footer", "DrawerFooter", "live"),
      leaf("feedback-overlays", "toaster", "Toaster"),
      leaf("feedback-overlays", "tooltip", "Tooltip"),
      leaf("feedback-overlays", "alert", "Alert", "live"),
      leaf("feedback-overlays", "alert-title", "AlertTitle", "live"),
      leaf("feedback-overlays", "alert-description", "AlertDescription", "live"),
      leaf("feedback-overlays", "alert-icon", "AlertIcon", "live"),
      leaf("feedback-overlays", "alert-dialog", "AlertDialog"),
      leaf("feedback-overlays", "confirm-dialog", "ConfirmDialog", "live"),
      leaf("feedback-overlays", "limit-reached-modal", "LimitReachedModal"),
      leaf("feedback-overlays", "backdrop", "Backdrop", "live"),
      leaf("feedback-overlays", "popover", "Popover"),
      leaf("feedback-overlays", "form-drawer", "FormDrawer"),
      leaf("feedback-overlays", "collapse", "Collapse"),
      leaf("feedback-overlays", "lazy-wrapper", "LazyWrapper"),
      leaf("feedback-overlays", "hide", "Hide"),
      leaf("feedback-overlays", "divider", "Divider", "live"),
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
      leaf("actions-utilities", "button-group-icon", "ButtonGroupIcon", "live"),
      leaf("actions-utilities", "icon-button", "IconButton", "live"),
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
