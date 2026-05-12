import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import {
  findMissingRequiredPdfTextSnippets,
  findUntrackedPdfSourceFiles,
  pdfMetadataDeclaresLanguage,
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
});
