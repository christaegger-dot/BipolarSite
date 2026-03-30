import EvidenceNote from "@/components/EvidenceNote";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  RefreshCw,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import { TableOfContents } from "@/components/UXEnhancements";
import { genesungItems as genesungMaterialItems } from "@/content/genesung";

function GenesungInfografiken() {
  return (
    <ContentSection
      title="Materialien & Infografiken"
      icon={<ImageIcon className="w-6 h-6 text-sage-dark" />}
      id="infografiken"
      preview="Vertiefende Materialien zu Verlauf, Hoffnung, Rückschritten und der Rolle von Angehörigen."
    >
      <p className="text-muted-foreground mb-6">
        Vorschau = Web-Bild. «PDF öffnen» öffnet die A4-Druckversion im neuen
        Tab.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {genesungMaterialItems.map((item, index) => (
          <Card
            key={item.title}
            className={`overflow-hidden border-border/50 hover:shadow-lg transition-all duration-500 group ${
              genesungMaterialItems.length > 1 && index === 0
                ? "sm:col-span-2"
                : ""
            }`}
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
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link href="/materialien">
          <Button variant="outline">
            Alle Materialien ansehen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link href="/glossar">
          <Button variant="outline">Fachbegriffe im Glossar →</Button>
        </Link>
        <Link href="/buchempfehlungen">
          <Button variant="outline">Buchempfehlungen →</Button>
        </Link>
      </div>
    </ContentSection>
  );
}

export default function Genesung() {
  return (
    <Layout>
      <SEO
        title="Genesung"
        description="Genesung bei Borderline: realistische Hoffnung, Langzeitverlauf und was das für Angehörige bedeutet."
        path="/genesung"
      />
      <TableOfContents />

      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sage-dark blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-sage blur-3xl" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-wash flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Genesung ist möglich
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hoffnung ist bei Borderline berechtigt. Gleichzeitig verläuft
              Entwicklung selten glatt, schnell oder vorhersehbar. Für
              Angehörige ist deshalb beides wichtig: Zuversicht und eine
              realistische Sicht auf Zeit, Rückschritte und Grenzen des eigenen
              Einflusses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF-Hinweis */}
      <div className="container">
        <div className="max-w-3xl mx-auto py-3">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-sage-wash/40 border border-sage-mid/20 px-4 py-2.5">
            <p className="text-xs text-muted-foreground">
              Alle Infografiken auch als druckbare PDFs verfügbar.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-sage-dark shrink-0"
              asChild
            >
              <Link href="/materialien">Materialien →</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-sage/30 bg-gradient-to-br from-sage-wash to-cream">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-normal text-foreground mb-2">
                      Was die Forschung zeigt
                    </h2>
                    <p className="text-muted-foreground">
                      Langzeitstudien sprechen klar gegen das alte Bild einer
                      hoffnungslosen Entwicklung. Viele Menschen mit Borderline
                      erleben über Jahre deutliche Besserungen.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 [&>*:first-child]:md:col-span-2">
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      85–93%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine symptomatische Remission innerhalb von etwa
                      10 Jahren
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      (Daten aus Spezialzentren)
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      50%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine umfassendere Genesung mit funktioneller
                      Stabilität
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      Jahre
                    </div>
                    <p className="text-sm text-muted-foreground">
                      nicht Wochen oder Monate – eher mindestens ein bis mehrere
                      Jahre, oft mit mehreren Anläufen
                    </p>
                  </div>
                </div>

                <EvidenceNote
                  className="mt-6"
                  title="Quellen zu Prognose- und Remissionsaussagen"
                  sources={[
                    {
                      label:
                        "Zanarini et al. (2010) – McLean Study of Adult Development",
                      href: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
                    },
                    {
                      label:
                        "Zanarini et al. (2012) – Sustained remission and recovery in BPD",
                      href: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
                    },
                    {
                      label:
                        "Gunderson et al. (2011) – Ten-year course of BPD (CLPS)",
                      href: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
                    },
                  ]}
                />

                <p className="text-xs text-muted-foreground mt-4 px-1 leading-relaxed">
                  <strong>Hinweis:</strong> Diese Zahlen stammen aus
                  Spezialzentren unter optimalen Bedingungen. Der reale Weg ist
                  für viele Menschen nicht-linear und braucht länger. Genesung
                  bleibt das realistische Ziel — aber Rückschritte und lange
                  Phasen gehören dazu.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Was Remission und Genesung bedeuten"
              icon={<BookOpen className="w-6 h-6 text-sage-dark" />}
              id="remission"
              defaultOpen={true}
              preview="Besserung heisst nicht zwingend völlige Symptomfreiheit. Für Angehörige ist wichtig, die Begriffe realistischer zu lesen."
            >
              <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-6">
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Symptomatische Remission
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Die diagnostischen Kriterien werden über längere Zeit
                      nicht mehr erfüllt oder deutlich schwächer. Das bedeutet
                      häufig weniger Impulsdurchbrüche, weniger Instabilität und
                      mehr inneren Spielraum.
                    </p>
                  </CardContent>
                </Card>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Umfassendere Genesung
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Zusätzlich zur Symptomverbesserung kommen alltagsbezogene
                      Stabilität, Beziehungen, Arbeit oder Ausbildung und mehr
                      Lebensqualität in den Blick.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6 bg-sage-wash/50 border-sage-mid/30">
                <CardContent className="p-5">
                  <p className="text-foreground leading-relaxed">
                    Für Angehörige ist entscheidend: Besserung ist oft real,
                    auch wenn nicht alles konfliktfrei, leicht oder linear wird.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            <ContentSection
              title="Das Fortschritt-Paradox"
              icon={<RefreshCw className="w-6 h-6 text-sage-mid" />}
              id="fortschritt-paradox"
              preview="Gerade wenn es besser läuft, können Rückschritte besonders verunsichern. Das entwertet den Weg aber nicht automatisch."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige erleben ein irritierendes Muster: Nach einer
                  ruhigeren Phase kommt wieder ein Einbruch. Dann fühlt es sich
                  schnell an, als wäre alles umsonst gewesen. Meist ist das
                  nicht die treffendste Deutung.
                </p>
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Entwicklung bedeutet bei Borderline häufig nicht: Schritt
                      für Schritt nur vorwärts. Eher: Es gibt Bewegungen,
                      Unterbrüche, Wiederaufnahmen und Phasen, in denen neue
                      Stabilität erst gelernt werden muss.
                    </p>
                  </CardContent>
                </Card>

                {/* Genesungsverlauf – Wellenlinie */}
                <div className="rounded-lg border border-border/40 bg-slate-wash/10 p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 text-center">
                    Genesungsverlauf: nicht linear
                  </p>
                  <svg
                    viewBox="0 0 300 70"
                    className="w-full h-14"
                    aria-hidden="true"
                  >
                    <line
                      x1="15"
                      y1="58"
                      x2="285"
                      y2="12"
                      stroke="var(--color-sage-mid)"
                      strokeWidth="1"
                      strokeDasharray="5,4"
                      opacity="0.35"
                    />
                    <path
                      d="M 15,56 C 40,56 48,22 65,28 S 95,60 115,50 S 155,16 182,22 S 215,48 245,36 S 272,14 285,10"
                      fill="none"
                      stroke="var(--color-sage-dark)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text
                      x="15"
                      y="68"
                      fontSize="8"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Beginn
                    </text>
                    <text
                      x="255"
                      y="9"
                      fontSize="8"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Ziel
                    </text>
                    <text
                      x="88"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.5"
                    >
                      Rückschritt
                    </text>
                    <line
                      x1="115"
                      y1="65"
                      x2="115"
                      y2="52"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      opacity="0.35"
                    />
                    <text
                      x="187"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.5"
                    >
                      Rückschritt
                    </text>
                    <line
                      x1="215"
                      y1="65"
                      x2="215"
                      y2="49"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      opacity="0.35"
                    />
                  </svg>
                  <p className="text-[11px] text-muted-foreground text-center mt-1">
                    Rückschritte gehören zum Weg — die gestrichelte Linie zeigt
                    den Gesamttrend
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Rückschritte einordnen, statt sofort zu katastrophisieren",
                    "Fortschritte konkret benennen, statt nur global zu hoffen",
                    "Tempo nicht übersteuern, wenn es besser läuft",
                    "für schwierige Phasen einen kleinen Plan bereithalten",
                  ].map(item => (
                    <Card key={item} className="border-border/50">
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Realistische Hoffnung statt glatter Zuversicht"
              icon={<Heart className="w-6 h-6 text-sage-mid" />}
              id="hoffnung"
              preview="Hoffnung ist wichtig. Sie wird aber tragfähiger, wenn sie Raum lässt für Erschöpfung, Zweifel, lange Dauer und ungleichmässige Entwicklung."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Angehörige brauchen oft Hoffnung, um nicht zu resignieren.
                  Gleichzeitig kann ein zu glattes Fortschrittsbild zusätzlichen
                  Druck erzeugen: auf die betroffene Person, auf die Beziehung
                  und auf Sie selbst.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">
                      ❌ Weniger hilfreich
                    </span>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>Jetzt muss es doch endlich besser werden</li>
                      <li>Ein Rückschritt entwertet alles</li>
                      <li>Wenn genug Wille da ist, geht es schnell</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">
                      ✓ Tragfähiger
                    </span>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>Besserung ist möglich und oft wahrscheinlich</li>
                      <li>
                        Rückschritte kommen vor und müssen nicht alles kippen
                      </li>
                      <li>Tempo und Zeitpunkt bleiben begrenzt steuerbar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Angehörige zur Genesung beitragen können"
              icon={<Users className="w-6 h-6 text-sage-mid" />}
              id="beitragen"
              preview="Ihre Rolle ist wertvoll, aber begrenzt. Sie können Bedingungen mittragen, nicht Entwicklung herstellen."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Konsistenz",
                    desc: "berechenbar bleiben, statt in Alarm mitzukippen",
                  },
                  {
                    title: "realistische Hoffnung",
                    desc: "Zuversicht ohne Druck vermitteln",
                  },
                  {
                    title: "eigene Grenzen",
                    desc: "die eigene Stabilität nicht opfern",
                  },
                  {
                    title: "professionelle Hilfe",
                    desc: "Behandlung unterstützen, aber nicht ersetzen",
                  },
                ].map(item => (
                  <Card key={item.title} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Was Entwicklung eher fördert"
              icon={<TrendingUp className="w-6 h-6 text-sage-mid" />}
              id="faktoren"
              preview="Die Forschung beschreibt mehrere günstige Bedingungen. Keine davon ist eine Garantie, aber viele sind beeinflussbar."
            >
              <div className="space-y-4">
                {[
                  "spezialisierte Psychotherapie",
                  "Zeit und Geduld",
                  "stabile, nicht verschlingende Beziehungen",
                  "alltagsbezogene Struktur",
                  "Behandlung von Begleiterkrankungen",
                ].map((item, index) => (
                  <Card key={item} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <GenesungInfografiken />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-sand-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
                Wie können Sie tragfähig begleiten?
              </h2>
              <p className="text-muted-foreground mb-8">
                Unterstützung heisst nicht, Entwicklung herzustellen. Es heisst
                oft, Beziehung, Klarheit und Selbstschutz über längere Zeit
                auszubalancieren.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/unterstuetzen/uebersicht">
                  <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                    Unterstützen lernen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/unterstuetzen/therapie">
                  <Button variant="outline" className="gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Therapie begleiten
                  </Button>
                </Link>
                <Link href="/selbstfuersorge">
                  <Button variant="outline">Selbstfürsorge</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
