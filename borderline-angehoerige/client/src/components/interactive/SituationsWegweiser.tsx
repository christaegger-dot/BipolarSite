import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Phone,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Heart,
  Shield,
  MessageCircle,
  Clock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { kontaktByIdStrict } from "@/data/kontakte";

// ─── Types ────────────────────────────────────────────────

interface Step {
  id: string;
  text: string;
  detail?: string;
  icon?: React.ReactNode;
  /** Indicates an emergency step – shows emergency numbers */
  emergency?: boolean;
  /** Phone contact IDs from kontakte.ts to display */
  kontakte?: string[];
  /** Link to another page */
  link?: { href: string; label: string };
}

interface Choice {
  label: string;
  nextId: string;
}

interface TreeNode {
  id: string;
  question: string;
  subtitle?: string;
  icon?: React.ReactNode;
  choices?: Choice[];
  /** If no choices, this is a leaf with steps */
  steps?: Step[];
}

// ─── Decision tree data ───────────────────────────────────

const TREE: TreeNode[] = [
  // ─── ROOT ───
  {
    id: "start",
    question: "Was passiert gerade?",
    subtitle: "Wählen Sie die Situation, die am ehesten zutrifft.",
    icon: <AlertTriangle className="w-6 h-6" />,
    choices: [
      { label: "Suiziddrohung oder Suizidgedanken", nextId: "suizid" },
      { label: "Selbstverletzung", nextId: "selbstverletzung" },
      { label: "Starker Wutausbruch oder Aggression", nextId: "aggression" },
      { label: "Kontaktabbruch / Rückzug", nextId: "kontaktabbruch" },
      { label: "Starke Verzweiflung / Weinkrampf", nextId: "verzweiflung" },
      { label: "Manipulation / emotionale Erpressung", nextId: "manipulation" },
    ],
  },

  // ─── SUIZID ───
  {
    id: "suizid",
    question: "Besteht unmittelbare Gefahr?",
    subtitle:
      "Versuchen Sie einzuschätzen: Handelt Ihr Angehöriger gerade aktiv oder spricht er/sie davon?",
    icon: <AlertTriangle className="w-6 h-6" />,
    choices: [
      {
        label: "Ja – akute Handlung oder konkreter Plan",
        nextId: "suizid_akut",
      },
      {
        label: "Nein – er/sie spricht darüber, aber keine akute Handlung",
        nextId: "suizid_gespraech",
      },
    ],
  },
  {
    id: "suizid_akut",
    question: "Akute Suizidgefahr",
    icon: <Phone className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Rufen Sie sofort den Notruf an",
        detail:
          "Bleiben Sie am Telefon und folgen Sie den Anweisungen der Leitstelle.",
        icon: <Phone className="w-5 h-5" />,
        emergency: true,
        kontakte: ["ROT_144", "ROT_117"],
      },
      {
        id: "s2",
        text: "Bleiben Sie bei der Person",
        detail:
          "Lassen Sie Ihren Angehörigen nicht allein, bis professionelle Hilfe eintrifft. Sprechen Sie ruhig und klar.",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Sichern Sie die Umgebung",
        detail:
          "Entfernen Sie – wenn möglich – Medikamente, scharfe Gegenstände oder andere gefährliche Mittel aus der Reichweite.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Holen Sie sich danach Entlastung",
        detail:
          "Solche Situationen sind extrem belastend. Rufen Sie danach die Dargebotene Hand an oder sprechen Sie mit einer Vertrauensperson.",
        icon: <Heart className="w-5 h-5" />,
        kontakte: ["GRUEN_143"],
      },
    ],
  },
  {
    id: "suizid_gespraech",
    question: "Suizidgedanken – Gespräch führen",
    icon: <MessageCircle className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Nehmen Sie es ernst – fragen Sie direkt nach",
        detail:
          '"Hast du gerade Gedanken, dir etwas anzutun?" Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.',
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Hören Sie zu, ohne zu urteilen",
        detail:
          'Vermeiden Sie Sätze wie "So schlimm ist es doch nicht" oder "Denk an deine Familie". Anerkennen Sie den Schmerz.',
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Fragen Sie nach einem Plan",
        detail:
          "Gibt es einen konkreten Plan, ein Mittel, einen Zeitpunkt? Je konkreter, desto dringlicher ist professionelle Hilfe.",
        icon: <AlertTriangle className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Verbinden Sie mit professioneller Hilfe",
        detail:
          "Schlagen Sie vor, gemeinsam bei der PUK oder der Dargebotenen Hand anzurufen.",
        icon: <Phone className="w-5 h-5" />,
        kontakte: ["GELB_PUK_ERW", "GRUEN_143"],
      },
      {
        id: "s5",
        text: "Vergessen Sie sich selbst nicht",
        detail:
          "Solche Gespräche sind enorm belastend. Holen Sie sich selbst Unterstützung.",
        icon: <Heart className="w-5 h-5" />,
        link: { href: "/selbstfuersorge", label: "Zur Selbstfürsorge" },
      },
    ],
  },

  // ─── SELBSTVERLETZUNG ───
  {
    id: "selbstverletzung",
    question: "Wie schwer ist die Verletzung?",
    subtitle: "Versuchen Sie die Situation einzuschätzen.",
    icon: <AlertTriangle className="w-6 h-6" />,
    choices: [
      {
        label: "Schwere Verletzung – braucht medizinische Hilfe",
        nextId: "selbstverletzung_schwer",
      },
      {
        label: "Leichte Verletzung – keine akute medizinische Gefahr",
        nextId: "selbstverletzung_leicht",
      },
    ],
  },
  {
    id: "selbstverletzung_schwer",
    question: "Schwere Selbstverletzung",
    icon: <Phone className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Rufen Sie den Rettungsdienst",
        detail:
          "Bei starker Blutung oder Vergiftungsverdacht: sofort 144 anrufen.",
        icon: <Phone className="w-5 h-5" />,
        emergency: true,
        kontakte: ["ROT_144"],
      },
      {
        id: "s2",
        text: "Leisten Sie Erste Hilfe",
        detail:
          "Stillen Sie Blutungen mit sauberem Tuch, bringen Sie die Person in eine stabile Position.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Bleiben Sie ruhig und präsent",
        detail: '"Ich bin da. Hilfe kommt." Vermeiden Sie Vorwürfe.',
        icon: <Heart className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "selbstverletzung_leicht",
    question: "Leichte Selbstverletzung",
    icon: <Heart className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Bleiben Sie ruhig – keine Panik zeigen",
        detail:
          "Selbstverletzung ist oft ein Versuch, unerträgliche Spannung abzubauen. Ihre Ruhe hilft.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Versorgen Sie die Verletzung sachlich",
        detail:
          "Bieten Sie Pflaster oder Verband an, ohne die Verletzung zu dramatisieren oder zu ignorieren.",
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Bieten Sie Alternativen an",
        detail:
          '"Möchtest du stattdessen Eiswürfel halten, kalt duschen oder etwas anderes Intensives spüren?"',
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Sprechen Sie es später an",
        detail:
          'Nicht in der akuten Situation, aber danach: "Ich habe gesehen, dass es dir schlecht ging. Können wir darüber reden?"',
        icon: <Clock className="w-5 h-5" />,
      },
      {
        id: "s5",
        text: "Professionelle Hilfe einbeziehen",
        detail:
          "Wenn Selbstverletzung wiederholt vorkommt, ist therapeutische Unterstützung wichtig.",
        icon: <Phone className="w-5 h-5" />,
        kontakte: ["GELB_PUK_ERW"],
      },
    ],
  },

  // ─── AGGRESSION ───
  {
    id: "aggression",
    question: "Fühlen Sie sich körperlich bedroht?",
    subtitle: "Ihre Sicherheit geht vor.",
    icon: <Shield className="w-6 h-6" />,
    choices: [
      {
        label: "Ja – ich fühle mich unsicher oder bedroht",
        nextId: "aggression_gefahr",
      },
      {
        label: "Nein – starke Emotionen, aber keine körperliche Bedrohung",
        nextId: "aggression_verbal",
      },
    ],
  },
  {
    id: "aggression_gefahr",
    question: "Sie fühlen sich bedroht",
    icon: <Shield className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Bringen Sie sich in Sicherheit",
        detail:
          "Verlassen Sie den Raum oder die Wohnung. Ihre Sicherheit hat absolute Priorität.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Rufen Sie bei Bedarf die Polizei",
        detail: "Wenn Sie sich bedroht fühlen oder Gewalt droht.",
        icon: <Phone className="w-5 h-5" />,
        emergency: true,
        kontakte: ["ROT_117"],
      },
      {
        id: "s3",
        text: "Sie tragen keine Schuld",
        detail:
          "Gewalt ist nie akzeptabel, auch nicht in einer Krise. Sich zu schützen ist kein Verrat.",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Holen Sie sich Unterstützung",
        detail:
          "Sprechen Sie über das Erlebte – mit einer Vertrauensperson oder einer Beratungsstelle.",
        icon: <Phone className="w-5 h-5" />,
        kontakte: ["GRUEN_143"],
      },
    ],
  },
  {
    id: "aggression_verbal",
    question: "Verbale Eskalation deeskalieren",
    icon: <MessageCircle className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Sprechen Sie langsam und leise",
        detail:
          "Ihre ruhige Stimme kann ansteckend wirken. Senken Sie bewusst Lautstärke und Tempo.",
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Validieren Sie die Emotion",
        detail:
          '"Ich sehe, dass du gerade extrem wütend bist. Das muss sich furchtbar anfühlen."',
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Setzen Sie eine klare Grenze",
        detail:
          '"Ich möchte für dich da sein, aber ich kann nicht bleiben, wenn du mich anschreist. Sollen wir 10 Minuten Pause machen?"',
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Bieten Sie körperliche Entladung an",
        detail:
          "Kissen schlagen, Eiswürfel halten, kaltes Wasser – intensive Reize helfen, die Spannung abzubauen.",
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
      {
        id: "s5",
        text: "Gehen Sie, wenn es nötig ist",
        detail:
          "Wenn die Eskalation nicht nachlässt, dürfen Sie den Raum verlassen. Das ist kein Aufgeben, sondern Selbstschutz.",
        icon: <Shield className="w-5 h-5" />,
        link: { href: "/grenzen", label: "Mehr zu Grenzen setzen" },
      },
    ],
  },

  // ─── KONTAKTABBRUCH ───
  {
    id: "kontaktabbruch",
    question: "Kontaktabbruch oder Rückzug",
    icon: <Clock className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Atmen Sie durch – Rückzug ist nicht Ihr Versagen",
        detail:
          "Kontaktabbruch kann ein Schutzmechanismus sein. Er bedeutet nicht, dass Sie etwas falsch gemacht haben.",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Senden Sie eine kurze, wertungsfreie Nachricht",
        detail:
          '"Ich bin da, wenn du bereit bist. Kein Druck." Einmal senden, dann Raum lassen.',
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Setzen Sie sich eine innere Frist",
        detail:
          "Überlegen Sie sich: Wie lange warten Sie, bevor Sie sich erneut melden? Z.B. nach 3 Tagen eine weitere kurze Nachricht.",
        icon: <Clock className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Drängen Sie nicht",
        detail:
          "Wiederholtes Anrufen oder Vorbeikommen kann den Rückzug verstärken. Respektieren Sie die Grenze, auch wenn es schwerfällt.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s5",
        text: "Sorgen Sie für sich selbst",
        detail:
          "Kontaktabbruch tut weh. Sprechen Sie mit jemandem darüber – einer Freundin, einem Therapeuten oder der Dargebotenen Hand.",
        icon: <Heart className="w-5 h-5" />,
        kontakte: ["GRUEN_143"],
        link: { href: "/selbstfuersorge", label: "Zur Selbstfürsorge" },
      },
      {
        id: "s6",
        text: "Wenn Sie sich Sorgen machen",
        detail:
          "Wenn der Rückzug untypisch ist und Sie Suizidgefahr befürchten, vertrauen Sie Ihrem Gefühl und handeln Sie.",
        icon: <AlertTriangle className="w-5 h-5" />,
        kontakte: ["GELB_PUK_ERW"],
      },
    ],
  },

  // ─── VERZWEIFLUNG ───
  {
    id: "verzweiflung",
    question: "Starke Verzweiflung begleiten",
    icon: <Heart className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Seien Sie einfach da",
        detail:
          'Sie müssen nichts Kluges sagen. "Ich bin hier" reicht oft. Setzen Sie sich daneben, halten Sie aus.',
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Validieren Sie den Schmerz",
        detail:
          '"Das muss sich gerade furchtbar anfühlen. Es ist okay zu weinen." Keine Ratschläge, kein Relativieren.',
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Bieten Sie Körperliches an",
        detail:
          "Ein Glas Wasser, eine Decke, ein warmes Getränk. Kleine, konkrete Gesten helfen mehr als grosse Worte.",
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Erden Sie sanft",
        detail:
          'Wenn die Person bereit ist: "Spürst du deine Füsse auf dem Boden? Kannst du langsam ein- und ausatmen?"',
        icon: <Shield className="w-5 h-5" />,
        link: { href: "/selbstfuersorge#grounding", label: "Grounding-Übung" },
      },
      {
        id: "s5",
        text: "Wissen Sie, wann es zu viel wird",
        detail:
          "Wenn die Verzweiflung Stunden anhält oder Sie Suizidgedanken vermuten, ziehen Sie Hilfe hinzu.",
        icon: <Phone className="w-5 h-5" />,
        kontakte: ["GRUEN_143", "GELB_PUK_ERW"],
      },
    ],
  },

  // ─── MANIPULATION ───
  {
    id: "manipulation",
    question: "Emotionale Erpressung / Manipulation",
    icon: <Shield className="w-6 h-6" />,
    steps: [
      {
        id: "s1",
        text: "Erkennen Sie das Muster",
        detail:
          '"Wenn du gehst, bringe ich mich um" oder "Ohne dich kann ich nicht leben" – das sind Zeichen extremer Not, aber auch Versuche, Kontrolle zu behalten.',
        icon: <AlertTriangle className="w-5 h-5" />,
      },
      {
        id: "s2",
        text: "Nehmen Sie die Not ernst, aber nicht die Verantwortung",
        detail:
          "Die Gefühle dahinter sind real. Aber Sie sind nicht dafür verantwortlich, was ein anderer Mensch mit seinem Leben tut.",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        id: "s3",
        text: "Bleiben Sie bei Ihrer Grenze",
        detail:
          '"Ich nehme deine Verzweiflung ernst. Aber ich kann diese Entscheidung nicht für dich treffen. Lass uns gemeinsam Hilfe holen."',
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: "s4",
        text: "Delegieren Sie an Profis",
        detail:
          "Wenn jemand mit Suizid droht, um Sie zu halten: Informieren Sie professionelle Hilfe. Das ist kein Verrat, sondern Fürsorge.",
        icon: <Phone className="w-5 h-5" />,
        kontakte: ["GELB_PUK_ERW", "GRUEN_143"],
      },
      {
        id: "s5",
        text: "Schützen Sie sich",
        detail:
          "Emotionale Erpressung ist eine Form von Gewalt. Sie brauchen eigene Unterstützung, um damit umzugehen.",
        icon: <Heart className="w-5 h-5" />,
        link: { href: "/grenzen", label: "Mehr zu Grenzen setzen" },
      },
    ],
  },
];

