import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { ContentsListPage } from "./pages/ContentsListPage";
import { ContentEditPage } from "./pages/ContentEditPage";

function ProtectedRoute({ children }: Readonly<{ children: ReactNode }>) {
    const { authenticated } = useAuth();
    if (authenticated === null) return <p>Chargement...</p>;
    if (!authenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <ContentsListPage />
                    </ProtectedRoute>
                }
            />
            {/* Handles both /contents/new and /contents/:id — ContentEditPage
                special-cases id === "new". */}
            <Route
                path="/contents/:id"
                element={
                    <ProtectedRoute>
                        <ContentEditPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}
