import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StockDoughnutChart = ({ products }) => {
    const stockData = {
        labels: products.map(p => p.title), // Keeping labels for reference, but they can be hidden in options.
        datasets: [{
            label: 'Stock Distribution',
            data: products.map(p => p.quantity),
            backgroundColor: [
                '#FF6384', // Bright Red
                '#36A2EB', // Bright Blue
                '#FFCE56', // Bright Yellow
                '#4BC0C0', // Bright Teal
                '#9966FF', // Bright Purple
                '#FF9F40', // Bright Orange
                '#FFB6C1', // Light Pink
                '#00CFFF', // Aqua Blue
                '#7C4DFF', // Violet
                '#FF6F61', // Coral
                '#2E8B57', // Sea Green
                '#FF8C00'  // Dark Orange
            ],
            borderColor: [
                '#FF6384', // Bright Red
                '#36A2EB', // Bright Blue
                '#FFCE56', // Bright Yellow
                '#4BC0C0', // Bright Teal
                '#9966FF', // Bright Purple
                '#FF9F40', // Bright Orange
                '#FFB6C1', // Light Pink
                '#00CFFF', // Aqua Blue
                '#7C4DFF', // Violet
                '#FF6F61', // Coral
                '#2E8B57', // Sea Green
                '#FF8C00'  // Dark Orange
            ],
            borderWidth: 1,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows more control over the aspect ratio
        plugins: {
            legend: {
                display: true, // Show legend
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 2,
            }
        }
    };

    return (
        <div className="chart-container doughnut-chart-container">
            <Doughnut data={stockData} options={options} />
        </div>
    );
};

export default StockDoughnutChart;
