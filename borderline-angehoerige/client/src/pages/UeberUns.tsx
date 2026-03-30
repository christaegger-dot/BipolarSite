import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Heart,
  BookOpen,
  Shield,
  Users,
  Mail,
  ExternalLink,
  Target,
  FileText,
} from "lucide-react";
import { Link } from "wouter";

export default function UeberUns() {
  return (
    <Layout>
      <SEO
        title="Über uns"
        description="Über das Projekt Borderline · Hilfe für Angehörige."
        path="/ueber-uns"
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
                <Heart className="w-6 h-6 text-sage-mid" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Über diese Website
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Warum es diese Website gibt – und wer dahinter steht.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Motivation – immer offen */}
            <ContentSection
              title="Warum diese Website?"
              icon={<Target className="w-7 h-7 text-sage-dark" />}
              id="motivation"
              defaultOpen={true}
              preview="Angehörige stehen oft vor einer doppelten Herausforderung: helfen wollen und sich hilflos fühlen."
            >
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Wenn ein nahestehender Mensch eine
                  Borderline-Persönlichkeitsstörung hat, stehen Angehörige oft
                  vor einer doppelten Herausforderung: Sie wollen helfen – und
                  fühlen sich gleichzeitig hilflos. Sie lieben – und sind
                  erschöpft. Sie verstehen nicht, was passiert – und haben
                  Angst, etwas falsch zu machen.
                </p>

                <p className="leading-relaxed mb-4">
                  Der Begriff «Eiertanz» aus dem Standardwerk von Paul T. Mason
                  und Randi Kreger beschreibt dieses Gefühl treffend: das
                  ständige Auf-der-Hut-Sein, die Angst vor dem nächsten
                  Ausbruch, das Gefühl, auf Eierschalen zu laufen.
                </p>

                <p className="leading-relaxed">
                  Diese Website möchte Angehörigen fachlich fundierte
                  Orientierung geben – nicht um eine Erkrankung von aussen zu
                  «lösen», sondern um Dynamiken besser einzuordnen, tragfähiger
                  zu reagieren und sich selbst nicht zu verlieren.
                </p>
              </div>
            </ContentSection>

            {/* Prinzipien */}
            <ContentSection
              title="Unsere Prinzipien"
              icon={<Shield className="w-7 h-7 text-sage-mid" />}
              id="prinzipien"
              preview="Evidenzbasiert, entstigmatisierend, selbstfürsorge-orientiert und praxisnah."
            >
              <div className="grid gap-4">
                {[
                  {
                    icon: BookOpen,
                    title: "Evidenzbasiert",
                    description:
                      "Alle Inhalte basieren auf wissenschaftlicher Forschung und bewährten Therapieansätzen wie DBT (Dialektisch-Behaviorale Therapie). Wir nennen unsere Quellen.",
                  },
                  {
                    icon: Heart,
                    title: "Entstigmatisierend",
                    description:
                      "Borderline ist eine behandelbare Erkrankung, keine Charakterschwäche. Wir vermeiden schuldzuweisende Sprache und fördern Verständnis für alle Beteiligten.",
                  },
                  {
                    icon: Shield,
                    title: "Selbstfürsorge-orientiert",
                    description:
                      "Angehörige können nur helfen, wenn sie selbst gesund bleiben. Grenzen setzen ist kein Verrat, sondern notwendig für eine nachhaltige Beziehung.",
                  },
                  {
                    icon: Users,
                    title: "Praxisnah",
                    description:
                      "Theorie allein hilft selten. Deshalb verbinden wir Hintergrundwissen mit Orientierung für reale Gesprächs-, Krisen- und Belastungssituationen.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-sage-mid" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ContentSection>

            {/* Quellen */}
            <ContentSection
              title="Wissenschaftliche Grundlagen"
              icon={<FileText className="w-7 h-7 text-slate-blue" />}
              id="ueber-uns-quellen"
              preview="DBT, Family Connections und die Standardwerke von Mason/Kreger und Kreisman/Straus."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die Inhalte dieser Website stützen sich auf etablierte Forschung
                und Therapieansätze:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Dialektisch-Behaviorale Therapie (DBT)",
                    author: "Marsha M. Linehan",
                    description:
                      "Die evidenzbasierte Standardtherapie für Borderline, entwickelt in den 1980er Jahren.",
                  },
                  {
                    title: "Stop Walking on Eggshells",
                    author: "Paul T. Mason & Randi Kreger",
                    description:
                      "Das Standardwerk für Angehörige, Grundlage für den Namen dieser Website.",
                  },
                  {
                    title: "Ich hasse dich – verlass mich nicht",
                    author: "Jerold J. Kreisman & Hal Straus",
                    description:
                      "Klassiker zum Verständnis der Borderline-Dynamik aus Betroffenen- und Angehörigensicht.",
                  },
                  {
                    title: "Family Connections",
                    author: "NEA-BPD / Alan Fruzzetti",
                    description:
                      "Evidenzbasiertes Programm für Angehörige, entwickelt an der University of Nevada.",
                  },
                ].map((source, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-cream border border-border/30"
                  >
                    <p className="font-medium text-foreground">
                      {source.title}
                    </p>
                    <p className="text-sm text-sage-dark">{source.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {source.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                Eine vollständige Liste unserer Buchempfehlungen finden Sie auf
                der{" "}
                <Link
                  href="/buchempfehlungen"
                  className="text-sage-mid hover:underline"
                >
                  Buchempfehlungen-Seite
                </Link>
                .
              </p>
            </ContentSection>

            {/* Hinweis – bleibt als motion.div */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-sage-mid/30 bg-cream">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Wichtiger Hinweis
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Diese Website ersetzt keine professionelle Beratung,
                    Therapie oder medizinische Behandlung. Die Inhalte dienen
                    der Information und Orientierung. Bei akuten Krisen wenden
                    Sie sich bitte an die{" "}
                    <Link
                      href="/soforthilfe"
                      className="text-alert hover:underline font-medium"
                    >
                      Notfallnummern
                    </Link>
                    . Für eine individuelle Beratung empfehlen wir den Kontakt
                    zu{" "}
                    <Link
                      href="/beratung"
                      className="text-sage-mid hover:underline font-medium"
                    >
                      Beratungsstellen
                    </Link>{" "}
                    oder{" "}
                    <Link
                      href="/unterstuetzen/therapie#therapieangebote"
                      className="text-sage-mid hover:underline font-medium"
                    >
                      spezialisierten Therapeuten
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Einordnung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-sage-mid/20 bg-sage-wash/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Einordnung
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed mb-2">
                    Erstellt von Ch. Egger innerhalb der Fachstelle
                    Angehörigenarbeit. Die inhaltliche Verantwortung liegt bei
                    der Fachstelle Angehörigenarbeit.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Eigenständig gestaltetes Informationsangebot der Fachstelle
                    Angehörigenarbeit. Kein offizieller Kommunikationskanal der
                    PUK Zürich.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                Feedback & Kontakt
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Haben Sie Anregungen, Fragen oder möchten Sie einen Fehler
                melden? Wir freuen uns über Ihr Feedback.
              </p>

              <Link href="/feedback">
                <Card className="border-border/50 hover:border-sage-mid transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                        <Mail className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          Feedback geben
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ihre Rückmeldung hilft uns, diese Website zu
                          verbessern
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
