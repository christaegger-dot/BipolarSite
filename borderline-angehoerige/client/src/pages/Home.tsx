import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Compass,
  Heart,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";

const situationPaths = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Ich versuche zu verstehen, was passiert",
    text: "Wenn Nähe, Eskalation, Rückzug oder Widersprüche schwer einzuordnen sind.",
    color: "var(--color-sage-dark)",
    iconBg: "var(--color-sage-wash)",
  },
  {
    href: "/soforthilfe",
    icon: AlertTriangle,
    title: "Es kippt gerade oder eskaliert",
    text: "Wenn starke Anspannung, Konflikte oder Krisensignale im Vordergrund stehen.",
    color: "var(--color-alert)",
    iconBg: "var(--color-alert-wash)",
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Gespräche werden schwierig",
    text: "Wenn Worte verletzen, Vorwürfe dominieren oder alles sofort hochgeht.",
    color: "var(--color-slate-blue)",
    iconBg: "var(--color-slate-wash)",
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Ich bin selbst erschöpft",
    text: "Wenn Anspannung, Schuld, Rückzug oder innere Überforderung zu gross werden.",
    color: "var(--color-sage-mid)",
    iconBg: "var(--color-sage-wash)",
  },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und entlastend."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster."
        path="/"
      />

      <section className="relative overflow-hidden bg-navy text-white">
        {/* Dekorative Kreise */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sage-mid blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-48 h-48 rounded-full bg-amber blur-3xl" />
        </div>

        <div className="container relative z-10 py-12 md:py-14 lg:py-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-sage-dark text-white text-[11px] font-semibold tracking-[0.12em] uppercase mb-4">
                Für Angehörige von Menschen mit Borderline
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.15] tracking-tight mb-2">
                Orientierung in belasteten{" "}
                <span className="text-sage-light">Beziehungen</span>
              </h1>

              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-2xl font-light">
                Wenn Beziehungen von starker Anspannung, Eskalation, Rückzug,
                Schuld oder Erschöpfung geprägt sind, hilft nicht noch mehr
                Druck, sondern bessere Einordnung. Diese Website unterstützt
                Angehörige dabei, Dynamiken zu verstehen, hilfreicher zu
                reagieren und sich selbst nicht zu verlieren.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href="/verstehen">
                  <Button
                    size="lg"
                    className="bg-sage-dark hover:bg-sage-mid text-white w-full sm:w-auto"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Borderline besser verstehen
                  </Button>
                </Link>
                <Link href="/unterstuetzen/uebersicht">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Was hilft in meiner Lage?
                  </Button>
                </Link>
              </div>

              <Link
                href="/soforthilfe"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Akute Krise? Soforthilfe</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-5 bg-navy text-white border-b border-navy-light/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/80" />
              </div>
              <p className="font-semibold text-white text-sm sm:text-base">
                Ein Angebot der Fachstelle Angehörigenarbeit (PUK Zürich)
              </p>
            </div>
            <p className="text-white/70 text-sm flex-1">
              Fachlich fundierte Orientierung, Beratung und Materialien für
              Angehörige.
            </p>
            <Link
              href="/fachstelle"
              className="text-sage-light hover:text-white text-sm font-medium underline underline-offset-2 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              Angebot & Kontakt
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
                Was ist gerade Ihre Lage?
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Beginnen Sie dort, wo der Druck im Moment am grössten ist. Die
                Website ist nicht nur zum Lesen gedacht, sondern als
                Orientierung in belasteten Beziehungssituationen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {situationPaths.map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Card
                      className="h-full cursor-pointer bg-white border border-border rounded-[10px] border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                      style={{ borderLeftColor: item.color }}
                    >
                      <CardContent className="p-5 flex gap-4 items-start">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.iconBg }}
                        >
                          <Icon
                            className="w-[18px] h-[18px]"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-[13.5px] text-muted-foreground mb-2">
                            {item.text}
                          </p>
                          <span
                            className="text-xs font-semibold inline-flex items-center gap-1"
                            style={{ color: item.color }}
                          >
                            Zum passenden Bereich
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6">
              <Link href="/selbsttest">
                <Button variant="outline" size="sm" className="gap-2">
                  <Compass className="w-4 h-4" />
                  Oder den kurzen Selbsttest nutzen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-cream">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
                Was diese Website besonders abdeckt
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Borderline differenziert aus Sicht von Angehörigen verstehen",
                  "Beziehungsmuster, Eskalation und Rückzug besser einordnen",
                  "Grenzen, Selbstschutz und Unterstützung zusammendenken",
                  "Fachliche Hilfe, Materialien und Beratungswege schnell finden",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border/40"
                  >
                    <span className="text-foreground/40 mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 bg-sand-muted/40">
              <CardContent className="p-5">
                <h2 className="text-xl font-normal text-foreground mb-2">
                  Materialien und Beratung
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Sekundäre Wege für Vertiefung und konkrete Unterstützung.
                </p>
                <div className="flex gap-3">
                  <Link href="/materialien">
                    <Button variant="outline" size="sm">
                      Materialien
                    </Button>
                  </Link>
                  <Link href="/beratung">
                    <Button variant="outline" size="sm">
                      Beratung
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-alert">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-2">
                In einer akuten Krise?
              </h2>
              <p className="text-white">
                Hier finden Sie sofortige Hilfe und Notfallnummern.
              </p>
            </div>
            <Link href="/soforthilfe">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-alert hover:bg-white/90"
              >
                <Phone className="w-5 h-5 mr-2" />
                Soforthilfe öffnen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
