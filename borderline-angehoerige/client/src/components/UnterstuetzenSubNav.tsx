import { Link, useLocation } from "wouter";
import { LayoutGrid, Calendar, AlertTriangle, Brain } from "lucide-react";

const tabs = [
  { href: "/unterstuetzen/uebersicht", label: "Übersicht", icon: LayoutGrid },
  { href: "/unterstuetzen/alltag", label: "Im Alltag", icon: Calendar },
  { href: "/unterstuetzen/krise", label: "In der Krise", icon: AlertTriangle },
  { href: "/unterstuetzen/therapie", label: "Therapie", icon: Brain },
];

export default function UnterstuetzenSubNav() {
  const [location] = useLocation();

  return (
    <nav
      aria-label="Unterstützen – Unterseiten"
      className="border-b border-border/50 bg-background"
    >
      <div className="container">
        <div className="flex overflow-x-auto -mb-px">
          {tabs.map(({ href, label, icon: Icon }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  isActive
                    ? "border-sage-dark text-sage-dark"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
