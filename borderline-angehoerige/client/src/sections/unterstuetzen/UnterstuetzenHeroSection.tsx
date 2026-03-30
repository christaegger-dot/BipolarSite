import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function UnterstuetzenHeroSection() {
  return (
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
              <Compass className="w-6 h-6 text-foreground/60" />
            </div>
            <span className="text-sm font-medium text-sage-dark">
              Lesezeit: 8 Minuten
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            Wie Angehörige hilfreich bleiben können
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Angehörige möchten oft gleichzeitig beruhigen, schützen, verstehen,
            Grenzen wahren und die Beziehung nicht verlieren. Genau diese
            Gleichzeitigkeit macht die Rolle so anspruchsvoll. Diese Seite hilft
            Ihnen, Unterstützung realistischer und tragfähiger zu denken.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
