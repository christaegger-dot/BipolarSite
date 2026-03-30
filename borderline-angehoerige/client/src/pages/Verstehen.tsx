import EvidenceNote from "@/components/EvidenceNote";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Download,
  ExternalLink,
  Heart,
  Layers,
  RefreshCw,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import VerstehenHeroSection from "@/sections/verstehen/VerstehenHeroSection";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import { verstehenInfografiken } from "@/content/verstehen";

const relationshipPatterns = [
  {
    title: "Verlassenheitsangst",
    text: "Schon kleine Verzögerungen, Unklarheiten oder Distanzsignale können als drohender Verlust erlebt werden. Für Angehörige wirkt das oft unverhältnismässig, für die betroffene Person aber sehr real.",
  },
  {
    title: "Nähe-Distanz-Pendeln",
    text: "Es kann vorkommen, dass jemand sehr viel Nähe sucht und sich kurz darauf zurückzieht, abwertet oder abbricht. Das ist nicht einfach Widersprüchlichkeit, sondern oft Ausdruck von Bindungsstress.",
  },
  {
    title: "Spaltung unter Stress",
    text: "In Belastungssituationen wird es schwerer, gleichzeitig Gutes und Schwieriges an einer Person zu halten. Dann kippt das Erleben leichter in Idealisierung oder Entwertung.",
  },
];

