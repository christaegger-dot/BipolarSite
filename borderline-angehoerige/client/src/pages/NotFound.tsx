import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <Layout>
      <SEO
        title="Seite nicht gefunden"
        description="Die gesuchte Seite existiert leider nicht."
        path="/404"
      />
      <div className="min-h-[70vh] w-full flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-sage-lighter rounded-full animate-pulse" />
                <AlertCircle className="relative h-16 w-16 text-sage-mid" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>

            <h2 className="text-xl font-normal text-foreground mb-4">
              Seite nicht gefunden
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Die gesuchte Seite existiert leider nicht.
              <br />
              Sie wurde möglicherweise verschoben oder gelöscht.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGoHome}
                className="bg-sage-mid hover:bg-sage-dark text-white px-6 py-2.5 rounded-lg transition-all duration-400 shadow-md hover:shadow-lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Zur Startseite
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
