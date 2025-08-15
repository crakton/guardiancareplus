import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
// import { Navbar } from './components/Navbar';
import AdminDashboard from "@/pages/AdminDashboard";
// import GuardianDashboard from '@/pages/GuardianDashboard';
import ClientDashboard from "@/pages/ClientDashboard";
import SupportWorkerDashboard from "@/pages/WorkerDashboard";
import ShiftsPage from "./pages/ShiftsPage";
import ShiftDetails from "./pages/ShiftDetails";
import NotFound from "@/pages/NotFound";
import ClientProfile from "./pages/ClientProfile";

// Define routes with role-based protection
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        {/* <Navbar /> */}
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/guardian",
  //   element: (
  //     <ProtectedRoute allowedRoles={['guardian']}>
  //       {/* <Navbar /> */}
  //       <GuardianDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/client",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        {/* <Navbar /> */}
        <ClientDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/worker",
    element: (
      <ProtectedRoute allowedRoles={["support-worker"]}>
        {/* <Navbar /> */}
        <SupportWorkerDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["worker", "client"]}>
            <ClientProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
