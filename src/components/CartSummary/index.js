import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ totalItems, totalPrice, totalDiscount, finalAmount, showPlaceOrder }) => {
    const navigate = useNavigate();


    const handleAddToCart = () => {
        navigate('/checkout'); 
          };

    return (
        <div className="cartSummary p-2 m-lg-2 m-md-2">
            <h2>PRICE DETAILS</h2>
            <div className="priceBreakdown m-2 p-2">
                <div className="priceRow">
                    <span>Price ({totalItems} items)</span>
                    <span>₹{totalPrice}</span>
                </div>
                <div className="priceRow">
                    <span>Discount</span>
                    <span className="discount">- ₹{totalDiscount}</span>
                </div>
                <div className="priceRow">
                    <span>Delivery Charges</span>
                    <span className="deliveryCharge">Free</span>
                </div>
                <div className="totalAmount">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                </div>
                <p className="savings">You will save ₹{totalDiscount} on this order</p>
                {showPlaceOrder && (
                    <button className="placeOrderBtn" onClick={handleAddToCart}>Place Order</button>
                )}
            </div>
        </div>
    );
};

export default CartSummary;
