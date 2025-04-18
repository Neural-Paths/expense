import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { setupDarkMode } from "@/lib/utils";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/UploadPage";
import ExpensesPage from "./pages/ExpensesPage";
import BudgetsPage from "./pages/BudgetsPage";
import ReportsPage from "./pages/ReportsPage";
import TaxPage from "./pages/TaxPage";
import SettingsPage from "./pages/SettingsPage";

// Auth Components
import AuthWrapper from "./components/auth/AuthWrapper";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup dark mode on component mount
    setupDarkMode();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthWrapper>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/budgets" element={<BudgetsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/tax" element={<TaxPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </AuthWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
