import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, FlaskConical, Users } from "lucide-react";

const quellen = [
  {
    kategorie: "Klinische Studien & Forschung",
    icon: FlaskConical,
    eintraege: [
      {
        autoren: "Zanarini, M. C. et al.",
        jahr: "2010 / 2012",
        titel:
          "Attainment and stability of sustained symptomatic remission and recovery among borderline patients and Axis II comparison subjects",
        quelle: "American Journal of Psychiatry",
        hinweis:
          "Grundlage für Remissions- und Recovery-Daten (85–93% Remission, ca. 50% Recovery nach 10 Jahren). Durchgeführt am McLean Hospital.",
        link: "https://pubmed.ncbi.nlm.nih.gov/20595412/",
      },
      {
        autoren: "Linehan, M. M.",
        jahr: "1993",
        titel:
          "Cognitive-Behavioral Treatment of Borderline Personality Disorder",
        quelle: "Guilford Press",
        hinweis:
          "Grundlagenwerk zur Dialektisch-Behavioralen Therapie (DBT). Beschreibt das bio-soziale Modell und Behandlungsansätze.",
        link: null,
      },
      {
        autoren: "Skodol, A. E. et al.",
        jahr: "2005",
        titel:
          "Prevalence and quality of life in personality disorders: Results from the Collaborative Longitudinal Personality Disorders Study",
        quelle: "Journal of Personality Disorders",
        hinweis: "Prävalenz- und Verlaufsdaten zu Persönlichkeitsstörungen.",
        link: "https://pubmed.ncbi.nlm.nih.gov/16274278/",
      },
      {
        autoren: "Torgersen, S. et al.",
        jahr: "2000",
        titel: "The prevalence of personality disorders in a community sample",
        quelle: "Archives of General Psychiatry",
        hinweis: "Häufigkeit von BPS in der Allgemeinbevölkerung (ca. 1–3%).",
        link: "https://pubmed.ncbi.nlm.nih.gov/10872917/",
      },
    ],
  },
  {
    kategorie: "Fachliteratur Therapie & Behandlung",
    icon: BookOpen,
    eintraege: [
      {
        autoren: "Linehan, M. M.",
        jahr: "1996",
        titel:
          "Dialektisch-Behaviorale Therapie der Borderline-Persönlichkeitsstörung",
        quelle: "CIP-Medien",
        hinweis: "Deutsche Ausgabe. Standardwerk für DBT-Behandlung.",
        link: null,
      },
      {
        autoren: "Bateman, A. & Fonagy, P.",
        jahr: "2004",
        titel:
          "Psychotherapy for Borderline Personality Disorder: Mentalization-Based Treatment",
        quelle: "Oxford University Press",
        hinweis:
          "Grundlage für mentalisierungsbasierte Therapie (MBT) als evidenzbasiertes Verfahren.",
        link: null,
      },
      {
        autoren: "Fruzzetti, A. E.",
        jahr: "2006",
        titel: "The High-Conflict Couple: A Dialectical Behavior Therapy Guide",
        quelle: "New Harbinger Publications",
        hinweis:
          "DBT-Ansatz für Paare und Angehörige. Grundlage für Validierungs- und Kommunikationsmodule.",
        link: null,
      },
      {
        autoren: "Gunderson, J. G. & Hoffman, P. D.",
        jahr: "2005",
        titel:
          "Understanding and Treating Borderline Personality Disorder: A Guide for Professionals and Families",
        quelle: "American Psychiatric Publishing",
        hinweis: "Verbindet klinische und Angehörigenperspektive.",
        link: null,
      },
    ],
  },
  {
    kategorie: "Angehörigen-Literatur",
    icon: Users,
    eintraege: [
      {
        autoren: "Mason, P. T. & Kreger, R.",
        jahr: "2010",
        titel: "Schluss mit dem Eiertanz",
        quelle: "Balance Buch + Medien Verlag",
        hinweis:
          "Praxisnahe Anleitung für Angehörige. Grundlage für Konzepte wie «walking on eggshells», Kommunikationsstrategien und Grenzen.",
        link: null,
      },
      {
        autoren: "Kreisman, J. J. & Straus, H.",
        jahr: "2004",
        titel:
          "I Hate You – Don't Leave Me: Understanding the Borderline Personality",
        quelle: "Avery / Penguin",
        hinweis: "Einflussreiches Angehörigenbuch; SET-Kommunikationsmodell.",
        link: null,
      },
      {
        autoren: "Hoffman, P. D. et al.",
        jahr: "2005",
        titel:
          "Family Connections: A program for relatives of persons with borderline personality disorder",
        quelle: "Family Process",
        hinweis:
          "Evidenzbasiertes Psychoedukationsprogramm für Angehörige (NEA-BPD). Grundlage für Angehörigen-Schulungsansätze.",
        link: "https://pubmed.ncbi.nlm.nih.gov/15943545/",
      },
    ],
  },
  {
    kategorie: "Diagnostik & Klassifikation",
    icon: BookOpen,
    eintraege: [
      {
        autoren: "American Psychiatric Association",
        jahr: "2013",
        titel: "Diagnostic and Statistical Manual of Mental Disorders (DSM-5)",
        quelle: "American Psychiatric Publishing",
        hinweis:
          "Offizielle Diagnosekriterien für Borderline-Persönlichkeitsstörung (F60.31).",
        link: null,
      },
      {
        autoren: "World Health Organization",
        jahr: "2019",
        titel: "International Classification of Diseases (ICD-11)",
        quelle: "WHO",
        hinweis:
          "Aktuelle internationale Klassifikation. BPS unter «6D11 Borderline pattern».",
        link: "https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f1307872093",
      },
    ],
  },
];

