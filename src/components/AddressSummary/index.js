import React from 'react';
import './style.css'

const AddressSummary = ({ address }) => {
  return (
    <div className="address-summary">
      <h5>Address Summary</h5>
      <p><strong>Name:</strong> {address.name}</p>
      <p><strong>Street Address:</strong> {address.street}</p>
      <p><strong>City:</strong> {address.city}</p>
      <p><strong>State:</strong> {address.state}</p>
      <p><strong>ZIP Code:</strong> {address.zip}</p>
    </div>
  );
};

export default AddressSummary;
