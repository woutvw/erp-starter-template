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
import ProductList from "./pages/products/Index";
import ProductView from "./pages/products/View";
import ProductCreate from "./pages/products/Create";
import SupplierList from "./pages/suppliers/Index";
import SupplierView from "./pages/suppliers/View";

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
                    <Route path="/suppliers" element={<SupplierList/>}/>
                    <Route path="/suppliers/:id" element={<SupplierView/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/products/create" element={<ProductCreate/>}/>
                    <Route path="/products/:id" element={<ProductView/>}/>
                    <Route path="/orders" element={<p>Orders</p>}/>
                </Route>
            </Routes>
        </Router>
    )
}