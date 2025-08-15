import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SetupChoicePage from "./pages/SetupChoicePage";
import AdminDashboard from "./pages/AdminDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerSetupPage from "./pages/WorkerSetupPage";
import ShiftsPage from "./pages/ShiftsPage";
import ShiftDetails from "./pages/ShiftDetails";
import NotFound from "./pages/NotFound";
import ClientProfile from "./pages/ClientProfile";
import ClientShifts from "./pages/ClientShifts";
import ClientShiftDetails from "./pages/ClientShiftDetails";
import WorkerProfile from "./pages/WorkerProfile";
import InviteManagementPage from "./pages/InviteManagementPage";
import AdminChat from "./pages/AdminChat";
import { Worker } from "./types/user.types";
import ClientsManagementPage from "./pages/ClientsManagementPage";
import WorkersManagementPage from "./pages/WorkersManagementPage";
import InviteDetailsPage from "./pages/InviteDetailsPage";
import InviteConfirmationPage from "./pages/InviteConfirmationPage";
import RateTimeBandManagementPage from "./pages/RateTimeBandManagementPage";
import { RateTimeBandDetailsPage } from "./components/admin/RateTimeBandDetails";
import { RateTimeBandForm } from "./components/admin/RateTimeBandForm";
import { ShiftDetailView } from "./components/admin/ShiftDetails";
import { ShiftsManagement } from "./components/admin/ShiftsManagement";
import TimesheetsManagement from "./components/admin/TimesheetsManagement";
import TimesheetDetail from "./components/admin/TimesheetDetail";
import BatchInvoicesPage from "./pages/BatchInvoicesPage";
import BatchInvoiceDetailPage from "./pages/BatchInvoiceDetailPage";
import AdminsManagementPage from "./pages/AdminsManagementPage";
import ServiceTypesManagementPage from "./pages/ServiceTypesManagementPage";
import ServiceTypeDetailPage from "./pages/ServiceTypeDetailPage";
import HouseholdsPage from "./pages/HouseholdsPage";
import ClientHouseholdsPage from "./pages/ClientHouseholdsPage";
import HouseholdDetailsPage from "./pages/HouseholdDetailsPage";

import ClientTimesheets from "./pages/ClientTimesheets";
import ClientTimesheetDetails from "./pages/ClientTimesheetDetails";
import WorkerTimesheets from "./pages/WorkerTimesheets";
import WorkerTimesheetDetails from "./pages/WorkerTimesheetDetails";
import AdminAnalyticsDashboard from "./pages/AdminAnalyticsDashboard";

