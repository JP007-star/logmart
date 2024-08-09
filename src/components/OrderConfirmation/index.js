import React from 'react';
import SuccessOrder from '../SuccessOrder';

const OrderConfirmation = () => {
    // Sample order details
    const orderDetails = {
        orderNumber: '123456789',
        address: '123 Main St, Springfield, IL',
        paymentMethod: 'Credit Card',
        totalAmount: '345.67',
        orderDate: 'August 9, 2024',
    };

    return (
        <div>
            <SuccessOrder orderDetails={orderDetails} />
        </div>
    );
};

export default OrderConfirmation;
