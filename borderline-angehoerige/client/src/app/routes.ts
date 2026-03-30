import { lazy } from "react";
import type { RouteComponentProps } from "wouter";

export interface AppRoute {
  path: string;
  component?: React.ComponentType<RouteComponentProps>;
  redirectTo?: string;
}

// lazily load pages
const Home = lazy(() => import("@/pages/Home"));
const Verstehen = lazy(() => import("@/pages/Verstehen"));
const UnterstuetzenUebersicht = lazy(
  () => import("@/pages/UnterstuetzenUebersicht")
);
const UnterstuetzenAlltag = lazy(() => import("@/pages/UnterstuetzenAlltag"));
const UnterstuetzenTherapie = lazy(
  () => import("@/pages/UnterstuetzenTherapie")
);
const UnterstuetzenKrise = lazy(() => import("@/pages/UnterstuetzenKrise"));
const Kommunizieren = lazy(() => import("@/pages/Kommunizieren"));
const Grenzen = lazy(() => import("@/pages/Grenzen"));
const Selbstfuersorge = lazy(() => import("@/pages/Selbstfuersorge"));
const Soforthilfe = lazy(() => import("@/pages/Soforthilfe"));
const Materialien = lazy(() => import("@/pages/Materialien"));
const SelbsttestPage = lazy(() => import("@/pages/SelbsttestPage"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));
const Genesung = lazy(() => import("@/pages/Genesung"));
const Selbsthilfegruppen = lazy(() => import("@/pages/Selbsthilfegruppen"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const Glossar = lazy(() => import("@/pages/Glossar"));
const Buchempfehlungen = lazy(() => import("@/pages/Buchempfehlungen"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const UeberUns = lazy(() => import("@/pages/UeberUns"));
const Fachstelle = lazy(() => import("@/pages/Fachstelle"));
const Notfallkarte = lazy(() => import("@/pages/Notfallkarte"));
const Wegweiser = lazy(() => import("@/pages/Wegweiser"));
const Uebungsszenarien = lazy(() => import("@/pages/Uebungsszenarien"));
const Quellen = lazy(() => import("@/pages/Quellen"));

export const routes: AppRoute[] = [
  { path: "/", component: Home },
  { path: "/verstehen", component: Verstehen },
  { path: "/unterstuetzen", redirectTo: "/unterstuetzen/uebersicht" },
  { path: "/unterstuetzen/uebersicht", component: UnterstuetzenUebersicht },
  { path: "/unterstuetzen/alltag", component: UnterstuetzenAlltag },
  { path: "/unterstuetzen/therapie", component: UnterstuetzenTherapie },
  { path: "/unterstuetzen/krise", component: UnterstuetzenKrise },
  { path: "/kommunizieren", component: Kommunizieren },
  { path: "/grenzen", component: Grenzen },
  { path: "/selbstfuersorge", component: Selbstfuersorge },
  { path: "/soforthilfe", component: Soforthilfe },
  { path: "/notfall", redirectTo: "/soforthilfe" },
  { path: "/materialien", component: Materialien },
  { path: "/selbsttest", component: SelbsttestPage },
  { path: "/impressum", component: Impressum },
  { path: "/datenschutz", component: Datenschutz },
  { path: "/genesung", component: Genesung },
  { path: "/beratung", component: Selbsthilfegruppen },
  { path: "/selbsthilfegruppen", redirectTo: "/beratung" },
  { path: "/feedback", component: Feedback },
  { path: "/glossar", component: Glossar },
  { path: "/buchempfehlungen", component: Buchempfehlungen },
  {
    path: "/therapieangebote",
    redirectTo: "/unterstuetzen/therapie#therapieangebote",
  },
  { path: "/faq", component: FAQ },
  { path: "/ueber-uns", component: UeberUns },
  { path: "/fachstelle", component: Fachstelle },
  { path: "/notfallkarte", component: Notfallkarte },
  { path: "/wegweiser", component: Wegweiser },
  { path: "/uebungen", component: Uebungsszenarien },
  { path: "/quellen", component: Quellen },
];
