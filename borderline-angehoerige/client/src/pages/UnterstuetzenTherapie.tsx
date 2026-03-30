import SEO from "@/components/SEO";
import UnterstuetzenSubNav from "@/components/UnterstuetzenSubNav";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Heart,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import {
  GELB,
  kontaktByIdStrict,
  emailByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";

const hype = kontaktByIdStrict("INFO_PUK_KJPP_HYPE");
const emailKjpp = emailByIdStrict("EMAIL_KJPP");
const pukZentrale = kontaktByIdStrict("INFO_PUK_ZENTRALE");
const emailHard = emailByIdStrict("EMAIL_HARD");
const clieniaUrl = urlByIdStrict("URL_CLIENIA");
const dbtDachUrl = urlByIdStrict("URL_DBT_DACH");

export default function UnterstuetzenTherapie() {
  return (
    <Layout>
      <SEO
        title="Therapie unterstützen"
        description="Wie Angehörige Behandlung unterstützen können, ohne mitzubehandeln oder die Verantwortung zu übernehmen."
        path="/unterstuetzen/therapie"
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
                <Stethoscope className="w-6 h-6 text-slate-blue" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 10 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Therapie begleiten
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Professionelle Therapie ist ein zentraler Baustein im
              Genesungsprozess. Angehörige können diesen Weg unterstützen, aber
              nicht für den anderen übernehmen. Genau diese Grenze macht
              Therapiebegleitung oft so anspruchsvoll.
            </p>
          </motion.div>
        </div>
      </section>

      <UnterstuetzenSubNav />

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Was Angehörige in der Therapie wirklich tun können"
              icon={<Users className="w-7 h-7 text-slate-blue" />}
              id="rolle"
              defaultOpen={true}
              preview="Hilfreiche Therapiebegleitung bedeutet meist: ermutigen, strukturieren, entlasten und realistisch bleiben, ohne selbst mitzubehandeln."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Angehörige können ermutigen, Termine unterstützen,
                  Veränderungen wahrnehmen und Rückschläge einordnen helfen. Sie
                  können aber keine Therapie ersetzen, keine Motivation
                  erzwingen und nicht stellvertretend regulieren, was in
                  Behandlung bearbeitet werden muss.
                </p>
                <Card className="bg-slate-wash border-slate-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Eine hilfreiche innere Frage lautet oft nicht: Wie bringe
                      ich die Therapie zum Funktionieren? Sondern: Wie kann ich
                      den Rahmen mittragen, ohne selbst zur Behandlung zu
                      werden?
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Als Angehörige/r mit dem Behandlungssystem zusammenarbeiten"
              icon={<MessageCircle className="w-7 h-7 text-slate-blue" />}
              id="zusammenarbeit"
              preview="Sie sind nicht Teil der Therapie – und das ist oft richtig so. Aber es gibt konstruktive Wege, mit dem klinischen Team in Kontakt zu treten."
            >
              <div className="space-y-5">
                <Card className="border-l-4 border-l-slate-blue/40 bg-slate-50/40">
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dass Sie nicht in jede Sitzung eingeladen werden, ist
                      meistens{" "}
                      <strong className="text-foreground">
                        therapeutisch beabsichtigt
                      </strong>{" "}
                      – nicht Ablehnung. Die Therapie braucht einen geschützten
                      Raum. Trotzdem gibt es Situationen, in denen Kontakt
                      sinnvoll und berechtigt ist.
                    </p>
                  </CardContent>
                </Card>

                {/* 6 Szenarien */}
                {[
                  {
                    icon: Users,
                    titel: "Der Therapeut lädt mich nicht zur Sitzung ein",
                    inhalt: [
                      "Das ist oft korrekt – Vertrauen zwischen Therapeut und Patient braucht Schutz",
                      "Was Sie trotzdem tun können: um einen einzelnen Angehörigentermin bitten (1–2× pro Jahr)",
                      "Kurzer Brief: «Ich möchte verstehen, wie ich unterstützen kann, ohne zu schaden» – Therapeutin kann orientieren, ohne vertrauliche Inhalte zu teilen",
                      "Nicht hilfreich: ständiges Drängen auf Informationen oder «bessere Einbindung»",
                    ],
                  },
                  {
                    icon: Heart,
                    titel: "Ich möchte über meine eigene Belastung sprechen",
                    inhalt: [
                      "Das ist berechtigt – Sie dürfen Orientierung für Ihre eigene Rolle suchen",
                      "Bitten Sie um eine «Beratungssitzung nur für Angehörige» (ohne die betroffene Person)",
                      "Ziel: Sie bekommen Orientierung – keine Mitbehandlung, keine Diagnose",
                      "Gute Fragen: «Wie reagiere ich auf X? Wann ist etwas Sorge, wann überreagiere ich?»",
                    ],
                  },
                  {
                    icon: RefreshCw,
                    titel: "Die Therapie scheint zu stagnieren",
                    inhalt: [
                      "Bedenken Sie: Sie sehen nicht, was in der Therapie passiert – Vertrauensaufbau dauert oft Monate",
                      "Wenn Sie wirklich besorgt sind: konkrete Beobachtungen formulieren, nicht Urteile",
                      "Formulierungsbeispiel: «Mir ist aufgefallen, dass sich die Selbstverletzungen nicht bessern. Ist das ein normaler Teil des Prozesses?»",
                      "Therapeut wird erklären oder reagieren – Zweitmeinung ist nach einem Jahr ohne Fortschritt berechtigt",
                    ],
                  },
                  {
                    icon: AlertTriangle,
                    titel: "Ich vermute, dass mein Angehöriger nicht mitmacht",
                    inhalt: [
                      "Direkt ansprechen (in stabiler Phase): «Mir scheint, dass die Therapie für dich gerade schwierig ist. Was macht sie dir schwierig?»",
                      "Sie können Motivation nicht erzwingen – aber Sie können Interesse zeigen",
                      "Nur bei Sicherheitsgefährdung: eigenständig Kontakt mit Therapeutin aufnehmen",
                      "Therapieverweigerung ist oft Teil des Krankheitsbildes – nicht persönlich nehmen",
                    ],
                  },
                  {
                    icon: Lightbulb,
                    titel: "Was sollte ich dem Behandlungsteam berichten?",
                    inhalt: [
                      "Relevant: Sicherheitsrisiken (Suizidgedanken, Selbstverletzung, Gewalt), grösste Beziehungsherausforderungen, was funktioniert",
                      "Nicht nötig: tägliche Detailberichte – das überfordert und schadet der Therapiebeziehung",
                      "Kurze, konkrete Nachrichten (1–2× pro Monat reicht meist)",
                      "Fragen statt Diagnosen: «Mir fällt auf, dass … – Ist das Teil des Prozesses?»",
                    ],
                  },
                  {
                    icon: Shield,
                    titel: "Nach einer Krise: Nachsorge koordinieren",
                    inhalt: [
                      "Fragen Sie aktiv: «Gibt es einen Nachsorgeplan für die nächsten 2 Wochen? Wie kann ich unterstützen?»",
                      "Klare Absprache: Wer macht was? Therapeutin, Angehöriger, betroffene Person",
                      "Notfallkontakt klären: «Wenn es wieder kritisch wird, rufe ich … an?»",
                      "Kurze Zusammenfassung nach Klinikaufenthalt einfordern – Sie müssen nicht blind weiterarbeiten",
                    ],
                  },
                ].map(szenario => (
                  <Card key={szenario.titel} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <szenario.icon className="w-4 h-4 text-slate-blue shrink-0" />
                        {szenario.titel}
                      </h3>
                      <ul className="space-y-1.5">
                        {szenario.inhalt.map(punkt => (
                          <li
                            key={punkt}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-sage-mid mt-0.5 shrink-0">
                              →
                            </span>
                            {punkt}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                {/* Warnsignale problematische Therapie */}
                <Card className="border-l-4 border-l-amber-400 bg-amber-50/40">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Warnsignale für eine problematische Therapiesituation
                    </h3>
                    <ul className="space-y-1.5">
                      {[
                        "Therapeut kritisiert Angehörige offen vor Patient («Sie sind das Problem»)",
                        "Kein Kontakt möglich, auch nicht bei konkreten Sicherheitsbedenken",
                        "Patient wird von Familie isoliert («Vertrau nur mir, nicht deinem Partner»)",
                        "Jahre Therapie ohne jede erkennbare Veränderung oder Reflexion darüber",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-amber-500 mt-0.5 shrink-0">
                            !
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-amber-200">
                      <strong className="text-foreground">Dann:</strong>{" "}
                      Zweitmeinung einholen oder Therapeutenwechsel ansprechen –
                      das ist legitim und manchmal notwendig.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Therapieformen knapp eingeordnet"
              icon={<Brain className="w-7 h-7 text-slate-blue" />}
              id="therapieformen"
              preview="DBT, MBT und Schematherapie sind wichtige evidenzbasierte Ansätze. Für Angehörige ist oft weniger die Theorie als die Passung im Alltag entscheidend."
            >
              <div className="space-y-4">
                {[
                  {
                    name: "DBT",
                    description:
                      "Stark strukturiert, mit Fokus auf Emotionsregulation, Stresstoleranz, Achtsamkeit und zwischenmenschliche Skills.",
                  },
                  {
                    name: "MBT",
                    description:
                      "Konzentriert sich auf das Verstehen eigener und fremder innerer Zustände und auf Beziehungsgeschehen.",
                  },
                  {
                    name: "Schematherapie",
                    description:
                      "Arbeitet mit frühen Prägungen, Beziehungsmustern und inneren Zuständen, die unter Stress reaktiv werden.",
                  },
                ].map(item => (
                  <Card key={item.name} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Für Angehörige ist meist wichtiger als das perfekte
                      Therapielabel, ob Behandlung tragfähig beginnt, ob Krisen
                      professionell eingebettet werden und ob der Prozess über
                      Zeit gehalten werden kann.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Wie Sie den Therapieprozess unterstützen können"
              icon={<Lightbulb className="w-7 h-7 text-sage-dark" />}
              id="unterstuetzen"
              preview="Hilfreich ist meist sanfte Unterstützung ohne Druck: Orientierung geben, Veränderungen wahrnehmen, eigene Erwartungen regulieren."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Therapie als Möglichkeit ansprechen, nicht als Drohkulisse",
                  "bei Organisation helfen, wenn das erwünscht ist",
                  "Skills und neue Schritte bemerken, ohne zu kontrollieren",
                  "Fortschritte konkret benennen statt pauschal zu loben",
                  "Rückschläge einordnen, ohne sie zu dramatisieren",
                  "eigene Unterstützung unabhängig von der Therapiebereitschaft suchen",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Erstkontakt mit dem Therapeuten – Musterbrief"
              icon={<Mail className="w-7 h-7 text-sage-mid" />}
              id="musterbrief"
              preview="Eine kurze, klare E-Mail kann den Einstieg erleichtern. Hier ein Muster, das Sie anpassen können."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Wenn Sie als Angehörige/r Kontakt mit dem Therapeuten
                  aufnehmen möchten – z. B. um sich zu informieren oder Ihre
                  Perspektive einzubringen – kann eine kurze schriftliche
                  Nachricht helfen. Das Muster unten dient als Ausgangspunkt.
                </p>
                <Card className="border-border/50 bg-cream">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Muster-E-Mail
                    </p>
                    <div className="font-mono text-sm text-foreground leading-relaxed space-y-3 whitespace-pre-line">
                      <p>
                        {`Betreff: Kurze Anfrage als Angehörige/r von [Vorname]

Sehr geehrte/r Frau/Herr [Name],

ich bin [Ihre Beziehung zur Person, z. B. Mutter / Partner] von [Vorname], der/die bei Ihnen in Behandlung ist.

Ich möchte Sie nicht in die Behandlung einbeziehen oder Informationen über meinen Angehörigen einholen – das liegt allein bei ihm/ihr.

Mir wäre es wichtig zu wissen, ob es für Angehörige die Möglichkeit gibt, einmal kurz mit Ihnen zu sprechen – nicht über die Therapie, sondern über meine eigene Rolle und Unterstützungsmöglichkeiten.

Mit freundlichen Grüssen,
[Ihr Name]
[Optional: Telefonnummer für Rückruf]`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-sage-wash/40 border border-sage/30">
                  <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Wichtig:</strong> Der
                    Therapeut ist an die Schweigepflicht gebunden und darf ohne
                    Einwilligung Ihres Angehörigen keine Inhalte der Behandlung
                    besprechen. Das ist kein Ablehnen – sondern professionelles
                    Handeln.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Rückschläge und Unterbrüche"
              icon={<RefreshCw className="w-7 h-7 text-sage-mid" />}
              id="rueckschlaege"
              preview="Therapie verläuft selten gradlinig. Abbrüche, Krisen oder Phasen von Widerstand bedeuten nicht automatisch, dass alles umsonst war."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige erleben Therapiebegleitung als Achterbahn:
                  Hoffnung, erster Fortschritt, erneute Krise, Rückzug,
                  vielleicht ein Therapieabbruch und später ein neuer Anlauf.
                  Solche Unterbrüche sind belastend, aber nicht ungewöhnlich.
                </p>
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground leading-relaxed">
                      Hilfreich ist dann meist weder Druck noch Resignation,
                      sondern ein nüchterner Blick: Was hat geholfen? Wo wurde
                      es zu viel? Was wäre der nächste tragfähige Schritt?
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Ihre Rolle ausdrücklich nicht ist"
              icon={<Heart className="w-7 h-7 text-sage-dark" />}
              id="nicht-ihre-rolle"
              preview="Gerade engagierte Angehörige geraten leicht in eine Nebenrolle als Coach, Therapeut oder Krisenmanager. Das ist verständlich, aber selten tragfähig."
            >
              <div className="space-y-3">
                {[
                  "Sie müssen nicht Therapiesprache permanent in den Alltag übersetzen.",
                  "Sie müssen nicht jedes Verhalten analysieren oder mit Fachbegriffen einordnen.",
                  "Sie sind nicht dafür zuständig, Motivation dauerhaft aufrechtzuerhalten.",
                  "Sie müssen Behandlungsfortschritt nicht kontrollieren oder überwachen.",
                ].map(item => (
                  <Card key={item} className="border-border/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Therapieangebote im Kanton Zürich"
              icon={<MapPin className="w-7 h-7 text-sage-dark" />}
              id="therapieangebote"
              preview="Ausgewählte spezialisierte Angebote und Suchwege für Jugendliche, Erwachsene und weiterführende Behandlung."
            >
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  {
                    icon: Home,
                    label: "Ambulant",
                    desc: "Regelmässige Termine, Leben zu Hause",
                  },
                  {
                    icon: Calendar,
                    label: "Teilstationär",
                    desc: "Tagesklinik, abends zu Hause",
                  },
                  {
                    icon: Building2,
                    label: "Stationär",
                    desc: "Aufenthalt in der Klinik",
                  },
                ].map(setting => (
                  <div
                    key={setting.label}
                    className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg"
                  >
                    <setting.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-foreground text-sm">
                        {setting.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {setting.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="border-2 border-slate-light mb-4">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">
                    HYPE ZÜRI
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Frühinterventionsangebot für Jugendliche ab 13 Jahren mit
                    Verdacht, Risiko oder bereits diagnostizierter
                    Borderline-Störung.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${hype.tel}`}
                      className="text-sm text-slate-mid hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> {hype.nummer}
                    </a>
                    <a
                      href={`mailto:${emailKjpp.adresse}`}
                      className="text-sm text-slate-mid hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> {emailKjpp.adresse}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-sage-light mb-4">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">
                    PUK Zürich – Erwachsene
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Spezialisierte DBT-orientierte Behandlungsangebote für
                    Erwachsene.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${pukZentrale.tel}`}
                      className="text-sm text-sage-dark hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> {pukZentrale.nummer}
                    </a>
                    <a
                      href={`mailto:${emailHard.adresse}`}
                      className="text-sm text-sage-dark hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> {emailHard.adresse}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Clienia Schlössli
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Weiterführendes stationäres Emotionsregulationsprogramm.
                    </p>
                    <a
                      href={clieniaUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sage-dark hover:underline flex items-center gap-1"
                    >
                      Website besuchen <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      DBT-Therapeutensuche
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Suchweg für zertifizierte DBT-Therapeutinnen und
                      -Therapeuten.
                    </p>
                    <a
                      href={dbtDachUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sage-dark hover:underline flex items-center gap-1"
                    >
                      Therapeutensuche <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-4 bg-sage-wash border-sand-border">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sage-mid" />
                    Notfall-Nummern PUK Zürich (24/7)
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {GELB.filter(k => k.id !== "GELB_KIZ").map(k => (
                      <div key={k.id}>
                        <p className="text-xs text-muted-foreground">
                          {k.fuerWen || k.label}
                        </p>
                        <a
                          href={`tel:${k.tel}`}
                          className="text-sm font-semibold text-foreground hover:underline"
                        >
                          {k.nummer}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

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

              <Card className="bg-sand-muted border-sand-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Infografiken und Handouts zur Therapiebegleitung finden Sie
                    gesammelt auf der Materialien-Seite.
                  </p>
                  <Link href="/materialien">
                    <Button variant="outline" size="sm">
                      Zur Materialien-Seite
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/alltag">
                <Button variant="ghost">← Im Alltag unterstützen</Button>
              </Link>
              <Link href="/unterstuetzen/krise">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: In der Krise unterstützen
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
