import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
  Heart,
  Shield,
  Scale,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────

type Technique = "SET" | "DEAR" | "Validierung";

interface AnswerOption {
  id: string;
  text: string;
  correct: boolean;
  /** Feedback shown after selecting this option */
  feedback: string;
  /** Which technique component this demonstrates */
  techniqueHint?: string;
}

interface Scenario {
  id: string;
  title: string;
  /** The technique being practiced */
  technique: Technique;
  /** Scene-setting context */
  context: string;
  /** What the affected person says */
  statement: string;
  /** Available response options */
  options: AnswerOption[];
  /** Educational note shown after answering */
  learnNote: string;
}

// ─── Scenario data ────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  // ─── SET scenarios ──────────────────────────────────
  {
    id: "set-1",
    title: "«Du bist nie für mich da!»",
    technique: "SET",
    context:
      "Ihr Angehöriger ist nach einem schwierigen Tag aufgewühlt und macht Ihnen Vorwürfe. Sie möchten mit SET reagieren: Support (Unterstützung zeigen), Empathie (Gefühle anerkennen), Truth (Klarheit schaffen).",
    statement:
      "«Du bist nie für mich da! Niemand versteht mich! Du machst alles nur schlimmer!»",
    options: [
      {
        id: "a",
        text: "«Ich bin jetzt hier bei dir und gehe nicht weg. Ich kann spüren, dass du dich gerade unglaublich allein fühlst. Lass uns gemeinsam überlegen, was dir jetzt helfen könnte.»",
        correct: true,
        feedback:
          "Genau richtig. S: «Ich bin hier und gehe nicht weg» zeigt Unterstützung. E: «Ich kann spüren, dass du dich allein fühlst» validiert das Gefühl. T: «Lass uns überlegen, was helfen könnte» bringt sachliche Klarheit.",
        techniqueHint: "S → E → T",
      },
      {
        id: "b",
        text: "«Das stimmt doch gar nicht, ich bin ständig für dich da. Letzte Woche erst habe ich alles stehen und liegen lassen.»",
        correct: false,
        feedback:
          "Das ist eine Verteidigung. Auch wenn der Inhalt stimmt, fühlt sich Ihr Angehöriger dadurch nicht gehört. In SET fehlt hier die Empathie-Komponente komplett.",
        techniqueHint: "Keine SET-Struktur",
      },
      {
        id: "c",
        text: "«So schlimm ist es doch nicht. Versuch mal, positiv zu denken.»",
        correct: false,
        feedback:
          "Das wirkt bagatellisierend. Der Schmerz wird heruntergespielt, was die Eskalation oft verstärkt. SET beginnt damit, den Schmerz anzuerkennen – nicht zu relativieren.",
        techniqueHint: "Invalidierung",
      },
    ],
    learnNote:
      "SET steht für Support – Empathy – Truth. Die Reihenfolge ist wichtig: Zuerst Unterstützung zeigen, dann Empathie, dann sachliche Klarheit. Ohne S und E wird T als Angriff empfunden.",
  },
  {
    id: "set-2",
    title: "«Ich brauche dich jetzt sofort!»",
    technique: "SET",
    context:
      "Es ist 23 Uhr. Ihr Angehöriger ruft an und verlangt, dass Sie sofort vorbeikommen. Sie haben morgen früh einen wichtigen Termin.",
    statement:
      "«Du musst jetzt sofort herkommen! Ich halte das nicht mehr aus! Wenn du nicht kommst, weiss ich nicht, was ich tue!»",
    options: [
      {
        id: "a",
        text: "«Ich komme sofort. Halte durch, ich bin gleich da.»",
        correct: false,
        feedback:
          "Das zeigt Support, aber ohne Klarheit (Truth) opfern Sie Ihre eigene Grenze. Langfristig führt das zu Erschöpfung und dem Gefühl, erpresst zu werden.",
        techniqueHint: "Nur S, kein T",
      },
      {
        id: "b",
        text: "«Ich höre, dass es dir gerade ganz schlecht geht, und das nehme ich ernst. Ich bin jetzt am Telefon für dich da. Ich kann heute Nacht nicht kommen, aber lass uns schauen, was dir jetzt helfen kann – möchtest du die 143 anrufen?»",
        correct: true,
        feedback:
          "Gut gelöst. S: «Ich bin am Telefon für dich da.» E: «Es geht dir gerade ganz schlecht, das nehme ich ernst.» T: «Ich kann heute Nacht nicht kommen» – klare Grenze mit konkreter Alternative (143).",
        techniqueHint: "S → E → T mit Alternative",
      },
      {
        id: "c",
        text: "«Du rufst immer so spät an. Das geht nicht. Ruf eine Beratungsstelle an.»",
        correct: false,
        feedback:
          "Die Grenze (T) ist wichtig, aber ohne S und E klingt es kalt und abweisend. Das Gefühl des Angehörigen wird ignoriert.",
        techniqueHint: "Nur T, ohne S und E",
      },
    ],
    learnNote:
      "Grenzen setzen (Truth) ist ein wichtiger Teil von SET. Aber die Grenze braucht immer das Fundament von Support und Empathie, sonst wird sie als Ablehnung erlebt.",
  },

  // ─── DEAR MAN scenarios ─────────────────────────────
  {
    id: "dear-1",
    title: "Eigene Bedürfnisse ansprechen",
    technique: "DEAR",
    context:
      "Ihr Angehöriger hat zum dritten Mal einen gemeinsamen Termin kurzfristig abgesagt. Sie möchten das Thema mit DEAR MAN ansprechen: Describe, Express, Assert, Reinforce.",
    statement:
      "Sie bereiten ein ruhiges Gespräch vor. Welche Formulierung nutzen Sie?",
    options: [
      {
        id: "a",
        text: "«In den letzten drei Wochen sind unsere gemeinsamen Termine ausgefallen. Das macht mich traurig, weil mir die Zeit mit dir wichtig ist. Ich wünsche mir, dass wir einen festen Tag vereinbaren, der für uns beide passt. Das würde mir helfen, mich auf unsere gemeinsame Zeit zu freuen.»",
        correct: true,
        feedback:
          "D: Die Situation wird sachlich beschrieben (3 Absagen). E: Gefühl mit Ich-Botschaft (macht mich traurig). A: Klarer, konkreter Wunsch (festen Tag). R: Positive Verstärkung (freuen auf gemeinsame Zeit).",
        techniqueHint: "D → E → A → R",
      },
      {
        id: "b",
        text: "«Du sagst ständig ab! Dir sind unsere Termine offensichtlich egal. Andere würden sich das nicht gefallen lassen.»",
        correct: false,
        feedback:
          "Das sind Du-Botschaften und Verallgemeinerungen («ständig», «offensichtlich»). Es fehlt eine sachliche Beschreibung, ein eigenes Gefühl und ein konkreter Wunsch.",
        techniqueHint: "Du-Botschaft statt DEAR",
      },
      {
        id: "c",
        text: "«Es ist okay, ich verstehe, dass es dir manchmal nicht gut geht. Mach dir keinen Stress.»",
        correct: false,
        feedback:
          "Das ist verständnisvoll, aber Ihre eigenen Bedürfnisse kommen nicht vor. DEAR MAN bedeutet, die eigene Position freundlich, aber klar zu vertreten – auch das gehört zur Beziehungspflege.",
        techniqueHint: "Nur Empathie, ohne A und R",
      },
    ],
    learnNote:
      "DEAR MAN hilft, eigene Bedürfnisse klar und respektvoll auszudrücken. D = Beschreiben (Fakten), E = Ausdrücken (Ich-Gefühl), A = Bitten (konkreter Wunsch), R = Verstärken (positive Folge).",
  },
  {
    id: "dear-2",
    title: "Abmachung neu verhandeln",
    technique: "DEAR",
    context:
      "Ihr Angehöriger hatte versprochen, sich um einen Therapieplatz zu kümmern. Nach zwei Monaten ist nichts passiert. Sie möchten das ohne Vorwurf ansprechen.",
    statement: "Wie formulieren Sie Ihr Anliegen?",
    options: [
      {
        id: "a",
        text: "«Du hast versprochen, dich um Therapie zu kümmern. Jetzt sind zwei Monate rum und nichts ist passiert. Ich bin enttäuscht.»",
        correct: false,
        feedback:
          "Die Beschreibung stimmt, das Gefühl auch – aber es fehlt ein konkreter Wunsch (A) und eine positive Verstärkung (R). Ohne klaren nächsten Schritt bleibt das Gespräch beim Vorwurf stehen.",
        techniqueHint: "D + E, aber ohne A und R",
      },
      {
        id: "b",
        text: "«Vor zwei Monaten haben wir besprochen, dass du einen Therapieplatz suchst. Ich mache mir Sorgen, weil mir dein Wohlergehen wichtig ist. Kann ich dich unterstützen, z.B. bei der Suche nach Therapeut:innen? Ich glaube, das könnte uns beiden helfen, uns sicherer zu fühlen.»",
        correct: true,
        feedback:
          "D: Sachliche Erinnerung (vor zwei Monaten besprochen). E: Ich-Botschaft (mache mir Sorgen). A: Konkretes Unterstützungsangebot (Suche helfen). R: Positive Verstärkung (uns beiden sicherer fühlen).",
        techniqueHint: "D → E → A → R",
      },
      {
        id: "c",
        text: "«Ist schon okay, du machst das, wenn du bereit bist. Ich will dich nicht drängen.»",
        correct: false,
        feedback:
          "Das klingt verständnisvoll, unterdrückt aber Ihre berechtigte Sorge. DEAR MAN ermutigt dazu, eigene Bedürfnisse zu äussern – «nicht drängen» kann auch «nicht ernst nehmen» bedeuten.",
        techniqueHint: "Vermeidung statt DEAR",
      },
    ],
    learnNote:
      "DEAR MAN funktioniert besonders gut, wenn Sie statt Vorwürfen ein konkretes Unterstützungsangebot machen. Das A (Assert) muss kein Ultimatum sein – ein Angebot zur Zusammenarbeit ist oft wirksamer.",
  },

  // ─── Validierungs-Szenarien ─────────────────────────
  {
    id: "val-1",
    title: "«Niemand nimmt mich ernst!»",
    technique: "Validierung",
    context:
      "Ihr Angehöriger kommt nach einem Arztbesuch nach Hause und ist aufgelöst. Er/sie fühlt sich vom Arzt nicht gehört. Sie möchten validieren – die Gefühle anerkennen, ohne sofort zu bewerten oder zu lösen.",
    statement:
      "«Der Arzt hat mich überhaupt nicht ernst genommen! Ich habe versucht zu erklären, wie es mir geht, und er hat einfach auf seinen Computer gestarrt. Niemand hört mir zu!»",
    options: [
      {
        id: "a",
        text: "«Das ist frustrierend. Vielleicht war er nur gestresst, versuch es nochmal bei einem anderen Arzt.»",
        correct: false,
        feedback:
          "Der erste Satz ist gut (Gefühl benennen), aber dann wird sofort relativiert und eine Lösung angeboten. Das unterbricht die Validierung und vermittelt: «Dein Gefühl ist nicht so wichtig, hier ist die Lösung.»",
        techniqueHint: "Stufe 1, dann Lösungsmodus",
      },
      {
        id: "b",
        text: "«Du kommst vom Arzt und fühlst dich nicht gehört. Das muss wirklich enttäuschend sein – du hast Mut gebraucht, um dort hinzugehen, und dann das Gefühl, ignoriert zu werden. Ich kann nachvollziehen, dass dich das wütend macht.»",
        correct: true,
        feedback:
          "Sehr gute Validierung auf mehreren Stufen: Spiegeln (du fühlst dich nicht gehört), Zwischen den Zeilen (es brauchte Mut), Nachvollziehen (ich kann verstehen, dass…). Die Gefühle bekommen Raum, ohne vorschnelle Lösungen.",
        techniqueHint: "Stufe 2 → 3 → 4",
      },
      {
        id: "c",
        text: "«Ach, das kenne ich. Bei meinem letzten Arztbesuch war es genauso. Das ist leider normal heutzutage.»",
        correct: false,
        feedback:
          "Das verlagert den Fokus auf Ihre eigene Erfahrung. Auch wenn Sie Mitgefühl zeigen wollen – Ihr Angehöriger fühlt sich dadurch erneut nicht gehört. Validierung heisst: Es geht jetzt um dich.",
        techniqueHint: "Thema gekapert",
      },
    ],
    learnNote:
      "Validierung bedeutet nicht, einer Aussage zuzustimmen. Es bedeutet, das Gefühl dahinter anzuerkennen. Stufe 2 (Spiegeln) + Stufe 3 (Zwischen den Zeilen lesen) + Stufe 4 (Nachvollziehen) ist eine kraftvolle Kombination.",
  },
  {
    id: "val-2",
    title: "«Es hat sowieso keinen Sinn»",
    technique: "Validierung",
    context:
      "Ihr Angehöriger ist nach einem Rückschlag in der Therapie hoffnungslos. Sie möchten validieren, ohne die Hoffnungslosigkeit zu verstärken oder wegzureden.",
    statement:
      "«Therapie bringt doch nichts. Ich werde nie besser. Es hat alles keinen Sinn.»",
    options: [
      {
        id: "a",
        text: "«Natürlich bringt Therapie etwas! Du hast doch letzte Woche selbst gesagt, dass es dir besser geht. Du darfst jetzt nicht aufgeben.»",
        correct: false,
        feedback:
          "Auch wenn alles inhaltlich stimmt: Das Gefühl (Hoffnungslosigkeit) wird komplett übergangen. «Du darfst nicht aufgeben» erzeugt Druck statt Verbindung.",
        techniqueHint: "Invalidierung + Druck",
      },
      {
        id: "b",
        text: "«Rückschläge gehören dazu. Morgen sieht alles anders aus.»",
        correct: false,
        feedback:
          "Gut gemeint, aber bagatellisierend. Für jemanden in einem tiefen Loch klingt «morgen sieht alles anders aus» wie eine leere Phrase. Der Schmerz jetzt braucht Anerkennung.",
        techniqueHint: "Plattitüde statt Validierung",
      },
      {
        id: "c",
        text: "«Ich höre, dass du gerade das Gefühl hast, es bringt nichts. Nach so einem Rückschlag ist es verständlich, dass sich alles sinnlos anfühlt. Ich bin trotzdem hier.»",
        correct: true,
        feedback:
          "Stufe 2 (Spiegeln: «das Gefühl, es bringt nichts»), Stufe 4 (Nachvollziehen: «nach einem Rückschlag verständlich»), S aus SET (Präsenz: «Ich bin trotzdem hier»). Die Hoffnungslosigkeit wird weder bestätigt noch bekämpft.",
        techniqueHint: "Stufe 2 → 4 + Support",
      },
    ],
    learnNote:
      "Bei Hoffnungslosigkeit ist der Impuls gross, dagegen zu argumentieren. Aber: Erst wenn das Gefühl Raum bekommt, wird der Mensch wieder offen für neue Perspektiven. Validierung ist die Brücke.",
  },
];

