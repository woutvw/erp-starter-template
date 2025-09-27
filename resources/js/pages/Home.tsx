import { useTranslation } from "react-i18next";
import RevenueChart from "../components/charts/Revenue";
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
            <div className="flex">
                <div className="w-1/2 card bg-base-100 shadow-sm mr-2">
                    <div className="card-body">
                        <h2 className="card-title">{t('Revenue')}</h2>
                        <RevenueChart/>
                    </div>
                </div>
                <div className="w-1/2 card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{t('Revenue')}</h2>
                        <RevenueChart/>
                    </div>
                </div>
            </div>
        </>
    )
}