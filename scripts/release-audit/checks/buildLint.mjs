import { createCheckResult, runCommand } from "../lib/shared.mjs";

export async function runBuildLintCheck(context) {
  const buildResult = await runCommand("npm", ["run", "build"], { cwd: context.repoRoot });
  if (!buildResult.ok) {
    return createCheckResult({
      id: "build-lint",
      title: "Build and lint",
      status: "fail",
      summary: "`npm run build` failed.",
      findings: [
        {
          severity: "high",
          message: `Build failed with exit code ${buildResult.code}.`,
        },
        ...(buildResult.stderr
          ? [{ severity: "medium", message: buildResult.stderr.trim().split("\n").slice(-4).join(" | ") }]
          : []),
      ],
      metrics: { command: "npm run build" },
    });
  }

  const lintResult = await runCommand("npm", ["run", "lint"], { cwd: context.repoRoot });
  if (!lintResult.ok) {
    return createCheckResult({
      id: "build-lint",
      title: "Build and lint",
      status: "fail",
      summary: "`npm run lint` failed after a successful build.",
      findings: [
        {
          severity: "high",
          message: `Lint failed with exit code ${lintResult.code}.`,
        },
        ...(lintResult.stderr
          ? [{ severity: "medium", message: lintResult.stderr.trim().split("\n").slice(-4).join(" | ") }]
          : []),
      ],
      metrics: { command: "npm run lint" },
    });
  }

  return createCheckResult({
    id: "build-lint",
    title: "Build and lint",
    status: "pass",
    summary: "`npm run build` and `npm run lint` completed successfully.",
    findings: [],
    metrics: {
      buildCommand: "npm run build",
      lintCommand: "npm run lint",
    },
  });
}