// ─── Helpers ──────────────────────────────────────────────

const TECHNIQUE_META: Record<
  Technique,
  { label: string; color: string; bgColor: string; icon: React.ReactNode }
> = {
  SET: {
    label: "SET-Kommunikation",
    color: "var(--color-sage-dark)",
    bgColor: "var(--color-sage-wash)",
    icon: <Heart className="w-4 h-4" />,
  },
  DEAR: {
    label: "DEAR MAN",
    color: "var(--color-sand-mid)",
    bgColor: "var(--color-sand-muted)",
    icon: <Scale className="w-4 h-4" />,
  },
  Validierung: {
    label: "Validierung",
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-lighter)",
    icon: <Shield className="w-4 h-4" />,
  },
};

const TECHNIQUE_STEPS: Partial<
  Record<Technique, { letter: string; label: string; desc: string }[]>
> = {
  SET: [
    { letter: "S", label: "Support", desc: "Unterstützung zeigen" },
    { letter: "E", label: "Empathie", desc: "Gefühle anerkennen" },
    { letter: "T", label: "Truth", desc: "Sachliche Klarheit" },
  ],
  DEAR: [
    { letter: "D", label: "Describe", desc: "Situation beschreiben" },
    { letter: "E", label: "Express", desc: "Gefühl ausdrücken" },
    { letter: "A", label: "Assert", desc: "Wunsch benennen" },
    { letter: "R", label: "Reinforce", desc: "Positive Folge" },
  ],
};

