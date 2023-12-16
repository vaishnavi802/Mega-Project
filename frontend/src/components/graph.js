import React from 'react'
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const result = location.state.data;
    const name = location.state.name;

    const options = {
        plugins: {
            ChartDataLabels: {
                display: true,
            },
            title: {
                display: true,
                text: 'Performance Analysis of ' + name,
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
                data: [result.phy_correct, result.chem_correct, result.math_correct],
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
                data: [result.phy_incorrect, result.chem_incorrect, result.math_incorrect],
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
        // give the chart a title
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px', flexDirection: 'column', height: '100vh' }}>
            <div style={{ width: "800px" }}>
                <br />
                <br />
                <Bar options={options}
                    data={data} />
            </div>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'left', flexDirection: 'column' }}>
                {/* find percentage of each sucject */}
            {result.phy_total != 0 ? <h5>Physics: {Math.round((result.phy_correct / result.phy_total) * 100)}%</h5> : <h5>Physics: 0%</h5>}
            {result.chem_total != 0 ? <h5>Chemistry: {Math.round((result.chem_correct / result.chem_total) * 100)}%</h5> : <h5>Chemistry: 0%</h5>}
            {result.math_total != 0 ? <h5>Mathematics: {Math.round((result.math_correct / result.math_total) * 100)}%</h5> : <h5>Mathematics: 0%</h5>}
            {/* if % are less tha 60% then say to improve */}
            
            {result.phy_total != 0 && Math.round((result.phy_correct / result.phy_total) * 100) < 60 ? <h5>Improvement is required in Physics</h5> : null}
            {result.chem_total != 0 && Math.round((result.chem_correct / result.chem_total) * 100) < 60 ? <h5>Improvement is required in Chemistry</h5> : null}
            {result.math_total != 0 && Math.round((result.math_correct / result.math_total) * 100) < 60 ? <h5>Improvement is required in Mathematics</h5> : null}
            </div>
        </div>
    )
}

export default Graph