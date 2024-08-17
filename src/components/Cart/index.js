import React, { useState, useEffect } from 'react';
import './style.css';
import CartCard from '../CartCard';
import CartSummary from '../CartSummary';
import { fetchCartDetails, updateCartQuantity, deleteCartItem } from '../../actions/cart.action';

const Cart = () => {
    const [cart, setCart] = useState(null); // State to hold cart data
    const [cartCount, setCartCount] = useState(0); // State to hold the count of items in the cart
    const [grandTotal, setGrandTotal] = useState(0); // State to hold the grand total
    const [totalDiscount, setTotalDiscount] = useState(0); // State to hold total discount

    // Calculate grand total and total discount based on cart items
    const calculateGrandTotal = (items) => {
        let total = 0;
        let discount = 0;

        items.forEach(item => {
            const itemPrice = parseFloat(item.price);
            const itemQuantity = item.quantity;
            const itemDiscount = item.discount ? parseFloat(item.discount) : 0;

            total += itemPrice * itemQuantity;
            discount += (itemPrice * itemQuantity * itemDiscount / 100);
        });

        setGrandTotal(total - discount);
        setTotalDiscount(discount);
    };

    // Handle quantity addition for an item
    const handleAddQuantity = async (cartId) => {
        try {
            const updatedCart = await updateCartQuantity(cartId, 1); // Increment quantity by 1
            setCart(updatedCart);
            setCartCount(updatedCart.items ? updatedCart.items.length : 0); // Update cart count
            calculateGrandTotal(updatedCart.items || []); // Recalculate grand total
        } catch (error) {
            console.error(`Error adding quantity for cart ID: ${cartId}`, error.message);
        }
    };

    // Handle quantity removal for an item
    const handleRemoveQuantity = async (cartId) => {
        try {
            const updatedCart = await updateCartQuantity(cartId, -1); // Decrement quantity by 1
            setCart(updatedCart);
            setCartCount(updatedCart.items ? updatedCart.items.length : 0); // Update cart count
            calculateGrandTotal(updatedCart.items || []); // Recalculate grand total
        } catch (error) {
            console.error(`Error removing quantity for cart ID: ${cartId}`, error.message);
        }
    };

    // Handle deletion of an item from the cart
    const handleDelete = async (cartId) => {
        try {
            await deleteCartItem(cartId); // Delete the item from the cart
    
            // Fetch the latest cart details after deletion
            const updatedCart = await fetchCartDetails();
    
            // Update the state with the latest cart details
            setCart(updatedCart);
            setCartCount(updatedCart.items ? updatedCart.items.length : 0); // Update cart count
            calculateGrandTotal(updatedCart.items || []); // Recalculate grand total
        } catch (error) {
            console.error(`Error deleting product with cart ID: ${cartId}`, error.message);
        }
    };
    
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartDetails = await fetchCartDetails(); // Fetch cart details from API
                setCart(cartDetails);
                setCartCount(cartDetails.items ? cartDetails.items.length : 0); // Update cart count
                calculateGrandTotal(cartDetails.items || []); // Calculate and set grand total
            } catch (error) {
                console.error('Error loading cart:', error.message);
            }
        };

        loadCart();
    }, []);

    return (
        <div className="cart-container card shadow">
            {cart && cart.items && cart.items.length > 0 ? (
                <>
                    <div className="progress mb-3">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow="40"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '40%' }}
                        >
                            40%
                        </div>
                    </div>

                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">
                            {cartCount}
                        </span>
                    </h4>
                    <div className='d-flex flex-column flex-md-row p-2'>
                        <ul className="list-group mb-3">
                            {cart.items.map((product) => (
                                <CartCard
                                    key={product._id} // Use unique ID
                                    product={product}
                                    onAddQuantity={() => handleAddQuantity(product.productId)}
                                    onRemoveQuantity={() => handleRemoveQuantity(product.productId)}
                                    onDelete={() => handleDelete(product.productId)} // Use the correct ID
                                />
                            ))}
                        </ul>
                        <CartSummary
                            showPlaceOrder={true}
                            totalItems={cartCount}
                            totalPrice={grandTotal}
                            totalDiscount={totalDiscount}
                            finalAmount={grandTotal} // Adjust based on discount if needed
                        />
                    </div>
                </>
            ) : (
                <div className="empty-cart-container">
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
                    <a href="/" className="btn btn-primary">
                        Order Now!!
                    </a>
                </div>
            )}
        </div>
    );
};

export default Cart;
