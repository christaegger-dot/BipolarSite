import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import MaterialCard from "@/sections/materialien/MaterialCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";
import { materials, quickStarts } from "@/content/materials";
import MaterialienHeroSection from "@/sections/materialien/MaterialienHeroSection";

const categoryMeta = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "soforthilfe", label: "Soforthilfe", icon: AlertTriangle },
  { id: "verstehen", label: "Verstehen", icon: BookOpen },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { id: "grenzen", label: "Grenzen", icon: Shield },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
  { id: "genesung", label: "Genesung", icon: TrendingUp },
];

function LightboxOverlay({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Vorschau: ${title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={src}
          alt={`Vorschau: ${title}`}
          className="w-full h-auto rounded-lg shadow-2xl"
          width={1600}
          height={892}
          loading="lazy"
          decoding="async"
        />
        <p className="text-center text-white mt-4 text-sm">
          Klicken Sie irgendwo oder drücken Sie Escape, um zu schliessen
        </p>
      </motion.div>
    </div>
  );
}

export default function Materialien() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Vorschau");
  const gridRef = useRef<HTMLElement>(null);

  const filteredMaterials = useMemo(
    () =>
      activeCategory === "alle"
        ? materials
        : materials.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <Layout>
      <SEO
        title="Materialien"
        description="Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline."
        path="/materialien"
      />

      <MaterialienHeroSection />

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
              Was hilft gerade jetzt?
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {quickStarts.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(item.id);
                    scrollToResults();
                  }}
                  className="text-left rounded-xl border p-5 transition-all hover:shadow-md"
                  style={{ borderColor: item.color, backgroundColor: item.bg }}
                >
                  <p className="font-semibold text-foreground mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={gridRef}
        className="py-8 md:py-12 border-t border-border/60"
      >
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-3 rounded-lg bg-sand border border-sand-subtle flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Vorschau = Web-Bild.
                </strong>{" "}
                «Öffnen» öffnet die Druckversion im neuen Tab. Die Notfallkarte
                öffnet als HTML-Seite.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
              {categoryMeta.map(cat => {
                const Icon = cat.icon;
                const count =
                  cat.id === "alle"
                    ? materials.length
                    : materials.filter(item => item.category === cat.id).length;
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id
                        ? "bg-sage-dark hover:bg-sage-dark text-white"
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-90">({count})</span>
                  </Button>
                );
              })}
            </div>

            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map(item => (
                  <MaterialCard
                    key={item.id}
                    item={item}
                    onPreview={(image, title) => {
                      setPreviewImage(image);
                      setPreviewTitle(title);
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    In dieser Kategorie sind aktuell keine weiteren Materialien
                    sichtbar.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="bg-sand-muted border-sand-mid">
              <CardContent className="p-6">
                <h2 className="font-normal text-foreground mb-2 text-lg">
                  Besondere Konstellationen
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manche Materialien helfen besonders, wenn Kinder mitbetroffen
                  sind, wenn Schuld dominiert oder wenn Grenzen und Distanz zum
                  Thema werden.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("verstehen");
                      scrollToResults();
                    }}
                  >
                    Kinder & Familie
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("selbstfuersorge");
                      scrollToResults();
                    }}
                  >
                    Schuld & Erschöpfung
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("grenzen");
                      scrollToResults();
                    }}
                  >
                    Grenzen & Selbstschutz
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sage-wash border-sage-light">
              <CardContent className="p-6">
                <h2 className="font-normal text-foreground mb-2 text-lg">
                  Von hier aus weiter
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Wenn Sie gerade eher Orientierung als Downloads brauchen, sind
                  die Hauptseiten oft der bessere Einstieg.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/verstehen">
                    <Button variant="outline" size="sm">
                      Verstehen
                    </Button>
                  </Link>
                  <Link href="/kommunizieren">
                    <Button variant="outline" size="sm">
                      Kommunizieren
                    </Button>
                  </Link>
                  <Link href="/grenzen">
                    <Button variant="outline" size="sm">
                      Grenzen
                    </Button>
                  </Link>
                  <Link href="/selbstfuersorge">
                    <Button variant="outline" size="sm">
                      Selbstfürsorge
                    </Button>
                  </Link>
                  <Link href="/buchempfehlungen">
                    <Button variant="outline" size="sm">
                      Buchempfehlungen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {previewImage && (
        <LightboxOverlay
          src={previewImage}
          title={previewTitle}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </Layout>
  );
}
