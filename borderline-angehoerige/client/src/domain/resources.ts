import type {
  ResourceFilter,
  SelectableCategory,
} from "@/domain/content-types";

export type MainResourceCategoryId =
  | "alle"
  | "verstehen"
  | "kommunizieren"
  | "unterstuetzen"
  | "grenzen"
  | "selbstfuersorge"
  | "genesung"
  | "soforthilfe";

export const mainResourceCategories: SelectableCategory<MainResourceCategoryId>[] =
  [
    { id: "alle", label: "Alle" },
    { id: "verstehen", label: "Verstehen" },
    { id: "kommunizieren", label: "Kommunizieren" },
    { id: "unterstuetzen", label: "Unterstützen" },
    { id: "grenzen", label: "Grenzen" },
    { id: "selbstfuersorge", label: "Selbstfürsorge" },
    { id: "genesung", label: "Genesung" },
    { id: "soforthilfe", label: "Soforthilfe" },
  ];

export type ResourceTypeId =
  | "alle"
  | "infografik"
  | "checkliste"
  | "arbeitsblatt"
  | "notfallhilfe";

export const resourceTypeFilters: ResourceFilter<ResourceTypeId>[] = [
  { value: "alle", label: "Alle Typen" },
  { value: "infografik", label: "Infografik" },
  { value: "checkliste", label: "Checkliste" },
  { value: "arbeitsblatt", label: "Arbeitsblatt" },
  { value: "notfallhilfe", label: "Notfallhilfe" },
];
