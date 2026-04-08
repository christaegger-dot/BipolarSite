const primaryUrl = "https://bipolarsite.netlify.app";
const deployContext = process.env.CONTEXT || "development";

module.exports = {
  url: primaryUrl,
  title: "Bipolare Störung – Psychoedukation für Angehörige | PUK Zürich",
  org: "Psychiatrische Universitätsklinik Zürich",
  department: "Fachstelle Angehörigenarbeit",
  address: "Lenggstrasse 31, Postfach, 8032 Zürich",
  phone: "+41 58 384 38 00",
  email: "angehoerigenarbeit@pukzh.ch",
  noIndexDeploy: deployContext !== "production",

  /** Zentrale Telefonnummern — einmal pflegen, überall nutzen.
   *  Template-Zugriff: {{ site.tel.fachstelle.href }} / {{ site.tel.fachstelle.display }}
   *  Notfall-Nummern (144, 117, 143) bleiben hardcoded — ändern sich nie. */
  tel: {
    fachstelle:   { href: "tel:+41583843800", display: "058 384 38 00", label: "Fachstelle Angehörigenarbeit PUK" },
    aerztefon:    { href: "tel:+41800336655",  display: "0800 33 66 55", label: "Ärztefon – Notfalldienst ZH" },
    pukNotfall:   { href: "tel:+41583842000",  display: "058 384 20 00", label: "PUK Zürich — Notfall Erwachsene" },
    pukKinder:    { href: "tel:+41583846666",  display: "058 384 66 66", label: "PUK Zürich — Kinder/Jugendliche" },
    proMenteSana: { href: "tel:+41848800858",  display: "0848 800 858",  label: "Pro Mente Sana" },
    vask:         { href: "tel:+41442404868",  display: "044 240 48 68", label: "VASK Zürich" },
    selbsthilfe:  { href: "tel:+41432888888",  display: "043 288 88 88", label: "Selbsthilfe Zürich" },
    opferhilfe:   { href: "tel:+41442994050",  display: "044 299 40 50", label: "Opferhilfe Zürich" },
  },
};
