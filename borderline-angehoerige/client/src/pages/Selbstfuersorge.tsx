import SEO from "@/components/SEO";
import EvidenceNote from "@/components/EvidenceNote";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  AlertTriangle,
  Users,
  Clock,
  Brain,
  Shield,
  ChevronDown,
  ChevronUp,
  UserCircle,
  CalendarDays,
} from "lucide-react";
import { Link } from "wouter";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";
import SelbstfuersorgeCheck from "@/components/interactive/SelbstfuersorgeCheck";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";

// Akkordeon für Übungen (innerhalb der ContentSections)
function UebungAkkordeon({
  title,
  icon: Icon,
  children,
  color,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  color: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
        aria-expanded={isOpen}
        aria-label={`${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <CardContent className="pt-0 pb-5 px-5">{children}</CardContent>
      )}
    </Card>
  );
}

export default function Selbstfuersorge() {
  return (
    <Layout>
      <SEO
        title="Selbstfürsorge"
        description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen."
        path="/selbstfuersorge"
      />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
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
                <Sparkles className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 12 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Selbstfürsorge für Angehörige
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Wer dauerhaft mit Krisen, Unsicherheit und Loyalitätskonflikten
              lebt, braucht eigene Regeneration. Selbstfürsorge ist nicht
              Nebenbei-Pflege, sondern eine fachlich wichtige Grundlage, damit
              Sie handlungsfähig und innerlich beweglich bleiben.
            </p>

            <Card className="bg-slate-50 border-border/40 mb-5">
              <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Diese Seite:</strong> Was
                Sie für sich tun — Erholung, Stabilisierung, innere
                Regeneration.{" "}
                <Link
                  href="/grenzen"
                  className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                >
                  Grenzen setzen →
                </Link>{" "}
                zeigt, wie Sie Klarheit gegenüber anderen kommunizieren und
                einhalten.
              </CardContent>
            </Card>

            <Card className="bg-sage-lighter/20 border-sage-mid">
              <CardContent className="p-5">
                <p className="text-foreground leading-relaxed italic">
                  "Viele Angehörige merken erst spät, wie erschöpft sie geworden
                  sind. Selbstfürsorge beginnt oft nicht mit grossen
                  Veränderungen, sondern damit, die eigene Belastung überhaupt
                  ernst zu nehmen."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* PDF-Hinweis */}
      <div className="container">
        <div className="max-w-3xl mx-auto py-3">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-sage-wash/40 border border-sage-mid/20 px-4 py-2.5">
            <p className="text-xs text-muted-foreground">
              Selbstfürsorge-Checklisten auch als druckbare PDFs verfügbar.
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

      {/* Aufklappbare Abschnitte */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* ═══ 1. Warum Selbstfürsorge wichtig ist ═══ */}
            <ContentSection
              title="Warum Selbstfürsorge so wichtig ist"
              icon={<Heart className="w-6 h-6 text-sage-mid" />}
              id="selbstfuersorge-warum-wichtig"
              defaultOpen={true}
              preview="Angehörige tragen eine besondere Last – durch emotionale Intensität, dauernde Wachsamkeit und Unvorhersehbarkeit. Selbstfürsorge ist keine Selbstsucht, sondern Selbsterhaltung."
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Angehörige von Menschen mit Borderline tragen oft eine
                  besondere Last. Die emotionale Intensität, die
                  Unvorhersehbarkeit und die dauernde innere Wachsamkeit können
                  zu chronischem Stress führen. Nicht jeder entwickelt daraus
                  eine psychische Erkrankung, aber viele geraten über längere
                  Zeit an Grenzen. Studien zeigen ein erhöhtes Risiko für:
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Erschöpfungsdepression",
                    "Angststörungen",
                    "Schlafstörungen",
                    "Körperliche Beschwerden",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-sage-mid" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Selbstfürsorge ist daher keine Selbstsucht, sondern{" "}
                  <strong className="text-foreground">Selbsterhaltung</strong>.
                  Sie erhöht die Chance, dass Sie auf Dauer präsent bleiben
                  können, statt sich Schritt für Schritt zu erschöpfen.
                </p>
              </div>
            </ContentSection>

            {/* ═══ 2. Warnsignale für Überlastung ═══ */}
            <ContentSection
              title="Warnsignale für Überlastung"
              icon={<AlertTriangle className="w-6 h-6 text-sage-mid" />}
              id="warnsignale"
              preview="Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend
                mehr Selbstfürsorge brauchen:
              </p>

              <div className="grid sm:grid-cols-3 gap-4 [&>*:first-child]:sm:col-span-2">
                <Card className="border-t-4 border-t-sand-mid bg-sand">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-sand-mid flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Emotional
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Gereiztheit",
                        "Hoffnungslosigkeit",
                        "Emotionale Taubheit",
                        "Schuldgefühle",
                        "Kontrollverlust-Angst",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-sand-mid flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-sage-mid flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        Körperlich
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Erschöpfung",
                        "Schlafprobleme",
                        "Appetitveränderung",
                        "Kopfschmerzen",
                        "Infektanfälligkeit",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-sage-mid flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-mid flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">Sozial</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Rückzug",
                        "Hobbys vernachlässigt",
                        "Isolationsgefühl",
                        "Vermeidung",
                        "Nur noch Angehöriger",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-slate-mid flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-sage-mid/10 border-sage-mid">
                <CardContent className="p-5">
                  <p className="text-foreground font-medium mb-2">
                    Wenn Sie mehrere dieser Warnsignale bei sich bemerken, kann
                    es sinnvoll sein zu handeln. Sprechen Sie mit Ihrem Hausarzt
                    oder suchen Sie professionelle Unterstützung.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Merken Sie ausserdem, dass Sie Andere nicht mehr klar auf
                    Distanz halten können?{" "}
                    <Link
                      href="/grenzen"
                      className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                    >
                      Grenzen setzen →
                    </Link>{" "}
                    zeigt, wie Sie das konkret kommunizieren.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ Selbstfürsorge-Kurzcheck ═══ */}
            <div className="my-6">
              <SelbstfuersorgeCheck />
            </div>

            {/* ═══ 3. Sofort-Übungen ═══ */}
            <ContentSection
              title="Sofort-Übungen für akute Belastung"
              icon={<Clock className="w-6 h-6 text-sage-mid" />}
              id="sofort-uebungen"
              preview="Atemübung, 5-4-3-2-1 Grounding und STOPP-Technik – jederzeit anwendbar."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Diese Übungen können Sie jederzeit anwenden, wenn Sie merken,
                dass der Stress überhand nimmt:
              </p>

              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3">
                    STOPP-Technik
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Wenn Sie merken, dass Sie in einen Strudel aus Sorgen oder
                    Ärger geraten:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { letter: "S", text: "Stopp – Innehalten" },
                      { letter: "T", text: "Tief durchatmen" },
                      {
                        letter: "O",
                        text: "Orientieren – Was passiert gerade?",
                      },
                      {
                        letter: "P",
                        text: "Planen – Was ist jetzt hilfreich?",
                      },
                      { letter: "P", text: "Praktizieren – Einen Schritt tun" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-sage-dark/20 flex items-center justify-center font-bold text-sage-mid">
                          {item.letter}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground mt-4">
                Eigene Beruhigungsstrategien festhalten?{" "}
                <Link
                  href="/notfallkarte"
                  className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                >
                  Notfallkarte erstellen →
                </Link>
              </p>
            </ContentSection>

            {/* ═══ 4. Langfristige Strategien ═══ */}
            <ContentSection
              title="Langfristige Selbstfürsorge-Strategien"
              icon={<Heart className="w-6 h-6 text-sage-dark" />}
              id="langfristige-strategien"
              preview="Tägliche Mini-Auszeiten, Bewegung, soziale Kontakte und professionelle Unterstützung."
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neben den Sofort-Übungen brauchen Sie auch langfristige
                Strategien, um Ihre Gesundheit zu erhalten:
              </p>

              {/* 4-Quadranten-Modell */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="rounded-lg bg-sage-lighter/50 border border-sage-mid/20 p-4 text-center">
                  <Heart className="w-5 h-5 text-sage-dark mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-foreground">
                    Körper
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Bewegung, Schlaf, Ernährung
                  </p>
                </div>
                <div className="rounded-lg bg-sand-muted border border-sand-mid/20 p-4 text-center">
                  <Brain className="w-5 h-5 text-sand-mid mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-foreground">Geist</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Reflexion, Grenzen, Akzeptanz
                  </p>
                </div>
                <div className="rounded-lg bg-slate-wash border border-border/30 p-4 text-center">
                  <Users className="w-5 h-5 text-slate-dark mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-foreground">
                    Beziehungen
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Freunde, Familie, Beratung
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-100 p-4 text-center">
                  <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-foreground">
                    Struktur
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Routinen, Auszeiten, Planung
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <UebungAkkordeon
                  title="Tägliche Mini-Auszeiten"
                  icon={Clock}
                  color="bg-sage-mid"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Versuchen Sie, im Alltag regelmässig kurze Zeiten nur für
                      sich zu reservieren. An manchen Tagen sind 15 bis 30
                      Minuten realistisch, an anderen vielleicht nur 5.
                      Entscheidend ist die Verlässlichkeit, nicht Perfektion.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Morgens: 10 Min. Kaffee in Ruhe",
                        "Mittags: Kurzer Spaziergang",
                        "Abends: Entspannungsübung",
                        "Vor dem Schlaf: Lesen oder Musik",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-mid" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Card className="bg-sage-wash/50 border-transparent">
                      <CardContent className="p-4">
                        <p className="text-sm text-foreground">
                          <strong>Tipp:</strong> Tragen Sie diese Zeiten in
                          Ihren Kalender ein wie einen wichtigen Termin.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </UebungAkkordeon>

                <UebungAkkordeon
                  title="Bewegung und Körper"
                  icon={Heart}
                  color="bg-sage-dark"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Körperliche Aktivität baut Stresshormone ab und setzt
                      Endorphine frei. Schon 20 Minuten machen einen
                      Unterschied.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Spaziergang in der Natur",
                        "Yoga oder Stretching",
                        "Schwimmen",
                        "Tanzen (auch alleine zuhause)",
                        "Gartenarbeit",
                        "Radfahren",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-dark" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Card className="bg-sage-wash/50 border-transparent">
                      <CardContent className="p-4">
                        <p className="text-sm text-foreground">
                          <strong>Evidenz:</strong> Studien zeigen, dass
                          regelmässige Bewegung bei der Prävention und
                          Behandlung von Depressionen ähnlich wirksam sein kann
                          wie Antidepressiva.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </UebungAkkordeon>

                <UebungAkkordeon
                  title="Soziale Kontakte pflegen"
                  icon={Users}
                  color="bg-slate-dark"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Isolation ist einer der grössten Risikofaktoren für
                      Angehörige. Halten Sie aktiv Kontakt zu Menschen
                      ausserhalb der Betreuungssituation.
                    </p>
                    <div className="space-y-2">
                      {[
                        "Verabreden Sie sich regelmässig mit Freunden",
                        "Pflegen Sie mindestens eine Freundschaft, in der Borderline kein Thema ist",
                        "Treten Sie einer Gruppe bei (Sport, Hobby, Chor)",
                        "Nutzen Sie Selbsthilfegruppen für Angehörige",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-slate-dark mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </UebungAkkordeon>

                <UebungAkkordeon
                  title="Professionelle Unterstützung"
                  icon={Shield}
                  color="bg-sage-mid"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Auch Sie dürfen sich Hilfe holen – das ist kein Zeichen
                      von Schwäche, sondern von Stärke und Selbstfürsorge.
                    </p>
                    <div className="space-y-3">
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">
                            Eigene Therapie
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Eine eigene Psychotherapie kann Ihnen helfen, mit
                            der Belastung umzugehen und eigene Muster zu
                            erkennen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">
                            Angehörigenberatung
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Spezialisierte Beratungsstellen bieten Unterstützung
                            speziell für Angehörige von Menschen mit psychischen
                            Erkrankungen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">
                            Selbsthilfegruppen
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Der Austausch mit anderen Angehörigen kann enorm
                            entlastend sein. Sie sind nicht allein.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </UebungAkkordeon>
              </div>
            </ContentSection>

            {/* ═══ 5. Beratung & Netzwerke (Kurzhinweis) ═══ */}
            <ContentSection
              title="Beratung & Netzwerke"
              icon={<Users className="w-6 h-6 text-slate-blue" />}
              id="beratung-netzwerke"
              preview="Sie müssen das nicht allein tragen – professionelle Beratung und Austausch mit anderen Angehörigen helfen."
            >
              <Card className="bg-slate-light/20 border-slate-blue">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Austausch mit anderen Angehörigen kann enorm entlastend
                    sein. Professionelle Beratungsstellen und Selbsthilfegruppen
                    bieten Orientierung, praktische Tipps und das Gefühl, nicht
                    allein zu sein.
                  </p>
                  <Link href="/beratung">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-blue hover:text-slate-dark transition-colors cursor-pointer">
                      Alle Beratungsangebote & Netzwerke ansehen
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 6. Radikale Akzeptanz ═══ */}
            <ContentSection
              title="Radikale Akzeptanz"
              icon={<Sparkles className="w-6 h-6 text-sage-mid" />}
              id="radikale-akzeptanz"
              preview="«Es ist, wie es ist.» – Dieses DBT-Konzept kann auch für Angehörige befreiend sein."
            >
              <Card className="bg-sage-wash/50 border-sage-mid/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg italic text-center">
                    «Es ist, wie es ist.»
                  </p>
                  <p className="text-muted-foreground text-sm text-center mt-2">
                    – Dieser Satz kann befreiend sein.
                  </p>
                </CardContent>
              </Card>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Radikale Akzeptanz bedeutet nicht, dass Sie die Situation
                gutheissen. Es bedeutet, dass Sie aufhören, gegen die Realität
                zu kämpfen. Dieses Konzept aus der{" "}
                <Link
                  to="/glossar?q=DBT"
                  className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors"
                >
                  DBT (Dialektisch-Behaviorale Therapie)
                </Link>{" "}
                kann auch für Angehörige sehr hilfreich sein.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ❌ Was radikale Akzeptanz NICHT ist:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Aufgeben</li>
                    <li>• Gutheissen</li>
                    <li>• Passivität</li>
                    <li>• Resignation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ✓ Was radikale Akzeptanz IST:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Anerkennen, was Sie nicht ändern können</li>
                    <li>
                      • Energie sparen für das, was Sie beeinflussen können
                    </li>
                    <li>• Inneren Frieden finden trotz äusserer Turbulenzen</li>
                    <li>• Loslassen von «Es sollte anders sein»</li>
                  </ul>
                </div>
              </div>

              <Card className="border-l-4 border-l-sage-mid">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">
                    Übung: Radikale Akzeptanz praktizieren
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>
                      <strong>1.</strong> Benennen Sie die Situation: «Es ist
                      so, dass...»
                    </li>
                    <li>
                      <strong>2.</strong> Spüren Sie den Widerstand: «Ich
                      wünschte, es wäre anders.»
                    </li>
                    <li>
                      <strong>3.</strong> Lassen Sie los: «Ich kann diese
                      Realität nicht ändern.»
                    </li>
                    <li>
                      <strong>4.</strong> Richten Sie den Fokus neu: «Was kann
                      ich jetzt tun?»
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
              </p>
            </ContentSection>

            {/* ═══ 7. Erlaubnis geben ═══ */}
            <ContentSection
              title="Geben Sie sich die Erlaubnis"
              icon={<CheckCircle2 className="w-6 h-6 text-sage-dark" />}
              id="erlaubnis"
              preview="Als Angehöriger dürfen Sie auch mal wütend sein, Nein sagen und Ihre eigenen Bedürfnisse ernst nehmen."
            >
              <Card className="bg-sage-light/20 border-sage">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Als Angehöriger dürfen Sie:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Auch mal wütend, frustriert oder traurig sein",
                      "Nicht immer die Lösung haben",
                      "Ihre eigenen Bedürfnisse ernst nehmen",
                      "Nein sagen, ohne sich schuldig zu fühlen",
                      "Freude empfinden, auch wenn es Ihrem Angehörigen schlecht geht",
                      "Professionelle Hilfe für sich selbst suchen",
                      "Pausen machen und auftanken",
                      "Grenzen setzen, die Ihre Gesundheit schützen",
                      "Manchmal nicht wissen, was richtig ist",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage-dark mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 8. Materialien zum Download ═══ */}
            <SelbstfuersorgeInfografikenSection />

            {/* ═══ 9. Hinweise für Ihre Situation ═══ */}
            <ContentSection
              title="Hinweise für Ihre Situation"
              icon={<UserCircle className="w-6 h-6 text-slate-mid" />}
              id="ihre-situation"
              preview="Spezifische Hinweise für Partner/innen, Elternteile und erwachsene Kinder."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Als Partner/in
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ihre Beziehung ist nicht Ihre einzige Identität.
                          Pflegen Sie Freundschaften und Hobbys ausserhalb der
                          Partnerschaft. Es ist kein Verrat, Zeit für sich zu
                          beanspruchen – es ist Überlebensstrategie.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-lighter flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-slate-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Als Elternteil
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Elterliche Schuldgefühle sind normal, aber oft
                          unbegründet. Borderline hat komplexe Ursachen – Sie
                          haben nicht «versagt». Erlauben Sie sich, auch stolz
                          auf das zu sein, was Sie richtig gemacht haben. Und:
                          Sie dürfen auch mal wütend sein.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                        <UserCircle className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Als erwachsenes Kind
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sie mussten früh erwachsen werden und Verantwortung
                          übernehmen, die nicht Ihre war. Selbstfürsorge kann
                          sich fremd anfühlen – üben Sie sie trotzdem. Sie haben
                          ein Recht auf ein eigenes Leben.{" "}
                          <Link
                            href="/grenzen"
                            className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                          >
                            Wie Sie das nach aussen kommunizieren →
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Evidenz-Layer (bleibt ausserhalb der Akkordeons) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <EvidenceNote
                title="Worauf stützt sich das?"
                sources={[
                  {
                    label: "Hoffman et al. (2005) – Caregiver burden in BPD",
                    href: "https://pubmed.ncbi.nlm.nih.gov/16138007/",
                  },
                  {
                    label:
                      "Zaccaro et al. (2018) – Slow breathing techniques, autonomic activity and psychophysiology",
                    href: "https://pubmed.ncbi.nlm.nih.gov/30275827/",
                  },
                  {
                    label:
                      "Maslach & Leiter (2016) – Burnout, soziale Unterstützung als Schutzfaktor",
                  },
                ]}
              />
            </motion.div>

            {/* Abschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-light/30 border-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-sage-mid mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie sind wichtig. Ihre Gesundheit und Ihr Wohlbefinden sind
                    wichtig. Indem Sie gut für sich sorgen, sorgen Sie auch
                    besser für andere. Selbstfürsorge ist keine Selbstsucht –
                    sie ist die Grundlage dafür, langfristig für Ihren
                    Angehörigen da sein zu können.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-sage-mid/30 bg-sage-wash/30 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-sage-dark" />
                <h3 className="font-semibold text-foreground">
                  Diese Woche konkret
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Selbstfürsorge braucht konkrete Zeiten — sonst bleibt sie ein
                Vorsatz. Wählen Sie aus jeder Gruppe mindestens eine Sache für
                diese Woche.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    frequenz: "Täglich (10–20 Min)",
                    farbe: "border-sage-mid/40 bg-sage-light/20",
                    items: [
                      "Spaziergang allein, ohne Podcast",
                      "5 Min bewusst atmen oder dehnen",
                      "Kurz notieren: was war heute gut?",
                      "Handy weglegen vor dem Schlafen",
                    ],
                  },
                  {
                    frequenz: "Wöchentlich (1–2×)",
                    farbe: "border-amber/30 bg-amber/5",
                    items: [
                      "Jemanden anrufen, der Sie kennt",
                      "Etwas tun, das Ihnen früher Freude machte",
                      "Eine Stunde ohne Erreichbarkeit",
                      "Körperliche Bewegung (Sport, Yoga, …)",
                    ],
                  },
                  {
                    frequenz: "Monatlich (1×)",
                    farbe: "border-slate-blue/20 bg-slate-wash/20",
                    items: [
                      "Bilanz: Wie geht es mir wirklich?",
                      "Fachperson konsultieren (Hausarzt, Beratung)",
                      "Freundschaft oder Familie pflegen",
                      "Etwas planen, auf das Sie sich freuen",
                    ],
                  },
                ].map(gruppe => (
                  <div
                    key={gruppe.frequenz}
                    className={`rounded-xl border p-4 ${gruppe.farbe}`}
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {gruppe.frequenz}
                    </p>
                    <ul className="space-y-2">
                      {gruppe.items.map(item => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-dark shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 border-t border-border/40 pt-4">
                Tipp: Tragen Sie eine Sache davon heute noch in Ihren Kalender
                ein — mit konkreter Uhrzeit. Vorsätze ohne Termin bleiben
                Vorsätze.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/grenzen">
                <Button variant="ghost">← Grenzen setzen</Button>
              </Link>
              <Link href="/materialien">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Alle Materialien
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
