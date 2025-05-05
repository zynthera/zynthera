import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SecurityProvider } from "@/components/SecurityProvider";
import { SecurityHelmet } from "@/components/SecurityHelmet";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <SecurityProvider>
          <SecurityHelmet />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Catch-all route added to handle unknown paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SecurityProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
