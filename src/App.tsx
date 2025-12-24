import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import AuthPage from "./pages/AuthPage";
import ModeSelectionPage from "./pages/ModeSelectionPage";
import PersonalOnboardingPage from "./pages/personal/PersonalOnboardingPage";
import PersonalLayout from "./pages/personal/PersonalLayout";
import PersonalHomePage from "./pages/personal/PersonalHomePage";
import AddTransactionPage from "./pages/personal/AddTransactionPage";
import BudgetPage from "./pages/personal/BudgetPage";
import AnalysisPage from "./pages/personal/AnalysisPage";
import ChatbotPage from "./pages/personal/ChatbotPage";
import ProfilePage from "./pages/personal/ProfilePage";
import BusinessOnboardingPage from "./pages/business/BusinessOnboardingPage";
import BusinessLayout from "./pages/business/BusinessLayout";
import BusinessDashboardPage from "./pages/business/BusinessDashboardPage";
import ProductsServicesPage from "./pages/business/ProductsServicesPage";
import AddBusinessEntryPage from "./pages/business/AddBusinessEntryPage";
import BusinessAnalysisPage from "./pages/business/BusinessAnalysisPage";
import BusinessChatbotPage from "./pages/business/BusinessChatbotPage";
import BusinessProfilePage from "./pages/business/BusinessProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/mode-selection" element={<ModeSelectionPage />} />
            
            {/* Personal Routes */}
            <Route path="/personal/onboarding" element={<PersonalOnboardingPage />} />
            <Route path="/personal" element={<PersonalLayout />}>
              <Route path="home" element={<PersonalHomePage />} />
              <Route path="add" element={<AddTransactionPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="chat" element={<ChatbotPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            {/* Business Routes */}
            <Route path="/business/onboarding" element={<BusinessOnboardingPage />} />
            <Route path="/business" element={<BusinessLayout />}>
              <Route path="dashboard" element={<BusinessDashboardPage />} />
              <Route path="products" element={<ProductsServicesPage />} />
              <Route path="add" element={<AddBusinessEntryPage />} />
              <Route path="analysis" element={<BusinessAnalysisPage />} />
              <Route path="chat" element={<BusinessChatbotPage />} />
              <Route path="profile" element={<BusinessProfilePage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
