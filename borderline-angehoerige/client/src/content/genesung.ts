export type GenesungKategorie = "alle" | "verstehen" | "handeln";

export const genesungCategories = [
  { id: "alle", label: "Alle" },
  { id: "verstehen", label: "Verstehen" },
  { id: "handeln", label: "Handeln" },
] as const;

export const genesungItems = [
  {
    title: "Genesung in Zahlen",
    desc: "Orientierungs-Tracker mit Langzeitdaten",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tyFTHNjsUagqrXiS.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MunlHDCNqnsOhBFn.pdf",
    category: "verstehen",
  },
  {
    title: "Das Fortschritt-Paradox",
    desc: "Warum Rückfälle zum Weg gehören",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DPkqytVYFcreeBlC.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UFLdEEGIDxKdRUZO.pdf",
    category: "verstehen",
  },
  {
    title: "Remission vs. Heilung",
    desc: "Was Besserung wirklich bedeutet",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HPRsNmCUFirjnraj.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KMjqRDjDjWVZpjhJ.pdf",
    category: "verstehen",
  },
  {
    title: "5 Faktoren, die Genesung fördern",
    desc: "Säulen-Modell: Was positiv beeinflusst",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mFhtxtPMBkCEVPII.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qgrRYtMKOvwWmuah.pdf",
    category: "handeln",
  },
  {
    title: "Ihre Rolle im Genesungsprozess",
    desc: "Was Sie tun können (und was nicht)",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GhgPDkJhqlqJkYzE.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/CZdiDaadpIWNOBFb.pdf",
    category: "handeln",
  },
] as const;
