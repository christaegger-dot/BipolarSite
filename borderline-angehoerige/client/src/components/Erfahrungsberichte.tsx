import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Users, User } from "lucide-react";

interface Erfahrungsbericht {
  title: string;
  text: string;
  icon: "partner" | "eltern" | "geschwister";
  highlight?: string;
}

const berichte: Erfahrungsbericht[] = [
  {
    title: "Wenn Helfen nur noch mehr Druck erzeugt",
    text: "Viele Angehörige erleben, dass jeder gut gemeinte Versuch zu helfen die Lage scheinbar weiter verschärft. Entlastung beginnt oft dort, wo Verantwortung klarer getrennt wird: Sie sind nicht für die Gefühle des anderen zuständig, aber für Ihre eigene Reaktion und Ihre Grenzen.",
    icon: "partner",
    highlight:
      "Sie sind nicht für die Gefühle des anderen zuständig, aber für Ihre eigene Reaktion.",
  },
  {
    title: "Wenn Fürsorge in Selbstverlust kippt",
    text: "Gerade Eltern geraten leicht in die Dynamik, immer mehr zu tragen, zu regulieren und aufzufangen. Ein Wendepunkt ist oft die Einsicht, dass Zugewandtheit und Grenzsetzung kein Widerspruch sind. Beziehung wird damit nicht härter, sondern häufig klarer.",
    icon: "eltern",
    highlight: "Sie können zugewandt bleiben, ohne alles zu tragen.",
  },
  {
    title: "Wenn Rückschläge alles wieder infrage stellen",
    text: "Krisen, Kontaktabbrüche und neue Annäherungen können sich über Jahre abwechseln. Vielen Angehörigen hilft es, Entwicklung nicht nur an einzelnen Eskalationen zu messen. Austausch mit anderen Angehörigen oder eine Beratung kann helfen, diese Langstreckenbelastung besser zu tragen.",
    icon: "geschwister",
    highlight: "Entwicklung verläuft selten geradlinig.",
  },
  {
    title: "Wenn Wut, Trauer und Mitgefühl nebeneinander stehen",
    text: "Angehörige erleben oft nicht nur Sorge, sondern auch Wut, Trauer, Erschöpfung und zeitweise Rückzug. Diese Ambivalenz ist kein Zeichen fehlender Liebe, sondern Teil einer hoch belasteten Beziehungssituation. Entlastend wird es meist, wenn diese Widersprüche benannt werden dürfen.",
    icon: "partner",
    highlight: "Ambivalenz ist in belasteten Beziehungen normal.",
  },
];

const iconMap = {
  partner: Heart,
  eltern: Users,
  geschwister: User,
};

interface ErfahrungsberichteProps {
  maxBerichte?: number;
  showTitle?: boolean;
  variant?: "full" | "compact" | "carousel";
}

export default function Erfahrungsberichte({
  maxBerichte = 4,
  showTitle = true,
  variant = "carousel",
}: ErfahrungsberichteProps) {
  const displayBerichte = berichte.slice(0, maxBerichte);

  const heading = showTitle ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
        Typische Erfahrungen von Angehörigen
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Diese kurzen Verdichtungen fassen Erfahrungen zusammen, die in der
        Angehörigenarbeit häufig geschildert werden. Sie sollen Wiedererkennung
        ermöglichen, nicht einzelne echte Biografien nachstellen.
      </p>
    </motion.div>
  ) : null;

  const gridClasses =
    variant === "full" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        {heading}
        <div className={`grid gap-6 ${gridClasses}`}>
          {displayBerichte.map((bericht, index) => {
            const Icon = iconMap[bericht.icon];
            const animated = variant !== "carousel";

            const card = (
              <Card className="h-full border-border/50 hover:border-sage transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-sage-lighter flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sage-mid" />
                    </div>
                    <p className="font-medium text-foreground">
                      {bericht.title}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {bericht.text}
                  </p>

                  {bericht.highlight && (
                    <div className="bg-sage-wash rounded-lg p-3 border-l-2 border-sage">
                      <p className="text-sm font-medium text-foreground italic">
                        {bericht.highlight}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            if (!animated) {
              return <div key={index}>{card}</div>;
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ease: "easeOut" }}
              >
                {card}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Die Texte sind redaktionell verdichtete Erfahrungsmuster aus der
          Angehörigenarbeit.
        </motion.p>
      </div>
    </section>
  );
}