import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ChatsList from "./pages/ChatsList";
import { ChatProvider } from "./contexts/ChatContext";
import IncidentAdminDashboard from "./pages/IncidentsPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Helper to redirect to the appropriate dashboard based on user role
  const getDefaultRoute = () => {
    if (!user) return "/login";

    switch (user.role) {
      case "admin":
        return "/admin";
      // case "guardian":
      //   return "/guardian";
      case "client":
        return "/client";
      case "worker":
        return "/worker";
      default:
        return "/login";
    }
  };

  return (
    <Routes>
      {/* Landing Page - root route */}
      <Route
        path="/"
        element={
          user ? <Navigate to={getDefaultRoute()} replace /> : <LandingPage />
        }
      />

      {/* Public routes */}
      <Route
        path="/login"
        element={user ? <Navigate to={getDefaultRoute()} replace /> : <Login />}
      />

      <Route
        path="/register"
        element={
          user && user.isEmailVerified ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (
            <Register />
          )
        }
      />

      {/* Password reset routes */}
      <Route
        path="/forgot-password"
        element={
          user ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (
            <ForgotPassword />
          )
        }
      />
      <Route
        path="/reset-password"
        element={
          user ? <Navigate to={getDefaultRoute()} replace /> : <ResetPassword />
        }
      />

      {/* Setup Choice Page - for newly registered workers */}
      <Route
        path="/setup-choice"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role !== "worker" ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (user as Worker).verificationStatus?.profileSetupComplete ? (
            <Navigate to="/worker" replace />
          ) : (
            <SetupChoicePage />
          )
        }
      />

      {/*  Worker Setup Route - accessible but not mandatory */}
      <Route
        path="/worker-setup"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role !== "worker" ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (
            <WorkerSetupPage />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <Routes>
                {/* <Route path="/" element={<AdminDashboard />} /> */}
                <Route path="/" element={<AdminAnalyticsDashboard />} />
                {/* <Route path="/analytics" element={<AdminAnalyticsDashboard />} /> */}
                <Route path="/invites" element={<InviteManagementPage />} />
                <Route
                  path="/invites/:inviteId/details"
                  element={<InviteDetailsPage />}
                />
                <Route
                  path="/invites/:inviteId/confirm"
                  element={<InviteConfirmationPage />}
                />
                <Route
                  path="/rate-time-band"
                  element={<RateTimeBandManagementPage />}
                />
                <Route
                  path="/rate-time-band/create"
                  element={<RateTimeBandForm />}
                />
                <Route
                  path="/rate-time-band/:id/view"
                  element={<RateTimeBandDetailsPage />}
                />
                <Route
                  path="/rate-time-band/:id/edit"
                  element={<RateTimeBandForm />}
                />
                <Route path="/all-admin" element={<AdminsManagementPage />} />
                <Route path="/clients" element={<ClientsManagementPage />} />
                <Route path="/workers" element={<WorkersManagementPage />} />
                <Route path="/shifts" element={<ShiftsManagement />} />
                <Route path="/shifts/:id" element={<ShiftDetailView />} />
                <Route path="/timesheets" element={<TimesheetsManagement />} />
                <Route path="/timesheets/:id" element={<TimesheetDetail />} />
                <Route path="/batch-invoices" element={<BatchInvoicesPage />} />
                <Route
                  path="/batch-invoices/:id"
                  element={<BatchInvoiceDetailPage />}
                />
                <Route
                  path="/service-types"
                  element={<ServiceTypesManagementPage />}
                />
                <Route
                  path="/service-types/:id"
                  element={<ServiceTypeDetailPage />}
                />
                <Route path="/incidents" element={<IncidentAdminDashboard />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/chat/:workerId" element={<AdminChat />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/guardian/*"
        element={
          <ProtectedRoute allowedRoles={["guardian", "admin"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<GuardianDashboard />} />
                <Route path="/incidents" element={<IncidentAdminDashboard />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/chat/:workerId" element={<AdminChat />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/*"
        element={
          <ProtectedRoute allowedRoles={["client", "admin"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<ClientDashboard />} />
                <Route path="/profile" element={<ClientProfile />} />
                <Route path="/shifts" element={<ClientShifts />} />
                <Route
                  path="/shifts/:shiftId"
                  element={<ClientShiftDetails />}
                />
                <Route path="/households" element={<ClientHouseholdsPage />} />
                <Route
                  path="/households/:id"
                  element={<HouseholdDetailsPage />}
                />
                <Route path="/timesheets" element={<ClientTimesheets />} />
                <Route
                  path="/timesheets/:id"
                  element={<ClientTimesheetDetails />}
                />
                <Route path="/incidents" element={<IncidentAdminDashboard />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/chat/:workerId" element={<AdminChat />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/worker/*"
        element={
          <ProtectedRoute allowedRoles={["worker", "admin"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<WorkerDashboard />} />
                <Route path="/shifts" element={<ShiftsPage />} />
                <Route path="/shifts/:shiftId" element={<ShiftDetails />} />
                <Route path="/households" element={<HouseholdsPage />} />
                <Route
                  path="/households/:id"
                  element={<HouseholdDetailsPage />}
                />
                <Route path="/profile" element={<WorkerProfile />} />
                <Route path="/timesheets" element={<WorkerTimesheets />} />
                <Route
                  path="/timesheets/:id"
                  element={<WorkerTimesheetDetails />}
                />
                <Route path="/incidents" element={<IncidentAdminDashboard />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/chat/:workerId" element={<AdminChat />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <ChatProvider>
              <AppRoutes />
            </ChatProvider>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
