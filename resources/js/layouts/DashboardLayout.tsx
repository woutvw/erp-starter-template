import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "../components/icons/Home";
import Icon from "../components/Icon";

export default function DashboardLayout() {
    const { t } = useTranslation();

    return (
        <div className="h-screen bg-base-200 flex flex-col">
            <div className="navbar bg-base-100 shadow-sm mb-2">
                <p>Dashboard</p>
            </div>
            {/* Constrain this flex to fill remaining height */}
            <div className="flex flex-1 overflow-hidden">
                <div className="menu menu-horizontal bg-base-100 rounded-box m-2 mt-0 flex flex-col justify-center shadow-sm">
                    <ul>
                        <li>
                            <Link to="/">
                                <Icon name="home" className="w-8 h-8"/>
                                {t('Home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/clients">
                                <Icon name="clients" className="w-8 h-8"/>
                                {t('Clients')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders">
                                <Icon name="receipt" className="w-8 h-8"/>
                                {t('Orders')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/suppliers">
                                <Icon name="receipt" className="w-8 h-8"/>
                                {t('Suppliers')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                <Icon name="receipt" className="w-8 h-8"/>
                                {t('Categories')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/products">
                                <Icon name="warehouse" className="w-8 h-8"/>
                                {t('Products')}
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Make only this part scroll */}
                <div className="flex-1 mr-2 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}