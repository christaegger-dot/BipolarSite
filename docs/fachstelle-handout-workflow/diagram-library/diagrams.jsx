// diagrams.jsx — Diagramm-Bibliothek für Fachstelle-Handouts
// Lebende Muster- und Komponentenbibliothek im tintensparsamen ink-light
// Design-System (weisser Grund / Teal / Sand / Rosé). Eine Komponente ist erst dann
// produktionsfreigegeben, wenn ihr Registry-Status und die PDF-Prüfkette dies
// explizit ausweisen.
//
// Alle Diagramme akzeptieren ein `data`-Objekt (oder nutzen einen Default),
// damit später jedes Handout seine eigenen Inhalte einsetzen kann.

const DG_TOKENS = {
  navy: '#7a6f66',
  text: '#2d2823',
  textSoft: '#5c5a56',
  muted: '#776c63',
  paper: '#ffffff',
  bg: '#ffffff',
  surfaceAlt: 'rgba(45,40,35,0.025)',
  line: 'rgba(45,40,35,0.12)',
  lineSoft: 'rgba(45,40,35,0.08)',
  teal: '#3a9aa3',
  tealCta: '#287f87',
  tealSoft: 'rgba(40,127,135,0.055)',
  tealMist: 'rgba(40,127,135,0.075)',
  sand: '#ddd2bf',
  sandDeep: '#b58a52',
  sandMist: 'rgba(181,138,82,0.06)',
  rose: '#af736e',
  roseText: '#8a504b',
  roseMist: 'rgba(138,80,75,0.055)',
  alert: '#9a3412',
  alertSoft: 'rgba(154,52,18,0.06)',
  amber: '#b45309',
  amberLight: '#fbbf24',
  amberMist: 'rgba(180,83,9,0.06)',
  green: '#0d7a5f',
  greenMist: 'rgba(13,122,95,0.06)',
};

const DIAGRAM_PACKAGE_VERSION = '0.3.0-draft';
const DG_RELEASE_RULE = 'Freigabe erst nach Handout-spezifischem Rendercheck, Mess-Gate, visueller Gegenprüfung und PDF/UA-Prüfung.';
const DG_PRINT_POLICY = 'Ink-light: weisser Grund, keine vollflächigen getönten Seitenhintergründe, Farbe primär über Linien, Konturen, Icons und kleine Akzentflächen.';

const DIAGRAM_EXAMPLE_DATA = {
  kreislauf: {
    nodes: [
      { label: 'Schuld', text: 'Druck steigt' },
      { label: 'Überengagement', text: 'Kontrolle, Mittragen' },
      { label: 'Erschöpfung', text: 'Kraft kippt' },
      { label: 'Kritik / Rückzug', text: 'Distanz, gereizte Sätze' },
    ],
    exitLabel: 'Pause · Grenze',
  },
  tacho: {
    zones: [
      { label: 'Ansprechbar', text: 'Reize senken, kurz sprechen', color: DG_TOKENS.green, mist: DG_TOKENS.greenMist },
      { label: 'Kippend', text: 'Fachperson früh dazunehmen', color: DG_TOKENS.amber, mist: DG_TOKENS.amberMist },
      { label: 'Gefahr', text: 'Schutz zuerst, Gespräch später', color: DG_TOKENS.alert, mist: DG_TOKENS.alertSoft },
    ],
    needleZone: 1,
  },
  ampel: {
    stages: [
      { label: 'Beobachten', text: 'Einzelne Veränderungen notieren, ohne zu diagnostizieren.', color: DG_TOKENS.green, mist: DG_TOKENS.greenMist },
      { label: 'Früh ansprechen', text: 'Mehrere Signale ruhig beschreiben, Vertrauensperson einbeziehen.', color: DG_TOKENS.sandDeep, mist: DG_TOKENS.sandMist },
      { label: 'Krisenplan prüfen', text: 'Bei deutlicher Verdichtung vereinbarte Schritte hervornehmen.', color: DG_TOKENS.amber, mist: DG_TOKENS.amberMist },
      { label: 'Notfall', text: 'Bei konkreter Gefahr nicht weiter beobachten, Hilfe holen.', color: DG_TOKENS.alert, mist: DG_TOKENS.alertSoft },
    ],
  },
  phasenwelle: {
    label: 'Beispiel-Verlauf',
    points: [
      { t: 0, v: 0.05 }, { t: 0.08, v: 0.55 }, { t: 0.16, v: 0.85 },
      { t: 0.24, v: 0.35 }, { t: 0.34, v: -0.2 }, { t: 0.46, v: -0.7 },
      { t: 0.58, v: -0.4 }, { t: 0.68, v: 0.0 }, { t: 0.78, v: 0.15 },
      { t: 0.88, v: -0.1 }, { t: 1.0, v: 0.05 },
    ],
  },
  solidaritaet: {
    patientPoints: [0.1, 0.4, 0.7, 0.3, -0.3, -0.7, -0.4, 0.0, 0.2, -0.1, 0.05],
    caregiverPoints: [0.6, 0.65, 0.6, 0.55, 0.45, 0.3, 0.15, 0.05, -0.05, -0.2, -0.3],
  },
  saeulen: {
    pillars: [
      { label: 'Schlaf', level: 0.45 },
      { label: 'Beziehungen', level: 0.7 },
      { label: 'Arbeit', level: 0.6 },
      { label: 'Selbstfürsorge', level: 0.3 },
      { label: 'Sinn', level: 0.55 },
    ],
  },
  quadranten: {
    xAxis: { low: 'Eigene Grenze unklar', high: 'Eigene Grenze klar' },
    yAxis: { low: 'wenig Solidarität', high: 'viel Solidarität' },
    quads: [
      { label: 'Überengagement', text: 'tragen, kontrollieren, bis zur Erschöpfung', tone: 'rose' },
      { label: 'Tragfähige Nähe', text: 'verbunden, aber mit klaren Zuständigkeiten', tone: 'teal' },
      { label: 'Rückzug', text: 'still, distanziert, beide Seiten verlieren', tone: 'sand' },
      { label: 'Distanzierte Klarheit', text: 'Grenze gesetzt, aber Beziehung kalt', tone: 'navy' },
    ],
  },
  zeitstrahl: {
    events: [
      { t: 0.05, label: 'Erste Episode', side: 'top', tone: 'amber' },
      { t: 0.22, label: 'Diagnose', side: 'bottom', tone: 'teal' },
      { t: 0.42, label: 'Erste Klinik', side: 'top', tone: 'alert' },
      { t: 0.58, label: 'Medikation', side: 'bottom', tone: 'teal' },
      { t: 0.74, label: 'Verstehen lernen', side: 'top', tone: 'rose' },
      { t: 0.92, label: 'Neue Normalität', side: 'bottom', tone: 'green' },
    ],
  },
  eisberg: {
    above: { label: 'Was sichtbar ist', items: ['Kritik', 'Rückzug', 'Schweigen', 'Gereiztheit'] },
    below: { label: 'Was darunter liegt', items: ['Angst', 'Scham', 'Erschöpfung', 'Sehnsucht nach Sicherheit', 'Schuldgefühl', 'Bedürfnis nach Nähe'] },
  },
  hilftSchadet: {
    helps: [
      'Pause statt eskalierter Diskussion',
      'Ein Thema pro Gespräch',
      'Beobachtung statt Vorwurf',
      'Zuständigkeiten klar aufteilen',
      'Entlastung früh dazuholen',
    ],
    hurts: [
      'Schuld mit Kontrolle beantworten',
      'Jede Spannung sofort lösen wollen',
      'Scharfe Kritik aus Erschöpfung',
      'Belastung kleinreden',
      'Glauben, Liebe müsse alles aushalten',
    ],
  },
};

