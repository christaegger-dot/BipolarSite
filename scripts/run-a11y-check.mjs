import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const repoRoot = process.cwd();
const requireFromHere = createRequire(import.meta.url);
const httpServerBin = requireFromHere.resolve("http-server/bin/http-server");
const pa11yBin = requireFromHere.resolve("pa11y-ci/bin/pa11y-ci.js");
const baseConfigPath = path.join(repoRoot, ".pa11yci.json");
const targetUrl = "http://127.0.0.1:8080/";

function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function canReach(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await canReach(url)) {
      return;
    }
    await delay(250);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: "inherit",
      ...options,
    });

    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

function findChromeExecutable() {
  const candidates = [];

  try {
    const { chromium } = requireFromHere("@playwright/test");
    const playwrightPath = chromium.executablePath();
    if (playwrightPath) {
      candidates.push(playwrightPath);
    }
  } catch {
    // Fall back to common local Chrome installs below.
  }

  candidates.push(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  );

  return candidates.find((candidate) => candidate && existsSync(candidate));
}

function buildPa11yConfig() {
  const config = JSON.parse(readFileSync(baseConfigPath, "utf8"));
  const executablePath = findChromeExecutable();

  if (executablePath) {
    config.defaults = config.defaults || {};
    config.defaults.chromeLaunchConfig = {
      ...(config.defaults.chromeLaunchConfig || {}),
      executablePath,
    };
  }

  return config;
}

async function main() {
  let startedServer = false;
  let serverProcess = null;
  let tempDir = null;

  const cleanup = () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill("SIGTERM");
    }

    if (tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  };

  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });

  process.on("SIGTERM", () => {
    cleanup();
    process.exit(143);
  });

  try {
    const serverAlreadyRunning = await canReach(targetUrl);

    if (!serverAlreadyRunning) {
      const buildCode = await runCommand(npmCommand(), ["run", "build"]);
      if (buildCode !== 0) {
        process.exit(buildCode);
      }

      serverProcess = spawn(process.execPath, [httpServerBin, "_site", "-p", "8080", "--silent"], {
        cwd: repoRoot,
        stdio: "ignore",
      });
      startedServer = true;

      await waitForServer(targetUrl);
    }

    tempDir = mkdtempSync(path.join(os.tmpdir(), "bipolarsite-pa11y-"));
    const tempConfigPath = path.join(tempDir, "pa11yci.json");
    writeFileSync(tempConfigPath, JSON.stringify(buildPa11yConfig(), null, 2));

    const pa11yCode = await runCommand(process.execPath, [pa11yBin, "--config", tempConfigPath]);
    cleanup();
    process.exit(pa11yCode);
  } catch (error) {
    cleanup();
    if (!startedServer && !(await canReach(targetUrl))) {
      console.error("Accessibility check failed before a local server became available.");
    }
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

await main();