export default function Verstehen() {
  return (
    <Layout>
      <SEO
        title="Borderline verstehen"
        description="Borderline aus Sicht von Angehörigen verstehen: Beziehungsdynamik, Überflutung, Nähe-Distanz und hilfreiche Einordnung."
        path="/verstehen"
      />
      <TableOfContents />

      <VerstehenHeroSection />

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="border-l-4 border-l-sage bg-sage-light/20">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic">
                    "Verstehen hat mir nicht alles leichter gemacht. Aber ich
                    habe aufgehört, jede Eskalation nur als Bosheit, jede
                    Distanz nur als Ablehnung und jede Krise nur als mein
                    persönliches Versagen zu lesen."
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">
                    — Eine Angehörige
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <ContentSection
              title="Was Angehörige oft erleben"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="angehoerige-erleben"
              defaultOpen={true}
              preview="Viele Angehörige erleben nicht nur schwierige Gespräche, sondern ein ständiges Schwanken zwischen Nähe, Alarm, Hoffnung, Wut, Schuld und Erschöpfung."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Für Angehörige wirkt Borderline oft widersprüchlich: Nähe kann
                  sehr intensiv werden und kurz darauf in Angriff, Rückzug oder
                  Funkstille kippen. Eine Beziehung kann sich gleichzeitig
                  bedeutsam, erschöpfend, zart und bedrohlich anfühlen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige schwanken deshalb nicht nur zwischen
                  Mitgefühl und Hilfsbereitschaft, sondern auch zwischen Angst,
                  Wut, Selbstzweifel, Loyalität und dem Wunsch nach Abstand.
                  Diese Ambivalenz ist nicht Ausdruck mangelnder Liebe, sondern
                  oft Teil der Belastungsrealität.
                </p>
                <Card className="bg-cream border-border/50">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Wichtig:</strong> Verstehen kann entlasten, weil
                      es Muster einordnen hilft. Es ersetzt aber weder
                      Grenzsetzung noch Selbstschutz noch professionelle Hilfe.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Borderline im Kern so belastend macht"
              icon={<Brain className="w-7 h-7 text-sage" />}
              id="was-ist-borderline"
              preview="Borderline ist kein einzelnes Verhalten, sondern ein Muster aus starker innerer Anspannung, erschwerter Emotionsregulation und instabilem Beziehungserleben."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Die Borderline-Persönlichkeitsstörung ist ein komplexes
                  Störungsbild. Typisch sind starke emotionale Reagibilität,
                  Schwierigkeiten mit innerer Stabilität und ein
                  Beziehungserleben, das unter Bindungsstress schnell ins Wanken
                  geraten kann.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nicht alle Menschen mit Borderline zeigen dieselben Muster.
                  Manche wirken vor allem impulsiv und explosiv, andere eher
                  verzweifelt, zurückgezogen, leer oder selbstabwertend.
                  Ausprägung, Verlauf und Belastung unterscheiden sich deutlich.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Für Angehörige ist vor allem wichtig: Hinter heftigen
                      Reaktionen liegen oft Überflutung, Angst, Scham oder
                      Verlassenheitsstress. Das macht Verhalten nicht folgenlos,
                      hilft aber, es genauer einzuordnen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Warum gerade nahe Beziehungen so schnell kippen können"
              icon={<Users className="w-7 h-7 text-sage-dark" />}
              id="beziehungsdynamik"
              preview="Was für Aussenstehende klein wirkt, kann in engen Beziehungen als Zurückweisung, Kontrollverlust oder drohender Verlust erlebt werden."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Menschen mit Borderline haben ihre grössten
                  Schwierigkeiten nicht in oberflächlichen Kontakten, sondern in
                  engen Beziehungen. Gerade dort, wo viel Bindung, Hoffnung und
                  Verletzbarkeit im Spiel sind, werden Unsicherheit, Unklarheit
                  oder Distanz besonders schmerzhaft erlebt.
                </p>
                <div className="grid gap-4">
                  {relationshipPatterns.map(item => (
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
                <Card className="bg-sage-wash border-sage-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Gerade deshalb erleben Angehörige oft etwas Paradoxes: Je
                      wichtiger sie der betroffenen Person sind, desto stärker
                      können Konflikte, Vorwürfe oder Grenztests ausfallen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Scham, Wut und innere Überflutung"
              icon={<Layers className="w-7 h-7 text-sage-mid" />}
              id="scham-wut"
              preview="Wut ist oft sichtbar. Darunter liegen nicht selten Scham, Angst, Kränkung, Leere oder der Versuch, unerträgliche Spannung loszuwerden."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Angehörige erleben Wut oft als das dominierende Thema. Sie ist
                  laut, verletzend und schwer zu übersehen. Gleichzeitig ist Wut
                  bei Borderline häufig nicht der ganze Kern, sondern eher eine
                  Reaktion auf tiefer liegende Zustände wie Scham,
                  Verlassenheitsangst, Ohnmacht oder innere Leere.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Scham spielt dabei eine besonders grosse Rolle. Wer sich tief
                  beschämt, blossgestellt oder innerlich wertlos fühlt, reagiert
                  leichter mit Angriff, Rückzug, Selbstentwertung oder abruptem
                  Kontaktabbruch. Für Angehörige wirkt das oft hart und kalt,
                  innerlich ist es nicht selten hochverletzlich.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      Was sichtbar werden kann
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Wutausbruch oder Vorwurf</li>
                      <li>Rückzug oder Schweigen</li>
                      <li>Abwertung oder Beziehungsabbruch</li>
                      <li>Selbstverletzung oder Impulsdurchbruch</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      Was darunter liegen kann
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Scham und Kränkung</li>
                      <li>Angst vor Verlust oder Abwertung</li>
                      <li>innere Leere oder Überflutung</li>
                      <li>das Gefühl, nicht mehr regulieren zu können</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Wenn Denken unter Stress enger wird"
              icon={<Activity className="w-7 h-7 text-slate-mid" />}
              id="stressmodus"
              preview="Unter starker Anspannung werden Grautöne, Perspektivenwechsel und logische Einordnung oft schlechter erreichbar."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Unter hoher emotionaler Überflutung verengt sich das Erleben
                  häufig stark auf den aktuellen Schmerz, die aktuelle Angst
                  oder den aktuellen Konflikt. Dann verlieren Menschen leichter
                  den Zugang zu Grautönen, Beziehungsgeschichte und nüchterner
                  Einordnung.
                </p>
                <div className="grid gap-4">
                  <Card className="border-l-4 border-l-alert">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Alarmmodus
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Das innere Alarmsystem reagiert rasch und heftig.
                        Neutrale Signale können leichter als Distanz, Kritik
                        oder Bedrohung gelesen werden.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-slate-dark">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Tunnelblick
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        In diesem Zustand kommen Argumente, Erklärungen und
                        Korrekturen oft kaum an. Hilfreicher ist meist zuerst
                        Beruhigung, Orientierung und emotionale Anerkennung.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-sage-mid">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Dissoziation und Entfremdung
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Unter starkem Stress können auch Unwirklichkeitsgefühle,
                        innere Abspaltung oder das Gefühl auftreten, nicht mehr
                        richtig präsent zu sein. Das ist für Betroffene wie
                        Angehörige oft verstörend.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-slate-wash border-slate-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Für Angehörige heisst das:</strong> Nicht zuerst
                      überzeugen, sondern zuerst stabilisieren. Erst wenn die
                      Anspannung sinkt, wird gemeinsames Denken eher wieder
                      möglich.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Typische Muster in belasteten Beziehungen"
              icon={<RefreshCw className="w-7 h-7 text-slate-dark" />}
              id="muster"
              preview="Viele Angehörige berichten von wiederkehrenden Mustern. Diese können ähnlich aussehen, verlaufen aber nie bei allen gleich."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Manche Beziehungen folgen über längere Zeit wiederkehrenden
                  Schleifen: Eskalation, Rückzug, Wiederannäherung, Hoffnung,
                  neue Spannung. Das ist kein starres Gesetz, aber ein Muster,
                  das Angehörigen helfen kann, Entwicklungen nüchterner zu
                  lesen.
                </p>

                {/* Eskalations-Prozessdiagramm */}
                <div className="rounded-lg border border-border/40 bg-slate-wash/20 p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 text-center">
                    Typischer Eskalationsverlauf
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <div className="rounded-md bg-slate-wash px-3 py-2 text-center min-w-[72px]">
                      <p className="text-xs font-semibold text-slate-dark">
                        Trigger
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Auslöser
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <div className="rounded-md bg-sand-muted px-3 py-2 text-center min-w-[72px]">
                      <p className="text-xs font-semibold text-sand-mid">
                        Überflutung
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Emotion steigt
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <div className="rounded-md bg-amber-100 px-3 py-2 text-center min-w-[72px]">
                      <p className="text-xs font-semibold text-amber-700">
                        Reaktion
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Impuls, Worte
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <div className="rounded-md bg-alert/10 px-3 py-2 text-center min-w-[72px]">
                      <p className="text-xs font-semibold text-alert">
                        Eskalation
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Spitze
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <div className="rounded-md bg-sage-lighter/60 px-3 py-2 text-center min-w-[72px]">
                      <p className="text-xs font-semibold text-sage-dark">
                        Rückzug
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Stille, Abstand
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 text-center">
                    Kein starres Schema — aber ein häufig wiedererkennbarer
                    Verlauf in belasteten Beziehungen
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Idealisierung und Entwertung
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Eine Person kann zeitweise als einzig sicher und
                        verstehend erlebt werden, kurz darauf aber als kalt,
                        ungerecht oder gefährlich. Für Angehörige ist das oft
                        tief verunsichernd.
                      </p>
                      {/* Spaltungs-Skala */}
                      <div className="flex items-stretch gap-1.5">
                        <div className="flex-1 rounded bg-sage-lighter/60 px-2 py-1.5 text-center">
                          <p className="text-[10px] font-semibold text-sage-dark">
                            Idealisierung
                          </p>
                          <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                            «Du allein verstehst mich»
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground px-0.5">
                          ↔
                        </div>
                        <div className="flex-1 rounded bg-alert/10 px-2 py-1.5 text-center">
                          <p className="text-[10px] font-semibold text-alert">
                            Entwertung
                          </p>
                          <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                            «Du lässt mich im Stich»
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center mt-1.5">
                        Beide Extreme sind echte Wahrnehmungen — keine
                        Manipulation
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Rückzug und Funkstille
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nach Konflikten kann Schweigen, Abbruch oder
                        Distanzierung folgen. Das ist nicht zwingend
                        Gleichgültigkeit, für Angehörige aber oft besonders
                        schwer auszuhalten.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Schuldspiralen
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Angehörige geben aus Angst oder Schuld nach, fühlen sich
                        danach ausgenutzt, reagieren irgendwann härter und
                        empfinden dann erneut Schuld. So entsteht ein Kreislauf,
                        der beide Seiten belastet.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Nähe und Selbstschutz zugleich
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Viele Angehörige möchten bleiben und gleichzeitig
                        Abstand. Gerade diese Ambivalenz verdient Ernstnahme
                        statt moralische Bewertung.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Was das für Angehörige bedeutet"
              icon={<Users className="w-7 h-7 text-sand-mid" />}
              id="bedeutung-fuer-angehoerige"
              preview="Wenn Sie diese Dynamiken kennen, können Sie manches klarer einordnen. Das schützt nicht vor Schmerz, hilft aber oft gegen vorschnelle Selbstanklage."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    text: "Sie können Verhalten genauer einordnen",
                    sub: "ohne es automatisch zu entschuldigen oder zu dramatisieren",
                  },
                  {
                    text: "Sie erkennen eigene Grenzen früher",
                    sub: "weil Sie Belastung, Schuld und Überanpassung besser bemerken",
                  },
                  {
                    text: "Sie können Mitgefühl und Klarheit verbinden",
                    sub: "statt zwischen Härte und Aufopferung zu pendeln",
                  },
                  {
                    text: "Sie müssen nicht alles allein tragen",
                    sub: "Verstehen ist wertvoll, ersetzt aber kein Hilfesystem",
                  },
                ].map(item => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30"
                  >
                    <span className="text-2xl flex-shrink-0">•</span>
                    <div>
                      <span className="font-medium text-foreground block">
                        {item.text}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Verstehen hat Grenzen"
              icon={<AlertCircle className="w-7 h-7 text-sage-mid" />}
              id="grenzen-des-verstehens"
              preview="Verstehen ist wichtig. Es ersetzt aber weder Selbstschutz noch Grenzsetzung noch professionelle Hilfe."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Verstehen bedeutet nicht, alles auszuhalten. Es bedeutet auch
                  nicht, dass Sie jede Eskalation auffangen, jedes Verhalten
                  korrekt einordnen oder jede Krise mit der richtigen Reaktion
                  entschärfen könnten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mitgefühl und Selbstschutz widersprechen sich nicht. Gerade in
                  belasteten Beziehungen kann es verantwortungsvoll sein,
                  Grenzen zu setzen, Distanz zu schaffen oder Hilfe von aussen
                  einzubeziehen.
                </p>
                <Card className="bg-sage-lighter/30 border-sage/50">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Merksatz für Angehörige:</strong> Verstehen hilft,
                      ruhiger und klarer zu handeln. Es verpflichtet Sie nicht
                      dazu, sich selbst zu verlieren.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Diagnostischer Überblick"
              icon={<BookOpen className="w-7 h-7 text-sage-dark" />}
              id="diagnostischer-ueberblick"
              defaultOpen={false}
              preview="Für alle, die auch die klinische Perspektive kennen möchten: DSM-Merkmale und Entstehungshintergründe im Überblick."
            >
              <div className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  Für eine Diagnose müssen Fachpersonen mehrere Merkmale über
                  längere Zeit und in verschiedenen Lebensbereichen beurteilen.
                  Entscheidend ist nicht ein einzelnes Verhalten, sondern das
                  Gesamtbild.
                </p>

                <div className="grid gap-3">
                  {[
                    "starke Angst vor Verlassenwerden oder Bindungsverlust",
                    "instabile, intensive Beziehungen",
                    "ein schwankendes oder unsicheres Selbstbild",
                    "Impulsivität oder selbstschädigendes Verhalten",
                    "affektive Instabilität, Leere, Wut oder dissoziative Symptome",
                  ].map(item => (
                    <Card key={item} className="border-border/50">
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-t-4 border-t-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Häufige Begleiterkrankungen
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Borderline tritt selten allein auf. Häufig bestehen
                      gleichzeitig Depressionen, Angststörungen oder eine
                      Posttraumatische Belastungsstörung (PTBS). Das kann die
                      Symptome verstärken und die Behandlung komplexer machen.
                      Fachpersonen berücksichtigen diese Zusammenhänge bei der
                      Diagnostik und Therapieplanung.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Ursachen sind nie monokausal
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Borderline entsteht nicht durch eine einzige Ursache,
                      sondern im Zusammenspiel biologischer Empfindlichkeit,
                      Bindungs- und Entwicklungserfahrungen sowie
                      Belastungsfaktoren. Schuldzuweisungen an Betroffene oder
                      Angehörige greifen zu kurz und helfen niemandem.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      Borderline tritt häufig zusammen mit Depressionen,
                      Angststörungen oder Traumafolgen auf. Das macht das Bild
                      komplexer – hilft aber auch, Symptome richtig einzuordnen.
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
              id="materialien"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-sage-dark" />
                Materialien zum Vertiefen
              </h2>
              <p className="text-muted-foreground mb-6">
                Diese Materialien ergänzen die Seite, ersetzen sie aber nicht.
                Beginnen Sie mit den Grundlagen, wenn Sie gerade Orientierung
                brauchen.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verstehenInfografiken.map(item => (
                  <Card
                    key={item.id}
                    className={`${item.featured ? "md:col-span-2" : ""} overflow-hidden hover:shadow-lg transition-shadow`}
                  >
                    <button
                      type="button"
                      className="aspect-[3/4] bg-muted cursor-pointer w-full"
                      onClick={() => window.open(item.webpUrl, "_blank")}
                      aria-label={`${item.alt} – Vorschau öffnen`}
                    >
                      <img
                        src={item.webpUrl}
                        alt={item.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                    </button>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
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

              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link href="/materialien">
                  <Button variant="outline">Alle Materialien anzeigen</Button>
                </Link>
                <Link href="/glossar">
                  <Button variant="outline">Fachbegriffe im Glossar →</Button>
                </Link>
                <Link href="/buchempfehlungen">
                  <Button variant="outline">Buchempfehlungen →</Button>
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
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-sage flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Verstehen ist nur der erste Schritt
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Wenn Sie Dynamiken besser einordnen können, wird oft
                        klarer, wie Sie hilfreicher reagieren, Grenzen besser
                        halten und die eigene Belastung ernster nehmen können.
                      </p>
                      <Link href="/unterstuetzen/uebersicht">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Weiter zu: Unterstützen
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <EvidenceNote
              className="mb-8"
              title="Quellen zu Entstehung und Verlauf von Borderline"
              definition="Die Inhalte dieser Seite stützen sich auf empirisch gut belegte Modelle und klinische Übersichtsarbeiten."
              sources={[
                {
                  label:
                    "Lieb et al. (2004) – Borderline personality disorder (Lancet)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/15488216/",
                },
                {
                  label:
                    "Leichsenring et al. (2011) – Borderline personality disorder (Lancet)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/21232218/",
                },
                {
                  label:
                    "Linehan (1993) – Kognitive Verhaltenstherapie der Borderline-Persönlichkeitsstörung (Biosoziales Modell)",
                },
                {
                  label:
                    "Storebø et al. (2020) – Psychological therapies for BPD (Cochrane)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
                },
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6">
                Als Nächstes geht es darum, wie Unterstützung tragfähig bleiben
                kann, ohne dass Sie sich selbst verlieren.
              </p>
              <Link href="/unterstuetzen/uebersicht">
                <Button
                  size="lg"
                  className="bg-sage-dark hover:bg-sage-mid text-white"
                >
                  Weiter zu: Unterstützen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