export default function Quellen() {
  return (
    <Layout>
      <SEO
        title="Quellen & Literatur – Borderline Angehörige Zürich"
        description="Wissenschaftliche Grundlagen und Fachliteratur dieser Website: klinische Studien, DBT-Literatur, Angehörigenbücher und Diagnoseklassifikationen."
        canonical="/quellen"
      />

      {/* Hero */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-cream to-background border-b border-border/40">
        <div className="container">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-sage-dark" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Quellen & Literatur
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Diese Website basiert auf anerkannter Fachliteratur und
                evidenzbasierten Methoden. Hier finden Sie alle Quellen,
                geordnet nach Bereich.
              </p>
              <p className="text-sm text-muted-foreground">
                Nicht alle Aussagen lassen sich einzeln belegen — manche
                basieren auf klinischer Erfahrung und Angehörigenliteratur. Wo
                Studien zitiert werden, sind sie hier aufgeführt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quellen */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            {quellen.map((gruppe, gi) => (
              <motion.div
                key={gruppe.kategorie}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <gruppe.icon className="w-5 h-5 text-sage-mid" />
                  <h2 className="text-base font-semibold text-foreground">
                    {gruppe.kategorie}
                  </h2>
                </div>
                <div className="space-y-3">
                  {gruppe.eintraege.map((q, qi) => (
                    <Card key={qi} className="border-border/50">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">
                              {q.autoren}{" "}
                              <span className="text-muted-foreground font-normal">
                                ({q.jahr})
                              </span>
                            </p>
                            <p className="text-sm text-foreground mt-0.5">
                              {q.titel}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 italic">
                              {q.quelle}
                            </p>
                            {q.hinweis && (
                              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                {q.hinweis}
                              </p>
                            )}
                          </div>
                          {q.link && (
                            <a
                              href={q.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 flex items-center gap-1 text-xs text-sage-dark hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              PubMed / WHO
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Hinweis */}
            <Card className="border-sage/40 bg-sage-wash/30">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Hinweis:</strong> Diese
                  Liste ist nicht abschliessend. Einzelne Inhalte basieren auf
                  klinischer Erfahrung, Angehörigenliteratur oder didaktischen
                  Vereinfachungen. Bei konkreten Fragen zu Studien oder
                  Behandlungsempfehlungen wenden Sie sich an eine Fachstelle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
