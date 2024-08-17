import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockBarChart = ({ products }) => {
    // Prepare the data for the bar chart
    const barData = {
        labels: products.map(p => p.title),  // Product names as labels
        datasets: [{
            label: 'Stock Quantity',
            data: products.map(p => p.quantity),  // Stock quantities as data points
            backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Light teal color for bars
            borderColor: 'rgba(75, 192, 192, 1)',  // Dark teal color for bar borders
            borderWidth: 1,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Stock Quantities by Product',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: false, // Hide the legend
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
            }
        },
        scales: {
            x: {
                display: false,
                title: {
                    display: false,
                    text: 'Products'
                },
                ticks: {
                    autoSkip: false,
                    maxTicksLimit: 10,
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Quantity'
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 10 // Adjust based on your data
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    };

    return (
        <div className="chart-container bar-chart-container">
            <Bar data={barData} options={options} />
        </div>
    );
};

export default StockBarChart;
