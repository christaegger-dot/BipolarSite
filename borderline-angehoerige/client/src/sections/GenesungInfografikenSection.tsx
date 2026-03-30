import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ExternalLink,
  Filter,
  HandHeart,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  genesungCategories,
  genesungItems,
  type GenesungKategorie,
} from "@/content/genesung";

const genesungIcons = {
  alle: Filter,
  verstehen: Search,
  handeln: HandHeart,
} as const;

export default function GenesungInfografikenSection() {
  const [activeFilter, setActiveFilter] = useState<GenesungKategorie>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? genesungItems
      : genesungItems.filter(item => item.category === activeFilter);

  return (
    <ContentSection
      title="Genesung verstehen – auf einen Blick"
      icon={<ImageIcon className="w-6 h-6 text-sage-dark" />}
      id="infografiken"
      preview="Alle Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken."
    >
      <p className="text-muted-foreground mb-6">
        Alle Infografiken als hochauflösende PDFs zum Herunterladen und
        Ausdrucken.{" "}
        <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF
        öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer
        oben rechts.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {genesungCategories.map(cat => {
          const Icon = genesungIcons[cat.id];
          const count =
            cat.id === "alle"
              ? genesungItems.length
              : genesungItems.filter(item => item.category === cat.id).length;
          return (
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
                }, 100);
              }}
              className={`whitespace-nowrap shrink-0 ${activeFilter === cat.id ? "bg-sage-mid hover:bg-sage-dark text-white" : ""}`}
            >
              <Icon className="w-4 h-4 mr-1.5" />
              {cat.label} ({count})
            </Button>
          );
        })}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <Card
            key={item.title}
            className={`overflow-hidden border-border/50 hover:shadow-lg transition-all duration-500 group ${filteredItems.length > 1 && index === 0 ? "sm:col-span-2" : ""}`}
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={400}
                height={223}
                decoding="async"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                PDF öffnen
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/materialien">
          <Button variant="outline">
            Alle Materialien ansehen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </ContentSection>
  );
}
