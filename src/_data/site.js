const sources = require("./sources");

const primaryUrl = "https://bipolarsite.netlify.app";
const deployContext = process.env.CONTEXT || "development";

module.exports = {
  url: primaryUrl,
  title: "Bipolare Störung – Psychoedukation für Angehörige | PUK Zürich",
  org: "Psychiatrische Universitätsklinik Zürich",
  department: "Fachstelle Angehörigenarbeit",
  address: "Lenggstrasse 31, Postfach, 8032 Zürich",
  email: "angehoerigenarbeit@pukzh.ch",
  sourcesPage: "/quellen/",
  noIndexDeploy: deployContext !== "production",
  contacts: sources.contacts,
  tel: sources.tel,
};
