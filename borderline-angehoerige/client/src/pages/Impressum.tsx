import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FileText,
  BookOpen,
  Phone,
  Mail,
  Shield,
  Target,
  Copyright,
} from "lucide-react";
import { Link } from "wouter";
import { kontaktByIdStrict, emailByIdStrict } from "@/data/kontakte";

const fachstelle = kontaktByIdStrict("INFO_FACHSTELLE");
const emailAngehoerigen = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const rot144 = kontaktByIdStrict("ROT_144");
const rot117 = kontaktByIdStrict("ROT_117");
const gruen143 = kontaktByIdStrict("GRUEN_143");

export default function Impressum() {
  return (
    <Layout>
      <SEO
        title="Impressum"
        description="Impressum und rechtliche Informationen."
        path="/impressum"
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
                <FileText className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Impressum
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Verantwortlich + Kontakt – immer offen */}
            <ContentSection
              title="Verantwortlich für den Inhalt"
              icon={<Mail className="w-7 h-7 text-sage-mid" />}
              id="verantwortlich"
              defaultOpen={true}
              preview="Christa Egger, Angehörigenberaterin – Fachstelle Angehörigenarbeit PUK Zürich."
            >
              <Card className="border-border/50 mb-4">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p className="font-medium text-foreground">Christa Egger</p>
                    <p>Angehörigenberaterin</p>
                    <p className="mt-4 text-sm">
                      Erstellt von Ch. Egger, Fachstelle Angehörigenarbeit (PUK
                      Zürich). Inhaltliche Verantwortung: Fachstelle
                      Angehörigenarbeit. Gestaltung folgt einem eigenständigen
                      Informationsdesign (nicht PUK-CI).
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground/80">
                      Unabhängiges Informationsangebot der Fachstelle
                      Angehörigenarbeit. Nicht offizieller Kommunikationskanal
                      der PUK Zürich.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sage-mid/30 bg-sage-wash/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Beratung für Angehörige
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die <strong>Fachstelle Angehörigenarbeit</strong> an der
                    Psychiatrischen Universitätsklinik Zürich (PUK) bietet
                    Unterstützung und Beratung für Angehörige von psychisch
                    erkrankten Menschen.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-sage-dark" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <a
                          href={`tel:${fachstelle.tel}`}
                          className="font-medium text-foreground hover:text-sage-mid transition-colors"
                        >
                          {fachstelle.nummer}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-sage-dark" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-Mail</p>
                        <a
                          href={`mailto:${emailAngehoerigen.adresse}`}
                          className="font-medium text-foreground hover:text-sage-mid transition-colors"
                        >
                          {emailAngehoerigen.adresse}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      Die Beratung ist <strong>kostenlos</strong> und steht
                      allen Angehörigen von psychisch kranken Menschen im Kanton
                      Zürich vertraulich zur Verfügung.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Hinweis + Zweck */}
            <ContentSection
              title="Zweck der Website"
              icon={<Target className="w-7 h-7 text-sage-dark" />}
              id="zweck"
              preview="Evidenzbasierte Informationen, praktische Strategien und Ressourcen zur Selbstfürsorge."
            >
              <Card className="border-sage/30 bg-sage-wash/30 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Wichtiger Hinweis
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unabhängiges Informationsangebot der Fachstelle
                    Angehörigenarbeit. Nicht offizieller Kommunikationskanal der
                    PUK Zürich. Die Website stellt eine eigenständige
                    Informationsressource dar, die auf Basis evidenzbasierter
                    Fachliteratur und praktischer Erfahrung in der
                    Angehörigenberatung erstellt wurde.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Diese Website bietet Angehörigen von Menschen mit
                    Borderline-Persönlichkeitsstörung:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-sage-dark">•</span>
                      Evidenzbasierte Informationen zum Verständnis der Störung
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Praktische Strategien für den Alltag und Krisensituationen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Kommunikationstechniken für schwierige Gespräche
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Ressourcen zur Selbstfürsorge und Burnout-Prävention
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Haftungsausschluss */}
            <ContentSection
              title="Haftungsausschluss"
              icon={<Shield className="w-7 h-7 text-slate-blue" />}
              id="haftung"
              preview="Keine Gewähr für Richtigkeit – ersetzt keine professionelle Beratung, Diagnose oder Behandlung."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Die Inhalte dieser Website wurden mit grösster Sorgfalt
                      erstellt. Für die Richtigkeit, Vollständigkeit und
                      Aktualität der Inhalte kann jedoch keine Gewähr übernommen
                      werden.
                    </p>
                    <p>
                      <strong>
                        Diese Website ersetzt keine professionelle Beratung,
                        Diagnose oder Behandlung.
                      </strong>{" "}
                      Bei psychischen Krisen oder Notfällen wenden Sie sich
                      bitte umgehend an die entsprechenden Notfallnummern (
                      {rot144.nummer} / {rot117.nummer}) oder den
                      psychiatrischen Notdienst. Zur Entlastung:{" "}
                      {gruen143.label} ({gruen143.nummer}).
                    </p>
                    <p>
                      Für externe Links wird keine Haftung übernommen. Für den
                      Inhalt der verlinkten Seiten sind ausschliesslich deren
                      Betreiber verantwortlich.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Quellenangaben */}
            <ContentSection
              title="Quellenangaben"
              icon={<BookOpen className="w-7 h-7 text-sage-mid" />}
              id="impressum-quellen"
              preview="Fachliteratur von Mason/Kreger, Linehan, Fruzzetti und Gunderson/Hoffman."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die Inhalte dieser Website basieren auf anerkannter
                    Fachliteratur und evidenzbasierten Methoden, insbesondere:
                  </p>
                  <p className="text-sm text-sage-dark mb-4">
                    <Link
                      href="/quellen"
                      className="underline hover:no-underline"
                    >
                      → Vollständige Literaturliste mit PubMed-Links
                    </Link>
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="border-l-2 border-sage pl-4">
                      <p className="font-medium text-foreground">
                        Mason, P. T. & Kreger, R.
                      </p>
                      <p className="text-sm">
                        Schluss mit dem Eiertanz: Für Angehörige von Menschen
                        mit Borderline. Balance Buch + Medien Verlag.
                      </p>
                    </li>
                    <li className="border-l-2 border-sage pl-4">
                      <p className="font-medium text-foreground">
                        Linehan, M. M.
                      </p>
                      <p className="text-sm">
                        Dialektisch-Behaviorale Therapie der
                        Borderline-Persönlichkeitsstörung. CIP-Medien.
                      </p>
                    </li>
                    <li className="border-l-2 border-sage pl-4">
                      <p className="font-medium text-foreground">
                        Fruzzetti, A. E.
                      </p>
                      <p className="text-sm">
                        The High-Conflict Couple: A Dialectical Behavior Therapy
                        Guide. New Harbinger Publications.
                      </p>
                    </li>
                    <li className="border-l-2 border-sage pl-4">
                      <p className="font-medium text-foreground">
                        Gunderson, J. G. & Hoffman, P. D.
                      </p>
                      <p className="text-sm">
                        Understanding and Treating Borderline Personality
                        Disorder. American Psychiatric Publishing.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Urheberrecht */}
            <ContentSection
              title="Urheberrecht"
              icon={<Copyright className="w-7 h-7 text-sage-mid" />}
              id="urheberrecht"
              preview="Schweizerisches Urheberrecht – Materialien für persönlichen Gebrauch und Angehörigenberatung."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Die Inhalte und Werke auf dieser Website unterliegen dem
                    schweizerischen Urheberrecht. Die Vervielfältigung,
                    Bearbeitung, Verbreitung und jede Art der Verwertung
                    ausserhalb der Grenzen des Urheberrechts bedürfen der
                    schriftlichen Zustimmung. Downloads und Kopien dieser Seite
                    sind nur für den privaten, nicht kommerziellen Gebrauch
                    gestattet.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Die Infografiken und Handouts dürfen im Rahmen der
                    Angehörigenberatung und für den persönlichen Gebrauch
                    verwendet werden.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Stand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-center text-sm text-muted-foreground">
                Stand: Februar 2026
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
