import {
  Eye,
  MessageSquare,
  Sparkles,
  History,
  Users,
  Star,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Stufe {
  level: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  ziel: string;
  soGehts: string[];
  beispielsaetze: string[];
  typischerFehler: string;
  dialog: {
    angehoeriger: string;
    betroffener: string;
  };
}

const stufen: Stufe[] = [
  {
    level: 1,
    title: "Aufmerksam sein",
    subtitle: "«Ich bin jetzt wirklich da.»",
    icon: Eye,
    color: "var(--color-sand-border)",
    ziel: "Sicherheit durch Präsenz.",
    soGehts: [
      "Kurz innehalten, Blick und Körper zuwenden",
      "Handy weg, nicht nebenbei argumentieren",
      "Ruhige Stimme",
    ],
    beispielsaetze: [
      "«Ich bin da. Sag mir, was los ist.»",
      "«Ich möchte dich verstehen. Erzähl.»",
    ],
    typischerFehler: "Gleich Lösungen, Ratschläge oder Logik anbieten.",
    dialog: {
      betroffener: "Mir geht es nicht gut heute…",
      angehoeriger: "Ich bin da. Erzähl mir, was los ist.",
    },
  },
  {
    level: 2,
    title: "Spiegeln",
    subtitle: "«Ich habe verstanden, was du meinst.»",
    icon: MessageSquare,
    color: "var(--color-sage-dark)",
    ziel: "Missverständnisse reduzieren, Tempo rausnehmen.",
    soGehts: [
      "In eigenen Worten zusammenfassen",
      "Ohne Bewertung, ohne Ironie",
    ],
    beispielsaetze: [
      "«Du fühlst dich gerade sehr verletzt.»",
      "«Wenn ich dich richtig verstehe, hast du Angst, verlassen zu werden.»",
    ],
    typischerFehler: "Spiegeln sofort mit einem «aber» zurücknehmen.",
    dialog: {
      betroffener: "Niemand ruft mich an. Alle haben mich vergessen.",
      angehoeriger:
        "Du fühlst dich gerade allein gelassen und vergessen. Stimmt das so?",
    },
  },
  {
    level: 3,
    title: "Zwischen den Zeilen verstehen",
    subtitle: "«Kann es sein, dass…?»",
    icon: Sparkles,
    color: "var(--color-sand-mid)",
    ziel: "Das Gefühl hinter der Reaktion erkennen.",
    soGehts: [
      "Vorsichtige Vermutung äussern",
      "Korrektur erlauben statt behaupten",
    ],
    beispielsaetze: [
      "«Ich frage mich, ob da auch Angst dabei ist.»",
      "«Bist du gerade eher verletzt als wütend?»",
    ],
    typischerFehler: "Gedankenlesen als Tatsache darstellen.",
    dialog: {
      betroffener: "Mein Chef hat mich vor allen kritisiert. Egal.",
      angehoeriger:
        "Kann es sein, dass du nicht nur enttäuscht, sondern auch verletzt bist?",
    },
  },
  {
    level: 4,
    title: "Nachvollziehen",
    subtitle: "«Es macht Sinn, dass dich das trifft.»",
    icon: History,
    color: "var(--color-sage-mid)",
    ziel: "Bedeutung geben, ohne zu bewerten.",
    soGehts: [
      "Stress, Vorgeschichte oder Überforderung mitdenken",
      "Sinn machen statt recht haben",
    ],
    beispielsaetze: [
      "«Bei dem Stress heute ist nachvollziehbar, dass deine Nerven dünn sind.»",
      "«Wenn du dich schnell verlassen fühlst, kann Warten sehr belastend sein.»",
    ],
    typischerFehler: "Bagatellisieren.",
    dialog: {
      betroffener: "Ich kann einfach niemandem vertrauen!",
      angehoeriger:
        "Nach dem, was du erlebt hast, ist nachvollziehbar, dass Vertrauen so schwer ist.",
    },
  },
  {
    level: 5,
    title: "Das Gültige anerkennen",
    subtitle: "«Diesen Teil kann ich gut nachvollziehen.»",
    icon: Users,
    color: "var(--color-sage-dark)",
    ziel: "Den verständlichen Kern benennen, ohne alles zu billigen.",
    soGehts: [
      "Gefühl oder Bedürfnis anerkennen",
      "Verhalten und Grenze bei Bedarf getrennt ansprechen",
    ],
    beispielsaetze: [
      "«Dass du dir Nähe wünschst, ist verständlich.»",
      "«Ich sehe deine Angst und bleibe trotzdem bei meinem Nein.»",
    ],
    typischerFehler: "Validierung mit Nachgeben verwechseln.",
    dialog: {
      betroffener: "Bin ich verrückt, dass mich das so trifft?",
      angehoeriger:
        "Nein. Dass dich das trifft, ist verständlich. Und ich sage dir auch ehrlich, wo meine Grenze ist.",
    },
  },
  {
    level: 6,
    title: "Auf Augenhöhe bleiben",
    subtitle: "«Wir sind zwei gleichwertige Menschen.»",
    icon: Star,
    color: "var(--color-sage-dark)",
    ziel: "Respektvoll bleiben, ohne zu belehren oder zu psychologisieren.",
    soGehts: [
      "Klar, ruhig und respektvoll sprechen",
      "Nicht analysieren oder herabsetzen",
    ],
    beispielsaetze: [
      "«Ich nehme dich ernst. Und ich sage dir auch ehrlich, wie es bei mir ankommt.»",
      "«Wir suchen einen Weg, der für uns beide passt.»",
    ],
    typischerFehler: "In eine Therapeutenrolle rutschen.",
    dialog: {
      betroffener: "Du verstehst mich sowieso nicht…",
      angehoeriger:
        "Ich nehme dich ernst. Lass uns zusammen schauen, was gerade hilft.",
    },
  },
];

export default function ValidierungsStufenleiter() {
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        Die sechs Stufen sind kein Schema, das immer vollständig abgearbeitet
        werden muss. Sie helfen eher dabei, den eigenen Ton zu klären: zuerst
        Präsenz und Verstehen, dann bei Bedarf mehr Einordnung und Grenze.
      </p>

      {stufen.map(stufe => {
        const Icon = stufe.icon;
        return (
          <Card key={stufe.level} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: stufe.color }}
                >
                  {stufe.level}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" style={{ color: stufe.color }} />
                    <h4 className="font-semibold text-foreground">
                      {stufe.title}
                    </h4>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    {stufe.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-4">
                <strong>Ziel:</strong> {stufe.ziel}
              </p>

              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    So kann es aussehen
                  </p>
                  <ul className="space-y-2">
                    {stufe.soGehts.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-sage-mid flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Typischer Stolperstein
                  </p>
                  <div className="rounded-lg border border-sand-border/40 bg-sand/50 p-3">
                    <p className="text-sm text-foreground leading-relaxed flex items-start gap-2">
                      <AlertTriangle
                        className="w-4 h-4 text-sand-warm flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {stufe.typischerFehler}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Beispielsätze
                </p>
                <div className="space-y-2">
                  {stufe.beispielsaetze.map((satz, i) => (
                    <div
                      key={i}
                      className="rounded-md px-3 py-2 text-sm font-medium"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${stufe.color} 10%, white)`,
                        color: stufe.color,
                      }}
                    >
                      {satz}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-muted/30 p-4 space-y-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Kurzer Beispiel-Dialog
                </p>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-sand-warm bg-sand/50 px-2 py-0.5 rounded flex-shrink-0">
                    B
                  </span>
                  <p className="text-sm text-foreground italic">
                    {stufe.dialog.betroffener}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-sage-dark bg-sage-wash px-2 py-0.5 rounded flex-shrink-0">
                    A
                  </span>
                  <p className="text-sm text-foreground font-medium">
                    {stufe.dialog.angehoeriger}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
