import { useState, useEffect, useCallback, useRef } from "react";
import "./notfallkarte-print.css";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Phone,
  Printer,
  Save,
  Plus,
  Trash2,
  Heart,
  Shield,
  AlertTriangle,
  Info,
} from "lucide-react";
import { ROT, GELB, GRUEN, type Kontakt } from "@/data/kontakte";

// ─── Types ────────────────────────────────────────────────

interface PersonalContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface CalmingStrategy {
  id: string;
  text: string;
}

interface NotfallkarteData {
  personalContacts: PersonalContact[];
  calmingStrategies: CalmingStrategy[];
  notes: string;
}

const STORAGE_KEY = "notfallkarte-data";

const DEFAULT_STRATEGIES: CalmingStrategy[] = [
  { id: "s1", text: "Langsam ein- und ausatmen (4-7-8)" },
  { id: "s2", text: "Beide Füsse bewusst auf den Boden stellen" },
  { id: "s3", text: "Kaltes Wasser über die Handgelenke laufen lassen" },
];

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Emergency contacts for print card ────────────────────

/** Contacts shown on the printed card (including nurPdf entries) */
const CARD_ROT = ROT.filter(k => k.id !== "ROT_118");
const CARD_GELB = GELB;
const CARD_GRUEN = GRUEN.filter(k => k.id === "GRUEN_143");

// ─── Persistence ──────────────────────────────────────────

function loadData(): NotfallkarteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt data */
  }
  return {
    personalContacts: [],
    calmingStrategies: DEFAULT_STRATEGIES,
    notes: "",
  };
}

function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function saveData(data: NotfallkarteData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// ─── Sub-components ───────────────────────────────────────

function EmergencyRow({ kontakt }: { kontakt: Kontakt }) {
  return (
    <a
      href={`tel:${kontakt.tel}`}
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-sos-rot)]/10 flex items-center justify-center">
        <Phone className="w-4 h-4 text-[var(--color-sos-rot)]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="font-semibold text-foreground block text-sm leading-tight">
          {kontakt.label}
        </span>
        <span className="text-xs text-muted-foreground leading-tight">
          {kontakt.hinweis}
        </span>
      </span>
      <span className="flex-shrink-0 font-bold text-lg tabular-nums tracking-wide text-foreground">
        {kontakt.nummer}
      </span>
    </a>
  );
}

