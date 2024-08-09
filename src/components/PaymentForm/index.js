import React from 'react';
import './style.css';

const PaymentForm = ({ payment, onChange, onPaymentMethodChange }) => {
    return (
        <div className="payment-form">
            <h4>Payment Information</h4>
            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={payment.method === 'card'}
                        onChange={onPaymentMethodChange}
                    />
                    Card
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={payment.method === 'upi'}
                        onChange={onPaymentMethodChange}
                    />
                    UPI
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={payment.method === 'bank'}
                        onChange={onPaymentMethodChange}
                    />
                    Bank Details
                </label>
            </div>

            {payment.method === 'card' && (
                <div className="card-details">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={payment.cardNumber}
                            onChange={onChange}
                            placeholder="Enter your card number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={payment.expiryDate}
                            onChange={onChange}
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={payment.cvv}
                            onChange={onChange}
                            placeholder="Enter your CVV"
                        />
                    </div>
                </div>
            )}

            {payment.method === 'upi' && (
                <div className="upi-details">
                    <div className="form-group">
                        <label htmlFor="upiId">UPI ID</label>
                        <input
                            type="text"
                            id="upiId"
                            name="upiId"
                            value={payment.upiId}
                            onChange={onChange}
                            placeholder="Enter your UPI ID"
                        />
                    </div>
                </div>
            )}

            {payment.method === 'bank' && (
                <div className="bank-details">
                    <div className="form-group">
                        <label htmlFor="accountNumber">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={payment.accountNumber}
                            onChange={onChange}
                            placeholder="Enter your account number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ifscCode">IFSC Code</label>
                        <input
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            value={payment.ifscCode}
                            onChange={onChange}
                            placeholder="Enter your IFSC code"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountHolderName">Account Holder Name</label>
                        <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            value={payment.accountHolderName}
                            onChange={onChange}
                            placeholder="Enter account holder's name"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
