import React, { useState, useEffect } from 'react';
import './style.css';
import { fetchCartDetails } from '../../actions/cart.action';

export const AdminCart = (props) => {
  const [cart, setCart] = useState(''); // Initialize cart state to null
  const [grandTotal, setGrandTotal] = useState(0); // Initialize grand total state
  const [totalDiscount, setTotalDiscount] = useState(0); // Initialize total discount state
  const [loading, setLoading] = useState(false); // State for loading indicator

 
  useEffect(() => {
    const logCartDetails = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const cartDetails = await fetchCartDetails();
        setCart(cartDetails);
        calculateGrandTotal(cartDetails.items); // Calculate grand total dynamically
        console.log("Cart details: " + JSON.stringify(cartDetails));
      } catch (error) {
        console.error("Error fetching cart details:", error.message);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    }; 
    logCartDetails();
  }, []); 

  // Function to calculate grand total and total discount
  const calculateGrandTotal = (items) => {
    let total = 0;
    let discount = 0;

    items.forEach(item => {
      const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
      const itemQuantity = item.quantity || 0; // Ensure quantity is a number
      const itemDiscount = parseFloat(item.discount) || 0; // Ensure discount is a number

      total += itemPrice * itemQuantity;
      discount += (itemPrice * itemQuantity * itemDiscount / 100);
    });

    setGrandTotal(total - discount);
    setTotalDiscount(discount);
  };

  if (loading) {
    return <div>Loading cart details...</div>; // Display a loading state while fetching
  }

  if (!cart) {
    return <div>No cart details available.</div>; // Display a message if no cart details are available
  }

  return (
    <div className="cart-table-wrapper">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = item.quantity || 0;
            const itemDiscount = parseFloat(item.discount) || 0;
            const itemTotal = itemPrice * itemQuantity;
            const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

            return (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>₹{itemPrice.toFixed(2)}</td>
                <td>{itemQuantity}</td>
                <td>{itemDiscount ? itemDiscount + '%' : '0%'}</td>
                <td>₹{itemDiscountedTotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Grand Total:</td>
            <td colSpan="2">₹{grandTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3">Total Discount:</td>
            <td colSpan="2">₹{totalDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">
              <button className='btn btn-warning' style={{ color: "black" }}>Check out</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
