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
import { Bar } from 'react-chartjs-2';

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

interface TrendCardProps {
    chartData: any[]
}

export default function TrendChart({ chartData }: TrendCardProps){
    function data(){
        return chartData.map(item => item.value);
    }
    function labels(){
        return chartData.map(item => item.month);
    }

    return (
        <Bar
            data={{
                labels: labels(),
                datasets: [
                    {
                        data: data(),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderRadius: Number.MAX_VALUE
                    },
                ],
            }}
            options={{
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