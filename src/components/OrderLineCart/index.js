import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrderLinechart = ({ orders }) => {
    // Prepare the data for the line chart
    const lineData = {
        labels: orders.map(order => new Date(order.orderDate).toLocaleDateString()),  // Formatting date to a readable string
        datasets: [{
            label: 'Total Amount',
            data: orders.map(order => order.totalAmount),
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 5,
            pointHoverRadius: 7,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Total Amount of Orders Over Time',
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
                        return `Date: ${tooltipItem.label}, Total Amount: ${tooltipItem.raw}`;
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
                display: true,
                title: {
                    display: true,
                    text: 'Date'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Total Amount'
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 500 // Adjust the step size based on your data
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    };

    return (
        <div className="chart-container line-chart-container">
            <Line data={lineData} options={options} />
        </div>
    );
};

export default OrderLinechart;
