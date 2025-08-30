import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import { JSX } from "react";
import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";
import { useAuth } from "./context/AuthContext";
import ClientList from "./pages/clients/Index";
import ClientCreate from "./pages/clients/Create";
import ClientView from "./pages/clients/View";

function ProtectedRoute({ children }: {children: JSX.Element}) {
    const { accessToken } = useAuth();

    return accessToken ? children : <Navigate to="/login" replace />;
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
                    <Route path="/" element={<p>home</p>}/>
                    <Route path="/clients" element={<ClientList/>}/>
                    <Route path="/clients/create" element={<ClientCreate/>}/>
                    <Route path="/clients/:id" element={<ClientView/>}/>
                    <Route path="/stock" element={<p>stock</p>}/>
                </Route>
            </Routes>
        </Router>
    )
}