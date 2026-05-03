const sources = require("./sources");

const primaryUrl = "https://bipolarsite.netlify.app";
const deployContext = process.env.CONTEXT || "development";
const contentReviewed = "2026-05-01";
const contactsReviewed = "2026-05-01";

const formatReviewedDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Zurich",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

module.exports = {
  url: primaryUrl,
  title: "Bipolare Störung – Psychoedukation für Angehörige | PUK Zürich",
  org: "Psychiatrische Universitätsklinik Zürich",
  department: "Fachstelle Angehörigenarbeit",
  address: "Lenggstrasse 31, Postfach, 8032 Zürich",
  email: "angehoerigenarbeit@pukzh.ch",
  sourcesPage: "/quellen/",
  lastReviewed: contentReviewed,
  contentReviewed,
  contentReviewedDisplay: formatReviewedDate(contentReviewed),
  contactsReviewed,
  contactsReviewedDisplay: formatReviewedDate(contactsReviewed),
  noIndexDeploy: deployContext !== "production",
  contacts: sources.contacts,
  tel: sources.tel,
};
