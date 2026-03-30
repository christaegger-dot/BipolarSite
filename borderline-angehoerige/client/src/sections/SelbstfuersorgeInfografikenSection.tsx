import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  ExternalLink,
  Download,
  Filter,
  Activity,
  Zap,
  Heart,
} from "lucide-react";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  selbstfuersorgeInfografiken,
  type SelbstfuersorgeKategorie,
} from "@/content/selbstfuersorge";

const selbstfuersorgeCategories = [
  {
    id: "alle",
    label: "Alle",
    icon: Filter,
    count: selbstfuersorgeInfografiken.length,
  },
  {
    id: "erkennen",
    label: "Erkennen",
    icon: Activity,
    count: selbstfuersorgeInfografiken.filter(i => i.category === "erkennen")
      .length,
  },
  {
    id: "techniken",
    label: "Techniken",
    icon: Zap,
    count: selbstfuersorgeInfografiken.filter(i => i.category === "techniken")
      .length,
  },
  {
    id: "ressourcen",
    label: "Ressourcen",
    icon: Heart,
    count: selbstfuersorgeInfografiken.filter(i => i.category === "ressourcen")
      .length,
  },
] as const;

export default function SelbstfuersorgeInfografikenSection() {
  const [activeFilter, setActiveFilter] =
    useState<SelbstfuersorgeKategorie>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? selbstfuersorgeInfografiken
      : selbstfuersorgeInfografiken.filter(
          item => item.category === activeFilter
        );

  return (
    <ContentSection
      title="Materialien zum Download"
      icon={<Download className="w-6 h-6 text-sage-mid" />}
      id="materialien-download"
      preview="Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken."
    >
      <p className="text-sm text-muted-foreground mb-4">
        <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF
        öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer
        oben rechts.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {selbstfuersorgeCategories.map(cat => (
          <Button
            key={cat.id}
            variant={activeFilter === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveFilter(cat.id);
              setTimeout(() => {
                gridRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 50);
            }}
            className={`whitespace-nowrap shrink-0 ${activeFilter === cat.id ? "bg-sage-dark hover:bg-sage-mid text-white" : ""}`}
          >
            <cat.icon className="w-4 h-4 mr-1.5" />
            {cat.label} ({cat.count})
          </Button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <Card
            key={item.id}
            className={`overflow-hidden border-border/50 hover:shadow-md transition-shadow ${item.featured && activeFilter === "alle" ? "md:col-span-2" : ""}`}
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={item.webp}
                alt={item.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={400}
                height={223}
                decoding="async"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-1 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> PDF öffnen
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/materialien">
          <Button variant="outline" size="sm">
            Alle Materialien anzeigen
          </Button>
        </Link>
      </div>
    </ContentSection>
  );
}
