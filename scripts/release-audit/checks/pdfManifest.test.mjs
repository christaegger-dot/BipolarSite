import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import {
  findUntrackedPdfSourceFiles,
  pdfMetadataDeclaresLanguage,
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

  it("requires de-CH language metadata for critical acute PDFs only", () => {
    assert.equal(requiresCriticalLanguageMetadata("c2_suizidgedanken"), true);
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
});
