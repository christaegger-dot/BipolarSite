import { RefreshCw } from "lucide-react";

interface LastVerifiedBadgeProps {
  date: string;
  className?: string;
}

export default function LastVerifiedBadge({
  date,
  className = "",
}: LastVerifiedBadgeProps) {
  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground ${className}`.trim()}
    >
      <RefreshCw className="h-3.5 w-3.5" />
      Zuletzt verifiziert: {date}
    </p>
  );
}
