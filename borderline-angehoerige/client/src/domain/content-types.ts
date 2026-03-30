import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
}

export interface SelectableCategory<TId extends string = string> {
  id: TId;
  label: string;
}

export interface ResourceFilter<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface PageSection {
  id: string;
  title: string;
  description?: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  type?: string;
  tags?: string[];
}

export interface EvidenceSource {
  title: string;
  authors?: string;
  year?: number;
  source: string;
  url?: string;
  note?: string;
}
