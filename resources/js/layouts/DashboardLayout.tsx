import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-base-200 flex flex-col">
            <div className="navbar bg-base-100 shadow-sm mb-2">
                <p>Dashboard</p>
            </div>
            <div className="flex grow">
                <div className="menu menu-horizontal bg-base-100 rounded-box m-2 mt-0 flex flex-col justify-center shadow-sm">
                    <ul>
                        <li>
                            <Link to="/">{t('Home')}</Link>
                            <Link to="/clients">{t('Clients')}</Link>
                            <Link to="/orders">{t('Orders')}</Link>
                            <Link to="/stock">{t('Stock')}</Link>
                        </li>
                    </ul>
                </div>
                <div className="grow mr-2">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}