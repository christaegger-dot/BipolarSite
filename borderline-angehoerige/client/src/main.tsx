import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  document.body.textContent =
    "Anwendung konnte nicht gestartet werden. Bitte Seite neu laden.";
  throw new Error("#root element not found");
}
createRoot(root).render(<App />);

const fallbackShell = document.getElementById("fallback-shell");
if (fallbackShell) {
  fallbackShell.remove();
}
document.body.setAttribute("data-app-ready", "true");
