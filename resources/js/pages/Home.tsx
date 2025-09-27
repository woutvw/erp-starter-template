import { useTranslation } from "react-i18next";
import RevenueChart from "../components/charts/Revenue";
import TrendCard from "../components/TrendCard";

export default function Home(){
    const {t} = useTranslation();

    return (
        <>
            <div className="flex">
                <TrendCard title={t('Total clients')} uri="api/analytics/clients" icon="clients"/>
                <TrendCard title={t('Total clients')} uri="api/analytics/clients" icon="warehouse"/>
                <TrendCard title={t('Total clients')} uri="api/analytics/clients" icon="warehouse"/>
                <TrendCard title={t('Total clients')} uri="api/analytics/clients" icon="warehouse"/>
            </div>
            <p>Home</p>
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