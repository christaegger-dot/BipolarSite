import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  HelpCircle,
  MessageCircle,
  Shield,
  Heart,
  Users,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";
import EvidenceNote from "@/components/EvidenceNote";

interface FAQItem {
  question: string;
  answer: string;
  links?: { text: string; url: string }[];
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  questions: FAQItem[];
}

function slugifyCategory(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "und")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function FAQ() {
  const faqCategories: FAQCategory[] = [
    {
      title: "Diagnose & Krankheitsverständnis",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "var(--color-slate-mid)",
      questions: [
        {
          question: "Soll ich die Diagnose ansprechen?",
          answer:
            "Das hängt von der Situation ab. Wenn Ihr Angehöriger die Diagnose bereits kennt und akzeptiert, kann ein offenes Gespräch hilfreich sein – es zeigt, dass Sie sich informieren und verstehen wollen. Vermeiden Sie jedoch, die Diagnose als «Waffe» zu benutzen («Du verhältst dich wieder so borderline-mässig»). Wenn die Diagnose noch nicht gestellt oder nicht akzeptiert wurde, konzentrieren Sie sich besser auf konkrete Verhaltensweisen und Gefühle statt auf Labels. Sagen Sie zum Beispiel: «Ich merke, dass du gerade sehr aufgewühlt bist» statt «Das ist deine Borderline».",
          links: [
            { text: "Mehr zur Kommunikation", url: "/kommunizieren" },
            { text: "Kommunikation üben", url: "/uebungen" },
          ],
        },
        {
          question: "Ist Borderline heilbar?",
          answer:
            "Die Prognose ist deutlich besser, als lange angenommen wurde – die meisten Betroffenen erreichen im Verlauf eine Remission. Entwicklung verläuft selten geradlinig, Rückschläge gehören dazu. Therapie unterstützt den Prozess, macht ihn aber nicht vollständig planbar.",
          links: [{ text: "Verlauf & Prognose im Detail", url: "/genesung" }],
        },
        {
          question: "Ist Borderline erblich? Bin ich schuld?",
          answer:
            "Borderline entsteht durch ein Zusammenspiel von genetischer Veranlagung (ca. 40–60% Erblichkeit) und Umweltfaktoren – insbesondere Traumata und invalidierendes Umfeld. Genetisch wird eine erhöhte emotionale Sensibilität vererbt, nicht die Störung selbst. Traumatische Erfahrungen erhöhen das Risiko, führen aber nicht automatisch zu Borderline. Viele Menschen mit schwierigen Kindheiten entwickeln keine BPS, und manche Betroffene hatten keine offensichtlichen Traumata. Die Ursachen sind komplex – Sie tragen keine Schuld.",
          links: [{ text: "Borderline verstehen", url: "/verstehen" }],
        },
        {
          question:
            "Warum verhält sich mein Angehöriger bei anderen regulierter und stabiler?",
          answer:
            "Dieses Phänomen ist häufig und nicht automatisch ein Zeichen von Manipulation. Menschen mit Borderline haben oft die grössten Schwierigkeiten in engen Beziehungen, weil dort die Verlassensangst am stärksten aktiviert wird. Bei Fremden oder in oberflächlichen Kontakten ist diese Angst geringer, daher können sie sich besser regulieren. Es ist paradox: Je wichtiger Sie Ihrem Angehörigen sind, desto intensiver können die Symptome sein. Das ist keine bewusste Entscheidung, sondern ein Muster, das in der Therapie bearbeitet wird.",
          links: [{ text: "Beziehungsmuster verstehen", url: "/verstehen" }],
        },
      ],
    },
    {
      title: "Kommunikation & Konflikte",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "var(--color-sage-mid)",
      questions: [
        {
          question: "Wie reagiere ich auf bedrohlich wirkende Aussagen?",
          answer:
            "Bei Suizidäusserungen gilt: immer ernst nehmen und die Verantwortung an Fachpersonen weitergeben – sagen Sie klar: «Wenn du sagst, du willst dir etwas antun, hole ich Hilfe.» Bei anderen Aussagen aus Verzweiflung (z.B. «Dann verlasse ich dich») ruhig bleiben, das Gefühl dahinter ansprechen und nicht aus Angst nachgeben. Solche Aussagen entstehen meist aus grosser Verlassensangst, nicht aus rationaler Absicht – sie signalisieren innere Not, keine Strategie.",
          links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }],
        },
        {
          question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
          answer:
            "Vermeiden Sie Rechtfertigungen oder Gegenangriffe – das eskaliert die Situation. Nutzen Sie stattdessen Validierung: «Ich verstehe, dass du dich gerade verletzt fühlst» (validiert das Gefühl, nicht die Beschuldigung). Dann setzen Sie eine Grenze: «Ich möchte mit dir darüber sprechen, aber nicht, wenn du mich anschreist.» Wenn möglich, bieten Sie eine Pause an: «Lass uns in 20 Minuten weitersprechen, wenn wir beide ruhiger sind.» Wichtig: Sie müssen sich nicht für Dinge entschuldigen, die Sie nicht getan haben.",
          links: [
            { text: "SET-Kommunikation lernen", url: "/kommunizieren" },
            { text: "SET üben →", url: "/uebungen" },
          ],
        },
        {
          question: "Wie gehe ich mit dem Schwarz-Weiss-Denken um?",
          answer:
            "Das «Splitting» (Idealisierung und Abwertung) ist ein häufiges Merkmal bei Borderline, aber nicht bei allen Betroffenen gleich ausgeprägt. In einem Moment sind Sie der beste Mensch der Welt, im nächsten der schlimmste. Wichtig: Nehmen Sie weder die Idealisierung noch die Abwertung persönlich. Beides kann Ausdruck von innerer Anspannung und Beziehungssorge sein. Bleiben Sie konsistent in Ihrem Verhalten, auch wenn die Bewertung schwankt. Sagen Sie zum Beispiel: «Ich bin derselbe Mensch wie gestern. Ich liebe dich, auch wenn du gerade wütend auf mich bist.» Mit der Zeit und Therapie lernen Betroffene, Grautöne zu sehen.",
          links: [{ text: "Borderline verstehen", url: "/verstehen" }],
        },
        {
          question: "Soll ich lügen, um Konflikte zu vermeiden?",
          answer:
            "Nein. Kurzfristig mag eine Lüge Frieden bringen, aber langfristig zerstört sie Vertrauen – und Vertrauen ist für Menschen mit Borderline ohnehin schwierig. Stattdessen: Seien Sie ehrlich, aber taktvoll. Nutzen Sie «Ich»-Aussagen statt Vorwürfe. Wenn die Wahrheit schmerzhaft ist, validieren Sie zuerst das Gefühl: «Ich weiss, das ist nicht das, was du hören wolltest, und ich verstehe, dass dich das verletzt.» Ehrlichkeit mit Mitgefühl ist der Mittelweg zwischen brutaler Offenheit und Vermeidung.",
          links: [
            { text: "Kommunikation & Validierung", url: "/kommunizieren" },
          ],
        },
      ],
    },
    {
      title: "Grenzen & Selbstschutz",
      icon: <Shield className="w-5 h-5" />,
      color: "var(--color-sage-mid)",
      questions: [
        {
          question: "Wann ist eine Einweisung nötig?",
          answer:
            "Bei akuter Suizidalität mit konkreten Plänen oder Mitteln, schwerer Selbstverletzung mit Versorgungsbedarf, Fremdgefährdung oder völliger Dekompensation. In der Schweiz kann eine fürsorgerische Unterbringung (FU) durch einen Arzt angeordnet werden. Im Zweifelsfall: psychiatrischen Notdienst anrufen – die können die Situation einschätzen.",
          links: [{ text: "Notfallnummern", url: "/soforthilfe" }],
        },
        {
          question: "Darf ich meinen Angehörigen verlassen?",
          answer:
            "Ja. Eine Beziehung zu beenden kann eine legitime und verantwortbare Entscheidung sein – auch wenn Ihr Angehöriger psychisch krank ist. Wenn die Beziehung Ihre psychische oder körperliche Gesundheit ernsthaft belastet oder gefährdet, braucht dieser Umstand ein grosses Gewicht. Wichtig ist, eine Trennung nach Möglichkeit nicht mitten in einer akuten Krise impulsiv zu vollziehen, sondern vorbereitet und mit Blick auf Sicherheit. Wenn es eine Behandlung gibt, kann es sinnvoll sein, Fachpersonen zu informieren. Und: Sie können eine Grenze ziehen oder gehen und trotzdem Mitgefühl behalten.",
          links: [{ text: "Grenzen setzen", url: "/grenzen" }],
        },
        {
          question: "Wie schütze ich meine Kinder?",
          answer:
            "Kinder brauchen Stabilität und Vorhersehbarkeit. Erklären Sie altersgerecht, dass Mama/Papa manchmal sehr starke Gefühle hat und das nicht die Schuld des Kindes ist. Schützen Sie Kinder vor eskalierenden Situationen – verlassen Sie mit ihnen den Raum, wenn nötig. Sorgen Sie für «Normalität»: Routinen, Freunde, Hobbys. Achten Sie auf Warnsignale beim Kind (Rückzug, Angst, Verhaltensänderungen) und holen Sie bei Bedarf professionelle Hilfe. Und: Kümmern Sie sich um sich selbst – ein stabiler Elternteil ist der beste Schutz für das Kind.",
          links: [
            { text: "Grenzen setzen", url: "/grenzen" },
            { text: "Selbstfürsorge als Elternteil", url: "/selbstfuersorge" },
          ],
        },
        {
          question: "Bin ich co-abhängig?",
          answer:
            "«Co-Abhängigkeit» meint, dass sich Ihr eigenes Leben immer stärker um den Zustand des anderen dreht: Sie entschuldigen destruktives Verhalten, geben Ihr soziales Leben auf oder fühlen sich für die Gefühle des anderen verantwortlich. Das spricht nicht gegen Ihren Charakter, sondern zeigt ein belastendes Beziehungsmuster. Beratung, eigene Therapie oder eine Angehörigengruppe können helfen, wieder klarer zu werden.",
          links: [
            { text: "Selbstfürsorge", url: "/selbstfuersorge" },
            { text: "Glossar: Co-Abhängigkeit", url: "/glossar" },
          ],
        },
      ],
    },
    {
      title: "Therapie & Behandlung",
      icon: <Heart className="w-5 h-5" />,
      color: "var(--color-slate-mid)",
      questions: [
        {
          question: "Mein Angehöriger will keine Therapie – was tun?",
          answer:
            "Sie können niemanden zur Therapie zwingen (ausser bei akuter Gefährdung). Was Sie tun können: Informieren Sie sich selbst über Borderline und ändern Sie Ihr eigenes Verhalten – das kann indirekt helfen. Sprechen Sie Therapie als Möglichkeit an, ohne zu drängen. Nutzen Sie «Ich»-Aussagen: «Ich mache mir Sorgen und wünsche mir, dass du Unterstützung bekommst.» Setzen Sie Grenzen für inakzeptables Verhalten – manchmal motiviert das zur Veränderung. Und: Holen Sie sich selbst Unterstützung, unabhängig davon, ob Ihr Angehöriger Therapie macht.",
          links: [
            {
              text: "Therapieangebote Zürich",
              url: "/unterstuetzen/therapie#therapieangebote",
            },
          ],
        },
        {
          question: "Welche Therapie ist am besten?",
          answer:
            "Es gibt mehrere gut erforschte Methoden (DBT, MBT, Schematherapie, TFP). Alle können wirksam sein – wichtiger als die Methode ist oft die Passung zwischen Therapeut und Patient.",
          links: [
            { text: "Therapieformen erklärt", url: "/unterstuetzen/therapie" },
          ],
        },
        {
          question: "Soll ich an der Therapie teilnehmen?",
          answer:
            "Wenn Sie eingeladen werden: Ja, das kann sehr hilfreich sein. Familientherapie oder Angehörigensitzungen verbessern nachweislich die Behandlungsergebnisse. Sie lernen, wie Sie unterstützen können, ohne zu schaden, und der Therapeut kann Kommunikationsmuster beobachten. Wichtig: Gehen Sie nicht hin, um sich zu beschweren oder Recht zu bekommen. Ziel ist gemeinsames Lernen. Wenn Sie nicht eingeladen werden: Respektieren Sie das. Ihr Angehöriger braucht einen geschützten Raum. Sie können trotzdem eigene Beratung suchen.",
          links: [
            { text: "Therapie unterstützen", url: "/unterstuetzen/therapie" },
          ],
        },
        {
          question: "Wie lange dauert die Behandlung?",
          answer:
            "Borderline-Therapie ist keine Kurzzeitbehandlung: Rechnen Sie mit mindestens 1–3 Jahren für deutliche Verbesserungen. Stationäre Aufenthalte (z.B. DBT-Station) dauern typischerweise 8–12 Wochen und sind oft der Einstieg in eine längere ambulante Behandlung. Fortschritte sind nicht linear – Rückschläge sind normal und kein Zeichen von Versagen.",
          links: [{ text: "Genesung & Prognose", url: "/genesung" }],
        },
      ],
    },
    {
      title: "Alltag & Beziehung",
      icon: <Users className="w-5 h-5" />,
      color: "var(--color-sage-mid)",
      questions: [
        {
          question: "Wie erkläre ich die Situation Freunden/Familie?",
          answer:
            "Sie müssen nicht alles erklären. Sagen Sie so viel, wie Sie möchten: «Er/sie hat eine psychische Erkrankung, die starke Stimmungsschwankungen verursacht. Wir arbeiten daran.» Sie können auch Grenzen setzen: «Ich möchte nicht ins Detail gehen, aber ich schätze eure Unterstützung.» Wählen Sie sorgfältig aus, wem Sie was erzählen – nicht jeder muss alles wissen. Und: Bitten Sie um konkrete Hilfe statt allgemeinem Mitleid («Könntest du nächste Woche auf die Kinder aufpassen?»).",
        },
        {
          question: "Wie gehe ich mit Eifersucht und Kontrolle um?",
          answer:
            "Eifersucht bei Borderline wurzelt aus Angehörigensicht häufig in Verlassensangst, nicht nur in Misstrauen. Verstehen Sie das, ohne es zu akzeptieren. Setzen Sie klare Grenzen: «Ich werde mein Handy nicht zeigen. Ich habe nichts zu verbergen, aber ich brauche Privatsphäre.» Geben Sie nicht nach, um Ruhe zu haben – das verstärkt das Muster. Gleichzeitig: Seien Sie transparent, wo es Ihnen möglich ist, ohne sich zu verbiegen. Ermutigen Sie Ihren Angehörigen, die Eifersucht in der Therapie zu bearbeiten.",
          links: [{ text: "Grenzen setzen", url: "/grenzen" }],
        },
        {
          question: "Kann ich noch ein normales Leben führen?",
          answer:
            "Ja, ein eigenes Leben ist weiterhin möglich, aber oft nicht ohne bewusste Gegenbewegung zur Belastung. Eigene Freundschaften, Interessen und Erholungszeiten sind kein Verrat, sondern wichtig für Ihre Stabilität. Gleichzeitig ist es realistisch, dass Ihr Alltag zeitweise stärker von Unsicherheit geprägt ist als der anderer Menschen. Ziel ist deshalb nicht ein «perfekt normales» Leben, sondern ein tragfähiger Alltag, in dem Beziehung, Selbstschutz und eigene Lebensbereiche nebeneinander Platz haben.",
          links: [
            { text: "Selbstfürsorge-Strategien", url: "/selbstfuersorge" },
            { text: "Beratung & Netzwerke", url: "/beratung" },
          ],
        },
        {
          question: "Wann wird es besser?",
          answer:
            "Das ist für viele Angehörige die schwierigste Frage. Die ehrliche Antwort lautet: Der Verlauf bleibt begrenzt vorhersehbar. Manche Betroffene zeigen nach Monaten deutliche Fortschritte, bei anderen dauert es deutlich länger – und nicht alle Verläufe sind gleich. Was Sie beeinflussen können, sind Ihr eigenes Verhalten, Ihre Grenzen und Ihre Selbstfürsorge. Was Sie nicht steuern können, ist der Zeitpunkt oder das Tempo der Veränderung Ihres Angehörigen. Hilfreich ist meist, auf Entwicklungen über längere Zeit zu achten statt auf einzelne Tage oder Krisen.",
          links: [{ text: "Genesung & Prognose", url: "/genesung" }],
        },
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title="Häufige Fragen"
        description="Antworten auf die häufigsten Fragen von Angehörigen zu Borderline."
        path="/faq"
      />
      <FAQSchema
        questions={faqCategories.flatMap(c =>
          c.questions.map(q => ({ question: q.question, answer: q.answer }))
        )}
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
              <div className="w-12 h-12 rounded-xl bg-slate-mid flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Häufig gestellte Fragen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Antworten auf häufige Fragen von Angehörigen. Die FAQ sollen
              Orientierung geben, ohne schwierige Situationen zu stark zu
              vereinfachen oder eine individuelle Einschätzung zu ersetzen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8 border-border/60 bg-muted/20">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Manche Fragen lassen sich nicht allgemein beantworten, weil
                  Sicherheit, Kinder, Gewalt, Trennung oder akute Suizidalität
                  eine eigene Einschätzung brauchen. Nutzen Sie diese Seite als
                  Orientierung und holen Sie bei Bedarf zusätzliche Beratung
                  dazu.
                </p>
              </CardContent>
            </Card>

            <nav
              aria-label="Sprungnavigation zu den FAQ-Kategorien"
              className="mb-8 rounded-xl border border-border/60 bg-muted/20 p-4"
            >
              <p className="text-sm font-medium text-foreground mb-3">
                Direkt zum passenden Themenbereich:
              </p>
              <div className="flex flex-wrap gap-2">
                {faqCategories.map(category => (
                  <a
                    key={category.title}
                    href={`#${slugifyCategory(category.title)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
                  >
                    <span
                      className="flex-shrink-0"
                      style={{ color: category.color }}
                    >
                      {category.icon}
                    </span>
                    {category.title}
                  </a>
                ))}
              </div>
            </nav>

            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                id={slugifyCategory(category.title)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, ease: "easeOut" }}
                className="mb-8 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-normal text-foreground">
                    {category.title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline text-left">
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        {faq.links && faq.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {faq.links.map((link, linkIndex) => (
                              <Link key={linkIndex} href={link.url}>
                                <span
                                  className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                                  style={{
                                    backgroundColor: `${category.color}15`,
                                    color: category.color,
                                  }}
                                >
                                  {link.text}
                                  <ChevronRight className="w-3 h-3" />
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}

            <EvidenceNote
              title="Quellen zu Prognose- und Therapieaussagen"
              definition="Kurzdefinition: Remission = Diagnosekriterien werden über längere Zeit nicht mehr erfüllt; Recovery = Remission plus stabiles soziales/berufliches Funktionsniveau."
              className="mt-8"
              sources={[
                {
                  label:
                    "Zanarini et al. (2010), Time to attainment of recovery from BPD",
                  href: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
                },
                {
                  label:
                    "Zanarini et al. (2012), Sustained remission and recovery in BPD",
                  href: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
                },
                {
                  label:
                    "Gunderson et al. (2011), Ten-year course of BPD (CLPS)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
                },
                {
                  label:
                    "Storebø, Stoffers-Winterling et al. (2020), Psychological therapies for BPD (Cochrane)",
                  href: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
                },
              ]}
            />

            {/* Weitere Fragen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="bg-sage-wash border-sage">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-8 h-8 text-sage-mid mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Ihre Frage ist nicht dabei?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nutzen Sie die Suchfunktion oder kontaktieren Sie die
                    Fachstelle Angehörigenarbeit der PUK Zürich für individuelle
                    Beratung.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/fachstelle">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-mid hover:underline">
                        Zur Beratung
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <Link href="/glossar">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-mid hover:underline">
                        Zum Glossar
                        <ChevronRight className="w-4 h-4" />
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
