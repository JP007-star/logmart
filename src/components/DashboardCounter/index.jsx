import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import './style.css'; // Import the updated CSS file

export const DashboardCounter = ({ initialData }) => {
  return (
    <div className="dashboard-counter-container row">
      <a href="/admin/products" className="card-dash text-white bg-primary shadow-sm rounded">
        <div className="card-header h4 text-center">
          <Unicons.UilUtensils /> Products
        </div>
        <div className="card-body h3 text-center">{initialData.products.length}</div>
      </a>
      <a href="/admin/orders" className="card-dash text-white bg-warning shadow-sm rounded">
        <div className="card-header h4 text-center">
          <Unicons.UilTag /> Orders
        </div>
        <div className="card-body h3 text-center">{initialData.orders.length}</div>
      </a>
      <a href="/admin/users" className="card-dash text-white bg-danger shadow-sm rounded">
        <div className="card-header h4 text-center">
          <Unicons.UilUser /> Users
        </div>
        <div className="card-body h3 text-center">{initialData.users.length}</div>
      </a>
      <a href="/admin/revenue" className="card-dash text-white bg-success shadow-sm rounded">
        <div className="card-header h4 text-center">
          <Unicons.UilMoneyBill /> Revenue
        </div>
        <div className="card-body h3 text-center">₹10,000</div>
      </a>
    </div>
  );
};
