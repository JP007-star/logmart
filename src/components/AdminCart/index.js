import React, { useState, useEffect } from 'react';
import './style.css';
import { deleteCartItem, fetchCartDetails, updateCartQuantity } from '../../actions/cart.action';
import { createOrder } from '../../actions/order.action'; // Import createOrder function
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export const AdminCart = ({ cartItems: propCartItems, onClearCart }) => {
  const [cart, setCart] = useState(null); // Initialize cart state to null
  const [grandTotal, setGrandTotal] = useState(0); // Initialize grand total state
  const [totalDiscount, setTotalDiscount] = useState(0); // Initialize total discount state
  const [cgstTotal, setCgstTotal] = useState(0); // Initialize CGST state
  const [sgstTotal, setSgstTotal] = useState(0); // Initialize SGST state

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); // State to track checkout success

  useEffect(() => {
    if (propCartItems && propCartItems.length > 0) {
      // If cart items are passed as props, use them
      setCart({ items: propCartItems });
      calculateTotals(propCartItems); // Calculate totals based on props
    } else {
      // If no props, fetch cart details as fallback
      const fetchCart = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
          const cartDetails = await fetchCartDetails();
          setCart(cartDetails);
          calculateTotals(cartDetails.items); // Calculate totals based on fetched data
        } catch (error) {
          console.error("Error fetching cart details:", error.message);
          toast.error('Error fetching cart details.'); // Show error notification
        } finally {
          setLoading(false); // Set loading to false when fetch is complete
        }
      };
      fetchCart();
    }
  }, [propCartItems]);

  // Function to calculate grand total, total discount, CGST, and SGST
  const calculateTotals = (items) => {
    let total = 0;
    let discount = 0;
    let cgst = 0;
    let sgst = 0;

    items.forEach(item => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = item.quantity || 0;
      const itemDiscount = parseFloat(item.discount) || 0;
      const itemCGSTPercentage = parseFloat(item.cgst) || 0;
      const itemSGSTPercentage = parseFloat(item.sgst) || 0;

      // Total price before discount
      const itemTotal = itemPrice * itemQuantity;
      const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

      // Calculate taxes based on item total before discount
      const itemCGST = (itemDiscountedTotal * itemCGSTPercentage / 100);
      const itemSGST = (itemDiscountedTotal * itemSGSTPercentage / 100);

      total += itemDiscountedTotal;
      discount += (itemTotal * itemDiscount / 100);

      cgst += itemCGST;
      sgst += itemSGST;

      // Debug logs
      console.log(`Item ${item.productId}: Price = ${itemPrice}, Quantity = ${itemQuantity}, Discount = ${itemDiscount}, CGST Percentage = ${itemCGSTPercentage}, SGST Percentage = ${itemSGSTPercentage}`);
      console.log(`Item Total = ${itemTotal}, Discounted Total = ${itemDiscountedTotal}`);
      console.log(`CGST for item = ${itemCGST}, SGST for item = ${itemSGST}`);
    });

    console.log(`Grand Total Before Taxes = ${total}`);
    console.log(`CGST Total = ${cgst}`);
    console.log(`SGST Total = ${sgst}`);

    setGrandTotal(total + cgst + sgst);
    setTotalDiscount(discount);
    setCgstTotal(cgst);
    setSgstTotal(sgst);
  };


  // Function to handle item deletion
  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId); // Delete the item
      // Fetch updated cart details to refresh the state
      const updatedCart = await fetchCartDetails();
      setCart(updatedCart);
      calculateTotals(updatedCart.items); // Recalculate totals based on updated data
      toast.success('Item removed from cart successfully'); // Show success notification
    } catch (err) {
      console.error('Error deleting item:', err.message);
      toast.error('Failed to remove item from cart.'); // Show error notification
    }
  };

  const handleAddQuantity = async (cartId) => {
    try {
      const updatedCart = await updateCartQuantity(cartId, 1); // Increment quantity by 1
      setCart(updatedCart);
      calculateTotals(updatedCart.items || []); // Recalculate grand total
    } catch (error) {
      console.error(`Error adding quantity for cart ID: ${cartId}`, error.message);
    }
  };

  // Handle quantity removal for an item
  const handleRemoveQuantity = async (cartId) => {
    try {
      const updatedCart = await updateCartQuantity(cartId, -1); // Decrement quantity by 1
      setCart(updatedCart);
      calculateTotals(updatedCart.items || []); // Recalculate grand total
    } catch (error) {
      console.error(`Error removing quantity for cart ID: ${cartId}`, error.message);
    }
  };

  // Function to handle order creation
  const handleCheckout = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user || !user._id) {
      console.error('User not found in session storage.');
      toast.error('User not found. Please log in.');
      return;
    }

    const shippingAddress = cart.items.length && cart.items[0].shippingAddress
      ? cart.items[0].shippingAddress
      : {
        street: "Take Away",
        city: "N/A",
        state: "N/A",
        country: "N/A",
        postalCode: "N/A"
      };

    const orderDetails = {
      userId: user._id,
      user: {
        name: user.fullName,
        email: user.email,
      },
      products: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.productName,
        price: item.price,
        discount: item.discount,
        cgst: item.cgst,
        sgst: item.sgst,
        image: item.image
      })),
      shippingAddress,
      totalAmount: grandTotal,
      totalDiscount: totalDiscount,
      totalCGST: cgstTotal,
      totalSGST: sgstTotal
    };

    console.log('Order Details:', orderDetails);

    try {
      const result = await createOrder(orderDetails);
      console.log('Order created successfully:', result);
      setCheckoutSuccess(true);
      onClearCart();
      setCart(null);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Failed to create order:', error.message);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading cart details...</div>; // Display a loading state while fetching
  }

  if (checkoutSuccess) {
    return (
      <div className="container-fluid mt-5 text-center">
        <img
          src="https://previews.123rf.com/images/lumut/lumut2007/lumut200700708/151980837-basket-vector-icon-shopping-sign-online-shop-or-e-shop-concept.jpg?fj=1"
          width="130"
          height="130"
          className="img-fluid mb-4"
          alt="Empty cart"
        />
        <h3>
          <strong>Thank you for your purchase!</strong>
        </h3>
        <h4>Your cart has been cleared.</h4>
      </div>
    );
  }

  if (!cart || !cart.items.length) {
    return (
      <div className="container-fluid mt-5 text-center">
        <img
          src="https://previews.123rf.com/images/lumut/lumut2007/lumut200700708/151980837-basket-vector-icon-shopping-sign-online-shop-or-e-shop-concept.jpg?fj=1"
          width="130"
          height="130"
          className="img-fluid mb-4"
          alt="Empty cart"
        />
        <h3>
          <strong>Your Cart is Empty</strong>
        </h3>
        <h4>Add something to make me happy :)</h4>
      </div>
    );
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
            <th>Action</th>
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
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{itemPrice.toFixed(2)}</td>
                <td>
                  <div className="quantity-container">
                    <button
                      onClick={() => handleAddQuantity(item.productId)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                    <span>{itemQuantity}</span>
                    <button
                      onClick={() => handleRemoveQuantity(item.productId)}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </td>
                <td>{itemDiscount ? itemDiscount + '%' : '0%'}</td>
                <td>₹{itemDiscountedTotal.toFixed(2)}</td>
                <td>
                  <button
                    className='btn btn-warning'
                    onClick={() => handleDelete(item.productId)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="1">Total Tax ({cart.items.reduce((acc, item) => acc + (parseFloat(item.cgst) || 0) + (parseFloat(item.sgst) || 0), 0).toFixed(2)}%):</td>
            <td colSpan="1">₹{(cgstTotal + sgstTotal).toFixed(2)}</td>
            <td colSpan="2">CGST Total: ₹{cgstTotal.toFixed(2)}</td>
            <td colSpan="2">SGST Total: ₹{sgstTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2">Grand Total:</td>
            <td colSpan="1">₹{grandTotal.toFixed(2)}</td>
            <td colSpan="2">Total Discount:</td>
            <td colSpan="1">₹{totalDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4">
              <button className='btn btn-warning' style={{ color: "black" }} onClick={handleCheckout}>Check out</button>
            </td>
            <td colSpan="2">
              <button className='btn btn-outline-warning bg-white' onClick={onClearCart} style={{ color: "black" }}>Clear</button>
            </td>
          </tr>
        </tfoot>

      </table>
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
    </div>
  );
};
