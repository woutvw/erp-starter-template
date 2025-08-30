import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "../components/icons/Home";
import Icon from "../components/Icon";

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
                            <Link to="/stock">
                                <Icon name="warehouse" className="w-8 h-8"/>
                                {t('Stock')}
                            </Link>
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