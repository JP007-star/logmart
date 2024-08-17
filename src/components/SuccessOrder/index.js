import React from 'react';
import './style.css';

const SuccessOrder = ({ orderDetails }) => {
    return (
        <div className="success-order">
            <div className="confirmation-message">
                <h1>Thank You for Your Order!</h1>
                <p>Your order has been successfully placed. We will notify you once it’s shipped.</p>
            </div>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-item">
                    <span>Order Number:</span>
                    <span>{orderDetails._id}</span>
                </div>
                <div className="summary-item">
                    <span>Delivery Address:</span>
                    <span>{ orderDetails.shippingAddress.street + orderDetails.shippingAddress.city +orderDetails.shippingAddress.postalCode}</span>
                </div>
                <div className="summary-item">
                    <span>Payment Method:</span>
                    <span>{orderDetails.paymentMethod}</span>
                </div>
                <div className="summary-item">
                    <span>Total Amount:</span>
                    <span>₹{orderDetails.totalAmount}</span>
                </div>
                <div className="summary-item">
                    <span>Order Date:</span>
                    <span>{orderDetails.orderDate}</span>
                </div>
            </div>
            <button className="btn-primary mt-4" onClick={() => window.location.href = '/'}>
                Continue Shopping
            </button>
        </div>
    );
};

export default SuccessOrder;
