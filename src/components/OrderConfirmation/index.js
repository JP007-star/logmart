import React from 'react';
import { useLocation } from 'react-router-dom';
import SuccessOrder from '../SuccessOrder';

const OrderConfirmation = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;

    if (!orderDetails) {
        return <div>No order details available.</div>;
    }

    return (
        <div>
            <SuccessOrder orderDetails={orderDetails} />
        </div>
    );
};

export default OrderConfirmation;
