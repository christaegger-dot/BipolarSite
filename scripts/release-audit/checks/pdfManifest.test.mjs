import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { findUntrackedPdfSourceFiles } from "./pdfManifest.mjs";

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
});
