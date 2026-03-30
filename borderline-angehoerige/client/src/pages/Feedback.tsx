import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Heart, ExternalLink } from "lucide-react";
import { emailByIdStrict } from "@/data/kontakte";

const emailAngehoerigen = emailByIdStrict("EMAIL_ANGEHOERIGEN");

export default function Feedback() {
  return (
    <Layout>
      <SEO
        title="Feedback"
        description="Rückmeldungen zur Website nehmen wir per E-Mail entgegen."
        path="/feedback"
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
                <MessageSquare className="w-6 h-6 text-slate-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Ihre Meinung zählt
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Rückmeldung geben
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Ihre Erfahrungen und Anregungen helfen uns, diese Website für
              andere Angehörige noch hilfreicher zu gestalten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kontakt per E-Mail */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Hauptkarte: E-Mail-Kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-sage-light/30 border-sage/30">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-sage-dark" />
                  </div>
                  <h2 className="text-2xl font-normal text-foreground mb-4">
                    Schreiben Sie uns
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
                    Rückmeldungen nehmen wir aktuell per E-Mail entgegen – ob
                    Lob, Verbesserungsvorschläge oder Fehlermeldungen.
                  </p>
                  <a
                    href={`mailto:${emailAngehoerigen.adresse}?subject=Feedback zur Website «Borderline – Hilfe für Angehörige»`}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-sage-mid hover:bg-sage-dark text-white font-medium transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    E-Mail schreiben
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    {emailAngehoerigen.adresse}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Anregungen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Worüber wir uns besonders freuen
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-sage-lighter flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sage-dark text-sm">1</span>
                      </span>
                      <span>Welche Inhalte Ihnen besonders geholfen haben</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-sage-lighter flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sage-dark text-sm">2</span>
                      </span>
                      <span>Was Sie sich zusätzlich wünschen würden</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-sage-lighter flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sage-dark text-sm">3</span>
                      </span>
                      <span>
                        Hinweise auf Fehler oder Verbesserungsmöglichkeiten
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ermutigende Karte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-sand border-sand-subtle">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-sage-dark mx-auto mb-3" />
                  <p className="text-foreground leading-relaxed">
                    Denken Sie daran: Sie sind nicht allein. Viele Angehörige
                    gehen einen ähnlichen Weg – und Ihr Engagement zeigt, dass
                    Ihnen die Beziehung wichtig ist.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weiterführende Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 justify-center pt-2"
            >
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-sage-dark hover:underline underline-offset-2"
              >
                ← Zur Startseite
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href="/beratung"
                className="inline-flex items-center gap-2 text-sm text-sage-dark hover:underline underline-offset-2"
              >
                Beratung &amp; Selbsthilfe
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href="/selbstfuersorge"
                className="inline-flex items-center gap-2 text-sm text-sage-dark hover:underline underline-offset-2"
              >
                Selbstfürsorge
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
