import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import {
  findSparseNonFinalPdfPages,
  findMissingRequiredPdfTextSnippets,
  findUntrackedPdfSourceFiles,
  minRequiredPdfPages,
  pdfMetadataDeclaresLanguage,
  pdfTextHasSourceReferences,
  requiredPdfTextSnippets,
  requiresCriticalLanguageMetadata,
} from "./pdfManifest.mjs";

describe("PDF manifest audit helpers", () => {
  it("allows active PDFs and explicit legacy aliases while flagging stray public PDFs", () => {
    const repoRoot = path.join(path.sep, "repo");
    const sourcePdfFiles = [
      path.join(repoRoot, "src", "downloads", "active.pdf"),
      path.join(repoRoot, "src", "handouts", "legacy.pdf"),
      path.join(repoRoot, "src", "handouts", "stray.pdf"),
    ];
    const trackedPdfs = [
      { url: "/downloads/active.pdf" },
      { url: "/handouts/legacy.pdf" },
    ];

    assert.deepEqual(findUntrackedPdfSourceFiles(repoRoot, sourcePdfFiles, trackedPdfs), [
      path.join(repoRoot, "src", "handouts", "stray.pdf"),
    ]);
  });

  it("requires de-CH language metadata for critical PDFs", () => {
    assert.equal(requiresCriticalLanguageMetadata("c2_suizidgedanken"), true);
    assert.equal(requiresCriticalLanguageMetadata("krisenplanVorlage"), true);
    assert.equal(requiresCriticalLanguageMetadata("rechtlicheOrientierung"), true);
    assert.equal(requiresCriticalLanguageMetadata("b1_18_belastungen"), true);
    assert.equal(requiresCriticalLanguageMetadata("a3_ambivalente_loyalitaet"), true);
    assert.equal(requiresCriticalLanguageMetadata("grenzsetzungPraxis"), true);
    assert.equal(requiresCriticalLanguageMetadata("legacy.kurzblattStabilisiert"), true);
    assert.equal(requiresCriticalLanguageMetadata("legacy.kritischeZeitpunkte"), true);
    assert.equal(requiresCriticalLanguageMetadata("legacy.notfallkarte"), true);
  });

  it("detects de-CH language metadata in an XMP metadata stream", () => {
    assert.equal(
      pdfMetadataDeclaresLanguage("<dc:language><rdf:Seq><rdf:li>de-CH</rdf:li></rdf:Seq></dc:language>"),
      true
    );
    assert.equal(pdfMetadataDeclaresLanguage("<dc:language><rdf:Seq><rdf:li>en-US</rdf:li></rdf:Seq></dc:language>"), false);
  });

  it("lets acute PDFs choose one or two pages while layout QA checks balance and completeness", () => {
    assert.equal(minRequiredPdfPages("notfallkarte"), null);
    assert.equal(minRequiredPdfPages("legacy.notfallkarte"), null);
    assert.equal(minRequiredPdfPages("suizidgedanken"), null);
    assert.equal(minRequiredPdfPages("psychoseWahn"), null);
    assert.equal(minRequiredPdfPages("manie"), null);
    assert.equal(minRequiredPdfPages("depression"), null);
    assert.equal(minRequiredPdfPages("c2_suizidgedanken"), null);
    assert.equal(minRequiredPdfPages("c3_psychose_wahn"), null);
    assert.equal(minRequiredPdfPages("c4_manie"), null);
    assert.equal(minRequiredPdfPages("c5_depression"), null);
    assert.equal(minRequiredPdfPages("a8_warnsignale"), null);
  });

  it("flags non-final PDF pages whose main content ends too early while ignoring the footer", () => {
    const bboxText = `
      <page width="595.3" height="841.9">
        <word xMin="40" yMin="120" xMax="90" yMax="132">Title</word>
        <word xMin="40" yMin="420" xMax="90" yMax="435">Content</word>
        <word xMin="240" yMin="806" xMax="340" yMax="816">Footer</word>
      </page>
      <page width="595.3" height="841.9">
        <word xMin="40" yMin="700" xMax="90" yMax="715">Later</word>
      </page>
    `;

    assert.deepEqual(findSparseNonFinalPdfPages(bboxText), [
      {
        page: 1,
        contentBottom: 435,
        pageHeight: 841.9,
        contentBottomRatio: 0.517,
        minContentBottomRatio: 0.7,
      },
    ]);
  });

  it("requires content guardrails for updated legal and worksheet PDFs", () => {
    assert.ok(requiredPdfTextSnippets("a8_warnsignale").includes("Ampel für Frühwarnzeichen"));
    assert.ok(requiredPdfTextSnippets("a8_warnsignale").includes("Vereinbarten Schritt nutzen"));
    assert.ok(requiredPdfTextSnippets("a3_ambivalente_loyalitaet").includes("Vier innere Kräfte"));
    assert.ok(requiredPdfTextSnippets("a4_ambiguous_loss").includes("Verlust ohne klaren Abschied"));
    assert.ok(requiredPdfTextSnippets("a5_affiliate_stigma").includes("Wie Stigma Angehörige enger macht"));
    assert.ok(requiredPdfTextSnippets("notfallkarte").includes("Rettungsring: welcher Weg jetzt?"));
    assert.ok(requiredPdfTextSnippets("krisenplanVorlage").includes("sensible Gesundheitsdaten"));
    assert.ok(requiredPdfTextSnippets("c1_krisenplan").includes("keine Dosierungen ohne Behandlungsteam"));
    assert.ok(requiredPdfTextSnippets("c2_suizidgedanken").includes("Suizid-Ampel"));
    assert.ok(requiredPdfTextSnippets("c3_psychose_wahn").includes("Schutzpfad"));
    assert.ok(requiredPdfTextSnippets("c4_manie").includes("Manie-Tacho"));
    assert.ok(requiredPdfTextSnippets("c4_manie").includes("Orientierung in der Manie"));
    assert.ok(requiredPdfTextSnippets("c5_depression").includes("Depressions-Thermometer"));
    assert.ok(requiredPdfTextSnippets("rechtlicheOrientierung").includes("keine Rechtsberatung"));
    assert.ok(requiredPdfTextSnippets("rechtlicheOrientierung").includes("Beobachtungen mitteilen"));
    assert.ok(requiredPdfTextSnippets("b1_18_belastungen").includes("Vier Belastungsfelder"));
    assert.ok(requiredPdfTextSnippets("b10_trennung_scheidung").includes("Schutz- und Abstandspfade"));
    assert.ok(requiredPdfTextSnippets("b2_erosion_solidaritaet").includes("Erosion als Verlauf"));
    assert.ok(requiredPdfTextSnippets("b4_mechanismen_erosion").includes("Co-Isolation"));
    assert.ok(requiredPdfTextSnippets("b5_loyalitaetskonflikte").includes("Loyalität hat mehr als eine Richtung"));
    assert.ok(requiredPdfTextSnippets("b7_behandlung_ambivalenz").includes("Gesprächsspielraum oder Notfallpfad"));
    assert.ok(requiredPdfTextSnippets("b9_depression_partner").includes("Von Überlastung zu eigener Abklärung"));
    assert.ok(requiredPdfTextSnippets("c6_selbstfuersorge").includes("Der Akku"));
    assert.ok(requiredPdfTextSnippets("c6_selbstfuersorge").includes("Konkreter nächster Schritt"));
    assert.ok(requiredPdfTextSnippets("d4_solidaritaet_wellen").includes("Fünf Säulen langfristiger Tragfähigkeit"));
    assert.ok(requiredPdfTextSnippets("expressed_emotions").includes("Der EE-Kreislauf"));
    assert.ok(requiredPdfTextSnippets("grenzsetzungPraxis").includes("Formulierungsbaukasten"));
    assert.ok(requiredPdfTextSnippets("legacy.kurzblattStabilisiert").includes("Alltagskompass"));
    assert.ok(requiredPdfTextSnippets("kritischeZeitpunkte").includes("Zeitpunkt-Landkarte"));
    assert.ok(requiredPdfTextSnippets("sichtbarkeitBelastung").includes("Sichtbare Last"));
    assert.ok(requiredPdfTextSnippets("transformationsreise").includes("Veränderung verläuft in Wellen"));
    assert.ok(requiredPdfTextSnippets("trialog").includes("Drei Perspektiven im Trialog"));
  });

  it("reports missing required PDF text snippets after normalized matching", () => {
    assert.deepEqual(
      findMissingRequiredPdfTextSnippets(
        "rechtlicheOrientierung",
        "Dieses Blatt bietet Orientierung und ersetzt keine Rechtsberatung. Erst sortieren. In der Regel erteilt die urteilsfähige Person selbst. Angehörige können Beobachtungen mitteilen. Holen Sie fachliche oder juristische Beratung."
      ),
      []
    );
    assert.deepEqual(
      findMissingRequiredPdfTextSnippets("krisenplanVorlage", "Ausgefüllte Blätter enthalten sensible Gesundheitsdaten."),
      ["sicher auf", "digitale Kopien"]
    );
  });

  it("requires visible source references with at least one credible marker", () => {
    assert.equal(
      pdfTextHasSourceReferences("Quellen (Auswahl) NICE CG185 https://www.nice.org.uk/guidance/cg185"),
      true
    );
    assert.equal(
      pdfTextHasSourceReferences("Quellen (Auswahl) Miklowitz et al. https://doi.org/10.1111/famp.12237"),
      true
    );
    assert.equal(pdfTextHasSourceReferences("Dieses Handout hat noch keine Quellen."), false);
    assert.equal(pdfTextHasSourceReferences("NICE CG185 ohne sichtbaren Abschnitt"), false);
  });
});
