export type SelbstfuersorgeKategorie =
  | "alle"
  | "erkennen"
  | "techniken"
  | "ressourcen";

export type SelbstfuersorgeInfografik = {
  id: string;
  title: string;
  desc: string;
  category: Exclude<SelbstfuersorgeKategorie, "alle">;
  webp: string;
  pdf: string;
  featured?: boolean;
};

export const selbstfuersorgeInfografiken: SelbstfuersorgeInfografik[] = [
  {
    id: "warnsignale",
    title: "Warnsignale der Überlastung",
    desc: "Ampel-Stufenmodell: Grün → Gelb → Rot – erkennen Sie rechtzeitig, wann es zu viel wird.",
    category: "erkennen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OEUNVdTyojBBYTic.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VdAxPxngFzgNImxg.pdf",
    featured: true,
  },
  {
    id: "sauerstoffmaske",
    title: "Die Sauerstoffmaske",
    desc: "Kreislauf-Diagramm: Teufelskreis vs. positiver Kreislauf – warum Selbstfürsorge keine Selbstsucht ist.",
    category: "erkennen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IQwhlqUMporMKdmH.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yIWenSfOeiUHdMIc.pdf",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz",
    desc: "2-Spalten-Vergleich: Was Radikale Akzeptanz NICHT ist vs. was sie IST, plus 4-Schritte-Übung.",
    category: "techniken",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OmxdguWaaXAkElDp.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SkBpjnDHfNmPbmnd.pdf",
  },
  {
    id: "stopp-technik",
    title: "Die STOPP-Technik",
    desc: "5 Schritte aus der Stressspirale: Stopp, Tief atmen, Orientieren, Perspektive, Plan – in 30 Sekunden.",
    category: "techniken",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qvJDZrQvvOlErFQu.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VnQKfkkQbPunhDed.pdf",
  },
  {
    id: "energie-konto",
    title: "Ihr Energie-Konto",
    desc: "Stock-&-Flow-Diagramm: Was füllt Ihre Batterie auf, was leert sie? Achten Sie auf die Balance.",
    category: "ressourcen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xqJbxqEDoAqplbhl.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gvhhnlTvDmgPHFUq.pdf",
  },
  {
    id: "erlaubnis-karte",
    title: "Erlaubnis-Karte",
    desc: "9 Erlaubnisse, die sich Angehörige oft nicht geben – gültig ab sofort, unbefristet.",
    category: "ressourcen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OMXnbczdvCPBRNTA.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DSOVugQyCvvOACIO.pdf",
  },
];
