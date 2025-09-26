import { useTranslation } from "react-i18next";
import RevenueChart from "../components/charts/Revenue";

export default function Home(){
    const {t} = useTranslation();

    return (
        <>
            <p>Home</p>
            <div className="flex">
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