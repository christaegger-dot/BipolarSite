import { FileText } from "lucide-react";

interface EvidenceSource {
  label: string;
  href?: string;
}

interface EvidenceNoteProps {
  title?: string;
  definition?: string;
  sources: EvidenceSource[];
  className?: string;
}

export default function EvidenceNote({
  title = "Quellen",
  definition,
  sources,
  className = "",
}: EvidenceNoteProps) {
  return (
    <aside
      className={`rounded-lg border border-border/60 bg-muted/20 p-4 ${className}`.trim()}
      aria-label={title}
    >
      <div className="flex items-start gap-2">
        <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {definition && (
            <p className="mt-1 text-xs text-muted-foreground">{definition}</p>
          )}
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {sources.map(source => (
              <li key={source.label}>
                {source.href ? (
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-foreground"
                  >
                    {source.label}
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
