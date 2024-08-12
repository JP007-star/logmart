import React, { useState, useEffect } from 'react';
import './style.css';
import { deleteCartItem, fetchCartDetails } from '../../actions/cart.action';
import { createOrder } from '../../actions/order.action'; // Import createOrder function
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export const AdminCart = ({ cartItems: propCartItems, onClearCart }) => {
  const [cart, setCart] = useState(null); // Initialize cart state to null
  const [grandTotal, setGrandTotal] = useState(0); // Initialize grand total state
  const [totalDiscount, setTotalDiscount] = useState(0); // Initialize total discount state
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); // State to track checkout success

  useEffect(() => {
    if (propCartItems && propCartItems.length > 0) {
      // If cart items are passed as props, use them
      setCart({ items: propCartItems });
      calculateGrandTotal(propCartItems); // Calculate totals based on props
    } else {
      // If no props, fetch cart details as fallback
      const fetchCart = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
          const cartDetails = await fetchCartDetails();
          setCart(cartDetails);
          calculateGrandTotal(cartDetails.items); // Calculate totals based on fetched data
        } catch (error) {
          console.error("Error fetching cart details:", error.message);
        } finally {
          setLoading(false); // Set loading to false when fetch is complete
        }
      };
      fetchCart();
    }
  }, [propCartItems]);

  // Function to calculate grand total and total discount
  const calculateGrandTotal = (items) => {
    let total = 0;
    let discount = 0;

    items.forEach(item => {
      const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
      const itemQuantity = item.quantity || 0; // Ensure quantity is a number
      const itemDiscount = parseFloat(item.discount) || 0; // Ensure discount is a number

      const itemTotal = itemPrice * itemQuantity;
      const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

      total += itemDiscountedTotal;
      discount += (itemTotal * itemDiscount / 100);
    });

    setGrandTotal(total);
    setTotalDiscount(discount);
  };

  // Function to handle item deletion
  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId); // Delete the item
      // Fetch updated cart details to refresh the state
      const updatedCart = await fetchCartDetails();
      setCart(updatedCart);
      calculateGrandTotal(updatedCart.items); // Recalculate totals based on updated data
    } catch (err) {
      console.error('Error deleting item:', err.message);
    }
  };

  // Function to handle order creation
  const handleCheckout = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
  
    if (!user || !user._id) {
      console.error('User not found in session storage.');
      return;
    }
  
    // Set default shipping address if not provided
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
        image: item.image
      })),
      shippingAddress,
      totalAmount: grandTotal
    };
  
    try {
      const result = await createOrder(orderDetails);
      console.log('Order created successfully:', result);
      setCheckoutSuccess(true); // Set success state
      onClearCart(); // Call the function passed as prop to clear the cart
      setCart(null); // Optionally set cart to null to clear the local state
      toast.success('Order placed successfully!'); // Show success notification
    } catch (error) {
      console.error('Failed to create order:', error.message);
      toast.error('Failed to place order. Please try again.'); // Show error notification
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
      </div> // Display a message if no cart details are available
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
                <td>{itemQuantity}</td>
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
            <td colSpan="2">Grand Total:</td>
            <td colSpan="2">₹{grandTotal.toFixed(2)}</td>
            <td colSpan="1">Discount:</td>
            <td colSpan="1">₹{totalDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3">
              <button className='btn btn-warning' style={{ color: "black" }} onClick={handleCheckout}>Check out</button>
            </td>
            <td colSpan="3">
              <button className='btn btn-outline-warning bg-white' onClick={onClearCart} style={{ color: "black" }}>Clear</button>
            </td>
          </tr>
        </tfoot>
      </table>
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
    </div>
  );
};
