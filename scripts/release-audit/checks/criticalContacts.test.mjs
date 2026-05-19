import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  comparableSwissPhone,
  fetchExternalUrl,
  findEmergencyNumberPolicyViolations,
  isAllowedExternalStatus,
  isValidEmail,
} from "./criticalContacts.mjs";

describe("critical contact audit helpers", () => {
  it("compares Swiss tel hrefs with visible local phone numbers", () => {
    assert.equal(comparableSwissPhone("+41583843800"), comparableSwissPhone("058 384 38 00"));
    assert.equal(comparableSwissPhone("+41848800858"), comparableSwissPhone("0848 800 858"));
    assert.equal(comparableSwissPhone("143"), comparableSwissPhone("143"));
    assert.notEqual(comparableSwissPhone("+41583843800"), comparableSwissPhone("058 384 38 01"));
  });

  it("keeps the external contact reachability policy explicit", () => {
    assert.equal(isAllowedExternalStatus(200), true);
    assert.equal(isAllowedExternalStatus(302), true);
    assert.equal(isAllowedExternalStatus(403), true);
    assert.equal(isAllowedExternalStatus(429), true);
    assert.equal(isAllowedExternalStatus(500), false);
  });

  it("validates centrally maintained contact email shape", () => {
    assert.equal(isValidEmail("angehoerigenarbeit@pukzh.ch"), true);
    assert.equal(isValidEmail("angehoerigenarbeit@pukzh"), false);
    assert.equal(isValidEmail("not an email"), false);
  });

  it("keeps emergency numbers out of normal content pages", () => {
    const findings = findEmergencyNumberPolicyViolations([
      { url: "/notfall/", html: "<p>Bei akuter Gefahr 144.</p>" },
      { url: "/anlaufstellen/", html: "<p>Dargebotene Hand 143.</p>" },
      { url: "/quellen/", html: "<main><p>Dargebotene Hand 143.</p></main>" },
      { url: "/tools/krisenplan/", html: "<main><p>Bevorzugte Klinik: 058 384 20 00.</p></main>" },
      { url: "/modul/1/", html: "<p>Bei akuter Gefahr 144.</p>" },
      { url: "/modul/2/", html: "<main><p>Bei akuter Suizidgefahr 0800 33 66 55.</p></main>" },
      { url: "/modul/3/", html: "<main><p>Kontaktieren Sie in einer Krise 143.</p></main><footer>144</footer>" },
      { url: "/materialien/", html: "<script>const hidden = '144';</script><p>Keine Nummer sichtbar.</p>" },
      { url: "/module/", html: "<main><p>Rufen Sie bei Fragen 144 an.</p></main>" },
    ]);

    assert.equal(findings.length, 1);
    assert.match(findings[0].message, /\/module\//);
  });

  it("falls back to GET when HEAD fails for a critical contact URL", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push(options.method);
      if (options.method === "HEAD") {
        throw new Error("transient HEAD failure");
      }
      return { status: 200, url };
    };

    const result = await fetchExternalUrl("https://example.test/contact", {
      fetchImpl,
      retryDelayMs: 0,
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, 200);
    assert.equal(result.attempts, 1);
    assert.deepEqual(calls, ["HEAD", "GET"]);
  });

  it("retries transient contact fetch failures before failing the release gate", async () => {
    let callCount = 0;
    const fetchImpl = async (url) => {
      callCount += 1;
      if (callCount <= 2) {
        throw new Error("fetch failed");
      }
      return { status: 200, url };
    };

    const result = await fetchExternalUrl("https://example.test/contact", {
      attempts: 2,
      fetchImpl,
      retryDelayMs: 0,
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, 200);
    assert.equal(result.attempts, 2);
    assert.equal(callCount, 3);
  });
});