const DIAGRAM_REGISTRY = {
  kreislauf: {
    component: 'KreislaufDiagram',
    exampleDataKey: 'kreislauf',
    label: 'Kreislauf',
    category: 'Kreislauf / Eskalationsdynamik',
    suitableFor: ['Orientierungsblatt', 'Praxisblatt'],
    avoidFor: ['reine Kontakt- oder Ressourcenlisten'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Vier Stationen eines Belastungskreislaufs mit markiertem Ausstiegspunkt.',
    readingOrder: 'Titel, Kurzbeschreibung, Stationen im Uhrzeigersinn, Ausstiegspunkt, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  tacho: {
    component: 'TachoDiagram',
    exampleDataKey: 'tacho',
    label: 'Tacho',
    category: 'Lagebild / Eskalationsanzeige',
    suitableFor: ['Orientierungsblatt mit Warnzeichenlogik', 'Krisen-Handout'],
    avoidFor: ['allgemeine Psychoedukation ohne Handlungsstufen'],
    crisisContent: 'optional; Krisennummern nur in expliziten Krisen-Handouts',
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Halbkreis-Tacho mit drei Zonen und einer Nadel im mittleren Bereich.',
    readingOrder: 'Titel, Kurzbeschreibung, Zonen von links nach rechts, Nadelposition, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  ampel: {
    component: 'AmpelDiagram',
    exampleDataKey: 'ampel',
    label: 'Ampel',
    category: 'Warnzeichen / Stufenlogik',
    suitableFor: ['Orientierungsblatt mit Frühwarnzeichen', 'Krisen-Handout'],
    avoidFor: ['Themen ohne zeitliche oder handlungsbezogene Eskalation'],
    crisisContent: 'contains crisis-path language; no emergency numbers by default',
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Vier horizontale Warnzeichen-Stufen von Beobachten bis Notfall.',
    readingOrder: 'Titel, Kurzbeschreibung, Stufen 1 bis 4, Detailtexte, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  phasenwelle: {
    component: 'PhasenwelleDiagram',
    exampleDataKey: 'phasenwelle',
    label: 'Phasenwelle',
    category: 'Verlauf / Kurvenlogik',
    suitableFor: ['Orientierungsblatt A4 quer', 'Verlaufsblatt'],
    avoidFor: ['einmalige Checklisten'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Kurve mit manischen, stabilen und depressiven Phasen über die Zeit.',
    readingOrder: 'Titel, Kurzbeschreibung, Achsen, Phasenbereiche, Kurvenverlauf, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  solidaritaet: {
    component: 'SolidaritaetswelleDiagram',
    exampleDataKey: 'solidaritaet',
    label: 'Solidaritäts-Wellen',
    category: 'Doppelte Verlaufskurve',
    suitableFor: ['Orientierungsblatt A4 quer', 'Angehörigen-Dynamiken'],
    avoidFor: ['kurze Merkblätter ohne Beziehungsdynamik'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Zwei Kurven zeigen, wie Stimmung und Solidarität auseinanderlaufen können.',
    readingOrder: 'Titel, Kurzbeschreibung, Legende, beide Kurven von links nach rechts, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  saeulen: {
    component: 'SaeulenCheckDiagram',
    exampleDataKey: 'saeulen',
    label: 'Säulen-Check',
    category: 'Ressourcen / Belastungsprofil',
    suitableFor: ['Praxisblatt', 'Selbstcheck'],
    avoidFor: ['narrative Orientierungsblätter ohne Skalenarbeit'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Fünf Säulen zeigen die Belastung oder Stabilität verschiedener Lebensbereiche.',
    readingOrder: 'Titel, Kurzbeschreibung, Säulen von links nach rechts, Werte, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  quadranten: {
    component: 'QuadrantenDiagram',
    exampleDataKey: 'quadranten',
    label: 'Quadranten',
    category: 'Spannungsfeld / Vergleich',
    suitableFor: ['Orientierungsblatt A4 quer', 'Praxisblatt'],
    avoidFor: ['lineare Schrittfolgen'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Vier Felder ordnen Verhalten zwischen Grenze und Solidarität ein.',
    readingOrder: 'Titel, Kurzbeschreibung, Achsen, Quadranten von links oben nach rechts unten, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  zeitstrahl: {
    component: 'ZeitstrahlDiagram',
    exampleDataKey: 'zeitstrahl',
    label: 'Zeitstrahl',
    category: 'Chronologie / Verlauf',
    suitableFor: ['Orientierungsblatt A4 quer', 'Biografie- oder Verlaufsarbeit'],
    avoidFor: ['statische Definitionen'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Horizontale Zeitlinie mit markierten Ereignissen.',
    readingOrder: 'Titel, Kurzbeschreibung, Ereignisse von links nach rechts, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  eisberg: {
    component: 'EisbergDiagram',
    exampleDataKey: 'eisberg',
    label: 'Eisberg',
    category: 'Metapher / sichtbare und verborgene Ebene',
    suitableFor: ['Orientierungsblatt', 'Kommunikationsblatt'],
    avoidFor: ['rein technische Abläufe'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Eisberg-Metapher mit sichtbaren Signalen über der Linie und verborgenen Gefühlen darunter.',
    readingOrder: 'Titel, Kurzbeschreibung, sichtbare Ebene, verborgene Ebene, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
  hilftSchadet: {
    component: 'HilftSchadetDiagram',
    exampleDataKey: 'hilftSchadet',
    label: 'Hilft / Schadet',
    category: 'Vergleich / Handlungsorientierung',
    suitableFor: ['Orientierungsblatt', 'Praxisblatt'],
    avoidFor: ['komplexe Verlaufserklärungen'],
    crisisContent: false,
    weasyPrintStatus: 'untested',
    pdfUaStatus: 'untested',
    approvalStatus: 'draft',
    printPolicy: DG_PRINT_POLICY,
    altText: 'Zwei Spalten vergleichen hilfreiche und eher schädliche Reaktionen.',
    readingOrder: 'Titel, Kurzbeschreibung, Hilft-Liste, Schadet-eher-Liste, Caption.',
    productionRule: DG_RELEASE_RULE,
  },
};

function dgRegistryMeta(id) {
  return id ? DIAGRAM_REGISTRY[id] : null;
}

function useDgSvgId(prefix) {
  const reactId = React.useId ? React.useId() : React.useMemo(() => Math.random().toString(36).slice(2), []);
  return `${prefix}-${String(reactId).replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

// ─────────────────────────────────────────────────────────────
// Shared frame — every diagram sits in a paper card with a
// title eyebrow, the canvas, and an optional caption.
// ─────────────────────────────────────────────────────────────
function DiagramFrame({ registryId, eyebrow, title, caption, kicker, children, height = 420, padded = true, sub }) {
  const meta = dgRegistryMeta(registryId);
  const frameStyle = {
    background: DG_TOKENS.paper,
    border: `1px solid ${DG_TOKENS.lineSoft}`,
    borderRadius: 8,
    padding: padded ? '28px 28px 24px' : 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: DG_TOKENS.text,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  };
  return (
    <div
      style={frameStyle}
      role="group"
      aria-label={meta?.altText || title || 'Diagramm'}
      data-dg-id={registryId}
      data-dg-status={meta?.approvalStatus || 'unregistered'}
      data-dg-pdf-ua={meta?.pdfUaStatus || 'unknown'}
      data-dg-weasyprint={meta?.weasyPrintStatus || 'unknown'}
    >
      {(eyebrow || kicker) && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          {eyebrow && (
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase', color: DG_TOKENS.tealCta,
            }}>{eyebrow}</span>
          )}
          {kicker && (
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              color: DG_TOKENS.muted, padding: '2px 8px',
              background: DG_TOKENS.surfaceAlt, borderRadius: 100,
            }}>{kicker}</span>
          )}
        </div>
      )}
      {title && (
        <h3 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 24, lineHeight: 1.15, margin: '0 0 4px',
          color: DG_TOKENS.navy, letterSpacing: 0, fontWeight: 400,
        }}>{title}</h3>
      )}
      {sub && (
        <p style={{ fontSize: 13, color: DG_TOKENS.muted, margin: '0 0 18px', maxWidth: '48ch', lineHeight: 1.5 }}>
          {sub}
        </p>
      )}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </div>
      {caption && (
        <p style={{
          fontSize: 12, color: DG_TOKENS.muted, margin: '16px 0 0',
          paddingTop: 14, borderTop: `1px solid ${DG_TOKENS.lineSoft}`,
          lineHeight: 1.5, fontStyle: 'italic',
        }}>{caption}</p>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 1 · KREISLAUF  — vierstufiger Loop mit Ausstiegspunkt
// ═════════════════════════════════════════════════════════════
function KreislaufDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.kreislauf;
  const cx = 280, cy = 200, r = 130;
  const positions = d.nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / d.nodes.length;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), angle: a };
  });
  const arrowId = useDgSvgId('kr-arrow');
  const exitArrowId = useDgSvgId('kr-arrow-exit');
  return (
    <DiagramFrame
      registryId="kreislauf"
      eyebrow="01 · Kreislauf"
      title="EE-Kreislauf"
      sub="Vier Stationen, die sich gegenseitig speisen — und ein Ausstiegspunkt, der früher liegt als der Streit selbst."
      caption="Verwendet z. B. in: Expressed Emotions · Hypervigilanz · Schuld-Spirale"
    >
      <svg viewBox="0 -90 560 490" role="img" aria-label={DIAGRAM_REGISTRY.kreislauf.altText}
        style={{ width: '100%', height: 'auto', maxHeight: 380 }}>
        <title>EE-Kreislauf</title>
        <desc>{DIAGRAM_REGISTRY.kreislauf.altText}</desc>
        <defs>
          <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={DG_TOKENS.tealCta} />
          </marker>
          <marker id={exitArrowId} viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={DG_TOKENS.green} />
          </marker>
        </defs>

        {/* central note */}
        <circle cx={cx} cy={cy} r={48} fill={DG_TOKENS.tealSoft} />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="700"
          fill={DG_TOKENS.tealCta} letterSpacing="0.08em">DER KREIS</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11"
          fill={DG_TOKENS.muted}>Überlastung</text>

        {/* arcs between nodes */}
        {positions.map((p, i) => {
          const next = positions[(i + 1) % positions.length];
          const arcR = r;
          const startAngle = p.angle + 0.32;
          const endAngle = next.angle - 0.32;
          const x1 = cx + arcR * Math.cos(startAngle);
          const y1 = cy + arcR * Math.sin(startAngle);
          const x2 = cx + arcR * Math.cos(endAngle);
          const y2 = cy + arcR * Math.sin(endAngle);
          return (
            <path key={i}
              d={`M ${x1} ${y1} A ${arcR} ${arcR} 0 0 1 ${x2} ${y2}`}
              fill="none" stroke={DG_TOKENS.tealCta} strokeWidth="1.5"
              markerEnd={`url(#${arrowId})`} />
          );
        })}

        {/* nodes */}
        {positions.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="36" fill={DG_TOKENS.paper}
              stroke={DG_TOKENS.sandDeep} strokeWidth="1.2" />
            <text x={p.x} y={p.y - 3} textAnchor="middle" fontSize="12"
              fontWeight="700" fill={DG_TOKENS.navy}>{d.nodes[i].label}</text>
            <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize="9.5"
              fill={DG_TOKENS.muted}>{d.nodes[i].text}</text>
          </g>
        ))}

        {/* exit arrow — from top node up-left to the AUSSTIEG box */}
        <path d={`M ${positions[0].x - 28} ${positions[0].y - 22} Q ${positions[0].x - 75} ${positions[0].y - 50} ${positions[0].x - 110} ${positions[0].y - 58}`}
          fill="none" stroke={DG_TOKENS.green} strokeWidth="1.8"
          strokeDasharray="4 3" markerEnd={`url(#${exitArrowId})`} />
        <rect x={positions[0].x - 220} y={positions[0].y - 78} width="110" height="42"
          rx="6" fill={DG_TOKENS.greenMist} stroke={DG_TOKENS.green} strokeWidth="1" />
        <text x={positions[0].x - 165} y={positions[0].y - 60} textAnchor="middle"
          fontSize="10" fontWeight="700" fill={DG_TOKENS.green} letterSpacing="0.06em">AUSSTIEG</text>
        <text x={positions[0].x - 165} y={positions[0].y - 46} textAnchor="middle"
          fontSize="10" fill={DG_TOKENS.green}>{d.exitLabel}</text>
      </svg>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 2 · TACHO  — Halbkreis-Skala mit drei Zonen + Nadel
// ═════════════════════════════════════════════════════════════
function TachoDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.tacho;
  const cx = 240, cy = 230, R = 180, r0 = 110;
  // Half circle from 180° to 360° (i.e. top arc)
  const startA = Math.PI, endA = 2 * Math.PI;
  const zoneArcs = d.zones.map((z, i) => {
    const a1 = startA + (i * (endA - startA)) / d.zones.length;
    const a2 = startA + ((i + 1) * (endA - startA)) / d.zones.length;
    const p1 = { x: cx + R * Math.cos(a1), y: cy + R * Math.sin(a1) };
    const p2 = { x: cx + R * Math.cos(a2), y: cy + R * Math.sin(a2) };
    const p3 = { x: cx + r0 * Math.cos(a2), y: cy + r0 * Math.sin(a2) };
    const p4 = { x: cx + r0 * Math.cos(a1), y: cy + r0 * Math.sin(a1) };
    return {
      d: `M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r0} ${r0} 0 0 0 ${p4.x} ${p4.y} Z`,
      midA: (a1 + a2) / 2,
      ...z,
    };
  });
  const needleA = startA + ((d.needleZone + 0.5) * (endA - startA)) / d.zones.length;
  const nLen = R - 5;

  return (
    <DiagramFrame
      registryId="tacho"
      eyebrow="02 · Tacho"
      title="Manie-Tacho"
      sub="Lagebild in drei Stufen. Die Nadel zeigt, wo wir gerade stehen — und welche Handlung dazu passt."
      caption="Verwendet z. B. in: Akutblatt Manie · Eskalations-Anzeige"
    >
      <svg viewBox="0 0 480 270" role="img" aria-label={DIAGRAM_REGISTRY.tacho.altText}
        style={{ width: '100%', height: 'auto', maxHeight: 260 }}>
        <title>Manie-Tacho</title>
        <desc>{DIAGRAM_REGISTRY.tacho.altText}</desc>
        {zoneArcs.map((z, i) => (
          <path key={i} d={z.d} fill={z.mist} stroke={z.color} strokeWidth="1.2" />
        ))}
        {/* tick marks */}
        {zoneArcs.map((z, i) => {
          const a = startA + (i * (endA - startA)) / d.zones.length;
          const tx1 = cx + r0 * Math.cos(a), ty1 = cy + r0 * Math.sin(a);
          const tx2 = cx + R * Math.cos(a), ty2 = cy + R * Math.sin(a);
          return <line key={i} x1={tx1} y1={ty1} x2={tx2} y2={ty2}
            stroke={DG_TOKENS.paper} strokeWidth="2.5" />;
        })}

        {/* needle */}
        <line x1={cx} y1={cy} x2={cx + nLen * Math.cos(needleA)} y2={cy + nLen * Math.sin(needleA)}
          stroke={DG_TOKENS.text} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="9" fill={DG_TOKENS.text} />
        <circle cx={cx} cy={cy} r="4" fill={DG_TOKENS.paper} />

        {/* zone labels */}
        {zoneArcs.map((z, i) => {
          const lr = (R + r0) / 2;
          const lx = cx + lr * Math.cos(z.midA);
          const ly = cy + lr * Math.sin(z.midA);
          return (
            <text key={i} x={lx} y={ly + 4} textAnchor="middle"
              fontSize="12" fontWeight="700" fill={z.color}>{z.label}</text>
          );
        })}
      </svg>
      {/* zone explanations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 4 }}>
        {d.zones.map((z, i) => (
          <div key={i} style={{
            borderLeft: `2.5px solid ${z.color}`, paddingLeft: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: z.color, marginBottom: 2 }}>
              {z.label}
            </div>
            <div style={{ fontSize: 11, color: DG_TOKENS.muted, lineHeight: 1.4 }}>
              {z.text}
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 3 · AMPEL  — horizontale Stufen-Eskalation
// ═════════════════════════════════════════════════════════════
function AmpelDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.ampel;
  return (
    <DiagramFrame
      registryId="ampel"
      eyebrow="03 · Ampel"
      title="Frühwarnzeichen-Stufen"
      sub="Vier Stufen — von beobachten bis Notfall. Wichtig ist die Kombination aus Muster, Dauer und Veränderung."
      caption="Verwendet z. B. in: Warnsignale · Krisenpfad · Selbsttest"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
        {d.stages.map((s, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{
              height: 56, background: DG_TOKENS.paper,
              border: `1px solid ${DG_TOKENS.lineSoft}`,
              borderLeft: `4px solid ${s.color}`,
              borderRadius: 4, padding: '8px 10px',
              display: 'flex', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Stufe {i + 1}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DG_TOKENS.navy, fontFamily: "'DM Serif Display', serif" }}>
                  {s.label}
                </div>
              </div>
            </div>
            {i < d.stages.length - 1 && (
              <div style={{
                position: 'absolute', right: -7, top: '50%', transform: 'translateY(-50%)',
                width: 14, height: 14, color: DG_TOKENS.muted, fontSize: 18, lineHeight: 1, zIndex: 2,
              }}>›</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {d.stages.map((s, i) => (
          <p key={i} style={{ fontSize: 11.5, color: DG_TOKENS.muted, lineHeight: 1.45, margin: 0, paddingLeft: 4 }}>
            {s.text}
          </p>
        ))}
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 4 · PHASENVERLAUF — Stimmungskurve mit Phasenzonen
// ═════════════════════════════════════════════════════════════
function PhasenwelleDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.phasenwelle;
  const W = 560, H = 280, P = 40;
  const cx = (t) => P + t * (W - 2 * P);
  const cy = (v) => H / 2 - v * (H / 2 - P);
  // Smooth path
  const pts = d.points.map(p => ({ x: cx(p.t), y: cy(p.v) }));
  let path = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1], p1 = pts[i];
    const cx1 = p0.x + (p1.x - p0.x) / 2;
    path += ` C ${cx1} ${p0.y}, ${cx1} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  // zone bands
  const bands = [
    { y1: cy(1.0), y2: cy(0.6), color: 'rgba(180,83,9,0.035)', label: 'Manie' },
    { y1: cy(0.6), y2: cy(0.2), color: 'rgba(251,191,36,0.04)', label: 'Hypomanie' },
    { y1: cy(0.2), y2: cy(-0.2), color: 'rgba(13,122,95,0.03)', label: 'Stabil' },
    { y1: cy(-0.2), y2: cy(-0.6), color: 'rgba(91,127,165,0.035)', label: 'Leichte Depression' },
    { y1: cy(-0.6), y2: cy(-1.0), color: 'rgba(74,111,149,0.04)', label: 'Schwere Depression' },
  ];
  return (
    <DiagramFrame
      registryId="phasenwelle"
      eyebrow="04 · Verlauf"
      title="Phasenverlauf"
      sub="Stimmungskurve über die Zeit. Bipolare Verläufe sind selten Lehrbuch — sie pulsieren in eigenem Rhythmus."
      caption="Verwendet z. B. in: Modul 1 · Phasenverlauf-Tool · Verlaufsdokumentation"
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={DIAGRAM_REGISTRY.phasenwelle.altText}
        style={{ width: '100%', height: 'auto', maxHeight: 280 }}>
        <title>Phasenverlauf</title>
        <desc>{DIAGRAM_REGISTRY.phasenwelle.altText}</desc>
        {/* phase bands */}
        {bands.map((b, i) => (
          <rect key={i} x={P} y={Math.min(b.y1, b.y2)} width={W - 2 * P}
            height={Math.abs(b.y2 - b.y1)} fill={b.color} />
        ))}
        {/* baseline */}
        <line x1={P} y1={H / 2} x2={W - P} y2={H / 2}
          stroke={DG_TOKENS.line} strokeWidth="1" strokeDasharray="3 3" />
        {/* labels right */}
        {bands.map((b, i) => (
          <text key={i} x={W - P + 6} y={(b.y1 + b.y2) / 2 + 3}
            fontSize="9" fill={DG_TOKENS.muted}>{b.label}</text>
        ))}
        {/* curve */}
        <path d={path} fill="none" stroke={DG_TOKENS.tealCta} strokeWidth="2.5"
          strokeLinecap="round" />
        {/* peak/trough markers */}
        <circle cx={pts[2].x} cy={pts[2].y} r="5" fill={DG_TOKENS.alert} />
        <circle cx={pts[5].x} cy={pts[5].y} r="5" fill={DG_TOKENS.tealCta} />
        {/* time axis */}
        <text x={P} y={H - 4} fontSize="10" fill={DG_TOKENS.muted}>← Zeit</text>
      </svg>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 5 · SOLIDARITÄTSWELLEN — zwei Linien, asymmetrisch
// ═════════════════════════════════════════════════════════════
function SolidaritaetswelleDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.solidaritaet;
  const W = 560, H = 260, P = 36;
  const ptPoints = d.patientPoints;
  const cgPoints = d.caregiverPoints;
  const toPath = (vals) => {
    const pts = vals.map((v, i) => ({
      x: P + (i / (vals.length - 1)) * (W - 2 * P),
      y: H / 2 - v * (H / 2 - P - 10),
    }));
    let p = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i];
      const mx = (p0.x + p1.x) / 2;
      p += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return p;
  };
  return (
    <DiagramFrame
      registryId="solidaritaet"
      eyebrow="05 · Verlauf"
      title="Solidaritäts-Wellen"
      sub="Zwei Linien, asymmetrisch. Stimmung der erkrankten Person — und Solidarität der Angehörigenseite, die mit jeder Welle erodieren kann."
      caption="Verwendet z. B. in: d4 Solidarität · b2 Erosion · Modul 5"
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={DIAGRAM_REGISTRY.solidaritaet.altText}
        style={{ width: '100%', height: 'auto', maxHeight: 260 }}>
        <title>Solidaritäts-Wellen</title>
        <desc>{DIAGRAM_REGISTRY.solidaritaet.altText}</desc>
        <line x1={P} y1={H / 2} x2={W - P} y2={H / 2}
          stroke={DG_TOKENS.line} strokeWidth="1" strokeDasharray="3 3" />
        <text x={P} y={20} fontSize="10" fontWeight="700" fill={DG_TOKENS.muted} letterSpacing="0.06em">HOCH</text>
        <text x={P} y={H - 8} fontSize="10" fontWeight="700" fill={DG_TOKENS.muted} letterSpacing="0.06em">TIEF</text>
        {/* patient line */}
        <path d={toPath(ptPoints)} fill="none" stroke={DG_TOKENS.tealCta} strokeWidth="2.2" />
        {/* caregiver line */}
        <path d={toPath(cgPoints)} fill="none" stroke={DG_TOKENS.roseText}
          strokeWidth="2.2" strokeDasharray="0" />
        {/* erosion shading under caregiver where it dips below 0 */}
      </svg>
      <div style={{ display: 'flex', gap: 24, marginTop: 8, fontSize: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 18, height: 2.5, background: DG_TOKENS.tealCta, display: 'inline-block' }}></span>
          <span style={{ color: DG_TOKENS.text }}>Stimmung erkrankte Person</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 18, height: 2.5, background: DG_TOKENS.roseText, display: 'inline-block' }}></span>
          <span style={{ color: DG_TOKENS.text }}>Solidarität Angehörige</span>
        </span>
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 6 · SÄULEN-CHECK — fünf Lebensbereiche, Füllstand
// ═════════════════════════════════════════════════════════════
function SaeulenCheckDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.saeulen;
  return (
    <DiagramFrame
      registryId="saeulen"
      eyebrow="06 · Struktur"
      title="Säulen-Check"
      sub="Fünf Lebensbereiche im Blick. Welche tragen gerade, welche brauchen Aufmerksamkeit?"
      caption="Verwendet z. B. in: Säulen-Check-Tool · Selbstfürsorge · Belastungsbild"
    >
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${d.pillars.length}, 1fr)`,
        gap: 16, alignItems: 'end', height: 220, paddingBottom: 36, position: 'relative' }}>
        {/* baseline */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 32, height: 1,
          background: DG_TOKENS.line,
        }}></div>
        {/* threshold line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 32 + 0.5 * (220 - 36),
          height: 1, borderTop: `1px dashed ${DG_TOKENS.sandDeep}`,
        }}></div>
        <div style={{
          position: 'absolute', right: 0, bottom: 32 + 0.5 * (220 - 36) + 4,
          fontSize: 10, color: DG_TOKENS.sandDeep, fontWeight: 600,
        }}>Tragfähig</div>

        {d.pillars.map((p, i) => {
          const h = p.level * (220 - 36);
          const low = p.level < 0.4;
          return (
            <div key={i} style={{
              position: 'relative', height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{
                height: h,
                background: DG_TOKENS.paper,
                border: `1px solid ${low ? DG_TOKENS.alert : DG_TOKENS.tealCta}`,
                borderTop: `3px solid ${low ? DG_TOKENS.alert : DG_TOKENS.tealCta}`,
                borderRadius: '4px 4px 0 0',
                marginBottom: 32,
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 11, fontWeight: 700, color: low ? DG_TOKENS.alert : DG_TOKENS.tealCta,
                }}>{Math.round(p.level * 100)}%</span>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                textAlign: 'center', fontSize: 11, fontWeight: 600,
                color: DG_TOKENS.navy, lineHeight: 1.2,
              }}>{p.label}</div>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 7 · QUADRANTEN — 2×2-Matrix
// ═════════════════════════════════════════════════════════════
function QuadrantenDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.quadranten;
  const toneStyles = {
    rose: { accent: DG_TOKENS.roseText },
    teal: { accent: DG_TOKENS.tealCta },
    sand: { accent: DG_TOKENS.sandDeep },
    navy: { accent: DG_TOKENS.navy },
  };
  return (
    <DiagramFrame
      registryId="quadranten"
      eyebrow="07 · Vergleich"
      title="Quadranten"
      sub="Zwei Achsen, vier Konstellationen. Wo ist man gerade — und wohin will man eigentlich?"
      caption="Verwendet z. B. in: Grenzsetzung · Ambivalente Loyalität · Säulen-Check"
    >
      <div style={{ display: 'flex', gap: 12 }}>
        {/* Y-axis label */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          fontSize: 10, fontWeight: 700, color: DG_TOKENS.muted, letterSpacing: '0.06em',
          textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          padding: '0 4px',
        }}>
          <span>{d.yAxis.low}</span>
          <span>{d.yAxis.high}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            border: `1px solid ${DG_TOKENS.line}`, borderRadius: 8, overflow: 'hidden' }}>
            {/* order: TL TR BL BR — visual top-left = high-y low-x */}
            {[2, 1, 0, 3].map((qi, idx) => {
              const q = d.quads[qi];
              const t = toneStyles[q.tone];
              const isLast = idx === 3;
              const isRight = idx % 2 === 1;
              const isTop = idx < 2;
              return (
                <div key={qi} style={{
                  background: DG_TOKENS.paper,
                  boxShadow: `inset 0 3px 0 ${t.accent}`,
                  borderRight: isRight ? 'none' : `1px solid ${DG_TOKENS.line}`,
                  borderBottom: isTop ? `1px solid ${DG_TOKENS.line}` : 'none',
                  padding: 16, minHeight: 90,
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: t.accent, marginBottom: 4,
                    fontFamily: "'DM Serif Display', serif",
                  }}>{q.label}</div>
                  <div style={{ fontSize: 11, color: DG_TOKENS.muted, lineHeight: 1.4 }}>
                    {q.text}
                  </div>
                </div>
              );
            })}
          </div>
          {/* X-axis label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6,
            fontSize: 10, fontWeight: 700, color: DG_TOKENS.muted, letterSpacing: '0.06em',
            textTransform: 'uppercase' }}>
            <span>{d.xAxis.low}</span>
            <span>{d.xAxis.high}</span>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 8 · ZEITSTRAHL — Meilensteine über und unter der Linie
// ═════════════════════════════════════════════════════════════
function ZeitstrahlDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.zeitstrahl;
  const W = 560, H = 240;
  const lineY = H / 2;
  const P = 30;
  const tones = {
    teal: DG_TOKENS.tealCta, rose: DG_TOKENS.roseText, alert: DG_TOKENS.alert,
    sand: DG_TOKENS.sandDeep, green: DG_TOKENS.green, amber: DG_TOKENS.amber,
  };
  return (
    <DiagramFrame
      registryId="zeitstrahl"
      eyebrow="08 · Zeit"
      title="Zeitstrahl"
      sub="Ereignisse über und unter der Linie. Was geschah, was bedeutete es."
      caption="Verwendet z. B. in: Transformationsreise · Verlaufsbiografie · Modul 1"
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={DIAGRAM_REGISTRY.zeitstrahl.altText}
        style={{ width: '100%', height: 'auto' }}>
        <title>Zeitstrahl</title>
        <desc>{DIAGRAM_REGISTRY.zeitstrahl.altText}</desc>
        <line x1={P} y1={lineY} x2={W - P} y2={lineY}
          stroke={DG_TOKENS.sandDeep} strokeWidth="2" />
        {/* arrowhead at end */}
        <path d={`M ${W - P} ${lineY} l -10 -5 l 0 10 z`} fill={DG_TOKENS.sandDeep} />
        {/* start tick */}
        <line x1={P} y1={lineY - 8} x2={P} y2={lineY + 8}
          stroke={DG_TOKENS.sandDeep} strokeWidth="2" />

        {d.events.map((e, i) => {
          const x = P + e.t * (W - 2 * P);
          const top = e.side === 'top';
          const y = top ? lineY - 50 : lineY + 50;
          const color = tones[e.tone] || DG_TOKENS.tealCta;
          return (
            <g key={i}>
              <line x1={x} y1={lineY} x2={x} y2={y}
                stroke={color} strokeWidth="1.2" strokeDasharray="3 2" />
              <circle cx={x} cy={lineY} r="5" fill={color} stroke={DG_TOKENS.paper} strokeWidth="2" />
              <rect x={x - 60} y={top ? y - 28 : y - 4} width="120" height="32"
                rx="4" fill={DG_TOKENS.paper} stroke={color} strokeWidth="1" />
              <text x={x} y={top ? y - 10 : y + 16} textAnchor="middle"
                fontSize="11" fontWeight="600" fill={DG_TOKENS.navy}>{e.label}</text>
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 9 · EISBERG — sichtbar / verborgen
// ═════════════════════════════════════════════════════════════
function EisbergDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.eisberg;
  const W = 560, H = 280;
  const water = 120;
  return (
    <DiagramFrame
      registryId="eisberg"
      eyebrow="09 · Tiefe"
      title="Eisberg"
      sub="Was sichtbar wird, ist selten die ganze Geschichte. Unter der Linie liegt das, was eigentlich gesagt werden möchte."
      caption="Verwendet z. B. in: Eisberg-Tool · Kommunikation · Modul 4"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
        <svg viewBox={`0 0 ${W / 2} ${H}`} role="img" aria-label={DIAGRAM_REGISTRY.eisberg.altText}
          style={{ width: '100%', height: H }}>
          <title>Eisberg</title>
          <desc>{DIAGRAM_REGISTRY.eisberg.altText}</desc>
          {/* sky / above area */}
          <rect x="0" y="0" width={W / 2} height={water} fill={DG_TOKENS.paper} />
          {/* water area: white ground with sparse line cues for print economy */}
          <rect x="0" y={water} width={W / 2} height={H - water} fill={DG_TOKENS.paper} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i}
              d={`M 18 ${water + 32 + i * 34} C 52 ${water + 24 + i * 34}, 76 ${water + 40 + i * 34}, 110 ${water + 32 + i * 34} S 168 ${water + 24 + i * 34}, 208 ${water + 32 + i * 34} S 250 ${water + 40 + i * 34}, 268 ${water + 32 + i * 34}`}
              fill="none" stroke={DG_TOKENS.tealCta} strokeWidth="0.8" opacity="0.28" />
          ))}
          {/* waterline */}
          <line x1="0" y1={water} x2={W / 2} y2={water}
            stroke={DG_TOKENS.tealCta} strokeWidth="1.5" strokeDasharray="6 4" />
          {/* iceberg above */}
          <polygon points={`140,40 200,${water} 80,${water}`}
            fill={DG_TOKENS.paper} stroke={DG_TOKENS.navy} strokeWidth="1.5" />
          {/* iceberg below */}
          <polygon points={`80,${water} 200,${water} 240,210 30,210 60,${water + 20}`}
            fill={DG_TOKENS.paper} stroke={DG_TOKENS.sandDeep} strokeWidth="1.2" strokeDasharray="4 3" />
          {/* labels on iceberg */}
          <text x="140" y={water - 20} textAnchor="middle"
            fontSize="10" fontWeight="700" fill={DG_TOKENS.muted}
            letterSpacing="0.1em">SICHTBAR</text>
          <text x="140" y={water + 35} textAnchor="middle"
            fontSize="10" fontWeight="700" fill={DG_TOKENS.sandDeep}
            letterSpacing="0.1em">VERBORGEN</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DG_TOKENS.muted,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              {d.above.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {d.above.items.map((it, i) => (
                <span key={i} style={{
                  fontSize: 12, fontWeight: 600, color: DG_TOKENS.navy,
                  background: DG_TOKENS.surfaceAlt, padding: '4px 10px', borderRadius: 100,
                }}>{it}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DG_TOKENS.sandDeep,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              {d.below.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {d.below.items.map((it, i) => (
                <span key={i} style={{
                  fontSize: 12, fontWeight: 600, color: DG_TOKENS.sandDeep,
                  background: DG_TOKENS.sandMist, padding: '4px 10px', borderRadius: 100,
                  border: `1px solid ${DG_TOKENS.sand}`,
                }}>{it}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}

// ═════════════════════════════════════════════════════════════
// 10 · HILFT / SCHADET — zwei Listen, eine Trennlinie
// ═════════════════════════════════════════════════════════════
function HilftSchadetDiagram({ data }) {
  const d = data || DIAGRAM_EXAMPLE_DATA.hilftSchadet;
  return (
    <DiagramFrame
      registryId="hilftSchadet"
      eyebrow="10 · Paar-Vergleich"
      title="Was hilft · Was schadet"
      sub="Die ehrlichste Lehrform — zwei Spalten, gleiche Augenhöhe, klare Sortierung."
      caption="Verwendet z. B. in: jedem Handout · Modul-Zusammenfassungen · Krisenplan"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: DG_TOKENS.tealCta, color: '#fff',
              display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 800,
            }}>+</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: DG_TOKENS.tealCta,
              letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hilft</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex',
            flexDirection: 'column', gap: 10 }}>
            {d.helps.map((h, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.45, color: DG_TOKENS.text,
                paddingLeft: 14, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: 8,
                  width: 6, height: 6, borderRadius: '50%',
                  background: DG_TOKENS.tealCta }}></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: DG_TOKENS.line }}></div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: DG_TOKENS.roseText, color: '#fff',
              display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 800,
            }}>−</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: DG_TOKENS.roseText,
              letterSpacing: '0.05em', textTransform: 'uppercase' }}>Schadet eher</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex',
            flexDirection: 'column', gap: 10 }}>
            {d.hurts.map((h, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.45, color: DG_TOKENS.text,
                paddingLeft: 14, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: 8,
                  width: 6, height: 6, borderRadius: '50%',
                  background: DG_TOKENS.roseText }}></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DiagramFrame>
  );
}

// Export to window so app.jsx can use them
Object.assign(window, {
  DIAGRAM_PACKAGE_VERSION,
  DIAGRAM_REGISTRY,
  DIAGRAM_EXAMPLE_DATA,
  DG_RELEASE_RULE,
  DG_PRINT_POLICY,
  dgRegistryMeta,
  DiagramFrame,
  KreislaufDiagram,
  TachoDiagram,
  AmpelDiagram,
  PhasenwelleDiagram,
  SolidaritaetswelleDiagram,
  SaeulenCheckDiagram,
  QuadrantenDiagram,
  ZeitstrahlDiagram,
  EisbergDiagram,
  HilftSchadetDiagram,
  DG_TOKENS,
});
