import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmailPage from "../pages/VerifyEmail";
import LoginPage from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardPage from "../pages/Dashboard";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
    <Route path="/register" element={<Register/>} />
    <Route path="/verify-email" element={<VerifyEmailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />





    </Routes>
  </BrowserRouter>
);