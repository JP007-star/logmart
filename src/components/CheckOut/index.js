import React, { useState, useEffect } from 'react';
import './style.css';
import AddressForm from '../AddressForm';
import AddressSummary from '../AddressSummary';
import PaymentForm from '../PaymentForm';
import CartSummary from '../CartSummary';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../actions/order.action';
import { clearCart, fetchCartDetails } from '../../actions/cart.action';

const CheckOut = () => {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
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

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [cartDetails, setCartDetails] = useState(null); // State for cart details

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchCartDetails();
        setCartDetails(details);
      } catch (error) {
        console.error('Failed to fetch cart details:', error);
        toast.error('Failed to load cart details. Please try again.');
      }
    };
    fetchDetails();
  }, []);

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

  const validateForm = () => {
    // Basic form validation
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      toast.error('Please complete your address details.');
      return false;
    }

    if (payment.method === 'credit' && (!payment.cardNumber || !payment.expiryDate || !payment.cvv)) {
      toast.error('Please complete your credit card details.');
      return false;
    }

    if (payment.method === 'upi' && !payment.upiId) {
      toast.error('Please enter your UPI ID.');
      return false;
    }

    if (payment.method === 'bank' && (!payment.accountNumber || !payment.ifscCode || !payment.accountHolderName)) {
      toast.error('Please complete your bank account details.');
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user || !user._id) {
      console.error('User not found in session storage.');
      toast.error('User not found. Please log in.'); // Show error notification
      return;
    }

    const shippingAddress = {
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.zip,
    };

    setLoading(true); // Show loading indicator

    try {
      const cartDetails = await fetchCartDetails(); // Fetch cart details asynchronously

      // Calculate grand total for the order
      const totalAmount = cartDetails.items.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = item.quantity || 0;
        const itemDiscount = parseFloat(item.discount.replace('%', '')) || 0; // Remove '%' and parse as float

        const itemTotal = itemPrice * itemQuantity;
        const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

        return acc + itemDiscountedTotal;
      }, 0);

      const orderDetails = {
        userId: user._id,
        user: {
          name: user.fullName,
          email: user.email,
        },
        products: cartDetails.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.productName,
          price: item.price,
          discount: item.discount, // Assuming discount is in percentage as a string
          image: item.image,
        })),
        shippingAddress,
        totalAmount,
      };

      const result = await createOrder(orderDetails);
      console.log('Order created successfully:', result);
      toast.success('Order placed successfully!'); // Show success notification
      clearCart();
      navigate('/success', { state: { orderDetails: result } }); // Navigate to success page with order details
    } catch (error) {
      console.error('Failed to create order:', error.message);
      toast.error('Failed to place order. Please try again.'); // Show error notification
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  if (!cartDetails) {
    return <div>Loading cart details...</div>;
  }

  // Calculate total items and grand total
  const totalItems = cartDetails.items.reduce((total, item) => total + item.quantity, 0);
  const grandTotal = cartDetails.items.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = item.quantity || 0;
    const itemDiscount = parseFloat(item.discount.replace('%', '')) || 0;

    const itemTotal = itemPrice * itemQuantity;
    const itemDiscountedTotal = itemTotal - (itemTotal * itemDiscount / 100);

    return total + itemDiscountedTotal;
  }, 0);

  const totalDiscount = cartDetails.items.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = item.quantity || 0;
    const itemDiscount = parseFloat(item.discount.replace('%', '')) || 0;

    const itemTotal = itemPrice * itemQuantity;
    const discountValue = itemTotal * itemDiscount / 100;

    return total + discountValue;
  }, 0);

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
            <CartSummary
              totalItems={totalItems}
              totalPrice={grandTotal}
              totalDiscount={totalDiscount}
              finalAmount={grandTotal} // Adjust based on discount if needed
            />
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="btn-primary mt-4"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Processing...' : 'Payment'}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
