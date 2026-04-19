const primaryUrl = "https://bipolarsite.netlify.app";
const deployContext = process.env.CONTEXT || "development";

module.exports = {
  url: primaryUrl,
  title: "Bipolare Störung – Psychoedukation für Angehörige | PUK Zürich",
  org: "Psychiatrische Universitätsklinik Zürich",
  department: "Fachstelle Angehörigenarbeit",
  address: "Lenggstrasse 31, Postfach, 8032 Zürich",
  email: "angehoerigenarbeit@pukzh.ch",
  noIndexDeploy: deployContext !== "production",

  /** Zentrale Telefonnummern — einmal pflegen, überall nutzen.
   *  Template-Zugriff: {{ site.tel.fachstelle.href }} / {{ site.tel.fachstelle.display }}
   *  Notfall-Nummern (144, 117, 143) bleiben hardcoded — ändern sich nie. */
  tel: {
    fachstelle:   { href: "tel:+41583843800", display: "058\u00A0384\u00A038\u00A000", label: "Fachstelle Angehörigenarbeit PUK" },
    aerztefon:    { href: "tel:+41800336655",  display: "0800\u00A033\u00A066\u00A055", label: "Ärztefon – Notfalldienst ZH" },
    pukNotfall:   { href: "tel:+41583842000",  display: "058\u00A0384\u00A020\u00A000", label: "PUK Zürich — Notfall Erwachsene" },
    pukKinder:    { href: "tel:+41583846666",  display: "058\u00A0384\u00A066\u00A066", label: "PUK Zürich — Kinder/Jugendliche" },
    proMenteSana: { href: "tel:+41848800858",  display: "0848\u00A0800\u00A0858",  label: "Pro Mente Sana" },
    vask:         { href: "tel:+41442404868",  display: "044\u00A0240\u00A048\u00A068", label: "VASK Zürich" },
    selbsthilfe:  { href: "tel:+41432888888",  display: "043\u00A0288\u00A088\u00A088", label: "Selbsthilfe Zürich" },
    opferhilfe:   { href: "tel:+41442994050",  display: "044\u00A0299\u00A040\u00A050", label: "Opferhilfe Zürich" },
  },
};
