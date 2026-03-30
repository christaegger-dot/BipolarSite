import { Card, CardContent } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import type { Material } from "@/content/materials";

interface MaterialCardProps {
  item: Material;
  onPreview: (image: string, title: string) => void;
}

export default function MaterialCard({ item, onPreview }: MaterialCardProps) {
  const previewSrc = item.isHtml ? (item.previewUrl ?? item.url) : item.url;
  const openHref = item.downloadUrl ?? item.url;
  const downloadHref = item.pdfUrl ?? item.downloadUrl;
  const isCrossOriginDownload =
    !!downloadHref &&
    /^https?:\/\//i.test(downloadHref) &&
    !downloadHref.startsWith(window.location.origin);

  return (
    <Card className="h-full hover:shadow-lg transition-all hover:border-sage-mid/30 overflow-hidden">
      <button
        type="button"
        className="relative aspect-[4/3] bg-muted overflow-hidden group w-full"
        onClick={() => {
          if (item.isHtml) {
            window.open(openHref, "_blank");
          } else {
            onPreview(item.url, item.title);
          }
        }}
        aria-label={`${item.title} öffnen`}
      >
        <img
          src={previewSrc}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={300}
          decoding="async"
        />
        <div className="absolute top-2 left-2 bg-background/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-sage-dark">
          {item.kind}
        </div>
      </button>
      <CardContent className="p-5">
        <h3 className="font-semibold text-foreground mb-2 text-lg">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        <div className="flex gap-2 flex-wrap">
          <a
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 bg-sage-dark hover:bg-sage-dark/90 text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Öffnen
          </a>
          {downloadHref ? (
            <a
              href={downloadHref}
              download={isCrossOriginDownload ? undefined : ""}
              target={isCrossOriginDownload ? "_blank" : undefined}
              rel={isCrossOriginDownload ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 border border-sage-dark text-sage-dark hover:bg-sage-light/40 transition-colors"
            >
              <Download className="w-4 h-4" />
              {isCrossOriginDownload ? "PDF ansehen" : "Herunterladen"}
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
