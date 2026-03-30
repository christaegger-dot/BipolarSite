import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Clock,
  MessageCircle,
  Heart,
  Sparkles,
  BookOpen,
  Shield,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: {
    text: string;
    value: string;
    weight: Record<string, number>;
  }[];
}

interface Result {
  id: string;
  title: string;
  description: string;
  primaryLink: string;
  primaryText: string;
  secondaryLinks: { href: string; text: string }[];
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Wie würden Sie die aktuelle Situation beschreiben?",
    subtext: "Wählen Sie die Beschreibung, die am besten passt.",
    options: [
      {
        text: "Akute Krise – Suizidgedanken, Selbstverletzung oder Gefahr",
        value: "akut",
        weight: { notfall: 10, krise: 5 },
      },
      {
        text: "Hohe Anspannung – starke Emotionen, drohende Eskalation",
        value: "hoch",
        weight: { krise: 8, kommunizieren: 3 },
      },
      {
        text: "Angespannt – Konflikte, Missverständnisse, Rückzug",
        value: "mittel",
        weight: { kommunizieren: 6, grenzen: 4, verstehen: 2 },
      },
      {
        text: "Relativ stabil – Zeit zum Lernen und Vorbereiten",
        value: "stabil",
        weight: { verstehen: 5, unterstuetzen: 5, selbstfuersorge: 3 },
      },
    ],
  },
  {
    id: 2,
    text: "Was beschäftigt Sie gerade am meisten?",
    options: [
      {
        text: "Ich verstehe nicht, was in meinem Angehörigen vorgeht",
        value: "verstehen",
        weight: { verstehen: 8, unterstuetzen: 2 },
      },
      {
        text: "Ich weiss nicht, wie ich helfen kann",
        value: "helfen",
        weight: { unterstuetzen: 7, kommunizieren: 3 },
      },
      {
        text: "Die Kommunikation ist schwierig oder eskaliert oft",
        value: "kommunikation",
        weight: { kommunizieren: 8, grenzen: 2 },
      },
      {
        text: "Ich fühle mich überfordert und erschöpft",
        value: "erschoepft",
        weight: { selbstfuersorge: 8, grenzen: 4 },
      },
      {
        text: "Ich habe Mühe, Grenzen zu setzen",
        value: "grenzen",
        weight: { grenzen: 8, kommunizieren: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "Wie lange begleiten Sie Ihren Angehörigen schon?",
    subtext: "Dies hilft uns, passende Ressourcen zu empfehlen.",
    options: [
      {
        text: "Die Diagnose ist neu (unter 6 Monate)",
        value: "neu",
        weight: { verstehen: 6, unterstuetzen: 4 },
      },
      {
        text: "Seit einiger Zeit (6 Monate bis 2 Jahre)",
        value: "mittel",
        weight: { kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 },
      },
      {
        text: "Schon lange (über 2 Jahre)",
        value: "lang",
        weight: { selbstfuersorge: 5, grenzen: 3, kommunizieren: 2 },
      },
      {
        text: "Keine offizielle Diagnose, aber ich vermute Borderline",
        value: "vermutung",
        weight: { verstehen: 7, unterstuetzen: 3 },
      },
    ],
  },
  {
    id: 4,
    text: "Wie geht es Ihnen selbst gerade?",
    options: [
      {
        text: "Gut – ich habe Energie und Ressourcen",
        value: "gut",
        weight: { verstehen: 3, unterstuetzen: 4, kommunizieren: 3 },
      },
      {
        text: "Okay – manchmal anstrengend, aber ich komme zurecht",
        value: "okay",
        weight: { selbstfuersorge: 3, kommunizieren: 3, grenzen: 2 },
      },
      {
        text: "Erschöpft – ich brauche dringend Unterstützung",
        value: "erschoepft",
        weight: { selbstfuersorge: 8, grenzen: 4 },
      },
      {
        text: "Überfordert – ich weiss nicht mehr weiter",
        value: "ueberfordert",
        weight: { selbstfuersorge: 6, notfall: 2, krise: 2 },
      },
    ],
  },
];

const results: Result[] = [
  {
    id: "notfall",
    title: "Sofortige Hilfe",
    description:
      "In einer akuten Krise ist schnelles Handeln wichtig. Hier finden Sie Notfallnummern und Anlaufstellen.",
    primaryLink: "/soforthilfe",
    primaryText: "Zu den Notfallressourcen",
    secondaryLinks: [
      { href: "/unterstuetzen/krise", text: "Krisenbegleitung lernen" },
    ],
    icon: AlertTriangle,
    color: "var(--color-alert)",
    bgColor: "var(--color-sage-wash)",
  },
  {
    id: "krise",
    title: "Krisenbegleitung",
    description:
      "Sie können lernen, Ihren Angehörigen in schwierigen Momenten zu begleiten – ohne sich selbst zu verlieren.",
    primaryLink: "/unterstuetzen/krise",
    primaryText: "Krisenbegleitung lernen",
    secondaryLinks: [
      { href: "/kommunizieren", text: "Kommunikationsstrategien" },
      { href: "/soforthilfe", text: "Soforthilfe" },
    ],
    icon: Clock,
    color: "var(--color-sand-mid)",
    bgColor: "var(--color-sage-wash)",
  },
  {
    id: "kommunizieren",
    title: "Kommunikation verbessern",
    description:
      "Validierung und SET-Kommunikation können helfen, auch in schwierigen Momenten im Gespräch zu bleiben.",
    primaryLink: "/kommunizieren",
    primaryText: "Kommunikationstechniken entdecken",
    secondaryLinks: [
      { href: "/grenzen", text: "Grenzen setzen lernen" },
      { href: "/verstehen", text: "Borderline verstehen" },
    ],
    icon: MessageCircle,
    color: "var(--color-slate-blue)",
    bgColor: "var(--color-slate-light)",
  },
  {
    id: "verstehen",
    title: "Borderline verstehen",
    description:
      "Wissen schafft Verständnis. Erfahren Sie, was Borderline ist und wie die Störung das Erleben beeinflusst.",
    primaryLink: "/verstehen",
    primaryText: "Borderline verstehen",
    secondaryLinks: [
      { href: "/unterstuetzen/uebersicht", text: "Unterstützungsstrategien" },
      { href: "/kommunizieren", text: "Kommunikation verbessern" },
    ],
    icon: BookOpen,
    color: "var(--color-sage)",
    bgColor: "var(--color-sage-light)",
  },
  {
    id: "unterstuetzen",
    title: "Unterstützung geben",
    description:
      "Sie können einen wichtigen Beitrag leisten – nicht als Therapeut, sondern als verlässlicher Begleiter.",
    primaryLink: "/unterstuetzen/uebersicht",
    primaryText: "Unterstützungsstrategien entdecken",
    secondaryLinks: [
      { href: "/unterstuetzen/alltag", text: "Alltag gestalten" },
      { href: "/unterstuetzen/therapie", text: "Therapie unterstützen" },
    ],
    icon: Heart,
    color: "var(--color-sage-dark)",
    bgColor: "var(--color-sage-light)",
  },
  {
    id: "grenzen",
    title: "Grenzen setzen",
    description:
      "Grenzen sind kein Zeichen von Ablehnung, sondern von Selbstfürsorge. Lernen Sie, sie liebevoll zu kommunizieren.",
    primaryLink: "/grenzen",
    primaryText: "Grenzen setzen lernen",
    secondaryLinks: [
      { href: "/selbstfuersorge", text: "Selbstfürsorge stärken" },
      { href: "/kommunizieren", text: "Kommunikationstechniken" },
    ],
    icon: Shield,
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-lighter)",
  },
  {
    id: "selbstfuersorge",
    title: "Selbstfürsorge priorisieren",
    description:
      "Sie können nur helfen, wenn Sie selbst Kraft haben. Ihre eigene Gesundheit ist genauso wichtig.",
    primaryLink: "/selbstfuersorge",
    primaryText: "Selbstfürsorge-Strategien",
    secondaryLinks: [
      { href: "/grenzen", text: "Grenzen setzen" },
      { href: "/materialien", text: "Materialien & Ressourcen" },
    ],
    icon: Sparkles,
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-lighter)",
  },
];

