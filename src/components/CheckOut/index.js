import React, { useState } from 'react';
import './style.css';
import AddressForm from '../AddressForm';
import AddressSummary from '../AddressSummary';
import PaymentForm from '../PaymentForm';
import CartSummary from '../CartSummary';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });

    const [payment, setPayment] = useState({
        method: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setPayment((prevPayment) => ({
            ...prevPayment,
            method: value,
        }));
    };

    const navigate=useNavigate();

    const handleSave = () => {
        // Logic to save address and payment method
        console.log('Address saved:', address);
        console.log('Payment method saved:', payment);
        navigate('/success')
    };

    return (
        <div className="checkout-page cart-container card shadow col-12">
            <div className="form-container">
                <div className="progress mb-3">
                    <div
                        className="progress-bar progress-bar-striped active"
                        role="progressbar"
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: '80%' }}
                    >
                        80%
                    </div>
                </div>
                <div className="address-section">
                    <h4>Delivery Address</h4>
                    <div className="d-flex">
                        <AddressForm address={address} onChange={handleAddressChange} />
                        <AddressSummary address={address} />
                    </div>
                </div>
                <div className="payment-section">
                    <h4>Payment Method</h4>
                    <div className="d-flex">
                        <PaymentForm
                            payment={payment}
                            onChange={handlePaymentChange}
                            onPaymentMethodChange={handlePaymentMethodChange}
                        />
                        <CartSummary />
                    </div>
                </div>
                <button onClick={handleSave} className="btn-primary mt-4">
                    Payment
                </button>
            </div>
        </div>
    );
};

export default CheckOut;
