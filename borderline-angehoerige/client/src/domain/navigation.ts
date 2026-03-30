import {
  BookMarked,
  BookOpen,
  Building2,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  Heart,
  HelpCircle,
  MessageCircle,
  Shield,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import type { NavigationItem } from "@/domain/content-types";

export const primaryNavigationItems: NavigationItem[] = [
  { href: "/verstehen", label: "Verstehen", icon: BookOpen },
  { href: "/unterstuetzen/uebersicht", label: "Unterstützen", icon: Heart },
  { href: "/kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { href: "/grenzen", label: "Grenzen", icon: Shield },
  { href: "/selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
];

export const resourceNavigationItems: NavigationItem[] = [
  // Gruppe: Sofortige Hilfe
  {
    href: "/notfallkarte",
    label: "Notfallkarte",
    icon: FileText,
    group: "Sofortige Hilfe",
  },
  {
    href: "/wegweiser",
    label: "Situations-Wegweiser",
    icon: Compass,
    group: "Sofortige Hilfe",
  },
  {
    href: "/selbsttest",
    label: "Selbsttest",
    icon: ClipboardCheck,
    group: "Sofortige Hilfe",
  },
  // Gruppe: Wissen & Materialien
  {
    href: "/materialien",
    label: "Materialien & Handouts",
    icon: Download,
    group: "Wissen & Materialien",
  },
  {
    href: "/genesung",
    label: "Genesung & Hoffnung",
    icon: TrendingUp,
    group: "Wissen & Materialien",
  },
  {
    href: "/faq",
    label: "Häufige Fragen (FAQ)",
    icon: HelpCircle,
    group: "Wissen & Materialien",
  },
  {
    href: "/glossar",
    label: "Glossar",
    icon: BookMarked,
    group: "Wissen & Materialien",
  },
  {
    href: "/buchempfehlungen",
    label: "Buchempfehlungen",
    icon: BookOpen,
    group: "Wissen & Materialien",
  },
  // Gruppe: Beratung & Netzwerke
  {
    href: "/beratung",
    label: "Beratung & Netzwerke",
    icon: Heart,
    group: "Beratung & Netzwerke",
  },
  {
    href: "/fachstelle",
    label: "Fachstelle & Kontakt",
    icon: Building2,
    group: "Beratung & Netzwerke",
  },
  {
    href: "/unterstuetzen/therapie#therapieangebote",
    label: "Therapieangebote Zürich",
    icon: Stethoscope,
    group: "Beratung & Netzwerke",
  },
];
