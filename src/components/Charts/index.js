// src/components/Charts.js
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import StockLineChart from '../StockBarChart';
import StockDoughnutChart from '../StockDoughnutChart';
import OrderLinechart from '../OrderLineCart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Charts = ({ data }) => {
    return (
        <div className="charts row">
            <div className="chart  card m-2">
                <h4>Stock Distribution</h4>
                <StockDoughnutChart products={data.products} />
            </div>
            {/* <div className="chart card m-2">
                <h4 className='card-title'>Stock Quantity</h4>
                <StockLineChart className="card-body" products={data.products} />
            </div> */}

            <div className="chart card m-2">
                <h4 className='card-title'>Order Statistics</h4>
                <OrderLinechart className="card-body" orders={data.orders} />
            </div>

        </div>
    );
};

export default Charts;
