import React from 'react';
import './style.css'
const PaymentSummary = ({ payment }) => {
  return (
    <div className="payment-summary">
      <h5>Payment Summary</h5>
      <p><strong>Card Number:</strong> {payment.cardNumber}</p>
      <p><strong>Expiry Date:</strong> {payment.expiryDate}</p>
      <p><strong>CVV:</strong> {payment.cvv}</p>
    </div>
  );
};

export default PaymentSummary;
