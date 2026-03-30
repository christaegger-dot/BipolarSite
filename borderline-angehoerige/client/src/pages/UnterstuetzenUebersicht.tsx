import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Lightbulb,
  Users,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "wouter";
import UnterstuetzenHeroSection from "@/sections/unterstuetzen/UnterstuetzenHeroSection";

import {
  unterstuetzenItems,
  unterstuetzenSubcategories,
} from "@/content/unterstuetzen";

export default function UnterstuetzenUebersicht() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? unterstuetzenItems
      : unterstuetzenItems.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO
        title="Unterstützen – Übersicht"
        description="Wie Angehörige hilfreich bleiben können: Rolle, Krisenlogik, Grenzen und tragfähige Unterstützung."
        path="/unterstuetzen/uebersicht"
      />

      <UnterstuetzenHeroSection />

      <UnterstuetzenSubNav />

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Unterstützung ist wichtig, aber nicht allmächtig"
              icon={<Compass className="w-7 h-7 text-sage-dark" />}
              id="unterstuetzung-ist-begrenzt"
              defaultOpen={true}
              preview="Sie können viel beitragen. Sie können aber weder Krisen vollständig verhindern noch Entwicklung für einen anderen Menschen herstellen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Angehörige können in belasteten Beziehungen eine wichtige
                  Rolle spielen. Sie können beruhigen, orientieren, Struktur
                  geben, emotionale Anerkennung vermitteln und mithelfen, dass
                  Situationen weniger zerstörerisch verlaufen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Gleichzeitig ist Unterstützung nie allmächtig. Sie können
                  nicht jede Krise verhindern, keine Entwicklung erzwingen und
                  nicht dauerhaft die innere Regulation eines anderen Menschen
                  übernehmen. Gerade diese Grenze ist oft schwer auszuhalten.
                </p>
                <Card className="bg-sage-light/20 border-sage">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Hilfreiche Unterstützung ist deshalb nicht totale
                      Verfügbarkeit, sondern eine Form von tragfähiger
                      Beziehung: zugewandt, klar, begrenzt und längerfristig
                      durchhaltbar.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Die Angehörigenrolle realistisch klären"
              icon={<Users className="w-7 h-7 text-sage-dark" />}
              id="rolle"
              preview="Hilfreich ist oft eine Rolle, die gleichzeitig zugewandt, klar und begrenzt bleibt."
            >
              <div className="grid md:grid-cols-2 gap-6 [&>*:first-child]:md:col-span-2">
                <Card className="border-sage-mid">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sage-mid" />
                      Was Sie sein können
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "eine verlässliche Bezugsperson",
                        "jemand, der Gefühle ernst nimmt",
                        "ein Mensch, der Orientierung gibt",
                        "ein Gegenüber mit realistischer Hoffnung",
                        "jemand, der Grenzen klar benennt und hält",
                      ].map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-sage-mid">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-sage-mid">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-sage-mid" />
                      Was nicht Ihre Aufgabe ist
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Therapeut oder Therapeutin zu sein",
                        "jeden Spannungszustand aufzufangen",
                        "alles Schwierige stellvertretend zu regulieren",
                        "Verhalten permanent zu kontrollieren",
                        "für den Verlauf der Genesung verantwortlich zu sein",
                      ].map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-sage-mid">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Unterstützung so schwierig macht"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="ambivalenz"
              preview="Unterstützung scheitert nicht nur an fehlendem Wissen, sondern oft an Erschöpfung, Angst, Wut, Schuld und widersprüchlichen Erwartungen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige erleben nicht nur die Belastung der
                  betroffenen Person, sondern auch die eigene Ambivalenz: helfen
                  wollen und gleichzeitig wegwollen, verstehen wollen und
                  gleichzeitig innerlich hart werden, Grenzen setzen wollen und
                  dann aus Schuld doch wieder nachgeben.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "aus Angst deeskalieren und dadurch problematische Muster stabilisieren",
                    "aus Schuld zu viel übernehmen",
                    "aus Erschöpfung kalt oder kurz angebunden werden",
                    "zwischen Mitgefühl, Wut, Loyalität und Rückzug schwanken",
                  ].map(item => (
                    <Card key={item} className="border-border/50">
                      <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Diese Ambivalenz ist kein Zeichen fehlender Haltung. Sie
                      ist oft Ausdruck einer langandauernden Belastung, in der
                      Beziehung, Verantwortung und Selbstschutz gleichzeitig
                      Platz brauchen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Modul-Navigation: Alltag / Krise / Therapie */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Was möchten Sie vertiefen?
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    href: "/unterstuetzen/alltag",
                    title: "Im Alltag unterstützen",
                    text: "Verlässlichkeit, Klarheit, Konflikt-Repair und kleine stabile Kontaktangebote.",
                  },
                  {
                    href: "/unterstuetzen/krise",
                    title: "Krisen begleiten",
                    text: "Ampel-System, Deeskalation, Was sagen / Was vermeiden, Nach der Krise.",
                  },
                  {
                    href: "/unterstuetzen/therapie",
                    title: "Therapie unterstützen",
                    text: "Wie Sie den therapeutischen Prozess sinnvoll begleiten — ohne zu übernehmen.",
                  },
                ].map(item => (
                  <Link key={item.href} href={item.href}>
                    <Card className="border-border/50 hover:border-sage-mid/60 hover:bg-sage-wash/20 transition-colors cursor-pointer h-full">
                      <CardContent className="p-5">
                        <p className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                        <p className="mt-3 text-sage-dark text-sm font-medium flex items-center gap-1">
                          Lesen <ArrowRight className="w-3 h-3" />
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <Card className="border-sage-mid/40 bg-sage-wash/20">
              <CardContent className="p-5 flex items-start gap-3">
                <span className="text-sage-mid mt-0.5">→</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ohne Grenzen wird Unterstützung oft unklar, erschöpfend oder
                  inkonsistent. Wie Sie klare Grenzen setzen und halten:{" "}
                  <Link
                    href="/grenzen"
                    className="text-sage-dark underline underline-offset-2 hover:text-sage-mid font-medium"
                  >
                    Grenzen setzen →
                  </Link>
                </p>
              </CardContent>
            </Card>

            <ContentSection
              title="Wenn mehrere Angehörige beteiligt sind"
              icon={<Users className="w-7 h-7 text-slate-dark" />}
              id="familiendynamik"
              preview="Unterschiedliche Haltungen in Familien sind normal. Problematisch wird es, wenn sie verdeckt gegeneinander arbeiten."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Wenn mehrere Angehörige beteiligt sind, entstehen oft
                  Spannungen: Eine Person grenzt ab, eine andere rettet, eine
                  dritte will Ruhe um jeden Preis. Solche Unterschiede sind
                  normal. Schwierig wird es, wenn Betroffene und Angehörige in
                  widersprüchliche Bündnisse geraten.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-l-sage-mid">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Hilfreich
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>gemeinsame Grundlinien klären</li>
                        <li>Absprachen ausserhalb akuter Krisen treffen</li>
                        <li>einander nicht unterlaufen</li>
                        <li>Unterschiede offen besprechen</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-sage-mid">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Belastend
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>widersprüchliche Botschaften</li>
                        <li>heimliche Sonderabsprachen</li>
                        <li>guter Cop, böser Cop</li>
                        <li>sich gegeneinander ausspielen lassen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Woran hilfreiche Unterstützung erkennbar ist"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="woran-erkennbar"
              preview="Hilfreiche Unterstützung macht nicht alles ruhig. Sie macht Beziehungen eher klarer, berechenbarer und weniger zerstörerisch."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "weniger hektisches Reagieren auf jede Krise",
                  "mehr Benennbarkeit von Belastung und Grenzen",
                  "mehr Berechenbarkeit in Beziehungen",
                  "weniger Schuld und Gegenschuld",
                  "mehr Bereitschaft, Hilfe von aussen einzubeziehen",
                  "mehr Selbstschutz ohne vollständigen Beziehungsabbruch",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30"
                  >
                    <span className="text-sage-mid mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Wann Unterstützung an Grenzen kommt"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="grenzen-der-unterstuetzung"
              preview="Es gibt Situationen, in denen Angehörige nicht weiter stabilisieren können und andere Hilfe oder mehr Distanz nötig wird."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Es gibt Konstellationen, in denen Angehörige nicht mehr nur
                  unterstützen, sondern vor allem schützen müssen: bei eigener
                  Erschöpfung, bei Gewalt oder massiver Grenzverletzung, wenn
                  Kinder mitbetroffen sind oder wenn sich das ganze Leben nur
                  noch um Krisen dreht.
                </p>
                <Card className="bg-sand-muted border-sand-mid">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Spätestens dann braucht es zusätzliche Hilfe, klarere
                      Grenzen oder auch mehr Distanz. Das ist kein Versagen,
                      sondern oft Ausdruck verantwortlichen Handelns.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-sage-dark" />
                Materialien zum Thema
              </h2>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">
                    Vorschau = Web-Bild.
                  </strong>{" "}
                  «PDF öffnen» öffnet die A4-Druckversion im neuen Tab.
                </span>
              </p>

              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-1 px-1">
                {unterstuetzenSubcategories.map(cat => {
                  const Icon = cat.icon;
                  const count =
                    cat.id === "alle"
                      ? unterstuetzenItems.length
                      : unterstuetzenItems.filter(i => i.category === cat.id)
                          .length;
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
                        }, 50);
                      }}
                      className={`whitespace-nowrap shrink-0 ${
                        activeFilter === cat.id
                          ? "bg-sage-mid hover:bg-sage-dark text-white"
                          : ""
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {cat.label}
                      <span className="ml-1.5 text-xs opacity-90">
                        ({count})
                      </span>
                    </Button>
                  );
                })}
              </div>

              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.title}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${
                      filteredItems.length > 1 && index === 0
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm text-foreground mb-2">
                        {item.title}
                      </h3>
                      <a
                        href={item.pdfUrl}
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

              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="outline" size="sm">
                    Alle Materialien anzeigen
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-sand-muted border-sand-mid">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-sand-mid flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Denken Sie daran
                      </h3>
                      <p className="text-muted-foreground">
                        Unterstützen heisst nicht, sich selbst aufzugeben. Sie
                        können nur dann tragfähig unterstützen, wenn Ihr eigenes
                        Fundament geschützt bleibt.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/verstehen">
                <Button variant="ghost">← Verstehen</Button>
              </Link>
              <Link href="/unterstuetzen/alltag">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Im Alltag unterstützen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
