// app.jsx — mounts the Fachstelle diagram library on a design canvas

function IntroCard() {
  const diagramCount = Object.keys(DIAGRAM_REGISTRY || {}).length;
  return (
    <div style={{
      width: 720, padding: '32px 36px', background: DG_TOKENS.paper,
      borderRadius: 8, border: `1px solid ${DG_TOKENS.line}`,
      fontFamily: "'DM Sans', system-ui, sans-serif", color: DG_TOKENS.text,
      marginBottom: 8,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: DG_TOKENS.tealCta, marginBottom: 8 }}>
        Fachstelle · Handout-System
      </div>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: 42, lineHeight: 1.1,
        margin: '0 0 12px', color: DG_TOKENS.navy, letterSpacing: 0, fontWeight: 400,
      }}>Diagramm-Bibliothek v1</h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, margin: '0 0 14px',
        maxWidth: '62ch', color: DG_TOKENS.text }}>
        {diagramCount} wiederverwendbare Visualisierungen für psychoedukative Handouts.
        Die Bibliothek ist bewusst erweiterbar; jedes Diagramm hat Metadaten,
        Freigabestatus und eigene Datenfelder.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0,
        maxWidth: '62ch', color: DG_TOKENS.muted }}>
        Status: Entwurfsbibliothek · ink-light. Produktionsfreigabe entsteht erst
        pro Handout nach Rendercheck, Mess-Gate, visueller Gegenprüfung und
        PDF/UA-Prüfung.
      </p>
    </div>
  );
}

function App() {
  // Slightly wider artboards for the cycle/wave/timeline diagrams
  const wide = 640;
  const standard = 520;
  const h = 460;
  return (
    <DesignCanvas>
      <div style={{ marginLeft: 60, marginBottom: 24 }}>
        <IntroCard />
      </div>

      <DCSection id="loops" title="Kreisläufe & Eskalation"
        subtitle="Dynamiken, die sich gegenseitig speisen — und ihre Ausstiegspunkte.">
        <DCArtboard id="kreislauf" label="01 · Kreislauf" width={wide} height={h}>
          <KreislaufDiagram />
        </DCArtboard>
        <DCArtboard id="tacho" label="02 · Tacho" width={standard} height={h}>
          <TachoDiagram />
        </DCArtboard>
        <DCArtboard id="ampel" label="03 · Ampel" width={wide} height={h}>
          <AmpelDiagram />
        </DCArtboard>
      </DCSection>

      <DCSection id="verlauf" title="Verläufe & Zeit"
        subtitle="Bewegungen über die Zeit — Stimmungen, Solidarität, Biografie.">
        <DCArtboard id="phasenwelle" label="04 · Phasenwelle" width={wide} height={h}>
          <PhasenwelleDiagram />
        </DCArtboard>
        <DCArtboard id="solidaritaet" label="05 · Solidaritäts-Wellen" width={wide} height={h}>
          <SolidaritaetswelleDiagram />
        </DCArtboard>
        <DCArtboard id="zeitstrahl" label="08 · Zeitstrahl" width={wide} height={h}>
          <ZeitstrahlDiagram />
        </DCArtboard>
      </DCSection>

      <DCSection id="struktur" title="Struktur & Vergleich"
        subtitle="Ordnungsmuster, Gegensätze, Tiefenebenen.">
        <DCArtboard id="saeulen" label="06 · Säulen-Check" width={standard} height={h}>
          <SaeulenCheckDiagram />
        </DCArtboard>
        <DCArtboard id="quadranten" label="07 · Quadranten" width={wide} height={h}>
          <QuadrantenDiagram />
        </DCArtboard>
        <DCArtboard id="eisberg" label="09 · Eisberg" width={wide} height={h}>
          <EisbergDiagram />
        </DCArtboard>
        <DCArtboard id="hilft-schadet" label="10 · Hilft / Schadet" width={wide} height={h}>
          <HilftSchadetDiagram />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