export default function Selbsttest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const handleAnswer = (option: Question["options"][0]) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedOption(option.value);

    // Update scores
    const newScores = { ...scores };
    Object.entries(option.weight).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    // Save answer
    setAnswers({ ...answers, [questions[currentQuestion].id]: option.value });

    // Move to next question or show result
    transitionTimer.current = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      // Subtract scores of the previous answer before going back
      const prevQuestionId = questions[currentQuestion - 1].id;
      const prevAnswerValue = answers[prevQuestionId];
      if (prevAnswerValue) {
        const prevOption = questions[currentQuestion - 1].options.find(
          o => o.value === prevAnswerValue
        );
        if (prevOption) {
          const newScores = { ...scores };
          Object.entries(prevOption.weight).forEach(([key, value]) => {
            newScores[key] = (newScores[key] || 0) - value;
          });
          setScores(newScores);
        }
      }
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[prevQuestionId] || null);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
    setShowResult(false);
    setSelectedOption(null);
  };

  const getTopResult = (): Result => {
    // Find the category with highest score
    let maxScore = 0;
    let topCategory = "verstehen";

    Object.entries(scores).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topCategory = category;
      }
    });

    return results.find(r => r.id === topCategory) || results[3]; // Default to "verstehen"
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = getTopResult();
    const Icon = result.icon;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-live="polite"
        role="status"
      >
        <Card
          className="border-2 overflow-hidden"
          style={{ borderColor: result.color }}
        >
          <div
            className="p-6 md:p-8"
            style={{ backgroundColor: result.bgColor }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: result.color }}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Unsere Empfehlung für Sie
                </p>
                <h2 className="text-2xl font-normal text-foreground">
                  {result.title}
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {result.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href={result.primaryLink}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-white"
                  style={{ backgroundColor: result.color }}
                >
                  {result.primaryText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="border-t border-border/30 pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Weitere relevante Themen:
              </p>
              <div className="flex flex-wrap gap-2">
                {result.secondaryLinks.map((link, i) => (
                  <Link key={i} href={link.href}>
                    <Button variant="outline" size="sm" className="bg-white/50">
                      {link.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-background border-t border-border/30 flex justify-center">
            <Button
              variant="ghost"
              onClick={restart}
              className="text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Test wiederholen
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card
      className="border-border/50 overflow-hidden"
      role="form"
      aria-label="Selbsttest"
    >
      {/* Progress bar */}
      <div
        className="h-1.5 bg-muted"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Fortschritt: Frage ${currentQuestion + 1} von ${questions.length}`}
      >
        <motion.div
          className="h-full bg-sage-dark"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <CardContent className="p-6 md:p-8">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            Frage {currentQuestion + 1} von {questions.length}
          </span>
          {currentQuestion > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Zurück
            </Button>
          )}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-xl md:text-2xl font-normal text-foreground mb-2">
              {question.text}
            </h2>
            {question.subtext && (
              <p className="text-muted-foreground mb-6">{question.subtext}</p>
            )}

            {/* Options */}
            <fieldset className="space-y-3 mt-6 border-0 p-0 m-0">
              <legend className="sr-only">{question.text}</legend>
              {question.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  onClick={() => handleAnswer(option)}
                  disabled={isTransitioning}
                  aria-pressed={selectedOption === option.value}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-400 focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-2 ${
                    selectedOption === option.value
                      ? "border-sage bg-sage-wash"
                      : "border-border/50 hover:border-sage/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedOption === option.value
                          ? "border-sage bg-sage-dark"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {selectedOption === option.value && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </fieldset>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
