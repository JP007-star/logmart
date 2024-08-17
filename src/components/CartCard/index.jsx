import React from 'react';
import './style.css';

const CartCard = React.memo(({ product, onAddQuantity, onRemoveQuantity, onDelete }) => {
    // Destructure product details
    const {
        productName,
        productCategory,
        quantity,
        price,
        discount,
        image,
        _id: cartId,
    } = product;

    // Ensure price and discount are treated as numbers
    const numericPrice = parseFloat(price) || 0;
    const numericDiscount = parseFloat(discount) || 0;

    // Calculate total price after discount
    const totalPrice = numericPrice * quantity;
    const discountedPrice = totalPrice * (1 - numericDiscount / 100);

    return (
        <div className="cart-card m-2">
            {/* Product Image and Details */}
            <div className="product-info">
                <img
                    alt={productName}
                    src={image}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-details">
                    <h6 className="product-name">{productName}</h6>
                    <small className="product-category">{productCategory}</small>
                    <div className="quantity-controls">
                        <button
                            onClick={() => onAddQuantity(cartId)}
                            className="quantity-btn"
                            aria-label="Increase quantity"
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                        <p>{quantity}</p>
                        <button
                            onClick={() => onRemoveQuantity(cartId)}
                            className="quantity-btn"
                            aria-label="Decrease quantity"
                        >
                            <i className="fa fa-minus"></i>
                        </button>
                    </div>
                    <button
                        onClick={() => onDelete(cartId)}
                        className="delete-button"
                        aria-label="Remove item"
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>

            {/* Price and Discount Details */}
            <div className="price-details p-3 m-3">
                <div className="price-item">
                    <span className="price-label">Price:</span>
                    <span className="price-value">
                        ₹{numericPrice.toFixed(2)}
                    </span>
                </div>
                <div className="price-item">
                    <span className="price-label">Discount:</span>
                    <span className="price-value">
                        {numericDiscount.toFixed(2)}%
                    </span>
                </div>
                <div className="price-item">
                    <span className="price-label">Total Price:</span>
                    <span className="price-value">
                        ₹{discountedPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default CartCard;
