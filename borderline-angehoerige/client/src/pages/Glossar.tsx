import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  ArrowRight,
  Brain,
  Heart,
  MessageCircle,
  Users,
  Lightbulb,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  category: "therapie" | "kommunikation" | "symptome" | "selbsthilfe";
  definition: string;
  example?: string;
  relatedPage?: string;
  relatedPageTitle?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // Therapie & Behandlung
  {
    term: "Dialektisch-Behaviorale Therapie",
    abbreviation: "DBT",
    category: "therapie",
    definition:
      "Die DBT ist die am besten erforschte Therapieform für Borderline. Sie wurde von Marsha Linehan entwickelt und kombiniert Verhaltenstherapie mit Achtsamkeitspraktiken. Der Begriff 'dialektisch' bezieht sich auf die Balance zwischen Akzeptanz (so wie es ist) und Veränderung (was besser werden kann).",
    example:
      "In der DBT lernen Betroffene konkrete Fertigkeiten (Skills) zur Emotionsregulation, Stresstoleranz, zwischenmenschlichen Effektivität und Achtsamkeit.",
    relatedPage: "/unterstuetzen/therapie",
    relatedPageTitle: "Therapie unterstützen",
  },
  {
    term: "Skills",
    category: "therapie",
    definition:
      "Skills sind konkrete Fertigkeiten, die in der DBT erlernt werden. Sie sollen helfen, mit intensiven Emotionen, Krisen und zwischenmenschlichen Spannungen anders umzugehen, ohne sofort auf selbstschädigende oder eskalierende Muster zurückzugreifen.",
    example:
      "Ein Skill bei starker Anspannung kann sein, die Hände in eiskaltes Wasser zu tauchen – der intensive Reiz lenkt vom emotionalen Schmerz ab.",
    relatedPage: "/unterstuetzen/alltag",
    relatedPageTitle: "Im Alltag unterstützen",
  },
  {
    term: "Mentalisierung",
    category: "therapie",
    definition:
      "Die Fähigkeit, das eigene Verhalten und das Verhalten anderer Menschen als Ausdruck von Gedanken, Gefühlen, Wünschen und Absichten zu verstehen. Bei Menschen mit Borderline ist diese Fähigkeit oft beeinträchtigt, besonders in emotional aufgeladenen Situationen.",
    example:
      "Wenn jemand mentalisiert, denkt er: 'Sie ist vielleicht gereizt, weil sie einen stressigen Tag hatte' – statt: 'Sie hasst mich'.",
  },
  {
    term: "Remission",
    category: "therapie",
    definition:
      "In der Borderline-Forschung bedeutet Remission, dass eine Person nicht mehr genügend Kriterien für die Diagnose erfüllt. Studien zeigen, dass 85–93% der Betroffenen innerhalb von 10 Jahren eine Remission erreichen (u.a. Zanarini et al., 2010). Diese Zahlen stammen aus Spezialzentren und sind nicht direkt auf die Allgemeinbevölkerung übertragbar.",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },
  {
    term: "Recovery",
    category: "therapie",
    definition:
      "Recovery geht über Remission hinaus und umfasst auch gutes soziales und berufliches Funktionieren sowie eine stabile Beziehung. Etwa 50% der Betroffenen erreichen nach 10 Jahren eine vollständige Recovery (Zanarini et al., 2012).",
    relatedPage: "/genesung",
    relatedPageTitle: "Genesung ist möglich",
  },

  // Kommunikation
  {
    term: "Validierung",
    category: "kommunikation",
    definition:
      "Validierung bedeutet, die Gefühle und Erfahrungen einer Person als verständlich und nachvollziehbar anzuerkennen, auch wenn man das Verhalten nicht gutheisst. Für Angehörige ist sie oft ein hilfreicher Ausgangspunkt, weil sie Druck aus Gesprächen nehmen kann, ohne alles zu bestätigen.",
    example:
      "'Ich verstehe, dass du dich verletzt fühlst, wenn ich später nach Hause komme als angekündigt. Das macht Sinn, weil du dir Sorgen machst.'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "SET-Kommunikation",
    category: "kommunikation",
    definition:
      "SET steht für Support (Unterstützung), Empathy (Empathie) und Truth (Wahrheit/Realität). Gemeint ist ein Gesprächsrahmen aus der Angehörigenliteratur, der helfen soll, Zugewandtheit, Mitgefühl und Klarheit zusammenzuhalten.",
    example:
      "Support: 'Ich bin für dich da.' Empathy: 'Ich sehe, wie sehr dich das belastet.' Truth: 'Gleichzeitig können wir nicht jede Nacht bis 3 Uhr diskutieren.'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "DEARMAN",
    category: "kommunikation",
    definition:
      "DEARMAN ist eine DBT-Struktur für klare Bitten und Grenzen: Describe (beschreiben), Express (ausdrücken), Assert (klar benennen), Reinforce (verstärken), Mindful (achtsam bleiben), Appear confident (klar auftreten), Negotiate (verhandeln).",
    example:
      "Statt 'Du hörst mir nie zu!' → 'Wenn ich spreche und du aufs Handy schaust (D), fühle ich mich unwichtig (E). Ich wünsche mir, dass du das Handy weglegst (A).'",
    relatedPage: "/kommunizieren",
    relatedPageTitle: "Kommunizieren",
  },
  {
    term: "Invalidierung",
    category: "kommunikation",
    definition:
      "Das Gegenteil von Validierung: Die Gefühle oder Erfahrungen einer Person werden abgewertet, ignoriert oder als übertrieben dargestellt. Invalidierung kann Krisen verschärfen und ist besonders schmerzhaft für Menschen mit Borderline.",
    example:
      "Invalidierende Aussagen: 'Das ist doch nicht so schlimm', 'Du übertreibst mal wieder', 'Andere haben es viel schwerer'.",
  },

  // Symptome & Muster
  {
    term: "Emotionale Dysregulation",
    category: "symptome",
    definition:
      "Die Schwierigkeit, Emotionen zu regulieren – sie werden intensiver erlebt, schneller ausgelöst und klingen langsamer ab. Dies ist ein Kernmerkmal von Borderline und erklärt viele der beobachtbaren Verhaltensweisen.",
    example:
      "Eine kleine Enttäuschung kann sich anfühlen wie ein Weltuntergang. Die Emotion ist real und intensiv – nur die Auslöser-Reaktion-Verhältnis ist anders.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Splitting",
    category: "symptome",
    definition:
      "Ein Denkmuster, bei dem Menschen oder Situationen als 'ganz gut' oder 'ganz schlecht' wahrgenommen werden, ohne Grautöne. Dies ist keine bewusste Manipulation, sondern eine automatische Reaktion auf emotionale Überforderung.",
    example:
      "Gestern war der Partner 'der beste Mensch der Welt', heute nach einem Streit 'hat er mich nie geliebt'. Beide Extreme fühlen sich im Moment absolut wahr an.",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Verlassensangst",
    category: "symptome",
    definition:
      "Eine intensive, oft überwältigende Angst vor dem Verlassenwerden – real oder eingebildet. Diese Angst kann zu verzweifelten Versuchen führen, Beziehungen aufrechtzuerhalten, oder paradoxerweise dazu, andere zuerst zu verlassen.",
    example:
      "Schon eine kurze Verzögerung bei einer Antwort kann Panik auslösen: 'Er antwortet nicht – er will mich verlassen!'",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },
  {
    term: "Dissoziation",
    category: "symptome",
    definition:
      "Ein Zustand, in dem sich Menschen von sich selbst, ihrem Körper oder ihrer Umgebung abgetrennt fühlen. Es ist eine Schutzreaktion des Gehirns auf überwältigende Emotionen oder Stress.",
    example:
      "Betroffene beschreiben es als 'neben sich stehen', 'wie in Watte gepackt sein' oder 'die Welt wirkt unwirklich'.",
  },
  {
    term: "Identitätsdiffusion",
    category: "symptome",
    definition:
      "Ein instabiles oder unklares Selbstbild. Menschen mit Borderline haben oft Schwierigkeiten zu beschreiben, wer sie sind, was sie wollen oder was ihre Werte sind – unabhängig von anderen Menschen.",
    example:
      "'Ich weiss nicht, wer ich bin, wenn ich alleine bin. Ich übernehme immer die Interessen meines Partners.'",
    relatedPage: "/verstehen",
    relatedPageTitle: "Borderline verstehen",
  },

  // Selbsthilfe & Angehörige
  {
    term: "Selbstfürsorge",
    category: "selbsthilfe",
    definition:
      "Bewusste Handlungen, um die eigene körperliche, emotionale und mentale Gesundheit zu erhalten. Für Angehörige von Menschen mit Borderline ist Selbstfürsorge keine Selbstsucht, sondern notwendig, um langfristig unterstützen zu können.",
    example:
      "Regelmässige Pausen, eigene Hobbys pflegen, professionelle Unterstützung suchen, Grenzen setzen.",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    term: "Grenzen setzen",
    category: "selbsthilfe",
    definition:
      "Klare Kommunikation darüber, welches Verhalten akzeptabel ist und welches nicht – mit konsequenter Umsetzung. Grenzen schützen beide Seiten und sind ein Zeichen von Respekt, nicht von Ablehnung.",
    example:
      "'Ich bin bereit, mit dir zu sprechen, aber nicht, wenn du schreist. Wenn du ruhiger bist, bin ich wieder da.'",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    term: "Co-Abhängigkeit",
    category: "selbsthilfe",
    definition:
      "Ein Beziehungsmuster, bei dem das eigene Wohlbefinden übermässig vom Zustand des anderen abhängt. Angehörige vernachlässigen dabei oft eigene Bedürfnisse und versuchen, die Lage des anderen ständig mitzutragen oder zu kontrollieren.",
    example:
      "Warnsignale: 'Ich kann nur glücklich sein, wenn es ihr gut geht', 'Ich habe keine eigenen Freunde mehr', 'Ich sage nie Nein'.",
    relatedPage: "/selbstfuersorge",
    relatedPageTitle: "Selbstfürsorge",
  },
  {
    term: "Enabling",
    category: "selbsthilfe",
    definition:
      "Verhaltensweisen von Angehörigen, die problematische Muster unbeabsichtigt mittragen oder verstärken, oft aus dem Wunsch zu helfen. Das Gegenstück ist nicht Härte, sondern klarere Grenzen und das Zulassen natürlicher Konsequenzen.",
    example:
      "Immer wieder Geld leihen, obwohl es nie zurückkommt; Ausreden für verpasste Termine erfinden; alle Konflikte vermeiden.",
    relatedPage: "/grenzen",
    relatedPageTitle: "Grenzen setzen",
  },
  {
    term: "Leuchtturm-Prinzip",
    category: "selbsthilfe",
    definition:
      "Eine Metapher für die Rolle von Angehörigen: Sie können ein Leuchtturm sein – stabil, verlässlich, orientierungsgebend – aber sie können nicht das Schiff steuern. Die Verantwortung für die Genesung liegt beim Betroffenen.",
    example:
      "'Ich bin da, ich leuchte, ich zeige die Richtung – aber ich kann nicht für dich schwimmen.'",
    relatedPage: "/",
    relatedPageTitle: "Startseite",
  },
];

