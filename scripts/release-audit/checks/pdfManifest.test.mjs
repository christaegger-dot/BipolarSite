import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import {
  findMissingRequiredPdfTextSnippets,
  findUntrackedPdfSourceFiles,
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

  it("requires content guardrails for updated legal and worksheet PDFs", () => {
    assert.ok(requiredPdfTextSnippets("a8_warnsignale").includes("Ampel für Frühwarnzeichen"));
    assert.ok(requiredPdfTextSnippets("a3_ambivalente_loyalitaet").includes("Vier innere Kräfte"));
    assert.ok(requiredPdfTextSnippets("a4_ambiguous_loss").includes("Verlust ohne klaren Abschied"));
    assert.ok(requiredPdfTextSnippets("a5_affiliate_stigma").includes("Wie Stigma Angehörige enger macht"));
    assert.ok(requiredPdfTextSnippets("notfallkarte").includes("ersetzt keine Diagnostik"));
    assert.ok(requiredPdfTextSnippets("krisenplanVorlage").includes("sensible Gesundheitsdaten"));
    assert.ok(requiredPdfTextSnippets("c1_krisenplan").includes("keine Dosierungen ohne Behandlungsteam"));
    assert.ok(requiredPdfTextSnippets("c2_suizidgedanken").includes("nicht versuchen, mit einem Risiko-Score"));
    assert.ok(requiredPdfTextSnippets("c3_psychose_wahn").includes("ersetzt keine fachliche Abklärung"));
    assert.ok(requiredPdfTextSnippets("c4_manie").includes("nichts körperlich oder rechtlich erzwingen"));
    assert.ok(requiredPdfTextSnippets("c5_depression").includes("ohne Dosierungen zu ändern"));
    assert.ok(requiredPdfTextSnippets("rechtlicheOrientierung").includes("keine Rechtsberatung"));
    assert.ok(requiredPdfTextSnippets("rechtlicheOrientierung").includes("Beobachtungen mitteilen"));
    assert.ok(requiredPdfTextSnippets("b1_18_belastungen").includes("Vier Belastungsfelder"));
    assert.ok(requiredPdfTextSnippets("b10_trennung_scheidung").includes("Schutz- und Abstandspfade"));
    assert.ok(requiredPdfTextSnippets("b2_erosion_solidaritaet").includes("Erosion als Verlauf"));
    assert.ok(requiredPdfTextSnippets("b4_mechanismen_erosion").includes("Co-Isolation"));
    assert.ok(requiredPdfTextSnippets("b5_loyalitaetskonflikte").includes("Loyalität hat mehr als eine Richtung"));
    assert.ok(requiredPdfTextSnippets("b7_behandlung_ambivalenz").includes("Gesprächsspielraum oder Notfallpfad"));
    assert.ok(requiredPdfTextSnippets("b9_depression_partner").includes("Von Überlastung zu eigener Abklärung"));
    assert.ok(requiredPdfTextSnippets("c6_selbstfuersorge").includes("Mini-Plan für diese Woche"));
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
