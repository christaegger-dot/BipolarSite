import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import ValidierungsStufenleiter from "@/components/interactive/ValidierungsStufenleiter";

import { kommItems } from "@/content/kommunizieren";

export default function Kommunizieren() {
  return (
    <Layout>
      <SEO
        title="Kommunizieren"
        description="Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen."
        path="/kommunizieren"
      />
      <TableOfContents />

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
                <MessageCircle className="w-6 h-6 text-slate-blue" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 14 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Kommunizieren
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kommunikation löst keine Grunddynamik. Sie kann aber Eskalation
              bremsen, Missverständnisse begrenzen und Ihre eigene Position
              klarer machen. Gerade in belasteten Beziehungen ist deshalb nicht
              nur wichtig, was Sie sagen, sondern wann, in welchem Ton und mit
              welcher inneren Haltung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF-Hinweis */}
      <div className="container">
        <div className="max-w-3xl mx-auto py-3">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-sage-wash/40 border border-sage-mid/20 px-4 py-2.5">
            <p className="text-xs text-muted-foreground">
              Kommunikations-Übungen und Infografiken auch als PDFs verfügbar.
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
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Kommunikation beginnt nicht mit Technik"
              icon={<MessageCircle className="w-7 h-7 text-slate-blue" />}
              id="haltung"
              defaultOpen={true}
              preview="Viele Gespräche scheitern nicht nur am Wortlaut, sondern daran, dass beide Seiten bereits im Alarmzustand, in Rechtfertigung oder in Kränkung sprechen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  In belasteten Beziehungen kippt Kommunikation oft schnell in
                  Verteidigung, Beschuldigung, Rückzug oder Übererklärung. Dann
                  ist die Frage nicht nur, welcher Satz "richtig" wäre, sondern
                  ob überhaupt schon ein Moment für Gespräch da ist.
                </p>
                <Card className="bg-slate-wash border-slate-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Hilfreiche Kommunikation ist meist kürzer, langsamer und
                      klarer. Sie versucht nicht sofort zu überzeugen, sondern
                      zuerst Beziehungsspannung etwas zu senken.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Validierung: der wichtigste Ausgangspunkt"
              icon={<Heart className="w-7 h-7 text-sage-dark" />}
              id="validierung"
              preview="Validierung heisst nicht zustimmen. Sie signalisiert: Ich nehme dein Erleben ernst, auch wenn ich nicht jede Sichtweise teile."
            >
              <div className="space-y-4">
                <Card className="bg-sage-light/10 border-sage">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg mb-3">
                      <strong>Validierung</strong> bedeutet, dass Sie das
                      Erleben Ihres Gegenübers als nachvollziehbar behandeln,
                      ohne jeden Vorwurf, jede Interpretation oder jedes
                      Verhalten zu bestätigen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      In Beziehungen mit Borderline ist das oft deshalb so
                      wichtig, weil Nichtgesehenwerden, Kränkung oder Unklarheit
                      rasch zusätzlichen Druck erzeugen. Validierung kann diesen
                      Druck etwas senken und den Boden für spätere Klärung
                      bereiten.
                    </p>
                  </CardContent>
                </Card>

                <ValidierungsStufenleiter />

                {/* Validierung ≠ Zustimmung */}
                <div className="rounded-lg border border-amber-200/60 bg-amber-50/30 p-4">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Validierung ≠ Zustimmung — ein Beispiel
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-red-50/50 border border-red-200/50">
                      <p className="text-xs font-semibold text-red-700 mb-1">
                        ✗ Ohne Validierung
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        «Das stimmt nicht. Ich habe das nie so gesagt.»
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        → Gefühl ignoriert, Eskalation wahrscheinlich
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-sage-wash/60 border border-sage/40">
                      <p className="text-xs font-semibold text-sage-dark mb-1">
                        ✓ Validierend + klar
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        «Ich sehe, dass dich das verletzt hat. Ich habe das
                        nicht so gemeint.»
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        → Emotion anerkannt, eigene Aussage klar
                      </p>
                    </div>
                  </div>
                </div>

                {/* Validierungs-Situationsmatrix */}
                <div className="rounded-lg border border-sage-mid/30 bg-sage-light/5 p-4">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Wann welche Stufe passt
                  </p>
                  <div className="space-y-3">
                    {(
                      [
                        {
                          situation: "Alltag, kleine Frustration",
                          fit: [true, true, false, false, false, false],
                          note: "Stufe 1–2",
                        },
                        {
                          situation: "Streit, Vorwürfe, Anspannung",
                          fit: [false, true, true, true, false, false],
                          note: "Stufe 2–4",
                        },
                        {
                          situation: "Starke Emotion, Kontrollverlust",
                          fit: [false, false, true, true, true, false],
                          note: "Stufe 3–5",
                        },
                        {
                          situation: "Krise, Suizidgedanken",
                          fit: [false, false, false, false, true, true],
                          note: "Stufe 5–6 + Hilfe",
                        },
                      ] as { situation: string; fit: boolean[]; note: string }[]
                    ).map(row => (
                      <div
                        key={row.situation}
                        className="flex flex-col sm:flex-row sm:items-center gap-2"
                      >
                        <p className="text-sm text-foreground sm:min-w-[220px]">
                          {row.situation}
                        </p>
                        <div className="flex items-center gap-1">
                          {row.fit.map((active, i) => (
                            <div
                              key={i}
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
                                active
                                  ? "bg-sage-lighter text-sage-dark border-sage-mid/50"
                                  : "bg-background text-muted-foreground border-border/30"
                              }`}
                            >
                              {i + 1}
                            </div>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            {row.note}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3">
                    Stufen sind keine Hierarchie — sie sind Werkzeuge. Kein
                    Ansatz passt in jeder Situation gleich gut.
                  </p>
                </div>

                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground font-medium text-sm">
                      Ein hilfreicher innerer Satz für Angehörige: Ich muss
                      nicht recht bekommen, um zuerst zu zeigen, dass ich den
                      Schmerz wahrnehme.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Validierung in realen Situationen ausprobieren?{" "}
                      <Link
                        href="/uebungen"
                        className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                      >
                        Interaktive Übungen →
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Timing ist oft wichtiger als der perfekte Satz"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="timing"
              preview="Viele Gespräche scheitern daran, dass Inhalte zu früh geklärt werden sollen, während Anspannung, Scham oder Wut noch den ganzen Raum füllen."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher jetzt
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>kurz spiegeln, was Sie wahrnehmen</li>
                      <li>Ton und Tempo beruhigen</li>
                      <li>klare Begrenzung bei Beschimpfung oder Druck</li>
                      <li>vorschlagen, später weiterzureden</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher später
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Fakten prüfen und Missverständnisse sortieren</li>
                      <li>Konsequenzen besprechen</li>
                      <li>grössere Beziehungsfragen klären</li>
                      <li>lange Erklärungen oder Rechtfertigungen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Wenn Gespräche kippen"
              icon={<ShieldAlert className="w-7 h-7 text-sage-mid" />}
              id="eskalation"
              preview="In eskalierenden Momenten hilft oft nicht mehr Inhalt, sondern weniger: weniger Worte, weniger Verteidigung, weniger Tempo."
            >
              <div className="space-y-4">
                <div className="grid gap-3">
                  {[
                    {
                      title: "Nicht sofort verteidigen",
                      text: "Rechtfertigung wirkt unter hoher Anspannung oft wie Gegenangriff oder Nichtverstehen.",
                    },
                    {
                      title: "Den emotionalen Kern benennen",
                      text: "Nicht den Vorwurf, sondern die Kränkung, Angst oder Wut dahinter ansprechen.",
                    },
                    {
                      title: "Kurz und wiederholbar bleiben",
                      text: "In eskalierenden Momenten tragen wenige klare Sätze meist mehr als komplexe Erklärungen.",
                    },
                    {
                      title: "Grenze und Pause kombinieren",
                      text: "Sie können Kontakt halten und gleichzeitig sagen, dass Beschimpfungen oder Druck nicht gehen.",
                    },
                  ].map(item => (
                    <Card key={item.title} className="border-border/50">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash/30">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-foreground mb-3">
                      Ein möglicher Ablauf
                    </h4>
                    <ol className="space-y-2 text-sm text-foreground">
                      <li>1. "Ich sehe, dass es gerade sehr viel ist."</li>
                      <li>
                        2. "Ich möchte zuhören, aber nicht in diesem Ton."
                      </li>
                      <li>
                        3. "Lass uns 10 Minuten Pause machen und dann
                        weitersehen."
                      </li>
                    </ol>
                  </CardContent>
                </Card>
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <div className="bg-muted/40 px-5 py-3 border-b border-border/40">
                    <h4 className="font-semibold text-foreground text-sm">
                      Was den Unterschied macht — konkret
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Gleiche Situation, unterschiedliche Reaktion
                    </p>
                  </div>
                  <div className="p-5 space-y-5">
                    {[
                      {
                        ausloeser:
                          "«Du hörst mir nie zu! Dir ist das alles egal!»",
                        eskalierend: {
                          label: "Eskaliert weiter",
                          satz: "«Das stimmt nicht. Ich bin doch die ganze Zeit da für dich. Du übertreibst.»",
                        },
                        deeskalierend: {
                          label: "Deeskaliert",
                          satz: "«Ich höre, dass du dich allein gelassen fühlst. Das tut mir leid. Ich bin jetzt hier.»",
                        },
                      },
                      {
                        ausloeser:
                          "«Wenn du jetzt gehst, ist alles aus zwischen uns!»",
                        eskalierend: {
                          label: "Eskaliert weiter",
                          satz: "«Du kannst mich nicht erpressen. Ich gehe trotzdem.»",
                        },
                        deeskalierend: {
                          label: "Deeskaliert",
                          satz: "«Ich merke, dass du gerade sehr verzweifelt bist. Ich gehe kurz in den Nebenraum — und ich komme wieder.»",
                        },
                      },
                    ].map(beispiel => (
                      <div key={beispiel.ausloeser} className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Auslöser
                        </p>
                        <p className="text-sm text-foreground bg-muted/30 rounded-lg px-3 py-2 italic">
                          «{beispiel.ausloeser.replace(/«|»/g, "")}»
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2 mt-2">
                          <div className="rounded-lg border border-alert/20 bg-alert/5 px-3 py-2.5">
                            <p className="text-xs font-semibold text-alert mb-1.5">
                              ✗ {beispiel.eskalierend.label}
                            </p>
                            <p className="text-sm text-foreground italic">
                              {beispiel.eskalierend.satz}
                            </p>
                          </div>
                          <div className="rounded-lg border border-sage-mid/30 bg-sage-wash/50 px-3 py-2.5">
                            <p className="text-xs font-semibold text-sage-dark mb-1.5">
                              ✓ {beispiel.deeskalierend.label}
                            </p>
                            <p className="text-sm text-foreground italic">
                              {beispiel.deeskalierend.satz}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wird aus dem Gespräch eine akute Krise?{" "}
                  <Link
                    href="/unterstuetzen/krise"
                    className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                  >
                    Krisenbegleitung →
                  </Link>
                </p>
              </div>
            </ContentSection>

            <ContentSection
              title="Typische schwierige Situationen"
              icon={<RefreshCw className="w-7 h-7 text-slate-mid" />}
              id="situationen"
              preview="Nicht jede Situation verlangt dieselbe Antwort. Trotzdem gibt es Muster, auf die sich Angehörige vorbereiten können."
            >
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Vorwürfe
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reagieren Sie eher auf das Gefühl dahinter als auf die
                      ganze Anklage. Sie müssen nicht jede Verzerrung
                      korrigieren, bevor Sie Beziehung herstellen.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Rückzug und Schweigen
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Raum geben kann hilfreich sein. Raum geben ist aber etwas
                      anderes als strafendes Schweigen oder völliges
                      Verschwinden aus Kontakt.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Schwarz-Weiss-Sätze
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Es hilft oft, Gefühle anzuerkennen und gleichzeitig bei
                      Ihrer komplexeren Wirklichkeit zu bleiben: Beziehung und
                      Konflikt können gleichzeitig wahr sein.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Nach einem Streit
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ein Wiedereinstieg gelingt meist besser über Ruhe,
                      begrenzte Offenheit und Verantwortung für den eigenen
                      Anteil als über Sieger- oder Schuldsuche.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Kommunikation aus verschiedenen Angehörigenrollen"
              icon={<Users className="w-7 h-7 text-slate-mid" />}
              id="rollen"
              preview="Partner, Eltern und erwachsene Kinder sprechen aus unterschiedlichen Beziehungsgeschichten. Das verändert auch den Ton und die Belastung."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Partner/in
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In Partnerschaften ist die Intensität oft am höchsten.
                      Nähe, Eifersucht, Angst vor Verlust und wechselseitige
                      Kränkung mischen sich schnell. Gerade deshalb brauchen
                      Gespräche oft mehr Klarheit und weniger Verschmelzung.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Elternteil
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Alte Eltern-Kind-Muster färben viele Gespräche mit. Es
                      kann helfen, das erwachsene Gegenüber nicht nur als Kind
                      von früher zu adressieren, sondern als eigenständige
                      Person mit eigener Verantwortung.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als erwachsenes Kind
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wer als erwachsenes Kind kommuniziert, gerät oft schnell
                      in Loyalitätsdruck. Gerade dann hilft eine ruhige, direkte
                      Sprache mehr als Rechtfertigung – Sie müssen Ihre
                      Wahrnehmung nicht beweisen, um sie sagen zu dürfen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* CTA: Übungsszenarien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="bg-sage-wash/40 border-sage overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-sage-mid" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Kommunikation üben – interaktive Szenarien
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Testen Sie SET, DEAR MAN und Validierung in
                        realistischen Situationen. Multiple-Choice mit
                        sofortigem Feedback.
                      </p>
                      <Link href="/uebungen">
                        <Button
                          size="sm"
                          className="bg-sage-dark hover:bg-sage-mid text-white gap-1.5"
                        >
                          Zu den Übungen
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-slate-blue" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {kommItems.map((item, index) => (
                  <Card
                    key={item.title}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${
                      kommItems.length > 1 && index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] bg-muted">
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
                      <h3 className="font-medium text-foreground text-sm mb-2">
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

              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/materialien">
                  <Button variant="outline">Alle Materialien ansehen</Button>
                </Link>
                <Link href="/glossar">
                  <Button variant="outline">Fachbegriffe im Glossar →</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/uebersicht">
                <Button variant="ghost">← Unterstützen</Button>
              </Link>
              <Link href="/grenzen">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Grenzen setzen
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
