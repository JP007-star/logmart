import React from 'react';
import './style.css'; // Importing plain CSS
import { useTheme } from '../ThemeContext';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { isDarkTheme } = useTheme();
  const { title, price, image, rating } = product;

  const handleBuyNow = () => {
    navigate('/cart'); 
  };

  const handleAddToCart = () => {
    navigate('/cart'); 

    // Add logic for handling the "Add to Cart" action
  };

  return (
    <div
      className={`productCard ${isDarkTheme ? 'dark' : 'light'}`}
    >
      <img
        src={image}
        alt={title}
        className="productImage"
      />
      <div className="productInfo">
        <h2 className="productName">{title}</h2>
        <p className="productPrice">₹{price}</p>
        <div className="productRating">
          {rating && typeof rating === 'object' && 'rate' in rating && 'count' in rating ? (
            <p>{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
          ) : (
            <p>No rating available</p>
          )}
        </div>
        <div className="buttonsContainer">
          <button onClick={handleBuyNow} className='btn-secondary'>
            Buy
          </button>
          <button onClick={handleAddToCart} className='btn-primary'>
            + <Unicons.UilShoppingCartAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