function PersonalContactRow({
  contact,
  onUpdate,
  onRemove,
}: {
  contact: PersonalContact;
  onUpdate: (c: PersonalContact) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-2 py-2 print:py-1">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 print:grid-cols-3">
        <input
          type="text"
          value={contact.name}
          onChange={e => onUpdate({ ...contact, name: e.target.value })}
          placeholder="Name"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:py-0.5"
        />
        <input
          type="tel"
          value={contact.phone}
          onChange={e => onUpdate({ ...contact, phone: e.target.value })}
          placeholder="Telefonnummer"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:py-0.5"
        />
        <input
          type="text"
          value={contact.relation}
          onChange={e => onUpdate({ ...contact, relation: e.target.value })}
          placeholder="Beziehung (z.B. Therapeut:in)"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:py-0.5"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1.5 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors print:hidden"
        aria-label={`${contact.name || "Kontakt"} entfernen`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────

export default function Notfallkarte() {
  const [data, setData] = useState<NotfallkarteData>(loadData);
  const [saved, setSaved] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect storage availability once on mount
  useEffect(() => {
    if (!isStorageAvailable()) setStorageError(true);
  }, []);

  // Auto-save on changes
  useEffect(() => {
    if (!saveData(data)) setStorageError(true);
  }, [data]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const handleSave = useCallback(() => {
    saveData(data);
    setSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  }, [data]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const addContact = useCallback(() => {
    setData(prev => ({
      ...prev,
      personalContacts: [
        ...prev.personalContacts,
        { id: createId(), name: "", phone: "", relation: "" },
      ],
    }));
  }, []);

  const updateContact = useCallback((updated: PersonalContact) => {
    setData(prev => ({
      ...prev,
      personalContacts: prev.personalContacts.map(c =>
        c.id === updated.id ? updated : c
      ),
    }));
  }, []);

  const removeContact = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      personalContacts: prev.personalContacts.filter(c => c.id !== id),
    }));
  }, []);

  const addStrategy = useCallback(() => {
    setData(prev => ({
      ...prev,
      calmingStrategies: [
        ...prev.calmingStrategies,
        { id: createId(), text: "" },
      ],
    }));
  }, []);

  const updateStrategy = useCallback((id: string, text: string) => {
    setData(prev => ({
      ...prev,
      calmingStrategies: prev.calmingStrategies.map(s =>
        s.id === id ? { ...s, text } : s
      ),
    }));
  }, []);

  const removeStrategy = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      calmingStrategies: prev.calmingStrategies.filter(s => s.id !== id),
    }));
  }, []);

  return (
    <Layout>
      <SEO
        title="Persönliche Notfallkarte | Schluss mit dem Eiertanz"
        description="Erstellen Sie Ihre persönliche Notfallkarte mit den wichtigsten Nummern, Kontaktpersonen und Beruhigungsstrategien – zum Ausdrucken oder Speichern."
        path="/notfallkarte"
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--color-sand)] to-background pt-12 pb-8 print:pt-2 print:pb-2 print:bg-none">
        <div className="container max-w-3xl text-center">
          {storageError && (
            <div
              className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left print:hidden"
              role="alert"
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Speichern nicht möglich:</strong> Ihr Browser blockiert
                den lokalen Speicher (z.B. im privaten Modus). Ihre Eingaben
                werden nicht gespeichert. Bitte drucken Sie die Karte aus, bevor
                Sie die Seite verlassen.
              </p>
            </div>
          )}
          <div className="inline-flex items-center gap-2 bg-[var(--color-sos-rot)]/10 text-[var(--color-sos-rot)] px-4 py-1.5 rounded-full text-sm font-medium mb-4 print:hidden">
            <Shield className="w-4 h-4" />
            Soforthilfe-Werkzeug
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3 print:text-2xl print:mb-1">
            Persönliche Notfallkarte
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto print:text-sm print:max-w-none">
            Die wichtigsten Nummern und Ihre persönlichen Strategien – alles auf
            einen Blick. Zum Ausdrucken, als PDF speichern oder jederzeit hier
            abrufen.
          </p>

          {/* Action buttons – hidden when printing */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 print:hidden">
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Drucken / Als PDF
            </Button>
            <Button variant="outline" onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              {saved ? "Gespeichert!" : "Speichern"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-5 print:hidden">
            Sofort Hilfe brauchen?{" "}
            <Link
              href="/soforthilfe"
              className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
            >
              Soforthilfe-Nummern →
            </Link>{" "}
            · Situation einschätzen?{" "}
            <Link
              href="/wegweiser"
              className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
            >
              Situations-Wegweiser →
            </Link>
          </p>
        </div>
      </section>

      {/* ─── Printable card area ──────────────────────────── */}
      <section className="container max-w-3xl py-8 space-y-6 print:py-2 print:space-y-3 notfallkarte-print">
        {/* BLOCK 1: Emergency numbers */}
        <Card className="border-[var(--color-sos-rot)]/30 print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-[var(--color-sos-rot)]" />
              <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                Notfallnummern
              </h2>
            </div>
            <div className="divide-y divide-border/50">
              {CARD_ROT.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BLOCK 2: Psychiatric emergency */}
        <Card className="border-[var(--color-sos-orange-text)]/30 print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-5 h-5 text-[var(--color-sos-orange-text)]" />
              <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                Psychiatrische Krise – PUK Zürich (24/7)
              </h2>
            </div>
            <div className="divide-y divide-border/50">
              {CARD_GELB.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BLOCK 3: Someone to talk to */}
        <Card className="border-[var(--color-sos-gruen-text)]/30 print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-[var(--color-sos-gruen-text)]" />
              <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                Jemand zum Reden
              </h2>
            </div>
            <div className="divide-y divide-border/50">
              {CARD_GRUEN.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BLOCK 4: Personal contacts */}
        <Card className="print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[var(--color-sage-dark)]" />
                <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                  Meine Kontaktpersonen
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addContact}
                className="gap-1.5 print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                Hinzufügen
              </Button>
            </div>

            {data.personalContacts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-3 print:hidden">
                Fügen Sie hier Ihre persönlichen Kontaktpersonen hinzu – z.B.
                Therapeut:in, Vertrauensperson, Nachbar:in.
              </p>
            ) : (
              <div className="space-y-0.5">
                {data.personalContacts.map(c => (
                  <PersonalContactRow
                    key={c.id}
                    contact={c}
                    onUpdate={updateContact}
                    onRemove={() => removeContact(c.id)}
                  />
                ))}
              </div>
            )}

            {/* Print-only: empty lines if no contacts */}
            {data.personalContacts.length === 0 && (
              <div className="hidden print:block space-y-3 mt-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="grid grid-cols-3 gap-4">
                    <div className="border-b border-gray-400 py-2 text-xs text-gray-500">
                      Name
                    </div>
                    <div className="border-b border-gray-400 py-2 text-xs text-gray-500">
                      Telefon
                    </div>
                    <div className="border-b border-gray-400 py-2 text-xs text-gray-500">
                      Beziehung
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* BLOCK 5: Calming strategies */}
        <Card className="print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-sage-dark)]" />
                <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                  Meine Beruhigungsstrategien
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addStrategy}
                className="gap-1.5 print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                Hinzufügen
              </Button>
            </div>
            <div className="space-y-2">
              {data.calmingStrategies.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-sage-wash)] text-[var(--color-sage-dark)] text-xs font-medium flex items-center justify-center print:bg-gray-100">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={s.text}
                    onChange={e => updateStrategy(s.id, e.target.value)}
                    placeholder="Strategie eingeben…"
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => removeStrategy(s.id)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors print:hidden"
                    aria-label="Strategie entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BLOCK 6: Personal notes */}
        <Card className="print:break-inside-avoid">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-[var(--color-sage-dark)]" />
              <h2 className="text-lg font-semibold text-foreground font-serif print:text-base print:!border-none print:!mt-0 print:!mb-0 print:!pb-0">
                Persönliche Notizen
              </h2>
            </div>
            <textarea
              value={data.notes}
              onChange={e =>
                setData(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="z.B. Medikamente, Allergien, wichtige Hinweise für Helfer:innen…"
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:resize-none"
            />
          </CardContent>
        </Card>

        {/* Info box */}
        <div className="bg-[var(--color-sage-wash)] rounded-xl p-5 text-sm text-muted-foreground leading-relaxed print:hidden">
          <p className="font-medium text-foreground mb-1">
            Ihre Daten bleiben bei Ihnen
          </p>
          <p>
            Alle Angaben werden nur lokal in Ihrem Browser gespeichert – sie
            verlassen nie Ihr Gerät. Beim Drucken oder PDF-Export werden Ihre
            persönlichen Einträge mit ausgegeben.
          </p>
        </div>

        {/* Bottom print button */}
        <div className="flex justify-center pt-2 print:hidden">
          <Button onClick={handlePrint} size="lg" className="gap-2">
            <Printer className="w-4 h-4" />
            Notfallkarte drucken / als PDF speichern
          </Button>
        </div>
      </section>
    </Layout>
  );
}
