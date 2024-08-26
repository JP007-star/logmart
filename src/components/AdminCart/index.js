import React, { useState, useEffect } from 'react';
import './style.css'; // Ensure hide and show classes are defined here
import { deleteCartItem, fetchCartDetails, updateCartQuantity } from '../../actions/cart.action';
import { createOrder } from '../../actions/order.action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import { userDNS } from '../../config';

export const AdminCart = ({ cartItems: propCartItems, onClearCart }) => {
  const [cart, setCart] = useState({ items: [] });
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [cgstTotal, setCgstTotal] = useState(0);
  const [sgstTotal, setSgstTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (propCartItems && propCartItems.length > 0) {
      setCart({ items: propCartItems });
      calculateTotals(propCartItems);
    } else {
      const fetchCart = async () => {
        setLoading(true);
        try {
          const cartDetails = await fetchCartDetails();
          setCart(cartDetails);
          calculateTotals(cartDetails.items);
        } catch (error) {
          console.error("Error fetching cart details:", error.message);
          toast.error('Error fetching cart details.');
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [propCartItems]);

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

      const itemTotal = itemPrice * itemQuantity;
      const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

      const itemCGST = (itemDiscountedTotal * itemCGSTPercentage / 100);
      const itemSGST = (itemDiscountedTotal * itemSGSTPercentage / 100);

      total += itemDiscountedTotal;
      discount += (itemTotal * itemDiscount / 100);

      cgst += itemCGST;
      sgst += itemSGST;
    });

    setGrandTotal(total + cgst + sgst);
    setTotalDiscount(discount);
    setCgstTotal(cgst);
    setSgstTotal(sgst);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteCartItem(productId);
      const updatedCart = await fetchCartDetails();
      setCart(updatedCart);
      calculateTotals(updatedCart.items);
      toast.success('Item removed from cart successfully');
    } catch (err) {
      console.error('Error deleting item:', err.message);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleAddQuantity = async (cartId) => {
    try {
      const updatedCart = await updateCartQuantity(cartId, 1);
      setCart(updatedCart);
      calculateTotals(updatedCart.items || []);
    } catch (error) {
      console.error(`Error adding quantity for cart ID: ${cartId}`, error.message);
    }
  };

  const handleRemoveQuantity = async (cartId) => {
    try {
      const updatedCart = await updateCartQuantity(cartId, -1);
      setCart(updatedCart);
      calculateTotals(updatedCart.items || []);
    } catch (error) {
      console.error(`Error removing quantity for cart ID: ${cartId}`, error.message);
    }
  };

  const generatePDF = async (orderId) => {
    const apiUrl = `${userDNS}api/v1/invoice/${orderId}`;
    console.log("API URL: ", apiUrl);

    setGeneratingPdf(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching PDF: ${response.statusText}`);
      }

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setShowIframe(true); // Show iframe after generating PDF

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error('Failed to generate PDF.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const onClearCartPdf =async () =>{
   window.location.reload()
  }

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

    try {
      const result = await createOrder(orderDetails);
      setCheckoutSuccess(true);
      onClearCart();
      setCart({ items: [] }); // Clear cart state
      toast.success('Order placed successfully!');
      await generatePDF(result._id); // Generate the PDF after successful checkout
    } catch (error) {
      console.error('Failed to create order:', error.message);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading cart details...</div>;
  }

  if (generatingPdf) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (checkoutSuccess) {
    return (
      <div className="container-fluid">
        {showIframe && pdfUrl && (
          <div className={`pdf-container ${showIframe ? 'show' : 'hide'}`}>
            <button className='' onClick={onClearCartPdf} style={{ color: "black" }}>Clear</button>
            <iframe id="pdfFrame" src={pdfUrl} width="100%" height="300px" title="Order Receipt" className="pdf-iframe"></iframe>
          </div>
        )}
        <ToastContainer />
      </div>
    );
  }

  if (!cart || !cart.items.length) {
    return (
      <div className="container-fluid mt-5 text-center">
        <img
          src="https://previews.123rf.com/images/lumut/lumut2007/lumut200700708/151980837-basket-vector-icon-shopping-sign-online-shop-or-e-shop-concept.jpg?fj=1"
          width="130"
          height="auto"
          className="img-fluid mb-4"
          alt="Empty cart"
        />
        <h3><strong>Your Cart is Empty</strong></h3>
        <h4>Add something to make me happy :)</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">
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
                        onClick={() => handleAddQuantity(item._id)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <span>{itemQuantity}</span>
                      <button
                        onClick={() => handleRemoveQuantity(item._id)}
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
                      onClick={() => handleDelete(item._id)}
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
              <td colSpan="1">Total Tax :</td>
              <td colSpan="1">₹{(cgstTotal + sgstTotal).toFixed(2)}</td>
              <td colSpan="2">CGST : ₹{cgstTotal.toFixed(2)}</td>
              <td colSpan="2">SGST : ₹{sgstTotal.toFixed(2)}</td>
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
      </div>
      <ToastContainer />
    </div>
  );
};
