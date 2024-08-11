import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ totalItems = 0, totalPrice = 0, totalDiscount = 0, finalAmount = 0, showPlaceOrder }) => {
    const navigate = useNavigate();

    // Convert values to numbers and ensure they are defined
    const numericTotalPrice = parseFloat(totalPrice) || 0;
    const numericTotalDiscount = parseFloat(totalDiscount) || 0;
    const numericFinalAmount = parseFloat(finalAmount) || 0;

    const handleAddToCart = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="cartSummary p-2 m-lg-2 m-md-2">
            <h2>PRICE DETAILS</h2>
            <div className="priceBreakdown m-2 p-2">
                <div className="priceRow">
                    <span>Price ({totalItems} items)</span>
                    <span>₹{numericTotalPrice.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>Discount</span>
                    <span className="discount">- ₹{numericTotalDiscount.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>Delivery Charges</span>
                    <span className="deliveryCharge">Free</span>
                </div>
                <div className="totalAmount">
                    <span>Total Amount</span>
                    <span>₹{numericFinalAmount.toFixed(2)}</span>
                </div>
                <p className="savings">You will save ₹{numericTotalDiscount.toFixed(2)} on this order</p>
                {showPlaceOrder && (
                    <button className="placeOrderBtn" onClick={handleAddToCart}>Place Order</button>
                )}
            </div>
        </div>
    );
};

export default CartSummary;
