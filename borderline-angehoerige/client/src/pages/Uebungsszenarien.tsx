import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Info } from "lucide-react";
import { Link } from "wouter";
import KommunikationsUebung from "@/components/interactive/KommunikationsUebung";

export default function Uebungsszenarien() {
  return (
    <Layout>
      <SEO
        title="Kommunikations-Übungen | Schluss mit dem Eiertanz"
        description="Üben Sie SET, DEAR MAN und Validierung anhand realistischer Szenarien – interaktiv, mit Feedback und Erklärungen."
        path="/uebungen"
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
              href="/kommunizieren"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1"
            >
              ← Zur Kommunikations-Seite
            </Link>

            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-sand-muteder flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Interaktive Übungen
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Kommunikation üben
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Realistische Situationen, verschiedene Antwortmöglichkeiten,
              sofortiges Feedback. Probieren Sie aus, wie SET, DEAR MAN und
              Validierung in der Praxis klingen.
            </p>

            <div className="p-4 rounded-xl bg-sand border border-sand-subtle">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-sage-mid" />
                <span>
                  Es gibt kein «falsch» im echten Leben – nur ungünstigere
                  Reaktionen. Diese Übungen zeigen bewährte Muster, die Sie
                  anpassen können.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <KommunikationsUebung />

            {/* Related links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Theorie nachlesen
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/kommunizieren",
                    label: "Kommunizieren",
                    sub: "SET, Validierung, Timing",
                  },
                  {
                    href: "/grenzen",
                    label: "Grenzen setzen",
                    sub: "Klare Grenzen formulieren",
                  },
                  {
                    href: "/wegweiser",
                    label: "Situations-Wegweiser",
                    sub: "«Was tun wenn…»",
                  },
                  {
                    href: "/unterstuetzen/krise",
                    label: "Krisenbegleitung",
                    sub: "Deeskalation und Ampel-System",
                  },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border/50 hover:border-sage-mid/40 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.sub}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-sage-mid transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
