import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import Selbsttest from "@/components/Selbsttest";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Link } from "wouter";

export default function SelbsttestPage() {
  return (
    <Layout>
      <SEO
        title="Selbsttest"
        description="Selbsttest für Angehörige: Wie belastet sind Sie? Anonyme Einschätzung."
        path="/selbsttest"
      />
      {/* Hero */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-sage-dark flex items-center justify-center mx-auto mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Finden Sie Ihren Weg
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Dieser kurze Test hilft Ihnen, die für Ihre aktuelle Situation
              passenden Inhalte zu finden. Er dauert nur etwa 2 Minuten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Test */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Selbsttest />
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-muted/30 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Dieser Test ersetzt keine professionelle Beratung. Er dient
                lediglich als Orientierungshilfe, um Ihnen den Einstieg in
                unsere Inhalte zu erleichtern. Bei akuten Krisen wenden Sie sich
                bitte an die{" "}
                <Link
                  href="/soforthilfe"
                  className="text-alert underline hover:no-underline"
                >
                  Notfallressourcen
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
