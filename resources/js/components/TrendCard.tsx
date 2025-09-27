import { useEffect, useState } from "react";
import Icon from "./Icon";
import TrendChart from "./charts/TrendChart";
import api from "../api/axios";

interface TrendCardProps {
    title: string
    uri: string
    icon: string
}

export default function TrendCard({title, uri, icon}: TrendCardProps){
    const [total, setTotal] = useState(0);
    const [trend, setTrend] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        api.get(uri)
            .then(response => {
                setTotal(response.data.total);
                setTrend(response.data.trend);
                setChartData(response.data.chart_data);
            })
    },[])

    return (
        <div className="w-1/4 card bg-base-100 shadow-sm mr-2">
            <div className="card-body">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-base-content/50">{title}</h2>
                        <p>{total}</p>
                    </div>
                    <div className="bg-secondary h-10 w-10 rounded-full p-2 text-white">
                        <Icon name={icon}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-2/3">
                        <TrendChart chartData={chartData}/>
                    </div>
                    <div className="flex items-end">
                        {trend > 0 ? (
                            <div className="w-5 h-5 bg-success text-white rounded-full p-0.5">
                                <Icon name="trend-up"/>
                            </div>
                        ):(
                            <div className="w-5 h-5 bg-error text-white rounded-full p-0.5">
                                <Icon name="trend-down"/>
                            </div>
                        )}
                        <p className="ml-2">{trend}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}