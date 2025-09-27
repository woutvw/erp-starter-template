import { useTranslation } from "react-i18next";
import TrendCard from "../components/TrendCard";

export default function Home(){
    const {t} = useTranslation();

    return (
        <>
            <div className="flex mb-2">
                <TrendCard title={t('New clients')} uri="api/analytics/clients/new" icon="clients"/>
                <TrendCard title={t('Returning clients')} uri="api/analytics/clients/returning" icon="clients"/>
                <TrendCard title={t('Total orders')} uri="api/analytics/orders" icon="warehouse"/>
                <TrendCard title={t('Total revenue')} uri="api/analytics/orders/revenue" icon="warehouse"/>
            </div>
        </>
    )
}