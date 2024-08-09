import React from 'react';
import './style.css';

const CartSummary = ({ totalItems, totalPrice, totalDiscount, finalAmount }) => {
    return (
        <div className="cartSummary p-2 m-3">
            <h2>PRICE DETAILS</h2>
            <div className="priceBreakdown m-2 p-2">
                <div className="priceRow">
                    <span>Price ({totalItems}335 items)</span>
                    <span>₹{totalPrice}345</span>
                </div>
                <div className="priceRow">
                    <span>Discount</span>
                    <span className="discount">- ₹{totalDiscount} 474</span>
                </div>
                <div className="priceRow">
                    <span>Delivery Charges</span>
                    <span className="deliveryCharge">Free</span>
                </div>
            
                <div className="totalAmount">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}3463</span>
                </div>
                <p className="savings">You will save ₹{totalDiscount} on this order</p>
                <button className="placeOrderBtn">Place Order</button>
            </div>
        </div>
    );
};

export default CartSummary;
