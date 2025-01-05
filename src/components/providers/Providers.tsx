import ThemeProvider from "@/components/providers/ThemeProvider";
import Toaster from "@/components/providers/Toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
      <SpeedInsights />
    </ThemeProvider>
  );
}
