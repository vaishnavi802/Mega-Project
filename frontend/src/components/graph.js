import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
);


const Graph = () => {

    const options = {
        plugins: {
            ChartDataLabels: {
                display: true,
            },
            title: {
                display: true,
                font: {
                    size: 20,
                    weight: 'bold',
                }
            },
            legend: {
                position: 'right',
            },
        },
        elements: {
            bar: {
                borderWidth: 0.5,
            },
            column: {
                borderRadius: 10,
                width: 10,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                width: 10
            },
        },
    };

    const labels = ['Physics', 'Chemistry', 'Mathematics'];

    const data = {
        datasets: [
            {
                label: 'correct questions',
                data: [90, 80, 70],
                backgroundColor: [
                    'rgba(0, 128, 0, 0.2)', // Green color for correct questions
                    'rgba(0, 128, 0, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'wrong questions',
                data: [10, 20, 30],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)', // Red color for wrong questions
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
        labels: labels,
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
            <div style={{ width: "800px" }}>
                <br />
                <br />
                <Bar options={options}
                    data={data} />
            </div>
        </div>
    )
}

export default Graph