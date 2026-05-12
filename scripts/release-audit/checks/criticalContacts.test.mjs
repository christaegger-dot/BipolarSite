import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  comparableSwissPhone,
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
});