function groupByTechnique(
  scenarios: Scenario[]
): Record<Technique, Scenario[]> {
  const grouped: Record<Technique, Scenario[]> = {
    SET: [],
    DEAR: [],
    Validierung: [],
  };
  for (const s of scenarios) grouped[s.technique].push(s);
  return grouped;
}

// ─── Scenario card (single scenario) ─────────────────────

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: Scenario;
  index: number;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const meta = TECHNIQUE_META[scenario.technique];

  const selectedOption = scenario.options.find(o => o.id === selectedId);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (revealed) return;
      setSelectedId(optionId);
      setRevealed(true);
    },
    [revealed]
  );

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setRevealed(false);
  }, []);

  return (
    <Card className="overflow-hidden border-border/60">
      {/* Header */}
      <div
        className="px-5 py-4 border-b border-border/40"
        style={{ backgroundColor: meta.bgColor }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              color: meta.color,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            {meta.icon}
            {meta.label}
          </span>
          <span className="text-xs text-muted-foreground">
            Szenario {index + 1}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {scenario.title}
        </h3>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Context */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {scenario.context}
        </p>

        {/* Statement (what the person says) */}
        <div className="bg-muted/40 rounded-xl p-4 border-l-4 border-l-[var(--color-sage-mid)]">
          <p className="text-sm font-medium text-foreground italic leading-relaxed">
            {scenario.statement}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <p className="text-sm font-medium text-foreground">
            Wie reagieren Sie?
          </p>
          {scenario.options.map(option => {
            const isSelected = selectedId === option.id;
            const showResult = revealed;

            let borderClass =
              "border-border/60 hover:border-[var(--color-sage-dark)]/40";
            let bgClass = "bg-background hover:bg-muted/30";

            if (showResult && isSelected && option.correct) {
              borderClass = "border-green-500/50";
              bgClass = "bg-green-50";
            } else if (showResult && isSelected && !option.correct) {
              borderClass = "border-red-400/50";
              bgClass = "bg-red-50";
            } else if (showResult && option.correct) {
              borderClass = "border-green-400/30";
              bgClass = "bg-green-50/50";
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={revealed}
                className={`w-full text-left p-4 rounded-xl border ${borderClass} ${bgClass} transition-all ${
                  !revealed
                    ? "cursor-pointer active:scale-[0.99]"
                    : "cursor-default"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {showResult && option.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : showResult && isSelected && !option.correct ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {option.text}
                  </p>
                </div>

                {/* Per-option feedback */}
                <AnimatePresence>
                  {showResult && isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-3 pt-3 border-t text-sm leading-relaxed ${
                          option.correct
                            ? "border-green-200 text-green-800"
                            : "border-red-200 text-red-700"
                        }`}
                      >
                        <p>{option.feedback}</p>
                        {option.techniqueHint && (
                          <p className="mt-1.5 text-xs font-medium opacity-75">
                            Technik: {option.techniqueHint}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Correct answer reveal (if wrong answer selected) */}
        <AnimatePresence>
          {revealed && selectedOption && !selectedOption.correct && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="overflow-hidden"
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-medium text-green-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Bessere Antwort:
                </p>
                <p className="text-sm text-green-700 leading-relaxed">
                  {scenario.options.find(o => o.correct)?.feedback}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning note */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: meta.bgColor,
                  borderColor: `color-mix(in oklch, ${meta.color}, transparent 70%)`,
                }}
              >
                <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <Lightbulb
                    className="w-4 h-4"
                    style={{ color: meta.color }}
                  />
                  Merke
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.learnNote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset */}
        {revealed && (
          <div className="flex justify-end pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nochmal versuchen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Section for a technique group ────────────────────────

function TechniqueSection({
  technique,
  scenarios,
}: {
  technique: Technique;
  scenarios: Scenario[];
}) {
  const meta = TECHNIQUE_META[technique];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: meta.bgColor, color: meta.color }}
        >
          {meta.icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {meta.label}
          </h2>
          <p className="text-xs text-muted-foreground">
            {scenarios.length}{" "}
            {scenarios.length === 1 ? "Szenario" : "Szenarien"}
          </p>
        </div>
      </div>

      {/* Technique component breakdown */}
      {TECHNIQUE_STEPS[technique] && (
        <div
          className="rounded-lg p-3 mb-5 border border-border/30"
          style={{ backgroundColor: meta.bgColor }}
        >
          <p
            className="text-xs font-medium mb-2.5"
            style={{ color: meta.color }}
          >
            Aufbau der Technik
          </p>
          <div className="flex flex-wrap gap-2">
            {TECHNIQUE_STEPS[technique]!.map(comp => (
              <div
                key={comp.letter}
                className="flex items-center gap-1.5 bg-background/60 rounded px-2.5 py-1.5"
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: meta.color }}
                >
                  {comp.letter}
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">
                    {comp.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    {comp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-5">
        {scenarios.map((s, i) => (
          <ScenarioCard key={s.id} scenario={s} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────

export default function KommunikationsUebung() {
  const grouped = groupByTechnique(SCENARIOS);

  return (
    <div className="space-y-10">
      {(["SET", "DEAR", "Validierung"] as Technique[]).map(
        tech =>
          grouped[tech].length > 0 && (
            <TechniqueSection
              key={tech}
              technique={tech}
              scenarios={grouped[tech]}
            />
          )
      )}
    </div>
  );
}
