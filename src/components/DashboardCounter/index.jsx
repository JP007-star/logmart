import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import './style.css'; // Import the updated CSS file

export const DashboardCounter = ({ initialData }) => {
  return (
    <div className="dashboard-counter-container row ">
      <div className="card-dash text-white bg-primary shadow-sm rounded" style={{ maxWidth: "14rem" }}>
        <div className="card-header h4 text-center">
          <Unicons.UilUser /> Users
        </div>
        <div className="card-body h3 text-center">{initialData.users.length}</div>
      </div>
      <div className="card-dash text-white bg-warning shadow-sm rounded" style={{ maxWidth: "14rem" }}>
        <div className="card-header h4 text-center">
          <Unicons.UilTag /> Orders
        </div>
        <div className="card-body h3 text-center">100</div>
      </div>
      <div className="card-dash text-white bg-danger shadow-sm rounded" style={{ maxWidth: "14rem" }}>
        <div className="card-header h4 text-center">
          <Unicons.UilUtensils /> Products
        </div>
        <div className="card-body h3 text-center">{initialData.products.length}</div>
      </div>
      <div className="card-dash text-white bg-success shadow-sm rounded" style={{ maxWidth: "14rem" }}>
        <div className="card-header h4 text-center">
          <Unicons.UilMoneyBill /> Revenue
        </div>
        <div className="card-body h3 text-center">₹10,000</div>
      </div>
    </div>
  );
};
