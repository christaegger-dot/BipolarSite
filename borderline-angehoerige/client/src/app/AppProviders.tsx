import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MotionConfig } from "framer-motion";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}
