import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  Users,
  BookOpen,
  Phone,
  ArrowRight,
  Info,
  ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import {
  kontaktByIdStrict,
  emailByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const pukUrl = urlByIdStrict("URL_PUK");

export default function Fachstelle() {
  return (
    <Layout>
      <SEO
        title="Fachstelle Angehörigenarbeit"
        description="Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Beratung, Orientierung und Materialien für Angehörige."
        path="/fachstelle"
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
                <Building2 className="w-6 h-6 text-sage-mid" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Fachstelle Angehörigenarbeit
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Ein Angebot der Psychiatrischen Universitätsklinik Zürich für
              Angehörige von Menschen mit psychischen Erkrankungen. Die
              Fachstelle bietet Orientierung, Entlastung und Beratung für
              Situationen, die im Alltag oft schwer alleine zu tragen sind.
            </p>
            <LastVerifiedBadge date="24.03.2026" className="mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Kurzprofil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                Unser Angebot
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Die Fachstelle ist kein Krisendienst und keine Therapie. Sie ist
                eine Anlaufstelle für Angehörige, die ihre Rolle klären,
                Belastung einordnen und passende nächste Schritte finden
                möchten.
              </p>

              <div className="grid gap-4">
                {[
                  {
                    icon: Users,
                    title: "Beratung für Angehörige",
                    description:
                      "Vertrauliche und kostenlose Gespräche für Angehörige, die Orientierung, Entlastung oder Klärung in einer belastenden Situation suchen.",
                  },
                  {
                    icon: BookOpen,
                    title: "Psychoedukation & Materialien",
                    description:
                      "Fachlich fundierte Informationen, Handouts und Materialien, die helfen können, Dynamiken besser einzuordnen und Gespräche vorzubereiten.",
                  },
                  {
                    icon: Phone,
                    title: "Orientierung & Vermittlung",
                    description:
                      "Unterstützung bei der Suche nach passenden Hilfen, Selbsthilfeangeboten und weiteren Anlaufstellen.",
                  },
                  {
                    icon: Building2,
                    title: "Schulungen & Weiterbildung",
                    description:
                      "Fachliche Weiterbildung und Sensibilisierung zum Thema Angehörigenarbeit im psychosozialen Kontext.",
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
            </motion.div>

            {/* Kontaktblock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                Kontakt
              </h2>

              <Card className="border-sage-mid/20 bg-sage-wash/30">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          Fachstelle Angehörigenarbeit
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Psychiatrische Universitätsklinik Zürich (PUK)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <p className="text-foreground">Lenggstrasse 31</p>
                        <p className="text-foreground">Postfach</p>
                        <p className="text-foreground">8032 Zürich</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <a
                          href={`tel:${fachstelleTel.tel}`}
                          className="text-sage-mid hover:text-sage-dark font-medium transition-colors"
                        >
                          {fachstelleTel.nummer}
                        </a>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Terminvereinbarung telefonisch
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <a
                          href={`mailto:${fachstelleEmail.adresse}`}
                          className="text-sage-mid hover:text-sage-dark font-medium transition-colors"
                        >
                          {fachstelleEmail.adresse}
                        </a>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Terminvereinbarung per E-Mail
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <a
                          href={pukUrl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage-mid hover:text-sage-dark font-medium transition-colors"
                        >
                          {pukUrl.url.replace("https://", "")}
                        </a>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Website der PUK Zürich
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Einordnung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                Einordnung
              </h2>

              <Card className="border-border/50 bg-cream">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-sand-muted flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-sand-mid" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed mb-3">
                        Diese Website wurde von Ch. Egger innerhalb der
                        Fachstelle Angehörigenarbeit aufgebaut. Die inhaltliche
                        Verantwortung liegt bei der Fachstelle
                        Angehörigenarbeit.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Es handelt sich um ein eigenständig gestaltetes
                        Informationsangebot der Fachstelle und nicht um einen
                        offiziellen Kommunikationskanal der PUK Zürich.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weiterführende Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                Weiterführend
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/ueber-uns">
                  <Card className="border-border/50 hover:border-sage-mid transition-colors cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            Über diese Website
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Prinzipien, Quellen und Hintergründe
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/soforthilfe">
                  <Card className="border-border/50 hover:border-alert transition-colors cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-alert flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            Soforthilfe
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Notfallnummern und Krisenberatung
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
