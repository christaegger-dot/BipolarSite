import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const repoRoot = process.cwd();
const requireFromHere = createRequire(import.meta.url);
const httpServerBin = requireFromHere.resolve("http-server/bin/http-server");
const pa11yBin = requireFromHere.resolve("pa11y-ci/bin/pa11y-ci.js");
const baseConfigPath = path.join(repoRoot, ".pa11yci.json");

function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function canReach(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    return response.status < 500;
  } catch {
    return false;
  }
}

function canBindPort(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(Number(port), "127.0.0.1");
  });
}

async function resolveA11yPort() {
  if (process.env.A11Y_PORT) {
    if (!(await canBindPort(process.env.A11Y_PORT))) {
      throw new Error(`A11Y_PORT ${process.env.A11Y_PORT} is already in use.`);
    }
    return process.env.A11Y_PORT;
  }

  for (let port = 8080; port <= 8180; port += 1) {
    if (await canBindPort(port)) {
      return String(port);
    }
  }

  throw new Error("Could not find a free local port for the accessibility check.");
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await canReach(url)) return;
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
      env: { ...process.env, ...(options.env || {}) },
    });
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

function resolvePlaywrightChromium() {
  try {
    const { chromium } = requireFromHere("@playwright/test");
    const executablePath = chromium.executablePath();
    if (executablePath) return executablePath;
  } catch {
    // handled below with actionable message
  }
  return null;
}

async function ensurePlaywrightChromium() {
  const existing = resolvePlaywrightChromium();
  if (existing) return existing;

  const installCode = await runCommand(process.execPath, [requireFromHere.resolve("playwright/cli"), "install", "chromium"]);
  if (installCode !== 0) {
    throw new Error("Failed to install Playwright Chromium. Run: npx playwright install --with-deps chromium");
  }

  return resolvePlaywrightChromium();
}

async function buildPa11yConfig(targetUrl) {
  const config = JSON.parse(readFileSync(baseConfigPath, "utf8"));
  const executablePath = await ensurePlaywrightChromium();
  if (!executablePath) {
    throw new Error(
      "No Playwright Chromium executable found. Run: npx playwright install --with-deps chromium"
    );
  }

  config.defaults = config.defaults || {};
  config.defaults.chromeLaunchConfig = {
    ...(config.defaults.chromeLaunchConfig || {}),
    executablePath,
  };
  const baseUrl = new URL(targetUrl);
  config.urls = (config.urls || []).map((url) => {
    const configuredUrl = new URL(url);
    return new URL(`${configuredUrl.pathname}${configuredUrl.search}${configuredUrl.hash}`, baseUrl).toString();
  });
  return config;
}

async function main() {
  let startedServer = false;
  let serverProcess = null;
  let tempDir = null;
  let targetUrl = null;

  const cleanup = () => {
    if (serverProcess && !serverProcess.killed) serverProcess.kill("SIGTERM");
    if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  };

  try {
    const buildCode = await runCommand(npmCommand(), ["run", "build"], {
      env: { CONTEXT: "production" },
    });
    if (buildCode !== 0) process.exit(buildCode);

    const port = await resolveA11yPort();
    targetUrl = `http://127.0.0.1:${port}/`;

    serverProcess = spawn(process.execPath, [httpServerBin, "_site", "-p", port, "--silent"], {
      cwd: repoRoot,
      stdio: "ignore",
    });
    startedServer = true;
    await waitForServer(targetUrl);

    tempDir = mkdtempSync(path.join(os.tmpdir(), "bipolarsite-pa11y-"));
    const tempConfigPath = path.join(tempDir, "pa11yci.json");
    writeFileSync(tempConfigPath, JSON.stringify(await buildPa11yConfig(targetUrl), null, 2));

    const pa11yCode = await runCommand(process.execPath, [pa11yBin, "--config", tempConfigPath]);
    cleanup();
    process.exit(pa11yCode);
  } catch (error) {
    cleanup();
    if (!startedServer && targetUrl && !(await canReach(targetUrl))) {
      console.error("Accessibility check failed before a local server became available.");
    }
    console.error(
      "If Chromium fails to launch on Linux, install runtime deps with: npx playwright install --with-deps chromium"
    );
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

await main();