const categoryInfo = {
  therapie: {
    label: "Therapie & Behandlung",
    icon: Brain,
    color: "var(--color-slate-mid)",
  },
  kommunikation: {
    label: "Kommunikation",
    icon: MessageCircle,
    color: "var(--color-sage-dark)",
  },
  symptome: {
    label: "Symptome & Muster",
    icon: AlertTriangle,
    color: "var(--color-sage-dark)",
  },
  selbsthilfe: {
    label: "Selbsthilfe & Angehörige",
    icon: Heart,
    color: "var(--color-sage-mid)",
  },
};

export default function Glossar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location] = useLocation();

  // Bug-Fix: URL-Parameter ?q= auslesen und in Suchfeld setzen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setSearchTerm(q);
  }, [location]);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch =
      searchTerm === "" ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.abbreviation &&
        term.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === null || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort alphabetically
  const sortedTerms = [...filteredTerms].sort((a, b) =>
    a.term.localeCompare(b.term, "de")
  );

  return (
    <Layout>
      <SEO
        title="Glossar"
        description="Fachbegriffe rund um Borderline einfach erklärt."
        path="/glossar"
      />
      {/* Hero */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-wash flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-slate-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                {glossaryTerms.length} Begriffe
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Glossar
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Fachbegriffe verständlich erklärt – für Angehörige, die sich neu
              einlesen oder bestimmte Konzepte nachschlagen möchten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-border/50 sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Begriff suchen..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Glossar durchsuchen"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-slate-mid"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                aria-label="Alle Kategorien anzeigen"
                aria-pressed={selectedCategory === null}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-slate-dark text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                Alle
              </button>
              {Object.entries(categoryInfo).map(([key, info]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === key ? null : key)
                  }
                  aria-label={info.label}
                  aria-pressed={selectedCategory === key}
                  style={
                    selectedCategory === key
                      ? { backgroundColor: info.color }
                      : undefined
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === key
                      ? "text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <info.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{info.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-8 md:py-12">
        <div className="container">
          {sortedTerms.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Keine Begriffe gefunden für "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedTerms.map((term, index) => {
                const category = categoryInfo[term.category];
                return (
                  <motion.div
                    key={term.term}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Category indicator */}
                          <div
                            className="w-full md:w-2 h-2 md:h-auto"
                            style={{ backgroundColor: category.color }}
                          />

                          <div className="p-6 flex-1">
                            {/* Header */}
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                              <div>
                                <h2 className="text-xl font-normal text-foreground">
                                  {term.term}
                                  {term.abbreviation && (
                                    <span className="ml-2 text-base font-normal text-muted-foreground">
                                      ({term.abbreviation})
                                    </span>
                                  )}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                  <category.icon
                                    className="w-4 h-4"
                                    style={{ color: category.color }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {category.label}
                                  </span>
                                </div>
                              </div>

                              {term.relatedPage && (
                                <Link href={term.relatedPage}>
                                  <span className="inline-flex items-center gap-1 text-sm text-slate-mid hover:text-slate-dark transition-colors">
                                    {term.relatedPageTitle}
                                    <ArrowRight className="w-4 h-4" />
                                  </span>
                                </Link>
                              )}
                            </div>

                            {/* Definition */}
                            <p className="text-foreground leading-relaxed mb-4">
                              {term.definition}
                            </p>

                            {/* Example */}
                            {term.example && (
                              <div className="bg-sand rounded-lg p-4 border-l-4 border-sand-border">
                                <div className="flex items-start gap-3">
                                  <Lightbulb className="w-5 h-5 text-sand-warm flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">
                                      Beispiel:{" "}
                                    </span>
                                    {term.example}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Hinweis */}
      <section className="py-8 md:py-12 bg-sand">
        <div className="container">
          <Card className="bg-white border-sand-subtle">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-lighter flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-slate-mid" />
                </div>
                <div>
                  <h2 className="text-lg font-normal text-foreground mb-2">
                    Begriffe im Kontext verstehen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Dieses Glossar bietet vereinfachte Erklärungen für
                    Angehörige. Die Begriffe werden in der Fachliteratur und
                    klinischen Praxis oft differenzierter verwendet. Bei Fragen
                    zur Diagnose oder Behandlung wenden Sie sich bitte an
                    Fachpersonen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
