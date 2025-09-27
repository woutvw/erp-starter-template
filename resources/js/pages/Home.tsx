import { useTranslation } from "react-i18next";
import TrendCard from "../components/TrendCard";

export default function Home(){
    const {t} = useTranslation();

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>{t('Home')}</li>
                </ul>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <TrendCard title={t('New clients')} uri="api/analytics/clients/new" icon="clients"/>
                <TrendCard title={t('Returning clients')} uri="api/analytics/clients/returning" icon="clients"/>
                <TrendCard title={t('Total orders')} uri="api/analytics/orders" icon="warehouse"/>
                <TrendCard title={t('Total revenue')} uri="api/analytics/orders/revenue" icon="dollar"/>
            </div>
        </>
    )
}