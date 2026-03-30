import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Users,
  Baby,
  Sparkles,
  ExternalLink,
  Star,
} from "lucide-react";
import { useState } from "react";

interface Book {
  title: string;
  author: string;
  publisher: string;
  year?: string;
  description: string;
  forWhom: string;
  highlight?: boolean;
  shopLink?: string;
}

interface BookCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  books: Book[];
}

const bookCategories: BookCategory[] = [
  {
    id: "partner",
    title: "Für Partner & Ehepartner",
    subtitle: "Wenn Ihr Partner oder Ihre Partnerin betroffen ist",
    icon: Heart,
    color: "var(--color-sage-dark)",
    books: [
      {
        title: "Schluss mit dem Eiertanz",
        author: "Paul T. Mason & Randi Kreger",
        publisher: "Psychiatrie-Verlag",
        year: "2010",
        description:
          "Ein langjähriger Standardtitel für Angehörige. Beschreibt typische Beziehungsmuster, Kommunikationsideen und Fragen des Selbstschutzes in engeren Beziehungen.",
        forWhom: "Partner, Familienmitglieder, enge Freunde",
        highlight: true,
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Ich hasse dich – verlass mich nicht",
        author: "Jerold J. Kreisman & Hal Straus",
        publisher: "Kösel",
        year: "2012",
        description:
          "Erklärt die Schwarz-Weiss-Welt der Borderline-Persönlichkeit aus beiden Perspektiven. Hilft zu verstehen, warum Betroffene zwischen Idealisierung und Entwertung schwanken – und wie man damit umgehen kann.",
        forWhom: "Alle Angehörigen, auch Betroffene selbst",
        highlight: true,
        shopLink: "https://www.koesel.de",
      },
      {
        title: "Borderline – Das Selbsthilfe-Buch für Angehörige",
        author: "Christa Windmüller",
        publisher: "Thieme",
        year: "2024",
        description:
          "Aktueller Ratgeber mit Fokus auf Selbstfürsorge. Zeigt, wie Sie Stabilität im Alltag finden und ein positives Miteinander gestalten können – ohne sich selbst zu verlieren.",
        forWhom: "Partner, Familienmitglieder",
        shopLink: "https://www.thieme.de",
      },
      {
        title: "L(i)eben mit Borderline",
        author: "Udo Rauchfleisch",
        publisher: "Patmos",
        year: "2015",
        description:
          "Einfühlsam geschrieben von einem erfahrenen Psychotherapeuten. Verbindet fachliches Wissen mit praktischen Tipps für den Beziehungsalltag.",
        forWhom: "Partner, Angehörige",
      },
      {
        title: "Wenn lieben weh tut",
        author: "Manuela Rösel",
        publisher: "Starks-Sture",
        year: "2006",
        description:
          "Kommunikationsratgeber speziell für Partner in einer Borderline-Beziehung. Konkrete Gesprächsstrategien für schwierige Situationen.",
        forWhom: "Partner in Paarbeziehungen",
      },
    ],
  },
  {
    id: "eltern",
    title: "Für Eltern",
    subtitle: "Wenn Ihr Kind (Jugendliche oder Erwachsene) betroffen ist",
    icon: Users,
    color: "var(--color-slate-mid)",
    books: [
      {
        title: "DBT-Familienskills: Ein Praxisleitfaden",
        author: "Claudia Trasselli",
        publisher: "Hogrefe",
        year: "2022",
        description:
          "Stellt erstmals im deutschen Sprachraum die von Alan Fruzzetti und Perry Hoffman entwickelten Familienskills vor. Praktische Fertigkeiten für den Familienalltag, basierend auf der Dialektisch-Behavioralen Therapie.",
        forWhom: "Eltern, Familien, auch für Fachpersonen",
        highlight: true,
        shopLink: "https://www.hogrefe.com/de",
      },
      {
        title: "Ratgeber Borderline-Persönlichkeitsstörung",
        author: "Martin Bohus & Martina Wolf-Arehult",
        publisher: "Hogrefe",
        year: "2018",
        description:
          "Informiert über Erscheinungsform, Ursachen und Behandlungsmöglichkeiten. Zeigt Eltern und Bezugspersonen, wie sie unterstützen können.",
        forWhom: "Eltern, Bezugspersonen",
      },
      {
        title: "Borderline – Ein Ratgeber für Betroffene und Angehörige",
        author: "Ewald Rahn",
        publisher: "Psychiatrie-Verlag",
        year: "2001",
        description:
          "Ein Klassiker, verständlich geschrieben. Bietet einen guten Überblick über die Störung und praktische Hinweise für den Umgang.",
        forWhom: "Alle Angehörigen",
      },
      {
        title: "Borderline verstehen und bewältigen",
        author: "Psychiatrie-Verlag",
        publisher: "Psychiatrie-Verlag",
        description:
          "Mit passendem Begleitbuch. Liefert Tipps und Anleitungen, um die Erkrankung zu erkennen und Mut zu fassen für den gemeinsamen Weg.",
        forWhom: "Eltern, Familien",
      },
    ],
  },
  {
    id: "kinder",
    title: "Kinderbücher",
    subtitle: "Für Kinder, deren Elternteil betroffen ist",
    icon: Baby,
    color: "var(--color-sage)",
    books: [
      {
        title: "Mama, Mia und das Schleuderprogramm",
        author: "Psychiatrie-Verlag (Kids in BALANCE)",
        publisher: "Psychiatrie-Verlag",
        description:
          "Das einzige deutschsprachige Kinderbuch speziell zum Thema Borderline. Erklärt kindgerecht das 'Schleuderprogramm der Gefühle' und zeigt Kindern, dass sie geliebt werden – auch wenn Mama oder Papa es manchmal nicht zeigen können.",
        forWhom: "Kinder ab 6 Jahren",
        highlight: true,
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Mamas Monster",
        author: "Erdmute von Mosch",
        publisher: "Psychiatrie-Verlag",
        year: "2024",
        description:
          "Einfühlsames Bilderbuch über Depression, aber gut übertragbar auf andere psychische Erkrankungen. Zeigt, dass das 'Monster' nicht die Schuld des Kindes ist.",
        forWhom: "Kinder ab 4 Jahren",
      },
      {
        title: "Was ist bloss mit Mama los?",
        author: "Karen Glistrup",
        publisher: "Kösel",
        description:
          "Hilft Kindern zu verstehen, wenn Eltern in seelische Krisen geraten. Mit Tipps, wie man mit Kindern über Angst, Depression, Stress und Trauma sprechen kann.",
        forWhom: "Kinder ab 5 Jahren, auch für Eltern",
      },
      {
        title: "Sonnige Traurigtage",
        author: "Schirin Homeier",
        publisher: "Mabuse-Verlag",
        description:
          "Ein Bilderbuch für Kinder psychisch kranker Eltern. Zeigt, dass Kinder nicht schuld sind und dass es Hilfe gibt.",
        forWhom: "Jüngere Kinder ab 4 Jahren",
      },
      {
        title: "Papas Seele hat Schnupfen",
        author: "Claudia Gliemann & Nadia Faichney",
        publisher: "Monterosa",
        description:
          "Ein erzählendes Kindersachbuch über die Welt der Psychiatrie. Nimmt Kindern die Angst vor dem Unbekannten.",
        forWhom: "Kinder ab 6 Jahren",
      },
    ],
  },
  {
    id: "erfahrungsberichte",
    title: "Erfahrungsberichte",
    subtitle: "Persönliche Geschichten von Betroffenen und Angehörigen",
    icon: Sparkles,
    color: "var(--color-sage-dark)",
    books: [
      {
        title: "Leben auf der Grenze",
        author: "Andreas Knuf (Hrsg.)",
        publisher: "Psychiatrie-Verlag",
        year: "2002",
        description:
          "Texte von Betroffenen und Angehörigen über ihr Erleben, ihre Gefühle und den Alltag mit Borderline. Hilfreich, wenn Sie unterschiedliche Innen- und Beziehungsperspektiven besser verstehen möchten.",
        forWhom: "Alle, die verstehen wollen",
        highlight: true,
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Borderline-Mütter und ihre Kinder",
        author: "Christine Ann Lawson",
        publisher: "Psychosozial-Verlag",
        year: "2006",
        description:
          "Für erwachsene Kinder, die ihre Kindheit mit einer Borderline-Mutter verstehen und verarbeiten möchten. Beschreibt verschiedene Mutter-Typen und Wege zur Bewältigung.",
        forWhom: "Erwachsene Kinder von Betroffenen",
      },
      {
        title: "Borderline-Störung: Wie mir die DBT geholfen hat",
        author: "Kröger & Unckel (Hrsg.)",
        publisher: "Hogrefe",
        year: "2006",
        description:
          "Betroffene berichten, wie ihnen die Dialektisch-Behaviorale Therapie geholfen hat. Gibt Hoffnung und zeigt, dass Veränderung möglich ist.",
        forWhom: "Angehörige, die Therapie verstehen wollen",
      },
    ],
  },
];

