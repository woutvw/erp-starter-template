import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import { JSX } from "react";
import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";

function ProtectedRoute({ children }: {children: JSX.Element}) {
    const isAuthenticated = Boolean(localStorage.getItem('token')); // or your auth logic
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App(){
    return (
        <Router>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/recover-password" element={<RecoverPassword/>}/>
                </Route>
                <Route element={
                    <ProtectedRoute>
                        <DashboardLayout/>
                    </ProtectedRoute>
                    }>
                    <Route path="/" element={<Login/>}/>
                </Route>
            </Routes>
        </Router>
    )
}