import SEO from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Heart,
  Clock,
  Users,
  Lightbulb,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenAlltag() {
  return (
    <Layout>
      <SEO
        title="Unterstützen im Alltag"
        description="Wie Angehörige im Alltag hilfreich bleiben können: verlässlich, klar und ohne sich selbst zu verlieren."
        path="/unterstuetzen/alltag"
      />

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
              <div className="w-12 h-12 rounded-xl bg-sage-wash flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sage-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 8 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Im Alltag unterstützen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Belastete Beziehungen bestehen nicht nur aus Krisen. Meist prägen
              sie den Alltag: Anspannung in der Luft, vorsichtiges Abtasten,
              Rückzug nach Konflikten, Schuldgefühle, Erreichbarkeitsdruck und
              die Frage, wie viel Nähe gerade hilfreich ist. Diese Seite geht
              darum, was im Alltag trägt und was eher erschöpft.
            </p>
          </motion.div>
        </div>
      </section>

      <UnterstuetzenSubNav />

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Der Alltag ist oft nicht ruhig, sondern vorspannt"
              icon={<Clock className="w-7 h-7 text-sage" />}
              id="alltagsspannung"
              defaultOpen={true}
              preview="Viele Angehörige leben nicht in dauernder Krise, sondern in dauernder Vorahnung von Krise. Gerade das kann zermürbend sein."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige kennen weniger den permanenten
                  Ausnahmezustand als einen Alltag, der unterschwellig unter
                  Spannung steht: Man beobachtet Stimmungen, wägt Worte ab,
                  rechnet mit plötzlichem Rückzug oder Ärger und versucht
                  gleichzeitig, Normalität aufrechtzuerhalten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Diese dauernde innere Wachsamkeit ist anstrengend. Sie kostet
                  Energie, auch wenn äusserlich gerade "nichts passiert".
                  Hilfreiche Alltagsunterstützung beginnt oft damit, diese
                  Belastung ernst zu nehmen und nicht nur auf sichtbare
                  Eskalationen zu reagieren.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Alltagshilfe bedeutet deshalb nicht, immer mehr zu tun.
                      Oft bedeutet sie, Beziehungen etwas vorhersehbarer, klarer
                      und weniger reaktiv zu machen.
                    </p>
                  </CardContent>
                </Card>

                {/* Alltags-Spannungsdiagramm */}
                <div className="rounded-lg border border-border/40 bg-slate-wash/10 p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 text-center">
                    Spannungsverlauf im Alltag
                  </p>
                  <svg
                    viewBox="0 0 300 72"
                    className="w-full h-16"
                    aria-hidden="true"
                  >
                    {/* Ruhepuls-Linie (Vergleich) */}
                    <path
                      d="M 15,48 C 60,48 80,38 120,42 S 180,48 240,44 S 270,42 285,42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeDasharray="4,3"
                      opacity="0.25"
                    />
                    {/* Erhöhte Grundspannung mit Spitzen */}
                    <path
                      d="M 15,35 C 40,33 55,32 70,33 S 85,30 90,18 S 95,32 110,32 S 140,30 155,32 S 165,28 170,14 S 175,32 195,31 S 220,30 235,31 S 250,28 255,20 S 260,32 285,30"
                      fill="none"
                      stroke="var(--color-sage-dark)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Labels */}
                    <text
                      x="15"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Mo
                    </text>
                    <text
                      x="82"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Di
                    </text>
                    <text
                      x="160"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Mi
                    </text>
                    <text
                      x="244"
                      y="68"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.45"
                    >
                      Do
                    </text>
                    {/* Legend */}
                    <line
                      x1="15"
                      y1="8"
                      x2="32"
                      y2="8"
                      stroke="var(--color-sage-dark)"
                      strokeWidth="2"
                    />
                    <text
                      x="35"
                      y="11"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.6"
                    >
                      Mit Angehörigem
                    </text>
                    <line
                      x1="140"
                      y1="8"
                      x2="157"
                      y2="8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeDasharray="3,2"
                      opacity="0.4"
                    />
                    <text
                      x="160"
                      y="11"
                      fontSize="7.5"
                      fill="currentColor"
                      opacity="0.6"
                    >
                      Ohne Belastung
                    </text>
                  </svg>
                  <p className="text-[11px] text-muted-foreground text-center mt-1">
                    Erhöhte Grundspannung kostet Energie — auch wenn äusserlich
                    "nichts passiert"
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Was im Alltag oft wirklich hilft"
              icon={<Heart className="w-7 h-7 text-sage-dark" />}
              id="was-hilft"
              preview="Nicht grosse Gesten, sondern Klarheit, Verlässlichkeit, ruhige Präsenz und begrenzte Verfügbarkeit tragen häufig am meisten."
            >
              <div className="grid gap-4">
                {[
                  {
                    title: "Verlässliche Absprachen",
                    description:
                      "Regelmässigkeit und angekündigte Änderungen entlasten oft stärker als spontane intensive Zuwendung.",
                    example:
                      '"Ich rufe dich heute Abend nach dem Essen an. Wenn ich mich verspäte, sage ich Bescheid."',
                    dialog: [
                      {
                        sprecher: "Betroffene Person",
                        text: "Du hast dich gestern gar nicht gemeldet.",
                      },
                      {
                        sprecher: "Sie",
                        text: "Du hast recht — ich hätte Bescheid geben sollen. Das war nicht gut. Heute Abend um 20 Uhr rufe ich an.",
                      },
                      {
                        sprecher: "Betroffene Person",
                        text: "Und wenn wieder nichts kommt?",
                      },
                      {
                        sprecher: "Sie",
                        text: "Dann schreibe ich kurz. Aber ich halte das ein.",
                      },
                    ],
                  },
                  {
                    title: "Klar sagen, was Sie meinen",
                    description:
                      "Doppeldeutigkeiten, Beschwichtigungen oder halbe Zusagen schaffen im Alltag oft mehr Unruhe als ehrliche Klarheit.",
                    example:
                      '"Ich brauche heute Abend Ruhe und bin morgen wieder ansprechbar."',
                    dialog: [
                      {
                        sprecher: "Betroffene Person",
                        text: "Kannst du heute noch vorbeikommen?",
                      },
                      {
                        sprecher: "Sie",
                        text: "Nein, heute nicht. Ich brauche den Abend für mich.",
                      },
                      {
                        sprecher: "Betroffene Person",
                        text: "Du willst also nicht.",
                      },
                      {
                        sprecher: "Sie",
                        text: "Ich will — und ich brauche heute Abstand. Morgen Nachmittag bin ich gerne da.",
                      },
                    ],
                  },
                  {
                    title: "Ruhige Präsenz statt hektisches Reparieren",
                    description:
                      "Nicht jede Stimmung muss sofort gelöst werden. Oft hilft es mehr, ansprechbar und klar zu bleiben, ohne alles zu optimieren.",
                    example:
                      '"Ich merke, dass heute viel Anspannung da ist. Ich bin da, aber wir müssen das nicht sofort lösen."',
                    dialog: [
                      {
                        sprecher: "Betroffene Person",
                        text: "Alles ist sinnlos. Es hat keinen Zweck mehr.",
                      },
                      {
                        sprecher: "Sie",
                        text: "Das klingt gerade sehr schwer. Ich bin da.",
                      },
                      { sprecher: "Betroffene Person", text: "[Schweigen]" },
                      {
                        sprecher: "Sie",
                        text: "Wir müssen das nicht sofort klären. Ich bleibe noch ein bisschen.",
                      },
                    ],
                  },
                  {
                    title: "Begrenzte Verfügbarkeit",
                    description:
                      "Viele Angehörige fühlen sich verpflichtet, rund um die Uhr erreichbar zu sein – dieses Gefühl ist verständlich, aber auf Dauer nicht tragfähig. Grenzen bei der Erreichbarkeit sind keine Ablehnung, sondern ein Weg, langfristig präsent bleiben zu können.",
                    example:
                      '"Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu."',
                    dialog: [
                      {
                        sprecher: "Betroffene Person",
                        text: "Es ist 23 Uhr und ich kann nicht schlafen. Du gehst nicht ran.",
                      },
                      {
                        sprecher: "Sie",
                        text: "Ich sehe deine Nachricht erst morgen früh. Nach 22 Uhr bin ich offline.",
                      },
                      {
                        sprecher: "Betroffene Person",
                        text: "Was soll ich denn jetzt tun?",
                      },
                      {
                        sprecher: "Sie",
                        text: "Für Notfälle gibt es die 143. Die ist immer da. Morgen früh melden wir uns.",
                      },
                    ],
                  },
                ].map(item => (
                  <Card key={item.title} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {item.description}
                      </p>
                      <div className="bg-sage-light/30 rounded-lg p-3 mb-3">
                        <p className="text-sm text-foreground italic">
                          {item.example}
                        </p>
                      </div>
                      <div className="space-y-1.5 border-t border-border/40 pt-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Wie das klingen kann
                        </p>
                        {item.dialog.map((zeile, i) => (
                          <div
                            key={i}
                            className={`flex gap-2 text-sm ${zeile.sprecher === "Sie" ? "flex-row-reverse" : ""}`}
                          >
                            <span
                              className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full h-fit mt-0.5 ${zeile.sprecher === "Sie" ? "bg-sage-wash text-sage-dark" : "bg-muted text-muted-foreground"}`}
                            >
                              {zeile.sprecher === "Sie" ? "Sie" : "BP"}
                            </span>
                            <p
                              className={`text-sm leading-snug ${zeile.sprecher === "[Schweigen]" ? "italic text-muted-foreground" : "text-foreground"}`}
                            >
                              {zeile.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Nach Konflikten und Rückzug"
              icon={<Users className="w-7 h-7 text-sage-mid" />}
              id="rueckzug"
              preview="Viele Beziehungen leiden weniger nur an Streit als an dem, was danach folgt: Schweigen, Unsicherheit, Funkstille oder ein vorsichtiger Neustart."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Nach Konflikten entsteht oft ein belastender Zwischenraum.
                  Angehörige wissen nicht, ob sie nachgehen oder Abstand lassen
                  sollen, ob Schweigen beruhigt oder eskaliert, ob ein Gespräch
                  hilfreich wäre oder zu früh käme.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Hilfreich kann sein
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>ein kurzes, klares Kontaktangebot</li>
                        <li>nicht drängen, aber auch nicht strafen</li>
                        <li>später aufgreifen, was passiert ist</li>
                        <li>
                          zwischen Raum geben und Beziehungsabbruch
                          unterscheiden
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Weniger hilfreich ist oft
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>mehrfach nachfassen aus Panik</li>
                        <li>Gegenrückzug aus Verletzung</li>
                        <li>so tun, als wäre nichts gewesen</li>
                        <li>mitten im Alarm sofort alles klären wollen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-sage-light/10 border-sage">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Im Alltag ist nach einem Bruch oft nicht Perfektion
                      gefragt, sondern ein ruhiger, begrenzter Wiedereinstieg in
                      Kontakt.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Beziehungs-Achtsamkeit im echten Alltag"
              icon={<Users className="w-7 h-7 text-slate-blue" />}
              id="beziehungs-achtsamkeit"
              preview="Bewusst wahrnehmen, was gerade passiert, hilft vor allem dann, wenn Sie sonst in Alarm, Rechtfertigung oder Überanpassung kippen würden."
            >
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "kurz innehalten",
                    description:
                      "Nicht sofort reagieren, wenn Sie merken, dass Sie innerlich in Alarm gehen.",
                  },
                  {
                    step: "2",
                    title: "die Lage genauer lesen",
                    description:
                      "Was ist gerade wirklich los: Angst, Kränkung, Rückzug, Überforderung, alte Dynamik?",
                  },
                  {
                    step: "3",
                    title: "auch sich selbst wahrnehmen",
                    description:
                      "Sind Sie gerade hilfsbereit, erschöpft, gereizt, schuldig oder im Rettungsmodus?",
                  },
                  {
                    step: "4",
                    title: "bewusst und begrenzt handeln",
                    description:
                      "Nicht alles tun, was Beziehung sofort beruhigt, sondern das, was längerfristig tragfähig ist.",
                  },
                ].map(item => (
                  <Card key={item.step} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-full bg-sage-mid text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.step}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Kleine positive Inseln schaffen"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="positive-inseln"
              preview="Beziehung darf nicht nur aus Klärung, Kontrolle, Sorge und Krisenmanagement bestehen. Kleine unbelastete Momente sind kein Luxus."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Wenn eine Beziehung fast nur noch um Symptome, Anspannung und
                  Konflikt kreist, verliert sie ihre tragenden Anteile.
                  Alltagshilfe heisst deshalb auch, kleine gemeinsame Momente zu
                  schützen, die nicht sofort funktional sein müssen.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "kurzer Spaziergang",
                      examples: "ohne sofortiges Problemgespräch",
                    },
                    {
                      title: "gemeinsames Essen",
                      examples: "mit klarer zeitlicher Begrenzung",
                    },
                    {
                      title: "etwas Vertrautes wiederholen",
                      examples: "ein kleines Ritual, das nicht überfordert",
                    },
                    {
                      title: "15 ruhige Minuten",
                      examples: "ohne Lösungssuche, ohne Handy, ohne Druck",
                    },
                  ].map(item => (
                    <Card key={item.title} className="border-border/50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.examples}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="mt-2 bg-sand-muted border-sand-mid">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Wichtig:</strong>{" "}
                      Positive Momente sind keine Gegenbeweise gegen Belastung.
                      Sie sind eher kleine Ressourceninseln, die Beziehungen
                      etwas atmungsfähiger machen können.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Sie konkret tun können"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="konkrete-schritte"
              preview="Praktische Alltagshilfen sind oft einfach, aber nicht leicht: klar bleiben, Rückmeldungen dosieren, Fortschritte benennen und nicht alles übernehmen."
            >
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Fortschritte benennen
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Nicht überloben, aber wahrnehmen, wenn etwas weniger
                      zerstörerisch, etwas bewusster oder etwas klarer gelungen
                      ist.
                    </p>
                    <div className="bg-sage-lighter/50 rounded-lg p-3">
                      <p className="text-sm text-foreground italic">
                        "Ich habe gemerkt, dass du dich heute zurückgezogen
                        hast, ohne dass es ganz eskaliert ist. Das war nicht
                        leicht."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Fragen statt übernehmen
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Alltagshilfe wird tragfähiger, wenn Sie nicht alles lösen,
                      sondern Beteiligung und Eigenanteil offenlassen.
                    </p>
                    <div className="space-y-2">
                      {[
                        "Was wäre dein Vorschlag?",
                        "Was brauchst du gerade von mir, und was eher nicht?",
                        "Soll ich einfach da sein oder mit dir mitdenken?",
                      ].map(item => (
                        <div
                          key={item}
                          className="bg-sage-lighter/50 rounded-lg p-3"
                        >
                          <p className="text-sm text-foreground italic">
                            "{item}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">
                      Vorhersehbar bleiben
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Änderungen möglichst früh ankündigen",
                        "Versprechen halten oder offen revidieren",
                        "Erreichbarkeit klar benennen",
                        "nicht jedes Mal völlig anders reagieren",
                      ].map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Wenn Impulsivität ausbricht"
              icon={<Zap className="w-7 h-7 text-amber-600" />}
              id="impulsivitaet"
              preview="Plötzliche Entscheidungen, Ausgaben, Risikoverhalten – dieser Alltag ist anders als Depression. Wie Sie reagieren, ohne zu moralisieren, und Ihre Grenzen dennoch halten."
            >
              <div className="space-y-6">
                <Card className="border-l-4 border-l-slate-200 bg-slate-50/40">
                  <CardContent className="p-4 flex items-start gap-3">
                    <span className="text-sage-mid mt-0.5 shrink-0">→</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wird die Situation akut – Selbst- oder Fremdgefährdung,
                      unkontrollierbare Eskalation?{" "}
                      <Link
                        href="/unterstuetzen/krise"
                        className="text-sage-dark underline underline-offset-2 hover:text-sage-mid font-medium"
                      >
                        Krisenbegleitung →
                      </Link>
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-amber-400 bg-amber-50/40">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground leading-relaxed">
                      Borderline zeigt sich nicht nur als Rückzug und
                      Erschöpfung. Manche Phasen sind geprägt von{" "}
                      <strong className="text-foreground">Impulsivität</strong>:
                      plötzliche Grossausgaben, Kündigung ohne Plan, riskante
                      Beziehungsentscheidungen, Substanzkonsum, Fahrtabenteuer
                      oder abrupte Ortsveränderungen. Für Angehörige kann das
                      überraschender und belastender sein als depressive Phasen
                      – weil es Konsequenzen hat, die beide betreffen.
                    </p>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage-mid" />
                    Zeichen einer impulsiven Phase erkennen
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Getriebensein",
                        sub: "Ruhelosigkeit, Drang zu handeln, kann nicht warten",
                      },
                      {
                        label: "Konsequenzblindheit",
                        sub: "Folgen werden ausgeblendet oder kleingredet",
                      },
                      {
                        label: "Grossausgaben",
                        sub: "Spontankäufe, Schulden, finanzielle Risiken",
                      },
                      {
                        label: "Abrupte Entscheidungen",
                        sub: "Job kündigen, Beziehung beenden, umziehen",
                      },
                      {
                        label: "Substanzkonsum",
                        sub: "Alkohol, Cannabis oder andere Mittel als Ventil",
                      },
                      {
                        label: "Risikoverhaltens",
                        sub: "Fahren unter Einfluss, ungeschützter Sex, Gewalt",
                      },
                    ].map(item => (
                      <div
                        key={item.label}
                        className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border/40"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
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
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sage-mid" />
                    Wichtige Unterscheidung
                  </h3>
                  <Card className="bg-sage-wash/50 border-sage/30">
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Impulsive Handlungen entstehen oft aus{" "}
                        <strong className="text-foreground">
                          intensivem emotionalen Druck
                        </strong>
                        , nicht aus Rücksichtslosigkeit oder bösem Willen. Das
                        bedeutet nicht, dass Sie die Konsequenzen tragen müssen
                        – aber es hilft, nicht mit «Das ist unverantwortlich»
                        oder «Wie konntest du nur» zu antworten. Moralische
                        Vorwürfe in der Phase selbst verändern nichts und
                        verstärken meist Scham und Eskalation.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-sage-mid" />
                    Drei Szenarien – was hilft, was nicht
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        titel: "Grossausgaben / finanzielle Risiken",
                        hilft: [
                          "Finanzielle Grenzen klar benennen: «Ich werde diese Ausgabe nicht mittragen.»",
                          "Gemeinsame Konten getrennt halten, wenn das Muster bekannt ist",
                          "In ruhiger Phase ansprechen: «Mir ist aufgefallen, dass du in letzter Zeit viel ausgibst. Das macht mir Sorge.»",
                        ],
                        nichtHilft: [
                          "Ausgaben heimlich rückgängig machen",
                          "Moralisieren («Du bist so unverantwortlich»)",
                          "Einfach zahlen, um Streit zu vermeiden",
                        ],
                      },
                      {
                        titel:
                          "Abrupte Entscheidungen (Kündigung, Umzug, Trennung)",
                        hilft: [
                          "Nicht sofort mitentscheiden – Reaktionszeit einfordern: «Lass uns das in drei Tagen nochmal besprechen.»",
                          "Bedenken ruhig formulieren: «Ich mache mir Sorgen, weil... Hast du das bedacht?»",
                          "Akzeptieren, dass Sie die Entscheidung nicht verhindern können",
                        ],
                        nichtHilft: [
                          "Sofort in Panik verfallen oder Ultimaten stellen",
                          "Die Entscheidung als Angriff auf Sie interpretieren",
                          "Verantwortung für die Folgen übernehmen",
                        ],
                      },
                      {
                        titel: "Substanzkonsum / Risikoverhalten",
                        hilft: [
                          "Eigene Sicherheit priorisieren: Fahren mit unter Einfluss stehender Person ablehnen",
                          "Konkret und ohne Urteil benennen: «Ich mache mir Sorgen, wie viel du trinkst.»",
                          "Therapeutin oder Fachstelle einbeziehen, wenn das Muster anhält",
                        ],
                        nichtHilft: [
                          "Konsum verstecken oder normalisieren",
                          "Kontrolle übernehmen («Ich verstecke die Flaschen»)",
                          "Drohen und nicht handeln",
                        ],
                      },
                    ].map(szenario => (
                      <Card key={szenario.titel} className="border-border/50">
                        <CardContent className="p-5">
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                            {szenario.titel}
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-sage-dark mb-2 uppercase tracking-wide">
                                Hilft eher
                              </p>
                              <ul className="space-y-1.5">
                                {szenario.hilft.map(p => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                  >
                                    <span className="text-sage-mid mt-0.5">
                                      ✓
                                    </span>
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                                Hilft weniger
                              </p>
                              <ul className="space-y-1.5">
                                {szenario.nichtHilft.map(p => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                  >
                                    <span className="text-muted-foreground/60 mt-0.5">
                                      ✗
                                    </span>
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Card className="border-l-4 border-l-sage-mid bg-sage-wash/30">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-sage-mid" />
                      Nach der impulsiven Phase: Scham und Reue
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nach impulsiven Phasen folgt oft massive{" "}
                      <strong className="text-foreground">Scham</strong> –
                      manchmal Rückzug, manchmal übermässige Entschuldigungen.
                      Beides braucht eine ruhige Antwort: Anerkennen, was
                      passiert ist, ohne es kleinzureden oder aufzubauschen.
                      Erst wenn die Emotionen sich gelegt haben, ist der Moment
                      für ein echtes Gespräch über Konsequenzen und nächste
                      Schritte.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Grenzen der Alltagsunterstützung"
              icon={<AlertTriangle className="w-7 h-7 text-sage-mid" />}
              id="grenzen"
              preview="Auch im Alltag gibt es Grenzen. Sie müssen nicht perfekt sein, aber Sie sollten Ihre Erschöpfung und Ihre roten Linien ernst nehmen."
            >
              <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Auch im Alltag können Sie nicht alles halten. Sie können
                    nicht:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "die Emotionen Ihres Angehörigen dauerhaft regulieren",
                      "alle Trigger vermeiden",
                      "jede Eskalation verhindern",
                      "Therapie oder Krisenhilfe ersetzen",
                    ].map(item => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-sage-mid">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <strong className="text-foreground">
                      Das ist keine Niederlage.
                    </strong>{" "}
                    Alltag wird nicht durch Perfektion tragfähig, sondern durch
                    Klarheit, Wiederholbarkeit und die Bereitschaft, auch Ihre
                    eigene Grenze ernst zu nehmen.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/uebersicht">
                <Button variant="ghost">← Wie kann ich helfen?</Button>
              </Link>
              <Link href="/unterstuetzen/krise">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Krisen begleiten
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
