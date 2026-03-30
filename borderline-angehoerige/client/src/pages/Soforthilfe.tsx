import SEO from "@/components/SEO";
/**
 * Soforthilfe-Seite – überarbeitet gemäss Auftrag 2026-03-09
 *
 * Struktur:
 *   BLOCK 1 (ROT)    – Lebensgefahr: 144 / 117 / 112
 *   BLOCK 2 (ORANGE) – Akute psychiatrische Krise: PUK 24/7 (altersdifferenziert)
 *   BLOCK 3 (GRÜN)   – Jemand zum Reden / Entlastung: 143, Elternnotruf, 147
 *   BLOCK 4 (SPEZIAL)– Vergiftung: 145 Tox Info Suisse
 *   BLOCK 5 (GRAU)   – Weitere Kontakte (nachrangig): Ärztefon, PUK Zentrale
 *
 * Korrekturen:
 *   - 143 NICHT als "kostenlos" bezeichnet → "anonym, vertraulich"
 *   - KIZ (058 384 65 00) nur nachrangig, NICHT als Haupt-CTA
 *   - PUK Zentrale (058 384 21 11) nur in "Weitere Kontakte"
 *   - 145 Tox Info Suisse als eigener Block sichtbar
 *   - Floating-Button und Scroll-Button überdecken keine Nummern mehr
 */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Phone,
  AlertTriangle,
  Clock,
  Baby,
  User,
  Users,
  Shield,
  Heart,
  Pill,
  Info,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { kontaktByIdStrict } from "@/data/kontakte";

// ─── Sticky Ampel-Leiste ──────────────────────────────────

