import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Heart,
  MessageSquare,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";

import { grenzenItems } from "@/content/grenzen";

export default function Grenzen() {
  return (
    <Layout>
      <SEO
        title="Grenzen setzen"
        description="Grenzen für Angehörige: Selbstschutz, Klarheit, Konsequenz und begrenzte Verfügbarkeit."
        path="/grenzen"
      />

      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sand-muted flex items-center justify-center">
                <Shield className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 12 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Grenzen setzen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-5">
              Grenzen sind kein Gegenpol zu Mitgefühl, sondern oft seine
              Voraussetzung. Sie schützen Ihre Integrität, machen Beziehungen
              berechenbarer und verhindern, dass Unterstützung in Selbstaufgabe
              kippt. Gleichzeitig können Grenzen Spannungen auslösen. Genau
              deshalb brauchen sie Klarheit, Wiederholbarkeit und Konsequenz.
            </p>

            <Card className="bg-slate-50 border-border/40">
              <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Diese Seite:</strong> Was
                Sie gegenüber anderen kommunizieren und einhalten — Klarheit
                nach aussen.{" "}
                <Link
                  href="/selbstfuersorge"
                  className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                >
                  Selbstfürsorge →
                </Link>{" "}
                zeigt, wie Sie sich selbst stabilisieren und regenerieren.
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
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Woran Sie merken, dass eine Grenze nötig ist"
              icon={<AlertTriangle className="w-7 h-7 text-sand-mid" />}
              id="warnsignale"
              preview="Grenzen werden oft erst dann sichtbar, wenn Sie längst überschritten wurden: durch Erschöpfung, Druck, Angst, Groll oder innere Härte."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Sie sagen aus Angst ja, obwohl innerlich längst nein da ist.",
                  "Sie fühlen sich dauernd zuständig, beobachtend oder auf Abruf.",
                  "Sie werden gereizt, hart oder ziehen sich innerlich zurück.",
                  "Sie merken, dass Hilfe nur noch aus Schuld oder Panik geschieht.",
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
              <Card className="mt-4 bg-sand-muted border-sand-mid">
                <CardContent className="p-5">
                  <p className="text-foreground leading-relaxed">
                    Grenzen beginnen oft nicht mit dem Satz an den anderen,
                    sondern mit dem ernsten Wahrnehmen Ihrer eigenen Belastung.{" "}
                    <Link
                      href="/selbstfuersorge"
                      className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                    >
                      Selbstfürsorge →
                    </Link>{" "}
                    zeigt, was Sie tun können, wenn Sie merken, dass Sie sich
                    selbst vernachlässigt haben.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            <ContentSection
              title="Welche Arten von Grenzen häufig relevant sind"
              icon={<Clock className="w-7 h-7 text-slate-mid" />}
              id="arten"
              preview="Grenzen betreffen nicht nur Lautstärke oder Streit, sondern Zeit, Erreichbarkeit, Raum, Geld und emotionale Zumutbarkeit."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Zeitliche Grenzen",
                    text: "Wann sind Sie erreichbar, wann nicht? Wann ist Pause nötig?",
                  },
                  {
                    title: "Emotionale Grenzen",
                    text: "Welcher Ton, welche Vorwürfe, welche Dynamiken überschreiten Ihre Grenze?",
                  },
                  {
                    title: "Räumliche Grenzen",
                    text: "Wo brauchen Sie Rückzug, Distanz oder Schutz des eigenen Raums?",
                  },
                  {
                    title: "Materielle Grenzen",
                    text: "Wie weit gehen finanzielle Hilfe, Ausleihen oder praktische Übernahmen?",
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
            </ContentSection>

            {/* Grenzen-Priorisierungsmatrix */}
            <ContentSection
              title="Welche Grenzen zuerst?"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-dark" />}
              id="priorisierung"
              preview="Nicht alle Grenzen lassen sich gleichzeitig setzen. Diese Orientierung hilft, die wichtigsten zuerst anzugehen."
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                Wer versucht, alle Grenzen auf einmal zu setzen, scheitert meist
                an sich selbst. Sinnvoller ist es, nach Dringlichkeit und
                emotionaler Last zu priorisieren.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-alert/10 border border-alert/30 p-4">
                  <p className="text-[10px] font-bold text-alert uppercase tracking-wide mb-1">
                    Dringend · Emotional hoch
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Sofort setzen
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Körperliche Sicherheit</li>
                    <li>• Bedrohungen / Übergriffe</li>
                    <li>• Eigene Gesundheit</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-sand-muted border border-sand-mid/30 p-4">
                  <p className="text-[10px] font-bold text-sand-mid uppercase tracking-wide mb-1">
                    Dringend · Emotional niedriger
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Klar kommunizieren
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Erreichbarkeitszeiten</li>
                    <li>• Gesprächsregeln</li>
                    <li>• Alltägliche Abläufe</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-sage-lighter/50 border border-sage-mid/20 p-4">
                  <p className="text-[10px] font-bold text-sage-dark uppercase tracking-wide mb-1">
                    Langfristig · Emotional hoch
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Sorgfältig vorbereiten
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Finanzielle Regelungen</li>
                    <li>• Wohnsituation</li>
                    <li>• Langfristige Rollen</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-wash border border-border/30 p-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Langfristig · Emotional niedrig
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Im Blick behalten
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Kleine Gewohnheitsfragen</li>
                    <li>• Alltagsabsprachen</li>
                    <li>• Schrittweise Anpassungen</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Wenige zentrale Grenzen, klar gehalten, tragen mehr als viele
                gleichzeitig.
              </p>
            </ContentSection>

            <ContentSection
              title="Wie Grenzen eher gut kommuniziert werden"
              icon={<Heart className="w-7 h-7 text-sage-dark" />}
              id="kommunizieren"
              preview="Hilfreiche Grenzen sind meist konkret, ruhig und wiederholbar. Sie erklären sich nicht endlos und werden nicht als moralischer Angriff formuliert."
            >
              <div className="space-y-4">
                <Card className="bg-sage-light/10 border-sage">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground leading-relaxed">
                      Grenzen tragen eher, wenn sie
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>konkret statt abstrakt sind,</li>
                      <li>auf Ihr Handeln bezogen bleiben,</li>
                      <li>nicht mit Vorwürfen überladen werden,</li>
                      <li>
                        nicht bei jedem Gespräch neu verhandelt werden müssen.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Eher hilfreich
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Ich spreche weiter mit dir, aber nicht, wenn du mich
                        anschreist."
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Eher problematisch
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Du bist unmöglich. So rede ich nie wieder mit dir."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Konkrete Grenzsätze für typische Situationen"
              icon={<MessageSquare className="w-7 h-7 text-sage-dark" />}
              id="grenzsaetze"
              preview="Grenzen werden tragfähiger, wenn sie konkret, ruhig und auf Ihr eigenes Handeln bezogen sind — nicht als Vorwurf, sondern als klare Aussage."
            >
              <div className="space-y-4">
                {[
                  {
                    thema: "Zeitliche Grenzen",
                    situation: "Häufige Anrufe spät abends oder an Wochenenden",
                    falsch:
                      "«Du rufst immer zur falschen Zeit an. Das nervt mich.»",
                    richtig:
                      "«Ich bin unter der Woche bis 21 Uhr erreichbar. Danach bin ich offline. Bei echten Notfällen gibt es die Krisentelefone.»",
                    hinweis:
                      "Zeitgrenzen wirken am besten, wenn Sie sie in einer ruhigen Situation ankündigen — nicht mitten in einem Konflikt.",
                  },
                  {
                    thema: "Finanzielle Grenzen",
                    situation:
                      "Bitte um Geld, Schuldenübernahme oder finanzielle Rettung",
                    falsch:
                      "«Du gibst immer zu viel aus. Ich mache das nicht mehr mit.»",
                    richtig:
                      "«Ich kann dir kein Geld leihen. Das hat nichts damit zu tun, wie wichtig du mir bist — aber das wäre für mich keine tragfähige Lösung.»",
                    hinweis:
                      "Finanzielle Grenzen sind besonders schwer, weil sie sich anfühlen wie «ich lasse dich fallen». Sie sind es nicht.",
                  },
                  {
                    thema: "Emotionale Grenzen",
                    situation:
                      "Beschimpfungen, Vorwürfe oder persönliche Angriffe im Gespräch",
                    falsch: "«Du bist unmöglich. So rede ich nicht mit dir.»",
                    richtig:
                      "«Wenn du mich so ansprichst, beende ich dieses Gespräch. Wir können es später weiterführen, wenn beide ruhiger sind.»",
                    hinweis:
                      "Sagen Sie es ruhig und gehen Sie dann tatsächlich. Die Grenze trägt nur, wenn Sie sie auch einhalten.",
                  },
                  {
                    thema: "Grenzen bei Rollenübernahme",
                    situation:
                      "Erwartung, immer da zu sein oder alle Probleme zu lösen",
                    falsch:
                      "«Ich kann nicht immer für dich da sein. Du musst das selbst in den Griff kriegen.»",
                    richtig:
                      "«Ich bin gerne für dich da — und ich kann nicht dein ganzes Netz sein. Dafür brauchen wir gemeinsam andere Unterstützung.»",
                    hinweis:
                      "Diese Grenze kombiniert Fürsorge mit Klarheit: Sie sagen, was Sie können, und benennen, was nicht.",
                  },
                ].map(item => (
                  <Card
                    key={item.thema}
                    className="border-border/50 overflow-hidden"
                  >
                    <div className="bg-muted/30 px-5 py-3 border-b border-border/40">
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.thema}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.situation}
                      </p>
                    </div>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex gap-3">
                        <span className="text-alert font-bold text-sm shrink-0 mt-0.5">
                          ✗
                        </span>
                        <p className="text-sm text-muted-foreground italic">
                          {item.falsch}
                        </p>
                      </div>
                      <div className="flex gap-3 bg-sage-wash/50 rounded-lg p-3">
                        <span className="text-sage-dark font-bold text-sm shrink-0 mt-0.5">
                          ✓
                        </span>
                        <p className="text-sm text-foreground italic">
                          {item.richtig}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground border-l-2 border-sage-mid/30 pl-3">
                        {item.hinweis}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Konsequenz ist oft der schwierigste Teil"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="konsequenz"
              preview="Viele Grenzen scheitern nicht an der Formulierung, sondern daran, dass Angst, Schuld oder Hoffnung sie sofort wieder aufweichen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Grenzen wirken selten, wenn sie nur angekündigt, aber nicht
                  umgesetzt werden. Genau hier geraten viele Angehörige in
                  Loyalitätskonflikte: Sie wollen klar sein, fürchten aber
                  Eskalation, Ablehnung oder Schuld.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Konsequenz heisst nicht Härte. Es heisst, dass Ihr Handeln
                      zu dem passt, was Sie angekündigt haben.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Häufige Fehler beim Grenzen setzen"
              icon={<AlertTriangle className="w-7 h-7 text-sage-mid" />}
              id="fehler"
              preview="Grenzen werden oft im Affekt, zu gross, zu unklar oder aus Kränkung formuliert. Dann tragen sie selten lange."
            >
              <div className="space-y-3">
                {[
                  {
                    wrong: "Grenzen im Affekt setzen",
                    right: "besser in ruhigen Momenten vorbereiten",
                  },
                  {
                    wrong: "zu viele Grenzen auf einmal",
                    right: "wenige zentrale Grenzen priorisieren",
                  },
                  {
                    wrong: "Grenzen als Strafe formulieren",
                    right: "Grenzen als Selbstschutz erklären",
                  },
                  {
                    wrong: "Grenzen nicht durchhalten",
                    right: "nur ankündigen, was Sie tragen können",
                  },
                  {
                    wrong: "bei Schuld sofort zurückrudern",
                    right: "Schuldgefühl nicht automatisch als Fehler lesen",
                  },
                ].map(item => (
                  <Card key={item.wrong} className="border-border/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">{item.wrong}</span>
                        <span className="mx-2 text-sage-mid">→</span>
                        <span className="text-foreground">{item.right}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Grenzen in verschiedenen Angehörigenrollen"
              icon={<Users className="w-7 h-7 text-slate-mid" />}
              id="rollen"
              preview="Partner, Eltern und erwachsene Kinder geraten auf unterschiedliche Weise in Loyalitätsdruck. Das verändert auch, wie schwer Grenzen sich anfühlen."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Partner/in
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In Partnerschaften fühlen sich Grenzen oft schnell wie
                      Beziehungsgefahr an. Gerade deshalb sind sie wichtig: Sie
                      unterscheiden zwischen Nähe und Verschmelzung, Mitgefühl
                      und Selbstaufgabe.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Elternteil
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Eltern erleben Grenzen oft als Widerspruch zu Fürsorge.
                      Bei erwachsenen Kindern ist Begrenzung aber häufig Teil
                      verantwortlicher Elternschaft, nicht ihr Gegenstück.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als erwachsenes Kind
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wer seinem Elternteil Grenzen setzt, erlebt oft besonders
                      starke Schuld. Ihre emotionale Gesundheit ist dennoch
                      nicht nachrangig. Sie dürfen Ihr eigenes Leben schützen.
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
                <Download className="w-8 h-8 text-sage-mid" />
                Materialien zum Thema Grenzen
              </h2>
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">
                    Vorschau = Web-Bild.
                  </strong>{" "}
                  «PDF öffnen» öffnet die A4-Druckversion im neuen Tab.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grenzenItems.map((item, index) => (
                  <Card
                    key={item.title}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${
                      grenzenItems.length > 1 && index === 0
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                    </div>
                    <CardContent className="p-3">
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

              <div className="mt-6 text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien ansehen
                    <ArrowRight className="w-4 h-4 ml-2" />
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
              <Card className="bg-sage-light/30 border-sage">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Grenzen fühlen sich anfangs oft unangenehm an. Das bedeutet
                    nicht automatisch, dass sie falsch sind. In belasteten
                    Beziehungen braucht gute Begrenzung meist Wiederholung,
                    innere Festigkeit und die Erlaubnis, auch Schuldgefühle zu
                    überstehen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <ContentSection
              title="Wenn der Angehörige körperlich übergriffig wird"
              icon={<Phone className="w-7 h-7 text-sos-rot" />}
              id="gewalt"
              preview="Körperliche Übergriffe sind keine Grenzverletzung – sie sind eine Gefährdung. Das erfordert eine andere Reaktion als verbale Eskalation."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-red-500 bg-red-50/30">
                  <CardContent className="p-5">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Körperliche Gewalt ist kein Beziehungsproblem — es ist
                      eine Sicherheitsfrage.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Borderline erklärt Übergriffe nicht und entschuldigt sie
                      nicht. Wenn Sie körperlich bedroht oder verletzt werden,
                      ist Ihre Sicherheit die einzige Priorität.
                    </p>
                  </CardContent>
                </Card>
                <div className="space-y-3">
                  {[
                    {
                      schritt: "Verlassen Sie die Situation",
                      detail:
                        "Gehen Sie in ein anderes Zimmer, aus dem Haus oder zu Nachbarn. Sicherheit hat Vorrang vor Deeskalationsversuchen.",
                    },
                    {
                      schritt: "Rufen Sie 117 (Polizei) oder 144",
                      detail:
                        "Bei akuter Gefahr sofort. Sie müssen sich nicht sicher sein, ob es «schlimm genug» ist — die Polizei entscheidet das.",
                    },
                    {
                      schritt: "Sprechen Sie danach mit einer Fachstelle",
                      detail:
                        "Opferhilfe Zürich (0800 040 080, kostenlos), Frauenhaus oder Beratungsstelle. Es gibt Unterstützung auch für Männer.",
                    },
                    {
                      schritt: "Halten Sie Vorfälle fest",
                      detail:
                        "Datum, Beschreibung, allfällige Zeugen. Das ist wichtig, wenn Sie später rechtliche Schritte prüfen möchten.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.schritt}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Card className="border-sage bg-sage-wash/30">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Viele Angehörige zögern, weil sie fürchten, die Person zu
                      «verraten» oder die Situation zu eskalieren.
                      Professionelle Hilfe zu holen ist kein Verrat — es ist oft
                      der einzige Weg, eine Beziehung langfristig überhaupt zu
                      stabilisieren.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/kommunizieren">
                <Button variant="ghost">← Kommunizieren</Button>
              </Link>
              <Link href="/selbstfuersorge">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Selbstfürsorge
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