export default function Buchempfehlungen() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? bookCategories.filter(cat => cat.id === activeCategory)
    : bookCategories;

  return (
    <Layout>
      <SEO
        title="Buchempfehlungen"
        description="Empfohlene Bücher für Angehörige von Menschen mit Borderline."
        path="/buchempfehlungen"
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
                <BookOpen className="w-6 h-6 text-sand-warm" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Buchempfehlungen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kuratierte deutschsprachige Bücher für Angehörige. Die Auswahl
              verbindet Grundwissen, Beziehungsperspektiven, Selbstfürsorge und
              Erfahrungsnähe, ohne Anspruch auf Vollständigkeit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border/50 sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-label="Alle Kategorien anzeigen"
              aria-pressed={activeCategory === null}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-sage-dark text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              Alle Kategorien
            </button>
            {bookCategories.map(category => (
              <button
                type="button"
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.id ? null : category.id
                  )
                }
                aria-label={category.title}
                aria-pressed={activeCategory === category.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-sage-dark text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {category.title.replace("Für ", "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book Categories */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="space-y-16">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, ease: "easeOut" }}
              >
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                    }}
                  >
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Books Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  {category.books.map((book, bookIndex) => (
                    <motion.div
                      key={book.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: bookIndex * 0.05, ease: "easeOut" }}
                      className={bookIndex === 0 ? "md:col-span-2" : ""}
                    >
                      <Card
                        className={`h-full transition-all hover:shadow-md ${book.highlight ? "ring-2 ring-sand-border" : ""}`}
                      >
                        <CardContent className="p-6">
                          {/* Book Header */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {book.highlight && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage-lighter text-sage-dark text-xs font-medium">
                                    <Star className="w-3 h-3" />
                                    Empfehlung
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-foreground leading-tight">
                                {book.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {book.author}
                              </p>
                            </div>
                          </div>

                          {/* Publisher & Year */}
                          <p className="text-xs text-muted-foreground mb-3">
                            {book.publisher}
                            {book.year && `, ${book.year}`}
                          </p>

                          {/* Description */}
                          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                            {book.description}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <span className="text-xs text-muted-foreground">
                              {book.forWhom}
                            </span>
                            {book.shopLink && (
                              <a
                                href={book.shopLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-slate-mid hover:text-slate-dark transition-colors"
                              >
                                Beim Verlag
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweis */}
      <section className="py-8 md:py-12 bg-slate-pale">
        <div className="container">
          <Card className="bg-white border-slate-light">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-lighter flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-slate-mid" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Hinweis zu den Empfehlungen
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Diese Liste ist eine persönliche Auswahl und erhebt keinen
                    Anspruch auf Vollständigkeit. Die Bücher wurden nach
                    Praxisrelevanz, Verständlichkeit und Aktualität ausgewählt.
                    Einige ältere Titel sind Klassiker, die nach wie vor
                    wertvoll sind.
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    Viele Bücher sind auch in Bibliotheken verfügbar oder können
                    über die Fernleihe bestellt werden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