// ─── Lookup helper ────────────────────────────────────────

function nodeById(id: string): TreeNode | undefined {
  return TREE.find(n => n.id === id);
}

// ─── Phone number display ─────────────────────────────────

function KontaktPill({ kontaktId }: { kontaktId: string }) {
  const k = kontaktByIdStrict(kontaktId);
  return (
    <a
      href={`tel:${k.tel}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-sos-rot)]/10 text-[var(--color-sos-rot)] text-sm font-semibold hover:bg-[var(--color-sos-rot)]/20 transition-colors"
    >
      <Phone className="w-3.5 h-3.5" />
      {k.nummer} – {k.label}
    </a>
  );
}

// ─── Main component ───────────────────────────────────────

export default function SituationsWegweiser() {
  const [history, setHistory] = useState<string[]>(["start"]);
  const currentId = history[history.length - 1];
  const node = nodeById(currentId);

  const navigate = useCallback((nextId: string) => {
    setHistory(prev => [...prev, nextId]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const reset = useCallback(() => {
    setHistory(["start"]);
  }, []);

  if (!node) return null;

  const isStart = currentId === "start";
  const _isLeaf = !!node.steps;
  const depth = history.length - 1;

  return (
    <div className="space-y-6">
      {/* Progress / breadcrumb */}
      {!isStart && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={reset}
            className="hover:text-foreground transition-colors"
          >
            Start
          </button>
          {history.slice(1).map((hId, i) => {
            const hNode = nodeById(hId);
            return (
              <span key={hId} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5" />
                {i === history.length - 2 ? (
                  <span className="text-foreground font-medium">
                    {hNode?.question}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHistory(history.slice(0, i + 2))}
                    className="hover:text-foreground transition-colors"
                  >
                    {hNode?.question}
                  </button>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* Main card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Card className="border-border/60 overflow-hidden">
            {/* Header */}
            <div className="bg-[var(--color-sage-wash)] px-5 py-4 sm:px-6 sm:py-5 border-b border-border/40">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[var(--color-sage-dark)]">
                  {node.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">
                    {node.question}
                  </h3>
                  {node.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {node.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <CardContent className="p-5 sm:p-6">
              {/* Choice buttons */}
              {node.choices && (
                <div className="space-y-2.5">
                  {node.choices.map(choice => (
                    <button
                      key={choice.nextId}
                      type="button"
                      onClick={() => navigate(choice.nextId)}
                      className="w-full text-left flex items-center justify-between gap-3 p-4 rounded-xl border border-border/60 bg-background hover:bg-[var(--color-sage-wash)]/50 hover:border-[var(--color-sage-dark)]/30 active:scale-[0.99] transition-all group"
                    >
                      <span className="text-sm sm:text-base text-foreground font-medium">
                        {choice.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--color-sage-dark)] transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Steps (leaf) */}
              {node.steps && (
                <div className="space-y-4">
                  {node.steps.map((step, i) => (
                    <div
                      key={step.id}
                      className={`flex items-start gap-3.5 p-4 rounded-xl ${
                        step.emergency
                          ? "bg-[var(--color-sos-rot)]/5 border border-[var(--color-sos-rot)]/20"
                          : "bg-muted/30"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.emergency
                            ? "bg-[var(--color-sos-rot)]/15 text-[var(--color-sos-rot)]"
                            : "bg-[var(--color-sage-wash)] text-[var(--color-sage-dark)]"
                        }`}
                      >
                        {step.icon || (
                          <span className="text-sm font-semibold">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm sm:text-base leading-tight">
                          {step.text}
                        </p>
                        {step.detail && (
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {step.detail}
                          </p>
                        )}
                        {step.kontakte && step.kontakte.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {step.kontakte.map(kId => (
                              <KontaktPill key={kId} kontaktId={kId} />
                            ))}
                          </div>
                        )}
                        {step.link && (
                          <a
                            href={step.link.href}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-sage-dark)] hover:underline mt-2"
                          >
                            {step.link.label}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {!isStart ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
        ) : (
          <div />
        )}
        {depth > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Von vorne beginnen
          </Button>
        )}
      </div>
    </div>
  );
}
