import type { ReactElement } from "react";
import { Navigate, useParams } from "react-router-dom";
import { findNavLeaf } from "../nav/component-registry";
import { ButtonDocPage } from "./button/ButtonDocPage";
import { CatalogDocPage } from "./CatalogDocPage";
import { CheckboxDocPage } from "./checkbox/CheckboxDocPage";
import { ComingSoonPage } from "./ComingSoonPage";
import {
  ButtonGroupIconDocPage,
  DatePickerDocPage,
  DropdownDocPage,
  InputTextAreaDocPage,
  MultiSelectDocPage,
  NoteTextAreaDocPage,
  NumberInputDocPage,
  PinInputDocPage,
  RangeSliderDocPage,
  SearchDocPage,
  SearchSelectDocPage,
  SelectDocPage,
} from "./forms/phase1DocPages";
import { OverviewPage } from "./OverviewPage";
import { RadioButtonDocPage } from "./radio-button/RadioButtonDocPage";
import { TextInputDocPage } from "./text-input/TextInputDocPage";
import { ToggleSwitchDocPage } from "./toggle-switch/ToggleSwitchDocPage";
import {
  AccordionDocPage,
  AlertDescriptionDocPage,
  AlertDocPage,
  AlertIconDocPage,
  AlertTitleDocPage,
  BackdropDocPage,
  BadgeDocPage,
  BoxDocPage,
  BreadcrumbsDocPage,
  CardDocPage,
  CircularProgressDocPage,
  ConfirmDialogDocPage,
  ContainerDocPage,
  DividerDocPage,
  DrawerBodyDocPage,
  DrawerDocPage,
  DrawerFooterDocPage,
  DrawerHeaderDocPage,
  EmptyStateDocPage,
  ErrorStateDocPage,
  FieldMessageDocPage,
  FlexDocPage,
  FormControlDocPage,
  FormErrorMessageDocPage,
  FormFieldDocPage,
  FormHelperTextDocPage,
  FormLabelDocPage,
  GridDocPage,
  HeaderActionsDocPage,
  HeaderDocPage,
  HeadingDocPage,
  IconButtonDocPage,
  LinkDocPage,
  LoadingDocPage,
  TabsDocPage,
} from "./phase2/phase2DocPages";

const CUSTOM_DOC_PAGES: Record<string, () => ReactElement> = {
  "getting-started/overview": () => <OverviewPage />,
  "forms-inputs/checkbox": () => <CheckboxDocPage />,
  "forms-inputs/text-input": () => <TextInputDocPage />,
  "forms-inputs/radio-button": () => <RadioButtonDocPage />,
  "forms-inputs/radio-button-group": () => <RadioButtonDocPage />,
  "forms-inputs/toggle-switch": () => <ToggleSwitchDocPage />,
  "forms-inputs/number-input": () => <NumberInputDocPage />,
  "forms-inputs/input-text-area": () => <InputTextAreaDocPage />,
  "forms-inputs/search": () => <SearchDocPage />,
  "forms-inputs/pin-input": () => <PinInputDocPage />,
  "forms-inputs/range-slider": () => <RangeSliderDocPage />,
  "forms-inputs/dropdown": () => <DropdownDocPage />,
  "forms-inputs/select": () => <SelectDocPage />,
  "forms-inputs/search-select": () => <SearchSelectDocPage />,
  "forms-inputs/multi-select": () => <MultiSelectDocPage />,
  "forms-inputs/date-picker": () => <DatePickerDocPage />,
  "forms-inputs/note-text-area": () => <NoteTextAreaDocPage />,
  "actions-utilities/button": () => <ButtonDocPage />,
  "actions-utilities/button-group-icon": () => <ButtonGroupIconDocPage />,
  "actions-utilities/icon-button": () => <IconButtonDocPage />,
  "forms-inputs/form-control": () => <FormControlDocPage />,
  "forms-inputs/form-field": () => <FormFieldDocPage />,
  "forms-inputs/form-label": () => <FormLabelDocPage />,
  "forms-inputs/form-helper-text": () => <FormHelperTextDocPage />,
  "forms-inputs/form-error-message": () => <FormErrorMessageDocPage />,
  "forms-inputs/field-message": () => <FieldMessageDocPage />,
  "feedback-overlays/alert": () => <AlertDocPage />,
  "feedback-overlays/alert-title": () => <AlertTitleDocPage />,
  "feedback-overlays/alert-description": () => <AlertDescriptionDocPage />,
  "feedback-overlays/alert-icon": () => <AlertIconDocPage />,
  "feedback-overlays/confirm-dialog": () => <ConfirmDialogDocPage />,
  "feedback-overlays/backdrop": () => <BackdropDocPage />,
  "feedback-overlays/divider": () => <DividerDocPage />,
  "feedback-overlays/drawer": () => <DrawerDocPage />,
  "feedback-overlays/drawer-header": () => <DrawerHeaderDocPage />,
  "feedback-overlays/drawer-body": () => <DrawerBodyDocPage />,
  "feedback-overlays/drawer-footer": () => <DrawerFooterDocPage />,
  "data-display/accordion": () => <AccordionDocPage />,
  "data-display/box": () => <BoxDocPage />,
  "data-display/flex": () => <FlexDocPage />,
  "data-display/grid": () => <GridDocPage />,
  "data-display/container": () => <ContainerDocPage />,
  "data-display/card": () => <CardDocPage />,
  "data-display/heading": () => <HeadingDocPage />,
  "data-display/empty-state": () => <EmptyStateDocPage />,
  "data-display/error-state": () => <ErrorStateDocPage />,
  "data-display/loading": () => <LoadingDocPage />,
  "data-display/circular-progress": () => <CircularProgressDocPage />,
  "data-display/badge": () => <BadgeDocPage />,
  "navigation/breadcrumbs": () => <BreadcrumbsDocPage />,
  "navigation/header": () => <HeaderDocPage />,
  "navigation/header-actions": () => <HeaderActionsDocPage />,
  "navigation/link": () => <LinkDocPage />,
  "navigation/tabs": () => <TabsDocPage />,
};

export function ComponentDocRoute() {
  const { section, component } = useParams<{ section: string; component: string }>();

  if (!section || !component) {
    return <Navigate to="/" replace />;
  }

  const key = `${section}/${component}`;
  const CustomPage = CUSTOM_DOC_PAGES[key];
  if (CustomPage) {
    return <CustomPage />;
  }

  const leaf = findNavLeaf(section, component);
  if (leaf?.status === "live") {
    return <CatalogDocPage sectionId={section} componentId={component} />;
  }

  return <ComingSoonPage sectionId={section} componentId={component} />;
}
