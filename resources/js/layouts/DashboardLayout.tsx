import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout(){
    return (
        <div className="min-h-screen bg-base-200 flex flex-col">
            <div className="navbar bg-base-100 shadow-sm mb-2">
                <p>Dashboard</p>
            </div>
            <div className="flex grow">
                <div className="menu menu-horizontal bg-base-100 rounded-box m-2 mt-0 flex flex-col justify-center shadow-sm">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                            <Link to="/clients">Clients</Link>
                            <Link to="/orders">Orders</Link>
                            <Link to="/stock">Stock</Link>
                        </li>
                    </ul>
                </div>
                <div className="grow mr-2">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}