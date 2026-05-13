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
    assert.equal(requiresCriticalLanguageMetadata("legacy.kritischeZeitpunkte"), true);
    assert.equal(requiresCriticalLanguageMetadata("legacy.notfallkarte"), true);
    assert.equal(requiresCriticalLanguageMetadata("a8_warnsignale"), false);
  });

  it("detects de-CH language metadata in an XMP metadata stream", () => {
    assert.equal(
      pdfMetadataDeclaresLanguage("<dc:language><rdf:Seq><rdf:li>de-CH</rdf:li></rdf:Seq></dc:language>"),
      true
    );
    assert.equal(pdfMetadataDeclaresLanguage("<dc:language><rdf:Seq><rdf:li>en-US</rdf:li></rdf:Seq></dc:language>"), false);
  });

  it("requires content guardrails for updated legal and worksheet PDFs", () => {
    assert.deepEqual(requiredPdfTextSnippets("a8_warnsignale"), []);
    assert.ok(requiredPdfTextSnippets("krisenplanVorlage").includes("sensible Gesundheitsdaten"));
    assert.ok(requiredPdfTextSnippets("rechtlicheOrientierung").includes("keine Rechtsberatung"));
    assert.ok(requiredPdfTextSnippets("b1_18_belastungen").includes("Vier Belastungsfelder"));
    assert.ok(requiredPdfTextSnippets("kritischeZeitpunkte").includes("Zeitpunkt-Landkarte"));
    assert.ok(requiredPdfTextSnippets("sichtbarkeitBelastung").includes("Sichtbare Last"));
  });

  it("reports missing required PDF text snippets after normalized matching", () => {
    assert.deepEqual(
      findMissingRequiredPdfTextSnippets(
        "rechtlicheOrientierung",
        "Dieses Blatt bietet Orientierung und ersetzt keine Rechtsberatung. Erst sortieren. Holen Sie fachliche oder juristische Beratung."
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
