import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import './style.css'; // Import the updated CSS file

export const DashboardCounter = ({ initialData }) => {
  const formatIndianCurrency = (amount) => {
    // Convert the number to a string with two decimal places
    let amountStr = amount.toFixed(2);
    
    // Split the number into integer and decimal parts
    let [integerPart, decimalPart] = amountStr.split('.');

    // Format the integer part
    let lastThree = integerPart.slice(-3);
    let otherParts = integerPart.slice(0, -3);
    if (otherParts !== '') {
        lastThree = ',' + lastThree;
    }
    let formatted = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    // Combine integer and decimal parts
    return `₹${formatted}.${decimalPart}`;
  };

  // Default to zero if totalRevenue is undefined or null
  const revenue = initialData.totalRevenue != null ? initialData.totalRevenue : 0;

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
        <div className="card-body h3 text-center">{formatIndianCurrency(revenue)}</div>
      </a>
    </div>
  );
};
