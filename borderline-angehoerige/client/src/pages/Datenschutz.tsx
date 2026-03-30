import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield,
  Cookie,
  Server,
  Eye,
  Lock,
  ExternalLink,
  Download,
  Scale,
  FileText,
} from "lucide-react";

export default function Datenschutz() {
  return (
    <Layout>
      <SEO
        title="Datenschutz"
        description="Datenschutzerklärung der Website."
        path="/datenschutz"
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
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Shield className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Datenschutzerklärung
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Der Schutz Ihrer Privatsphäre ist uns wichtig. Diese
              Datenschutzerklärung informiert Sie über die Verarbeitung
              personenbezogener Daten auf dieser Website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Grundsatz – immer offen */}
            <ContentSection
              title="Unser Grundsatz"
              icon={<Lock className="w-7 h-7 text-sage-mid" />}
              id="grundsatz"
              defaultOpen={true}
              preview="Möglichst wenige personenbezogene Daten – kein Tracking, keine Werbung, keine Social-Media-Plugins."
            >
              <Card className="border-sage/30 bg-sage-light/20">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Diese Website wurde mit dem Ziel entwickelt, möglichst
                    wenige personenbezogene Daten zu erheben. Wir verzichten
                    bewusst auf Tracking-Tools, Werbung und
                    Social-Media-Plugins. Ihre Privatsphäre hat Priorität.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 mt-4">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Verantwortliche Stelle
                  </h3>
                  <div className="text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">Christa Egger</p>
                    <p>Angehörigenberaterin</p>
                    <p className="mt-4 text-sm">
                      Bei Fragen zum Datenschutz können Sie sich an die oben
                      genannte Person wenden.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Datenerhebung */}
            <ContentSection
              title="Erhebung und Verarbeitung von Daten"
              icon={<Server className="w-7 h-7 text-slate-blue" />}
              id="datenerhebung"
              preview="Server-Logfiles mit anonymisierten IP-Adressen – keine Zusammenführung mit anderen Datenquellen."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-medium text-foreground mb-3">
                    Server-Logfiles
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Bei jedem Zugriff auf diese Website werden automatisch
                    Informationen in sogenannten Server-Logfiles gespeichert,
                    die Ihr Browser automatisch übermittelt. Dies sind:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Browsertyp und Browserversion
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Verwendetes Betriebssystem
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Referrer URL (die zuvor besuchte Seite)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Hostname des zugreifenden Rechners
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      Uhrzeit der Serveranfrage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage-mid">•</span>
                      IP-Adresse (anonymisiert)
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Diese Daten werden ausschliesslich zur Gewährleistung eines
                    störungsfreien Betriebs der Website und zur Verbesserung
                    unseres Angebots ausgewertet. Eine Zusammenführung dieser
                    Daten mit anderen Datenquellen wird nicht vorgenommen.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Cookies */}
            <ContentSection
              title="Cookies"
              icon={<Cookie className="w-7 h-7 text-sage-dark" />}
              id="cookies"
              preview="Nur technisch notwendige Cookies – keine Tracking-Cookies, keine Werbung."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Diese Website verwendet ausschliesslich technisch
                      notwendige Cookies, die für den Betrieb der Website
                      erforderlich sind. Es werden{" "}
                      <strong>keine Tracking-Cookies</strong> oder Cookies zu
                      Werbezwecken eingesetzt.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">
                        Technisch notwendige Cookies
                      </h3>
                      <p className="text-sm">
                        Diese Cookies sind für die Grundfunktionen der Website
                        erforderlich und können nicht deaktiviert werden. Sie
                        speichern keine persönlich identifizierbaren
                        Informationen.
                      </p>
                    </div>
                    <p className="text-sm">
                      Sie können Ihren Browser so einstellen, dass Sie über das
                      Setzen von Cookies informiert werden und Cookies nur im
                      Einzelfall erlauben. Bei der Deaktivierung von Cookies
                      kann die Funktionalität dieser Website eingeschränkt sein.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Analyse-Tools */}
            <ContentSection
              title="Analyse- und Tracking-Tools"
              icon={<Eye className="w-7 h-7 text-sage-dark" />}
              id="tracking"
              preview="Keine Analyse- oder Tracking-Tools, keine Social-Media-Plugins."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Diese Website verwendet{" "}
                      <strong>keine Analyse- oder Tracking-Tools</strong> wie
                      Google Analytics, Facebook Pixel oder ähnliche Dienste.
                      Wir erfassen keine Nutzungsprofile und geben keine Daten
                      an Dritte weiter.
                    </p>
                    <p>
                      Es werden auch <strong>keine Social-Media-Plugins</strong>{" "}
                      eingebunden, die Daten an soziale Netzwerke übertragen
                      könnten.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Externe Links */}
            <ContentSection
              title="Externe Links"
              icon={<ExternalLink className="w-7 h-7 text-sage-mid" />}
              id="externe-links"
              preview="Für verlinkte externe Websites gelten deren eigene Datenschutzerklärungen."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Diese Website enthält Links zu externen Websites Dritter
                    (z.B. Notfallressourcen, Selbsthilfegruppen). Auf deren
                    Inhalte haben wir keinen Einfluss. Für die Inhalte der
                    verlinkten Seiten ist stets der jeweilige Anbieter oder
                    Betreiber verantwortlich. Bitte beachten Sie die
                    Datenschutzerklärungen der jeweiligen externen Websites.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Downloads */}
            <ContentSection
              title="Downloads und Materialien"
              icon={<Download className="w-7 h-7 text-sage-mid" />}
              id="downloads"
              preview="Beim Download werden keine personenbezogenen Daten erfasst."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Die auf dieser Website angebotenen Infografiken und Handouts
                    können heruntergeladen werden. Beim Download werden keine
                    personenbezogenen Daten erfasst oder gespeichert. Die
                    Materialien werden über einen Content Delivery Network (CDN)
                    bereitgestellt.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Ihre Rechte */}
            <ContentSection
              title="Ihre Rechte"
              icon={<Scale className="w-7 h-7 text-slate-blue" />}
              id="rechte"
              preview="Auskunft, Berichtigung, Löschung und Widerspruch gemäss DSG und DSGVO."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Gemäss dem schweizerischen Datenschutzgesetz (DSG) und der
                      EU-Datenschutz-Grundverordnung (DSGVO) haben Sie folgende
                      Rechte:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span>
                          <strong>Auskunftsrecht:</strong> Sie können Auskunft
                          über Ihre gespeicherten personenbezogenen Daten
                          verlangen.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span>
                          <strong>Berichtigungsrecht:</strong> Sie können die
                          Berichtigung unrichtiger Daten verlangen.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span>
                          <strong>Löschungsrecht:</strong> Sie können die
                          Löschung Ihrer Daten verlangen.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span>
                          <strong>Widerspruchsrecht:</strong> Sie können der
                          Verarbeitung Ihrer Daten widersprechen.
                        </span>
                      </li>
                    </ul>
                    <p className="text-sm">
                      Da wir jedoch keine personenbezogenen Daten speichern
                      (ausser den anonymisierten Server-Logfiles), sind diese
                      Rechte in der Praxis selten relevant.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Änderungen */}
            <ContentSection
              title="Änderungen dieser Datenschutzerklärung"
              icon={<FileText className="w-7 h-7 text-sage-dark" />}
              id="aenderungen"
              preview="Anpassungen bei geänderten rechtlichen Anforderungen."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                    damit sie stets den aktuellen rechtlichen Anforderungen
                    entspricht oder um Änderungen unserer Leistungen in der
                    Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch
                    gilt dann die neue Datenschutzerklärung.
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
