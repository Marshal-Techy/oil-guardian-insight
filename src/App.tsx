
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboard/Admin";
import OperatorDashboard from "./pages/Dashboard/Operator";
import PredictiveMaintenance from "./pages/Dashboard/Predictive";
import EquipmentDetails from "./pages/Dashboard/EquipmentDetails";
import Alerts from "./pages/Alerts";
import Industries from "./pages/Industries";
import Settings from "./pages/Settings";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/operator" element={<OperatorDashboard />} />
            <Route path="/dashboard/predictive" element={<PredictiveMaintenance />} />
            <Route path="/equipment/:id" element={<EquipmentDetails />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
