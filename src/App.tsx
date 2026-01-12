import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Personnel from "./pages/Personnel";
import ProcurementPortal from "./pages/ProcurementPortal";
import ProcurementDashboard from "./pages/ProcurementDashboard";
import AdminPanel from "./pages/AdminPanel";
import Departments from "./pages/Departments";
import ContractOwnerManagement from "@/components/contractOwners/ContractOwnerManagement";
import NotFound from "./pages/NotFound";
import InternalLanding from "./pages/InternalLanding";
import VendorLanding from "./pages/VendorLanding";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/internal" element={<InternalLanding />} />
          <Route path="/vendor" element={<VendorLanding />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="admin/vendors" element={
            <ProtectedRoute>
              <Vendors />
            </ProtectedRoute>
          } />
          <Route path="/personnel" element={
            <ProtectedRoute>
              <Personnel />
            </ProtectedRoute>
          } />
          <Route path="/procurement" element={<ProcurementPortal />} />
          <Route path="/procurement/dashboard" element={
            <ProtectedRoute>
              <ProcurementDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/admin/contract-owners" element={
            <ProtectedRoute>
              <DashboardLayout role="admin" userName="Admin User">
                <ContractOwnerManagement />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/departments" element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
