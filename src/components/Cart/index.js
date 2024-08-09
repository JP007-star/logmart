import React from 'react';
import './style.css';
import CartCard from '../CartCard';
import CartSummary from '../CartSummary';

const Cart = ({ products, cartCount, grandTotal }) => {

    const handleAddQuantity = (cartId) => {
        // Logic to add quantity
        console.log(`Added quantity for cart ID: ${cartId}`);
    };

    const handleRemoveQuantity = (cartId) => {
        // Logic to remove quantity
        console.log(`Removed quantity for cart ID: ${cartId}`);
    };

    const handleDelete = (cartId) => {
        // Logic to delete product from cart
        console.log(`Deleted product with cart ID: ${cartId}`);
    };

    return (
        <div className="cart-container card shadow col-12">
            {cartCount > 0 ? (
                <>
                    <div className="progress mb-3">
                        <div
                            className="progress-bar progress-bar-striped active"
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
                    <div className='d-flex p-2'>
                    <ul className="list-group mb-3">
                        {products.map((product) => (
                            <CartCard
                                key={product.cartId}
                                product={product}
                                onAddQuantity={handleAddQuantity}
                                onRemoveQuantity={handleRemoveQuantity}
                                onDelete={handleDelete}
                            />
                        ))}
                    
                    </ul>
                    <CartSummary />
                    </div>
                </>
            ) : (
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
                    <a href="/" className="btn btn-primary">
                        Order Now!!
                    </a>
                </div>
            )}
        </div>
    );
};

export default Cart;
