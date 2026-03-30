import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { kontaktByIdStrict } from "@/data/kontakte";
import SituationsWegweiser from "@/components/interactive/SituationsWegweiser";

const rot144 = kontaktByIdStrict("ROT_144");

export default function Wegweiser() {
  return (
    <Layout>
      <SEO
        title="Situations-Wegweiser | Schluss mit dem Eiertanz"
        description="Was tun, wenn Ihr Angehöriger in einer Krise ist? Unser interaktiver Wegweiser führt Sie Schritt für Schritt durch verschiedene Situationen."
        path="/wegweiser"
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
              <div className="w-12 h-12 rounded-xl bg-sand-muteder flex items-center justify-center">
                <Compass className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Interaktives Werkzeug
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Situations-Wegweiser
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              In akuten Momenten ist es schwer, klar zu denken. Dieser Wegweiser
              führt Sie Schritt für Schritt – wählen Sie einfach die Situation,
              die am ehesten zutrifft.
            </p>

            <div className="p-4 rounded-xl bg-sand border border-sand-subtle">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Bei akuter Lebensgefahr:
                </strong>{" "}
                Rufen Sie sofort{" "}
                <a
                  href={`tel:${rot144.tel}`}
                  className="text-alert hover:underline font-bold"
                >
                  {rot144.nummer}
                </a>{" "}
                an. Dieser Wegweiser ersetzt keinen Notruf.{" "}
                <Link
                  href="/soforthilfe"
                  className="text-alert hover:underline font-medium"
                >
                  Alle Notfallnummern →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wegweiser */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <SituationsWegweiser />

            {/* Related links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Weiterführende Seiten
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/unterstuetzen/krise",
                    label: "Krisenbegleitung",
                    sub: "Deeskalation und Ampel-System",
                  },
                  {
                    href: "/soforthilfe",
                    label: "Soforthilfe",
                    sub: "Alle Notfallnummern",
                  },
                  {
                    href: "/notfallkarte",
                    label: "Notfallkarte",
                    sub: "Persönliche Karte erstellen",
                  },
                  {
                    href: "/selbstfuersorge",
                    label: "Selbstfürsorge",
                    sub: "Strategien für die Zeit danach",
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
