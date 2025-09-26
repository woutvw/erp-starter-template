import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function RevenueChart() {
    const [data, setData] = useState([]);

    const {t} = useTranslation();

    const labels = [t('January'), t('February'), t('March'), t('April'), t('May'), t('June'), t('July'), t('August'), t('September'), t('October'), t('November'), t('December')];

    useEffect(() => {
        api.get('api/orders/revenue')
            .then((response) => {
                setData(response.data.revenue);
            })
    }, []);

    return (
        <Line
            data={{
                labels: labels,
                datasets: [
                    {
                        label: 'Sales',
                        data: data,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.4, // smooth curves
                    },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        display: false,
                    }
                }
            }}
        />
    )
}