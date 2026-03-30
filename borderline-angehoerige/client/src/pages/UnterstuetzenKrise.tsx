import SEO from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Phone,
  Shield,
  Download,
  MessageCircle,
  XCircle,
  RefreshCw,
  Heart,
  CheckCircle2,
  Users,
  Lightbulb,
  CalendarDays,
} from "lucide-react";
import { Link } from "wouter";
import { kontaktByIdStrict } from "@/data/kontakte";

const rot144 = kontaktByIdStrict("ROT_144");
const gruen143 = kontaktByIdStrict("GRUEN_143");

export default function UnterstuetzenKrise() {
  return (
    <Layout>
      <SEO
        title="Krisenbegleitung"
        description="Wie Sie in akuten Krisen richtig reagieren und Hilfe leisten können."
        path="/unterstuetzen/krise"
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
            <Link
              href="/unterstuetzen/uebersicht"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1"
            >
              ← Zurück zur Übersicht
            </Link>

            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-sand-muteder flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 6 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              In der Krise unterstützen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Viele Angehörige erleben Phasen starker Anspannung, Eskalation
              oder Rückzug. Hier erfahren Sie, wie Sie Krisen besser einordnen,
              deeskalierend reagieren und Sicherheit im Blick behalten können,
              ohne Ihre eigene Grenze aus dem Blick zu verlieren.
            </p>

            <div className="p-4 rounded-xl bg-sand border border-sand-subtle">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Unterschied Krise vs. Notfall:
                </strong>{" "}
                Diese Seite ist für{" "}
                <strong>emotionale Krisen und Eskalationen</strong> (starke
                Emotionen, Konflikte, Rückzug). Bei{" "}
                <strong>akuter Gefahr</strong> (Suizidgefahr, Selbstverletzung)
                gehen Sie direkt zu{" "}
                <Link
                  href="/soforthilfe"
                  className="text-alert hover:underline font-medium"
                >
                  Soforthilfe & Notfallnummern →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <UnterstuetzenSubNav />

      {/* Emergency Banner */}
      <section className="py-4 bg-alert">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white text-center sm:text-left">
              <strong>Bei akuter Suizidgefahr:</strong> Rufen Sie sofort den
              Notruf{" "}
              <a href={`tel:${rot144.tel}`} className="underline font-bold">
                {rot144.nummer}
              </a>
              . Zur Entlastung danach:{" "}
              <a href={`tel:${gruen143.tel}`} className="underline">
                {gruen143.label} ({gruen143.nummer})
              </a>
            </p>
            <Link href="/soforthilfe">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-alert"
              >
                <Phone className="w-4 h-4 mr-2" />
                Alle Notfallnummern
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mb-6">
              Diese Inhalte ersetzen keine professionelle Krisenberatung. Bei
              akuter Gefahr direkt{" "}
              <strong className="text-foreground">144 / 117</strong> anrufen.
            </p>
            {/* Ampel-System */}
            <ContentSection
              title="Das Ampel-System: Krisen erkennen"
              icon={<AlertTriangle className="w-7 h-7 text-sage-mid" />}
              id="ampel-system"
              defaultOpen={true}
              preview="Nicht jede schwierige Situation ist eine Krise. Das Ampel-System hilft Ihnen, die Intensität einzuschätzen."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nicht jede schwierige Situation ist eine Krise. Das Ampel-System
                hilft Ihnen, die Intensität einzuschätzen und angemessen zu
                reagieren.
              </p>

              <div className="space-y-4">
                {[
                  {
                    level: "Grün – Stabil",
                    description:
                      "Alltägliche Stimmungsschwankungen, normale Belastungen",
                    action: "Präsent sein, zuhören, Routinen beibehalten",
                    color: "var(--color-sage-mid)",
                    bgColor: "var(--color-sage-lighter)",
                  },
                  {
                    level: "Gelb – Angespannt",
                    description:
                      "Erhöhte Reizbarkeit, Rückzug, erkennbare Trigger",
                    action: "Validieren, Skills anbieten, Raum geben",
                    color: "var(--color-sand-mid)",
                    bgColor: "var(--color-sand-muted)",
                  },
                  {
                    level: "Orange – Eskalierend",
                    description:
                      "Starke Emotionen, verbale Aggression, Kontrollverlust",
                    action: "Deeskalieren, Sicherheit prüfen, Grenzen setzen",
                    color: "var(--color-sage-mid)",
                    bgColor: "var(--color-sage-wash)",
                  },
                  {
                    level: "Rot – Akute Krise",
                    description:
                      "Suizidgedanken, Selbstverletzung, akute Gefahr",
                    action: "Professionelle Hilfe holen, Notruf wenn nötig",
                    color: "var(--color-alert)",
                    bgColor: "var(--color-sage-wash)",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    style={{
                      borderColor: item.color,
                      backgroundColor: item.bgColor,
                    }}
                    className="border-l-4"
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.level}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.description}
                      </p>
                      <p className="text-sm">
                        <strong className="text-foreground">
                          Ihre Reaktion:
                        </strong>{" "}
                        <span className="text-muted-foreground">
                          {item.action}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* De-Eskalations-Pfad */}
              <div className="mt-4 rounded-lg bg-slate-wash/20 p-4 border border-border/30">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Was konkret hilft – je nach Stufe
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 rounded-md bg-alert/10 p-3">
                    <span className="text-xs font-bold min-w-[52px] text-alert pt-0.5">
                      Rot
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Professionelle Hilfe holen",
                        "Eigene Sicherheit sichern",
                        "Nicht allein lassen",
                      ].map(s => (
                        <span
                          key={s}
                          className="text-xs bg-background/70 rounded px-2 py-0.5 text-foreground border border-border/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-md bg-sand-muted p-3">
                    <span className="text-xs font-bold min-w-[52px] text-sand-mid pt-0.5">
                      Orange
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Nicht diskutieren",
                        "Körperabstand anbieten",
                        "Kurze, ruhige Sätze",
                      ].map(s => (
                        <span
                          key={s}
                          className="text-xs bg-background/70 rounded px-2 py-0.5 text-foreground border border-border/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-md bg-sage-lighter/50 p-3">
                    <span className="text-xs font-bold min-w-[52px] text-sage-dark pt-0.5">
                      Gelb
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Validieren",
                        "Raum geben",
                        "Skills gemeinsam erinnern",
                      ].map(s => (
                        <span
                          key={s}
                          className="text-xs bg-background/70 rounded px-2 py-0.5 text-foreground border border-border/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            {/* 4 Schritte der Deeskalation */}
            <ContentSection
              title="4 Schritte der Deeskalation"
              icon={<Shield className="w-7 h-7 text-sage-mid" />}
              id="deeskalation"
              preview="Sicherheit prüfen, Ruhe bewahren, Validieren, Skills anbieten – ein bewährtes Vorgehen."
            >
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Sicherheit prüfen",
                    description:
                      "Sind Sie und Ihr Angehöriger sicher? Gibt es gefährliche Gegenstände in der Nähe?",
                    example:
                      "Entfernen Sie unauffällig scharfe Gegenstände oder Medikamente.",
                  },
                  {
                    step: 2,
                    title: "Ruhe bewahren",
                    description:
                      "Ihre Ruhe kann ansteckend sein. Atmen Sie tief, sprechen Sie langsam und leise.",
                    example: '"Ich bin hier. Wir schaffen das zusammen."',
                  },
                  {
                    step: 3,
                    title: "Validieren",
                    description:
                      "Anerkennen Sie die Gefühle, ohne sie zu bewerten oder zu lösen.",
                    example:
                      '"Ich sehe, dass du gerade sehr viel Schmerz fühlst. Das muss furchtbar sein."',
                  },
                  {
                    step: 4,
                    title: "Skills anbieten",
                    description:
                      "Erinnern Sie sanft an Strategien, die in der Vergangenheit geholfen haben.",
                    example:
                      '"Möchtest du die Atemübung ausprobieren, die dir letztens geholfen hat?"',
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-sage-mid text-white flex items-center justify-center font-semibold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">
                              {item.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            {/* Was Sie in der Krise sagen können */}
            <ContentSection
              title="Was Sie in der Krise sagen können"
              icon={<MessageCircle className="w-7 h-7 text-sage" />}
              id="krise-formulierungen"
              preview="In einer Krise zählt jedes Wort. Diese Formulierungen haben sich bewährt."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                In einer Krise zählt jedes Wort. Diese Formulierungen haben sich
                bewährt:
              </p>

              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Präsenz zeigen
                    </h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        "Ich bin hier. Ich gehe nicht weg. Du bist nicht
                        allein."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Wenn Nähe die Situation verschärft, kann auch eine ruhig
                        angekündigte Distanz hilfreich sein: «Ich bleibe in der
                        Nähe und komme in ein paar Minuten wieder.»
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Gefühle validieren
                    </h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        "Ich sehe, dass du gerade unglaublich viel Schmerz
                        fühlst. Das muss sich furchtbar anfühlen."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Hoffnung vermitteln
                    </h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        "Dieses Gefühl wird vorbeigehen. Es fühlt sich jetzt
                        endlos an, aber es wird sich verändern."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Konkrete Hilfe anbieten
                    </h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        "Was brauchst du gerade am meisten? Soll ich einfach
                        hier sitzen? Oder sollen wir zusammen atmen?"
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Bei Suizidgedanken direkt ansprechen
                    </h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        "Ich mache mir Sorgen um dich. Hast du gerade Gedanken,
                        dir etwas anzutun?"
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Hinweis: Direktes Fragen erhöht das Risiko nicht, sondern
                      zeigt, dass Sie die Situation ernst nehmen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Was Sie NICHT tun sollten */}
            <ContentSection
              title="Was Sie in der Krise vermeiden sollten"
              icon={<XCircle className="w-7 h-7 text-alert" />}
              id="vermeiden"
              preview="Drohen, Vorwürfe machen oder Gefühle herunterspielen – diese Reaktionen können die Krise verschärfen."
            >
              <Card className="border-l-4 border-l-alert bg-sage-wash">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      "Drohen oder Ultimaten stellen",
                      "Vorwürfe machen oder Schuld zuweisen",
                      'Die Gefühle herunterspielen ("So schlimm ist es doch nicht")',
                      "Logisch argumentieren oder überzeugen wollen",
                      "Die Person alleine lassen, wenn Suizidgefahr besteht",
                      "Sich selbst in Gefahr bringen",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-alert">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Nach der Krise */}
            <ContentSection
              title="Nach der Krise: Verarbeitung und Neubeginn"
              icon={<RefreshCw className="w-7 h-7 text-sage" />}
              id="nach-der-krise"
              preview="Die akute Krise ist vorbei – aber die innere Landschaft braucht Zeit. Was jetzt hilft: für die betroffene Person, für Sie, und gemeinsam."
            >
              <div className="space-y-6">
                {/* Krisenphase-Timeline */}
                <div className="rounded-lg border border-border/40 bg-slate-wash/20 p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 text-center">
                    Typischer Krisenverlauf
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5">
                    <div className="bg-sand-muted rounded-md px-3 py-2 text-center flex-1 w-full">
                      <p className="text-xs font-semibold text-sand-mid">
                        Anspannung
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Minuten–Stunden
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground rotate-90 sm:rotate-0 flex-shrink-0" />
                    <div className="bg-amber-100 rounded-md px-3 py-2 text-center flex-1 w-full">
                      <p className="text-xs font-semibold text-amber-700">
                        Eskalation
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        15–90 Min
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground rotate-90 sm:rotate-0 flex-shrink-0" />
                    <div className="bg-alert/15 rounded-md px-3 py-2 text-center flex-1 w-full">
                      <p className="text-xs font-semibold text-alert">Peak</p>
                      <p className="text-[10px] text-muted-foreground">
                        Spitze
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground rotate-90 sm:rotate-0 flex-shrink-0" />
                    <div className="bg-amber-50 rounded-md px-3 py-2 text-center flex-1 w-full">
                      <p className="text-xs font-semibold text-amber-600">
                        Abklingen
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        1–4 Std
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground rotate-90 sm:rotate-0 flex-shrink-0" />
                    <div className="bg-sage-lighter/60 rounded-md px-3 py-2 text-center flex-1 w-full">
                      <p className="text-xs font-semibold text-sage-dark">
                        Erschöpfung
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Stunden–Tage
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 text-center">
                    Zeitangaben sind Richtwerte — jede Krise verläuft anders
                  </p>
                </div>

                {/* Für die betroffene Person */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sage-mid" />
                    Für die betroffene Person
                  </h3>
                  <Card className="border-border/50">
                    <CardContent className="p-5 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nach einer schweren Krise folgt oft eine Phase massiver{" "}
                        <strong className="text-foreground">
                          Scham und Reue
                        </strong>
                        . Manche ziehen sich zurück, andere entschuldigen sich
                        übermässig. Beides braucht eine ruhige, nicht-wertende
                        Antwort – weder Verharmlosen noch Aufbauschen.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Scham anerkennen, ohne sie zu bestätigen: «Ich sehe, dass es dir schlecht damit geht. Mir auch. Lass uns das besprechen, wenn du dich bereit fühlst.»",
                          "Nicht sofort eine Aufarbeitung fordern – Wartezeit einplanen (1–2 Tage)",
                          "Therapeutin informieren, damit die Krise dort aufgearbeitet werden kann",
                          "Krisenursachen gemeinsam benennen: Was war der Auslöser? Was hätte früher geholfen?",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-sage-mid mt-0.5">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Für Sie als Angehörige/r */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-sage-mid" />
                    Für Sie als Angehörige/r
                  </h3>
                  <Card className="border-l-4 border-l-sage-mid bg-sage-wash/30">
                    <CardContent className="p-5 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Schwere Krisen hinterlassen auch bei Angehörigen Spuren.
                        Hypervigilanz, Schreckhaftigkeit, Angst vor der nächsten
                        Eskalation oder Taubheit sind normale Reaktionen – kein
                        Zeichen von Schwäche.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Eigene Erschütterung ernst nehmen – Sie dürfen erschöpft, wütend oder traurig sein",
                          "Gespräch suchen: Fachstelle, Selbsthilfegruppe oder eigene Therapie",
                          "Hypervigilanz beobachten: Dauernde Alarmbereitschaft erschöpft – versuchen Sie, bewusst zu regulieren",
                          "Keine Aufarbeitung leisten, solange Sie selbst noch in Aufruhr sind",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-sage-mid mt-0.5">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Gemeinsame Krisenanalyse */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-sage-mid" />
                    Gemeinsame Krisenanalyse (wenn beide bereit sind)
                  </h3>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        Nicht direkt nach der Krise – aber in den nächsten
                        Tagen, in einem ruhigen Moment, kann ein kurzes Gespräch
                        helfen. Nicht als Vorwurf, sondern als gemeinsames
                        Lernen.
                      </p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {[
                          {
                            frage: "Was hat die Krise ausgelöst?",
                            beispiel:
                              "«Dir ist aufgefallen, dass ich distanzierter war ab Montag»",
                          },
                          {
                            frage: "Was hätte früher geholfen?",
                            beispiel:
                              "«Ein kurzes Gespräch, bevor es eskalierte»",
                          },
                          {
                            frage: "Was machen wir nächstes Mal anders?",
                            beispiel:
                              "«Du sagst mir, wenn du merkst, dass es kommt»",
                          },
                        ].map(item => (
                          <div
                            key={item.frage}
                            className="p-3 rounded-lg bg-muted/30 border border-border/40"
                          >
                            <p className="text-xs font-semibold text-foreground mb-1">
                              {item.frage}
                            </p>
                            <p className="text-xs text-muted-foreground italic">
                              {item.beispiel}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vertrauenswiederaufbau */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-mid" />
                    Vertrauenswiederaufbau – realistisch
                  </h3>
                  <Card className="bg-sage-light/20 border-sage">
                    <CardContent className="p-5 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Vertrauen baut sich nicht durch ein Gespräch wieder auf
                        – sondern durch{" "}
                        <strong className="text-foreground">
                          viele kleine Momente der Verlässlichkeit
                        </strong>{" "}
                        über Zeit. Erwarten Sie keine sofortige Rückkehr zur
                        Normalität.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Kleine Zusagen, kleine Erfüllungen – nicht grosse Versprechen",
                          "Transparenz über eigene Gefühle: «Mir ist noch beklemmend zumute. Ich bin trotzdem hier.»",
                          "Keine impliziten Kontoschuld-Bilanzen führen («Du hast mir das angetan»)",
                          "Realistischer Zeitrahmen: 2–4 Wochen bis spürbar mehr Stabilität",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-sage-mid mt-0.5">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Tag-für-Tag: Erste Woche nach der Krise */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-sage-mid" />
                    Erste Woche nach der Krise – Tag für Tag
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        tage: "Tag 1–2",
                        titel: "Ruhe und Sicherheit",
                        farbe: "bg-sage-wash/40 border-sage/40",
                        punkte: [
                          "Keine Aufarbeitung, keine Erklärungen, kein Warum",
                          "Sagen Sie: «Ich bin froh, dass du da bist. Wir müssen jetzt nichts besprechen.»",
                          "Grundbedürfnisse sichern: Schlafen, Essen, körperliche Anwesenheit",
                        ],
                      },
                      {
                        tage: "Tag 3–4",
                        titel: "Kurze Check-ins",
                        farbe: "bg-cream border-border/40",
                        punkte: [
                          "Kurzes, konkretes Nachfragen erlaubt: «Wie geht es dir gerade – in diesem Moment?»",
                          "Keine Bewertungen, keine Rückblicke auf die Krise",
                          "Therapeut oder Krisentelefon kontaktieren, falls nötig",
                        ],
                      },
                      {
                        tage: "Tag 5–7",
                        titel: "Aufarbeitung vorbereiten",
                        farbe: "bg-muted/30 border-border/40",
                        punkte: [
                          "Erst wenn beide bereit sind: Was hat geholfen? Was hat die Krise ausgelöst?",
                          "Kein Vorwurf, kein Schuldaufbau – gemeinsames Lernen",
                          "Nächsten Termin beim Therapeuten koordinieren",
                        ],
                      },
                    ].map(phase => (
                      <Card
                        key={phase.tage}
                        className={`border ${phase.farbe}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-sage-dark bg-sage-wash px-2 py-0.5 rounded-full">
                              {phase.tage}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {phase.titel}
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {phase.punkte.map((p, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-sage-mid mt-0.5">→</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Früherkennung für nächste Krise */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-sage-mid" />
                    Früherkennung trainieren
                  </h3>
                  <Card className="border-border/50">
                    <CardContent className="p-5 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Jede überstandene Krise ist eine Lernchance für die
                        nächste. Nicht um sie zu erzwingen, sondern um früher zu
                        erkennen, wann Unterstützung nötig ist.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          {
                            label: "Persönliche Warnsignale benennen",
                            sub: "Was hat die betroffene Person beobachtet? Was haben Sie bemerkt?",
                          },
                          {
                            label: "Miniplan vereinbaren",
                            sub: "«Wenn du merkst, dass es kommt, sagst du mir das Stichwort X»",
                          },
                          {
                            label: "Notfallkarte aktualisieren",
                            sub: "Neue Erkenntnisse eintragen, Kontakte überprüfen",
                          },
                          {
                            label: "Professionelle Unterstützung intensivieren",
                            sub: "Falls Krisen häufiger werden: Therapiedichte erhöhen",
                          },
                        ].map(item => (
                          <div
                            key={item.label}
                            className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border/40"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {item.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.sub}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Warnsignale für Stagnation */}
                <Card className="border-l-4 border-l-amber-400 bg-amber-50/40">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Warnsignale: wenn die Nachphase nicht besser wird
                    </h3>
                    <ul className="space-y-1.5">
                      {[
                        "Die betroffene Person zieht sich weiter zurück oder eskaliert erneut",
                        "Sie selbst werden zynisch, gleichgültig oder dauerhaft hypervigilant",
                        "Keine Änderung der Muster, die zur Krise geführt haben",
                        "Krisen häufen sich ohne erkennbaren Fortschritt",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-amber-500 mt-0.5">!</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-amber-200">
                      <strong className="text-foreground">Dann:</strong>{" "}
                      Professionelle Unterstützung intensivieren – für die
                      betroffene Person, für Sie, oder für beide gemeinsam.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Situations-Wegweiser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="bg-sage-wash/40 border-sage">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-sage-mid" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Situations-Wegweiser: «Was tun wenn…»
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        In der akuten Situation ist klares Denken schwer. Unser
                        interaktiver Wegweiser führt Sie Schritt für Schritt
                        durch verschiedene Krisenszenarien.
                      </p>
                      <Link href="/wegweiser">
                        <Button
                          size="sm"
                          className="bg-sage-dark hover:bg-sage-mid text-white"
                        >
                          Zum Wegweiser
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-sage-mid" />
                Materialien zum Thema
              </h2>

              <Card className="bg-sand-muted border-sand-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 text-sage-mid" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Alle Materialien als PDF verfügbar
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Infografiken und Handouts zum Thema Krisenbegleitung
                        finden Sie auf der Materialien-Seite.
                      </p>
                      <Link href="/materialien">
                        <Button variant="outline" size="sm">
                          Zur Materialien-Seite
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/therapie">
                <Button variant="ghost">← Therapie begleiten</Button>
              </Link>
              <Link href="/kommunizieren">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Kommunizieren
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
