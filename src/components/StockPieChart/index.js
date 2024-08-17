// src/components/StockPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import "./style.css"
const StockPieChart = ({ products }) => {
    const pieData = {
        labels: products.map(p => p.title),
        datasets: [{
            data: products.map(p => p.quantity),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ],
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
        },
    };

    return (
        <div className="chart-container pie-chart-container">
            <Pie data={pieData} options={options} />
        </div>
    );
};

export default StockPieChart;
