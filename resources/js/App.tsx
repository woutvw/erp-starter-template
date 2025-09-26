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
import SupplierCreate from "./pages/suppliers/Create";
import SupplierUpdate from "./pages/suppliers/Update";
import OrderList from "./pages/orders/Index";
import OrderView from "./pages/orders/View";
import OrderCreate from "./pages/orders/Create";
import OrderUpdate from "./pages/orders/Update";
import ClientUpdate from "./pages/clients/Update";

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
                    <Route path="/clients/:id/edit" element={<ClientUpdate/>}/>
                    <Route path="/suppliers" element={<SupplierList/>}/>
                    <Route path="/suppliers/create" element={<SupplierCreate/>}/>
                    <Route path="/suppliers/:id" element={<SupplierView/>}/>
                    <Route path="/suppliers/:id/edit" element={<SupplierUpdate/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/products/create" element={<ProductCreate/>}/>
                    <Route path="/products/:id" element={<ProductView/>}/>
                    <Route path="/orders" element={<OrderList/>}/>
                    <Route path="/orders/create" element={<OrderCreate/>}/>
                    <Route path="/orders/:id" element={<OrderView/>}/>
                    <Route path="/orders/:id/edit" element={<OrderUpdate/>}/>
                </Route>
            </Routes>
        </Router>
    )
}