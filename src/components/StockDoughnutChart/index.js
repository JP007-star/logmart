import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StockDoughnutChart = ({ products }) => {
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

    const stockData = {
        labels: products.map(p => p.title),
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
            borderWidth: 2,
            hoverOffset: 4,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Stock Distribution',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ddd',
                borderWidth: 1
            },
            doughnutlabel: {
                labels: [
                    {
                        text: `${totalQuantity}`,
                        color: '#000',
                        font: {
                            size: '16',
                            weight: 'bold'
                        }
                    }
                ]
            }
        },
        elements: {
            arc: {
                borderWidth: 2,
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true
        }
    };

    return (
        <div className="chart-container doughnut-chart-container">
            <Doughnut data={stockData} options={options} />
        </div>
    );
};

export default StockDoughnutChart;
