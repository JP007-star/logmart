import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ products = [], showPlaceOrder }) => {
    const navigate = useNavigate();

    // Initialize totals
   
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDiscountedPrice = 0;
    let totalSGST = 0;
    let totalCGST = 0;

    products.forEach(product => {
        const itemPrice = parseFloat(product.price) || 0;
        const itemQuantity = product.quantity || 0;
        const itemDiscount = product.discount ? parseFloat(product.discount) : 0;
        const itemSGSTRate = product.sgst || 0; // Ensure sgst and cgst rates are present
        const itemCGSTRate = product.cgst || 0;

        const itemTotal = itemPrice * itemQuantity;
        const itemDiscountAmount = itemTotal * itemDiscount / 100;
        const discountedItemTotal = itemTotal - itemDiscountAmount; // Discounted total for each item

        // Calculate SGST and CGST based on the discounted item total
        const itemSGSTAmount = discountedItemTotal * itemSGSTRate / 100;
        const itemCGSTAmount = discountedItemTotal * itemCGSTRate / 100;

        totalPrice += itemTotal;
        totalDiscount += itemDiscountAmount;
        totalDiscountedPrice += discountedItemTotal;
        totalSGST += itemSGSTAmount;
        totalCGST += itemCGSTAmount;
    });

    const grandTotal = totalDiscountedPrice + totalSGST + totalCGST;


    const handleAddToCart = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="cartSummary p-2 m-lg-2 m-md-2">
            <h2>PRICE DETAILS</h2>
            <div className="priceBreakdown m-2 p-2">
                <div className="priceRow">
                    <span>Price ({products.length} items)</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>Discount</span>
                    <span className="discount">- ₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>Discounted Price</span>
                    <span>₹{totalDiscountedPrice.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>SGST ({products[0]?.sgst || 0}%)</span> {/* Show SGST rate from the first product */}
                    <span>₹{totalSGST.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>CGST ({products[0]?.cgst || 0}%)</span> {/* Show CGST rate from the first product */}
                    <span>₹{totalCGST.toFixed(2)}</span>
                </div>
                <div className="priceRow">
                    <span>Delivery Charges</span>
                    <span className="deliveryCharge">Free</span>
                </div>
                <div className="totalAmount">
                    <span>Total Amount</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>
                <p className="savings">You will save ₹{totalDiscount.toFixed(2)} on this order</p>
                {showPlaceOrder && (
                    <button className="placeOrderBtn" onClick={handleAddToCart}>Place Order</button>
                )}
            </div>
        </div>
    );
};

export default CartSummary;