function StickyAmpelLeiste() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = [
    {
      id: "block-rot",
      label: "Lebensgefahr",
      sub: "144 · 117 · 112",
      bg: "var(--color-sos-rot)",
    },
    {
      id: "block-orange",
      label: "Psychiatr. Krise",
      sub: "PUK 24/7",
      bg: "var(--color-sos-orange-text)",
    },
    {
      id: "block-gruen",
      label: "Jemand zum Reden",
      sub: "143",
      bg: "var(--color-sos-gruen-text)",
    },
  ] as const;

  return (
    <div
      className={`sticky top-16 md:top-20 z-40 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      style={{ marginBottom: 0 }}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container">
          <div className="flex gap-1.5 py-2">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-label={`Zu Abschnitt: ${item.label}`}
                className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-white font-medium text-[10px] sm:text-sm transition-all hover:brightness-90 active:scale-[0.97] shadow-sm min-h-[44px]"
                style={{ backgroundColor: item.bg }}
              >
                <span className="font-semibold leading-tight text-center">
                  {item.label}
                </span>
                <span className="text-white/80 text-[10px] sm:text-xs leading-tight">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grosse Notruf-Karte (ROT) ───────────────────────────

// ─── Unified KontaktKarte (danger / orange / green / lila) ───

type KarteVariant = "danger" | "orange" | "green" | "lila";

interface KontaktKarteProps {
  variant: KarteVariant;
  nummer: string;
  label: string;
  tel: string;
  hinweis?: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

const KARTE_STYLES: Record<
  KarteVariant,
  {
    container: string;
    iconBox: string;
    numberCls: string;
    subLabelCls: string;
    labelCls: string;
    hinweisCls: string;
    arrowBox: string;
    arrowIconCls: string;
  }
> = {
  danger: {
    container:
      "bg-white/15 hover:bg-white/25 active:bg-white/30 border-white/20",
    iconBox: "rounded-full bg-white/20",
    numberCls: "text-white text-xl sm:text-2xl",
    subLabelCls: "text-white text-xs font-semibold",
    labelCls: "text-white font-semibold text-sm",
    hinweisCls: "text-white/90 text-xs leading-snug mt-0.5",
    arrowBox: "bg-white/20 group-hover:bg-white/30",
    arrowIconCls: "text-white",
  },
  orange: {
    container:
      "bg-white border-sos-orange-border hover:border-sos-orange-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-orange-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls: "text-xs font-medium text-sos-orange-text",
    labelCls: "text-muted-foreground text-xs sm:text-sm leading-snug",
    hinweisCls: "text-muted-foreground text-xs leading-snug mt-0.5",
    arrowBox: "bg-sos-orange-light group-hover:bg-sos-orange-border",
    arrowIconCls: "text-sos-orange-text",
  },
  green: {
    container:
      "bg-white border-sos-gruen-border hover:border-sos-gruen-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-gruen-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls:
      "text-[10px] font-semibold text-sos-gruen-text bg-sos-gruen-light rounded px-1.5 py-0.5",
    labelCls: "text-muted-foreground text-xs sm:text-sm font-medium",
    hinweisCls: "text-muted-foreground text-xs leading-snug mt-0.5",
    arrowBox: "bg-sos-gruen-light group-hover:bg-sos-gruen-border",
    arrowIconCls: "text-sos-gruen-text",
  },
  lila: {
    container:
      "bg-sos-lila-wash border-sos-lila-border hover:border-sos-lila-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-lila-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls: "text-xs font-medium text-sos-lila-text",
    labelCls: "text-muted-foreground text-sm font-medium",
    hinweisCls: "text-muted-foreground text-xs mt-0.5",
    arrowBox: "bg-sos-lila-light group-hover:bg-sos-lila-border",
    arrowIconCls: "text-sos-lila-text",
  },
};

function KontaktKarte({
  variant,
  nummer,
  label,
  tel,
  hinweis,
  subLabel,
  icon,
}: KontaktKarteProps) {
  const s = KARTE_STYLES[variant];
  const defaultIcon =
    variant === "danger" ? (
      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    ) : variant === "orange" ? (
      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
    ) : variant === "lila" ? (
      <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-sos-lila-text" />
    ) : (
      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-sos-gruen-text" />
    );
  return (
    <a
      href={`tel:${tel}`}
      className={`flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border transition-all group ${s.container}`}
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 ${s.iconBox}`}
        >
          {icon ?? defaultIcon}
        </div>
        <div className="min-w-0">
          {subLabel && (
            <span className={`inline-block mb-0.5 ${s.subLabelCls}`}>
              {subLabel}
            </span>
          )}
          <p className={`font-bold leading-none mb-0.5 ${s.numberCls}`}>
            {nummer}
          </p>
          <p className={s.labelCls}>{label}</p>
          {hinweis && <p className={s.hinweisCls}>{hinweis}</p>}
        </div>
      </div>
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${s.arrowBox}`}
      >
        <Phone className={`w-5 h-5 ${s.arrowIconCls}`} />
      </div>
    </a>
  );
}

// ─── InfoKarte (nachrangige Kontakte, grau) ───────────────

function InfoKarte({
  nummer,
  label,
  hinweis,
  tel,
}: {
  nummer: string;
  label: string;
  hinweis: string;
  tel: string;
}) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm">{nummer}</p>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-muted-foreground text-xs">{hinweis}</p>
      </div>
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
        <Phone className="w-4 h-4 text-muted-foreground" />
      </div>
    </a>
  );
}

// ─── Soforthilfe-Seite ────────────────────────────────────

export default function Notfall() {
  const rot144 = kontaktByIdStrict("ROT_144");
  const rot117 = kontaktByIdStrict("ROT_117");
  const rot112 = kontaktByIdStrict("ROT_112");
  const pukKjp = kontaktByIdStrict("GELB_PUK_KJP");
  const pukErw = kontaktByIdStrict("GELB_PUK_ERW");
  const puk65 = kontaktByIdStrict("GELB_PUK_65");
  const gruen143 = kontaktByIdStrict("GRUEN_143");
  const gruenEltern = kontaktByIdStrict("GRUEN_ELTERN");
  const gruen147 = kontaktByIdStrict("GRUEN_147");
  const rot145 = kontaktByIdStrict("ROT_145");
  const infoAerztefon = kontaktByIdStrict("INFO_AERZTEFON");
  const infoPukZentrale = kontaktByIdStrict("INFO_PUK_ZENTRALE");
  const infoFachstelle = kontaktByIdStrict("INFO_FACHSTELLE");
  const infoKiz = kontaktByIdStrict("INFO_KIZ");

  return (
    <Layout>
      <SEO
        title="Soforthilfe"
        description="Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz – wenn sofortiges Handeln erforderlich ist."
        path="/soforthilfe"
      />

      {/* ═══ HERO ═══ */}
      <section className="py-6 md:py-16 bg-gradient-to-b from-slate-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-sos-rot flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-sos-rot uppercase tracking-wide">
                Soforthilfe
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Soforthilfe bei akuter Gefahr
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz –
              wenn sofortiges Handeln erforderlich ist.
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-5 bg-muted/40 px-3 py-1.5 rounded-full border border-border/50">
              <Info className="w-3.5 h-3.5 shrink-0" />
              Gilt für die <strong className="text-foreground">
                Schweiz
              </strong>{" "}
              (Schwerpunkt Kanton Zürich) — nicht für Deutschland oder
              Österreich.
            </p>

            <div className="p-4 rounded-xl bg-sos-amber-wash border border-sos-amber-border">
              <p className="text-sm text-sos-amber-dark leading-snug">
                <strong>Diese Seite ist für akute Gefahrensituationen.</strong>{" "}
                Für emotionale Krisen ohne akute Gefahr besuchen Sie die Seite{" "}
                <Link
                  href="/unterstuetzen/krise"
                  className="text-terracotta-mid hover:underline font-semibold"
                >
                  «In der Krise unterstützen» →
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 print:hidden">
              <Link
                href="/notfallkarte"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sage-wash border border-sage-mid/30 text-sm font-semibold text-sage-dark hover:bg-sage-wash/80 transition-colors"
              >
                <Shield className="w-4 h-4 shrink-0" />
                Persönliche Notfallkarte erstellen
              </Link>
              <Link
                href="/wegweiser"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/60 border border-border/50 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Situation einschätzen →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRIAGE ═══ */}
      <section className="bg-muted/30 border-y border-border/40 py-4 print:hidden">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Was ist gerade los?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-rot")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-background border border-[var(--color-sos-rot)]/40 hover:border-[var(--color-sos-rot)] hover:bg-[var(--color-sos-rot-wash)] transition-all text-left group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sos-rot)] shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  Akute Lebensgefahr
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-orange")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-background border border-[var(--color-sos-orange-text)]/30 hover:border-[var(--color-sos-orange-text)] hover:bg-[var(--color-sos-orange-wash)] transition-all text-left group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sos-orange-text)] shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  Psychiatrische Krise
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-gruen")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-background border border-[var(--color-sos-gruen-text)]/30 hover:border-[var(--color-sos-gruen-text)] hover:bg-[var(--color-sos-gruen-wash)] transition-all text-left group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sos-gruen-text)] shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  Jemand zum Reden
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY AMPEL ═══ */}
      <StickyAmpelLeiste />

      {/* ═══ INHALT ═══ */}
      <section className="py-6 md:py-12 pb-32 sm:pb-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              Diese Seite ersetzt keine professionelle Notfallberatung. Im
              Zweifel direkt{" "}
              <strong className="text-foreground">144 / 117</strong> anrufen.
            </p>
            {/* ─── BLOCK 1: LEBENSGEFAHR (ROT) ─── */}
            <motion.div
              id="block-rot"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-rot">
                <div className="flex items-center gap-3 mb-1">
                  <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Lebensgefahr – sofort handeln
                  </h2>
                </div>
                <p className="text-white/85 text-sm leading-snug ml-9">
                  Bei akuter Suizidgefahr, schwerer Selbstverletzung, Gewalt
                  oder unmittelbarer Bedrohung.
                </p>
              </div>

              {/* Nummern */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-sos-rot-body">
                <KontaktKarte
                  variant="danger"
                  nummer={rot144.nummer}
                  label={rot144.label}
                  hinweis={rot144.hinweis}
                  tel={rot144.tel}
                />
                <KontaktKarte
                  variant="danger"
                  nummer={rot117.nummer}
                  label={rot117.label}
                  hinweis={rot117.hinweis}
                  tel={rot117.tel}
                />
                <KontaktKarte
                  variant="danger"
                  nummer={rot112.nummer}
                  label={rot112.label}
                  hinweis={rot112.hinweis}
                  tel={rot112.tel}
                />
              </div>

              {/* Merksatz */}
              <div className="px-5 py-3 sm:px-6 bg-sos-rot/20 border-t border-white/10">
                <p className="text-white text-xs sm:text-sm leading-snug">
                  <strong>Merke:</strong> Bei akuter Selbst- oder
                  Fremdgefährdung zuerst <strong>144 / 117 / 112</strong>{" "}
                  wählen. Wenn Sie unsicher sind, lassen Sie sich dort oder
                  durch eine psychiatrische Fachstelle sofort zum weiteren
                  Vorgehen anleiten.
                </p>
              </div>

              {/* Telefon-Leitfaden */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-rot-body border-t border-white/10">
                <p className="text-white/90 text-xs font-semibold uppercase tracking-wide mb-3">
                  Die ersten 30 Sekunden am Telefon
                </p>
                <div className="space-y-2">
                  {[
                    {
                      nr: "1",
                      text: "Name nennen + Beziehung: «Ich bin [Name], ich rufe für meine Tochter/meinen Partner/…»",
                    },
                    {
                      nr: "2",
                      text: "Art der Situation: «Es geht um eine Suizidgefahr / Selbstverletzung / unkontrolliertes Verhalten»",
                    },
                    {
                      nr: "3",
                      text: "Was passiert gerade: «Sie sitzt in ihrem Zimmer und sagt, sie will nicht mehr leben»",
                    },
                    {
                      nr: "4",
                      text: "Sicherheit klären: «Ich bin bei ihr / sie ist alleine / wir sind in Sicherheit»",
                    },
                  ].map(item => (
                    <div
                      key={item.nr}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/10"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center">
                        {item.nr}
                      </span>
                      <p className="text-white/90 text-sm leading-snug">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ─── BLOCK 2: PSYCHIATRISCHE KRISE (ORANGE) ─── */}
            <motion.div
              id="block-orange"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-md border border-sos-orange-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-orange-wash border-b border-sos-orange-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-orange flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-sos-orange-dark">
                    Akute psychiatrische Krise
                  </h2>
                </div>
                <p className="text-sos-orange-mid text-sm leading-snug ml-11">
                  Schwere psychische Krise, starke Eskalation oder massiver
                  Kontrollverlust – aber{" "}
                  <strong>keine unmittelbare Lebensgefahr</strong>.
                </p>
              </div>

              {/* PUK-Karten */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <p className="text-sm text-muted-foreground mb-1">
                  Kontaktieren Sie die PUK Zürich – rund um die Uhr, 24/7:
                </p>

                <KontaktKarte
                  variant="orange"
                  nummer={pukErw.nummer}
                  label="PUK Erwachsene (24/7)"
                  subLabel="Erwachsene 18–64 Jahre"
                  tel={pukErw.tel}
                  icon={
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <KontaktKarte
                  variant="orange"
                  nummer={pukKjp.nummer}
                  label="PUK Kinder & Jugendliche (24/7)"
                  subLabel="Kinder & Jugendliche bis 18 Jahre"
                  tel={pukKjp.tel}
                  icon={
                    <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <KontaktKarte
                  variant="orange"
                  nummer={puk65.nummer}
                  label="PUK Erwachsene ab 65 (24/7)"
                  subLabel="Erwachsene ab 65 Jahren"
                  tel={puk65.tel}
                  icon={
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
              </div>

              {/* Hinweis */}
              <div className="px-5 py-3 sm:px-6 bg-sos-orange-wash border-t border-sos-orange-light">
                <p className="text-sos-orange-mid text-xs sm:text-sm leading-snug">
                  Am Telefon erfolgt eine kurze Einschätzung, was jetzt am
                  besten hilft.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 3: JEMAND ZUM REDEN (GRÜN) ─── */}
            <motion.div
              id="block-gruen"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-md border border-sos-gruen-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-gruen-wash border-b border-sos-gruen-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-gruen flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-sos-gruen-dark">
                    Jemand zum Reden / Entlastung
                  </h2>
                </div>
                <p className="text-sos-gruen-mid text-sm leading-snug ml-11">
                  Für Gespräch, Entlastung und Orientierung –{" "}
                  <strong>kein Einsatz vor Ort</strong>, keine unmittelbare
                  Gefahr.
                </p>
              </div>

              {/* Karten */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <KontaktKarte
                  variant="green"
                  nummer={gruen143.nummer}
                  label="Dargebotene Hand"
                  hinweis="Anonym, vertraulich – Gesprächs- und Krisenangebot"
                  tel={gruen143.tel}
                  subLabel="24/7"
                />
                <KontaktKarte
                  variant="green"
                  nummer={gruenEltern.nummer}
                  label="Elternnotruf"
                  hinweis="Beratung für Eltern – anonym, vertraulich"
                  tel={gruenEltern.tel}
                  subLabel="24/7 · Für Eltern"
                />
                <KontaktKarte
                  variant="green"
                  nummer={gruen147.nummer}
                  label="Pro Juventute"
                  hinweis="Beratung für Kinder und Jugendliche – vertraulich"
                  tel={gruen147.tel}
                  subLabel="24/7 · Für Kinder & Jugendliche"
                />
              </div>

              {/* Hinweis */}
              <div className="px-5 py-3 sm:px-6 bg-sos-gruen-wash border-t border-sos-gruen-light">
                <p className="text-sos-gruen-mid text-xs sm:text-sm leading-snug">
                  <strong>Bei akuter Gefahr:</strong> Immer zuerst{" "}
                  <strong>144 / 117 / 112</strong> rufen.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 4: SPEZIALFALL VERGIFTUNG ─── */}
            <motion.div
              id="block-spezial"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-sm border border-sos-lila-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-4 bg-sos-lila-wash border-b border-sos-lila-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sos-lila flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-sos-lila-dark">
                    Spezialfall: Vergiftung
                  </h2>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-5 bg-white">
                <KontaktKarte
                  variant="lila"
                  nummer={rot145.nummer}
                  label={rot145.label}
                  hinweis={rot145.hinweis}
                  tel={rot145.tel}
                />
              </div>
            </motion.div>

            {/* ─── BLOCK 5: WEITERE KONTAKTE (NACHRANGIG) ─── */}
            <motion.div
              id="block-weitere"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-3 sm:px-6 sm:py-4 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-sm sm:text-base font-normal text-muted-foreground">
                    Weitere Kontakte
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 ml-7">
                  Allgemeine Beratung und Auskunft – nicht für akute Notfälle
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 space-y-3 bg-background">
                <InfoKarte
                  nummer={infoAerztefon.nummer}
                  label={infoAerztefon.label}
                  hinweis={infoAerztefon.hinweis}
                  tel={infoAerztefon.tel}
                />
                <InfoKarte
                  nummer={infoPukZentrale.nummer}
                  label={infoPukZentrale.label}
                  hinweis="Allgemeine Auskunft – kein Notfalldienst"
                  tel={infoPukZentrale.tel}
                />
                <InfoKarte
                  nummer={infoFachstelle.nummer}
                  label={infoFachstelle.label}
                  hinweis={infoFachstelle.hinweis}
                  tel={infoFachstelle.tel}
                />
                <InfoKarte
                  nummer={infoKiz.nummer}
                  label={infoKiz.label}
                  hinweis={infoKiz.hinweis}
                  tel={infoKiz.tel}
                />
              </div>
            </motion.div>

            {/* ─── WEITERFÜHREND ─── */}
            <motion.div
              className="rounded-2xl border border-border/50 bg-muted/30 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                Krisenbegleitung – was kommt wann?
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Diese Seite ist für den akuten Moment. Danach gibt es drei
                unterschiedliche nächste Schritte:
              </p>
              <div className="space-y-2">
                <Link
                  href="/notfallkarte"
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-background border border-[var(--color-sos-rot)]/20 hover:border-[var(--color-sos-rot)]/40 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                      Vorbereitung
                    </p>
                    <span className="text-sm text-foreground font-medium">
                      Persönliche Notfallkarte erstellen
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Nummern, Strategien und Kontakte für den nächsten Notfall
                      vorbereiten
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-[var(--color-sos-rot)] transition-colors" />
                </Link>
                <Link
                  href="/wegweiser"
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-background border border-[var(--color-sage-dark)]/30 hover:border-[var(--color-sage-dark)]/50 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                      Unmittelbar danach
                    </p>
                    <span className="text-sm text-foreground font-medium">
                      Situations-Wegweiser
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Was war das gerade? Was ist jetzt sinnvoll?
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-[var(--color-sage-dark)] transition-colors" />
                </Link>
                <Link
                  href="/unterstuetzen/krise"
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                      Verstehen & üben
                    </p>
                    <span className="text-sm text-foreground">
                      Deeskalation und Krisenbegleitung
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hintergründe, Ampel-System, deeskalierende Techniken
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-terracotta-mid transition-colors" />
                </Link>
                <Link
                  href="/selbstfuersorge"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">
                    Selbstfürsorge für Angehörige
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
              </div>
            </motion.div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diese Informationen ersetzen keine medizinische oder rechtliche
                Beratung. In akuten Gefahrensituationen zählt das sofortige
                Einbeziehen von Notruf und Fachpersonen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
