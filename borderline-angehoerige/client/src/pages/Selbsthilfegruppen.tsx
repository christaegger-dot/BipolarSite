import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Heart,
  Globe,
  Building2,
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  kontaktByIdStrict,
  emailByIdStrict,
  urlByIdStrict,
} from "@/data/kontakte";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";

const fachstelleTel = kontaktByIdStrict("INFO_FACHSTELLE");
const fachstelleEmail = emailByIdStrict("EMAIL_ANGEHOERIGEN");
const pukUrl = urlByIdStrict("URL_PUK");
const proMente = kontaktByIdStrict("INFO_PROMENTE");
const standByYouTel = kontaktByIdStrict("INFO_STANDBYYOU");
const vaskZhTel = kontaktByIdStrict("INFO_VASK_ZH");
const vaskZhEmail = emailByIdStrict("EMAIL_VASK_ZH");
const vaskZhUrl = urlByIdStrict("URL_VASK_ZH");
const proMenteUrl = urlByIdStrict("URL_PROMENTE");
const standByYouUrl = urlByIdStrict("URL_STANDBYYOU");
const selbsthilfeChUrl = urlByIdStrict("URL_SELBSTHILFE_CH");

export default function Selbsthilfegruppen() {
  const [currentPath] = useLocation();
  // Both /beratung and /selbsthilfegruppen render this page; use one canonical
  const canonicalPath = "/beratung";

  return (
    <Layout>
      <SEO
        title="Beratung & Netzwerke"
        description="Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige von Menschen mit Borderline in der Schweiz."
        path={currentPath}
        canonicalPath={canonicalPath}
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
              <div className="w-12 h-12 rounded-xl bg-sage-mid flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Beratung & Netzwerke
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Wenn Belastung, Unsicherheit oder Erschöpfung zu gross werden,
              kann es entlastend sein, nicht nur im eigenen System nach Lösungen
              zu suchen. Hier finden Sie Beratung, Selbsthilfe und weitere
              Anlaufstellen für Angehörige in der Schweiz.
            </p>
            <div className="mt-5">
              <LastVerifiedBadge date="24.03.2026" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* ═══ Professionelle Beratung ═══ */}
            <ContentSection
              title="Professionelle Beratung"
              icon={<Building2 className="w-7 h-7 text-sage-darker" />}
              id="professionelle-beratung"
              defaultOpen={true}
              preview="Anlaufstellen, die Angehörige fachlich begleiten, entlasten und bei der Einordnung unterstützen."
            >
              <div className="space-y-4">
                {/* Fachstelle Angehörigenarbeit PUK */}
                <Card className="border-sage-darker/20 bg-sage-wash/40 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      Fachstelle Angehörigenarbeit (PUK Zürich)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Die Fachstelle an der Psychiatrischen Universitätsklinik
                      Zürich bietet kostenlose, vertrauliche{" "}
                      <strong>Einzelberatung und Entlastungsgespräche</strong>{" "}
                      für Angehörige von psychisch erkrankten Menschen –
                      unabhängig davon, ob die betroffene Person an der PUK
                      behandelt wird.
                    </p>

                    <div className="bg-background/60 rounded-lg p-4 mb-5">
                      <h4 className="font-semibold text-foreground text-sm mb-2">
                        Was bietet die Fachstelle?
                      </h4>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-sage-dark">•</span>
                          Vertrauliche Beratung und Entlastungsgespräche (ca. 60
                          Min.)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Unterstützung im Umgang mit der Erkrankung im Alltag
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Orientierung zu Hilfs-, Gruppen- und
                          Entlastungsangeboten
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Klärung von Fragen rund um Rolle, Grenzen und
                          Selbstfürsorge
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Kostenlos – Daten werden nicht an die Krankenkasse
                          weitergeleitet
                        </li>
                      </ul>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Telefon
                          </p>
                          <a
                            href={`tel:${fachstelleTel.tel}`}
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {fachstelleTel.nummer}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            E-Mail
                          </p>
                          <a
                            href={`mailto:${fachstelleEmail.adresse}`}
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {fachstelleEmail.adresse}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-foreground text-sm">
                            Lenggstrasse 31, Postfach
                          </p>
                          <p className="text-foreground text-sm">8032 Zürich</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Website
                          </p>
                          <a
                            href={pukUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {pukUrl.url.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link href="/fachstelle">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-mid hover:text-sage-dark transition-colors cursor-pointer">
                        Mehr über die Fachstelle erfahren
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>

                {/* Pro Mente Sana */}
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      Pro Mente Sana
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Die Schweizerische Stiftung Pro Mente Sana bietet
                      psychosoziale und juristische Beratung für Betroffene und
                      Angehörige. Kostenlose Telefonberatung zu Fragen rund um
                      psychische Gesundheit.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <a
                        href={`tel:${proMente.tel}`}
                        className="inline-flex items-center gap-2 text-sage-mid hover:underline font-medium"
                      >
                        <Phone className="w-4 h-4" />
                        {proMente.nummer} (Normaltarif)
                      </a>
                      <a
                        href={proMenteUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="w-4 h-4" />
                        {proMenteUrl.url.replace("https://www.", "www.")}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* ═══ Angehörigen-Netzwerke ═══ */}
            <ContentSection
              title="Angehörigen-Netzwerke"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="angehoerigen-netzwerke"
              preview="Organisationen und Netzwerke, die Austausch, Orientierung und Entlastung für Angehörige ermöglichen."
            >
              <div className="space-y-4">
                {/* Stand by You Schweiz */}
                <Card className="border-sage-mid/30 bg-sage-wash/30 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Stand by You Schweiz
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ehemals VASK Schweiz – Dachverband der Vereinigungen von
                      Angehörigen psychisch Erkrankter. Seit Januar 2024 unter
                      neuem Namen.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Stand by You macht Angehörige und Vertraute von Menschen
                      mit psychischen Erkrankungen in der Schweiz sicht-, hör-
                      und spürbar. Die Organisation bietet eine kostenlose
                      HelpLine, die von Angehörigen für Angehörige betrieben
                      wird.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            HelpLine (kostenlos)
                          </p>
                          <a
                            href={`tel:${standByYouTel.tel}`}
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {standByYouTel.nummer}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Website
                          </p>
                          <a
                            href={standByYouUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {standByYouUrl.url.replace("https://www.", "www.")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground text-sm mb-2">
                        HelpLine-Zeiten:
                      </h4>
                      <LastVerifiedBadge date="24.03.2026" className="mb-3" />
                      <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                        <span>Montag</span>
                        <span>09:30 – 19:00 Uhr</span>
                        <span>Dienstag</span>
                        <span>10:00 – 18:00 Uhr</span>
                        <span>Mittwoch</span>
                        <span>09:00 – 11:00 Uhr</span>
                        <span>Donnerstag</span>
                        <span>10:00 – 12:00 / 16:00 – 18:00 Uhr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* VASK Zürich */}
                <Card className="border-border/50">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      VASK Zürich
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Kantonale Vereinigung der Angehörigen von psychisch
                      Kranken – mit regelmässigen Beratungs-Treffpunkten in
                      Zürich und Winterthur.
                    </p>

                    <div className="space-y-4 mb-5">
                      {/* Treffpunkt Zürich */}
                      <div className="bg-background/60 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-sage-mid" />
                          <h4 className="font-semibold text-foreground text-sm">
                            Beratungs-Treffpunkt Zürich
                          </h4>
                        </div>
                        <LastVerifiedBadge date="24.03.2026" className="mb-2" />
                        <p className="text-muted-foreground text-sm">
                          Offener Treffpunkt für alle Angehörigen und Freunde
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-foreground">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Jeden letzten Dienstag des Monats, 19:00 – 21:00 Uhr
                        </div>
                      </div>

                      {/* Treffpunkt Winterthur */}
                      <div className="bg-background/60 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-sage-mid" />
                          <h4 className="font-semibold text-foreground text-sm">
                            Beratungs-Treffpunkt Winterthur
                          </h4>
                        </div>
                        <LastVerifiedBadge date="24.03.2026" className="mb-2" />
                        <p className="text-muted-foreground text-sm">
                          Offener Treffpunkt für alle Angehörigen und Freunde
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-foreground">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Jeden ersten Montag des Monats, 19:00 – 21:00 Uhr
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Beratungstelefon
                          </p>
                          <a
                            href={`tel:${vaskZhTel.tel}`}
                            className="font-medium text-foreground hover:text-sage-mid"
                          >
                            {vaskZhTel.nummer}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-foreground text-sm">
                            Langstrasse 149
                          </p>
                          <p className="text-foreground text-sm">8004 Zürich</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <a
                        href={`mailto:${vaskZhEmail.adresse}`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="w-4 h-4" />
                        {vaskZhEmail.adresse}
                      </a>
                      <a
                        href={vaskZhUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="w-4 h-4" />
                        {vaskZhUrl.url.replace("https://www.", "www.")}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* ═══ Selbsthilfegruppen finden ═══ */}
            <ContentSection
              title="Selbsthilfegruppen finden"
              icon={<MapPin className="w-7 h-7 text-sage-mid" />}
              id="selbsthilfegruppen"
              preview="Wenn Sie mit anderen Angehörigen in Austausch kommen möchten, ist Selbsthilfe Schweiz die wichtigste Vermittlungsstelle."
            >
              <Card className="border-sage-darker/20 bg-sage-wash/40 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold text-foreground text-lg mb-3">
                    Selbsthilfe Schweiz
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Selbsthilfegruppen für Angehörige von Menschen mit
                    Borderline finden Sie über
                    <strong> Selbsthilfe Schweiz</strong> – die zentrale
                    Vermittlungsstelle für Selbsthilfegruppen in der ganzen
                    Schweiz. Es gibt Gruppen in mehreren Kantonen, sowohl vor
                    Ort als auch online.
                  </p>

                  <a
                    href={selbsthilfeChUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <Globe className="w-4 h-4" />
                      {selbsthilfeChUrl.url.replace("https://www.", "www.")}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ Nächste Schritte (Abschluss-Card) ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-sage-wash/60 border-sage-mid/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Nächste Schritte
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nicht jede Unterstützung passt in jeder Lage. Diese drei
                    Wege sind oft ein sinnvoller nächster Schritt, wenn Sie
                    gerade Orientierung oder Entlastung suchen:
                  </p>
                  <div className="space-y-3">
                    <Link href="/fachstelle">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Building2 className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          Ein erstes Beratungsgespräch bei der Fachstelle
                          anfragen
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                    <Link href="/selbstfuersorge">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Heart className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          Eigene Überlastung und Selbstfürsorge in den Blick
                          nehmen
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                    <Link href="/kommunizieren">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Users className="w-5 h-5 text-slate-blue flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          Kommunikation in belasteten Situationen gezielter
                          einordnen
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
