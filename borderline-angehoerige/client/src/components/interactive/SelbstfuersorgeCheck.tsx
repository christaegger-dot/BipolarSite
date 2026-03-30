import { Heart, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { kontaktById } from "@/data/kontakte";

const orientierungspunkte = [
  {
    area: "Emotionale Belastung",
    frage:
      "Fühle ich mich in den letzten zwei Wochen häufig erschöpft, gereizt oder innerlich leer?",
    einordnung:
      "Wenn ja, ist das kein Versagen, sondern ein Hinweis darauf, dass Ihre Belastungsgrenze näher rückt.",
  },
  {
    area: "Körperliche Signale",
    frage:
      "Kommen Schlaf, Essen, Bewegung und medizinische Selbstfürsorge noch ausreichend vor?",
    einordnung:
      "Wenn Grundbedürfnisse dauerhaft wegrutschen, ist das meist ein frühes Warnsignal für Überforderung.",
  },
  {
    area: "Soziale Kontakte",
    frage:
      "Gibt es in meinem Alltag noch etwas, das nicht nur mit meinem Angehörigen zu tun hat?",
    einordnung:
      "Eigene Kontakte, Interessen und kurze Auszeiten sind kein Luxus, sondern Teil der Stabilisierung.",
  },
  {
    area: "Grenzen",
    frage:
      "Kann ich Grenzen setzen, ohne mich danach vollständig schuldig zu fühlen?",
    einordnung:
      "Wenn Nein-Sagen kaum möglich ist, lohnt es sich, Unterstützung beim Einüben von Grenzen zu holen.",
  },
  {
    area: "Unterstützung",
    frage:
      "Habe ich wenigstens eine Person oder Stelle, bei der ich offen über meine Situation sprechen kann?",
    einordnung:
      "Anhaltende Isolation verstärkt Belastung oft deutlich. Unterstützung entlastet nicht nur emotional, sondern auch praktisch.",
  },
];

export default function SelbstfuersorgeCheck() {
  return (
    <div className="mt-6 space-y-5">
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-sage-mid flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Orientierung zur eigenen Belastung
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Statt eines Kurztests kann es hilfreicher sein, einige Bereiche
                ruhig für sich durchzugehen. Nicht jede Frage muss mit Ja
                beantwortet werden, damit Unterstützung sinnvoll ist. Schon
                einzelne deutliche Warnsignale verdienen Aufmerksamkeit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {orientierungspunkte.map((punkt, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-5">
              <p className="text-xs font-medium text-sage-dark mb-2">
                {punkt.area}
              </p>
              <p className="text-sm font-medium text-foreground leading-relaxed mb-2">
                {punkt.frage}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {punkt.einordnung}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-sage-mid/20 bg-sage-wash/30">
        <CardContent className="p-5">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-sage-dark flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                Wenn Sie sich in mehreren Punkten wiedererkennen, kann es
                entlastend sein, gezielt Unterstützung zu holen, statt zu
                warten, bis gar nichts mehr geht.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-sage-mid flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                Die Fachstelle Angehörigenarbeit (PUK Zürich) bietet Beratung:{" "}
                {kontaktById("INFO_FACHSTELLE")?.nummer ?? "058 384 38 00"}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
