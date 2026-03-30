export type VerstehenKategorie = "alle" | "grundlagen" | "neurobiologie";

export type VerstehenInfografik = {
  id: string;
  title: string;
  description: string;
  category: Exclude<VerstehenKategorie, "alle">;
  webpUrl: string;
  pdfUrl: string;
  alt: string;
  featured?: boolean;
};

export const verstehenInfografiken: VerstehenInfografik[] = [
  {
    id: "leuchtturm",
    title: "Der Leuchtturm",
    description: "Ihre Rolle als Angehörige/r: Stabil bleiben trotz Sturm.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
    alt: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    featured: true,
  },
  {
    id: "eisberg",
    title: "Der Eisberg",
    description:
      "Wut ist oft nur die Spitze – darunter liegen Schmerz und Angst.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MLLwefeyaKvtThbK.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RNKtfQQMvhlSyiIp.pdf",
    alt: "Der Eisberg – Wut ist oft die Spitze",
  },
  {
    id: "spaltung",
    title: "Spaltung",
    description: "Das Pendel zwischen Extremen – die Grauzone stärken.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WRORriPmZftmvKTL.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RtdVgflJuCNAhEKk.pdf",
    alt: "Spaltung – das Pendel zwischen Extremen",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Erst beruhigen, dann klären – warum Logik manchmal nicht ankommt.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sSUJoOUTiuWgrkiZ.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tlKAOpYHdCNAtovE.pdf",
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "4-phasen",
    title: "Der 4-Phasen-Zyklus",
    description: "Das vorhersehbare Muster – Krisen folgen oft einem Ablauf.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BYDbBJaIhetrjHRq.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PBYpNxZamAxjOHYd.pdf",
    alt: "Der 4-Phasen-Zyklus",
  },
  {
    id: "gehirn",
    title: "Das Gehirn verstehen",
    description:
      "Neurobiologie einfach erklärt – warum Stress Denken blockiert.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ImASzOTHYdFpxOUI.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NViSBQtRBvGWOHPE.pdf",
    alt: "Das Gehirn verstehen",
  },
];
