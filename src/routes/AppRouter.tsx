import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmailPage from "../pages/VerifyEmail";
import LoginPage from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import MyOrganizations from "@/pages/MyOrganizations";
import MemberOrganizationView from "@/pages/MemberOrganizationView";
import BulkUpload from "@/pages/BulkUpload";
import OrganizationDashboard from "@/pages/OrganizationDashboard";
import MemberOrganizations from "@/pages/MemberOrganizations";

import RedirectHandler from "@/components/RedirectHandler";


export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
    <Route path="/register" element={<Register/>} />
    <Route path="/verify-email" element={<VerifyEmailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<DashboardLayout><MyOrganizations /></DashboardLayout>} />
    <Route path="/member-organizations" element={<DashboardLayout><MemberOrganizations /></DashboardLayout>} />
    <Route path="/bulk-upload" element={<DashboardLayout><BulkUpload /></DashboardLayout>} />
    <Route path="/dashboard/:slug" element={<DashboardLayout><OrganizationDashboard /></DashboardLayout>} />
    <Route path="/member/:slug" element={<DashboardLayout><MemberOrganizationView /></DashboardLayout>} />
    <Route path="/" element={<DashboardLayout><MyOrganizations /></DashboardLayout>} />
    <Route path="/:orgSlug/:slug" element={<RedirectHandler />} />






    </Routes>
  </BrowserRouter>
);