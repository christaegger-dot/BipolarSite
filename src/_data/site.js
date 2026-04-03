const primaryUrl = "https://bipolarsite.netlify.app";
const deployContext = process.env.CONTEXT || "development";

module.exports = {
  url: primaryUrl,
  title: "Bipolare Störung – Psychoedukation für Angehörige | PUK Zürich",
  org: "Psychiatrische Universitätsklinik Zürich",
  department: "Fachstelle Angehörigenarbeit",
  address: "Lenggstrasse 31, Postfach, 8032 Zürich",
  phone: "+41 58 384 38 00",
  noIndexDeploy: deployContext !== "production",
};
