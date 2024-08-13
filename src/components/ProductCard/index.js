import React from 'react';
import './style.css'; // Importing plain CSS
import { useTheme } from '../ThemeContext';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../actions/cart.action';
import { toast } from 'react-toastify'; // Import toast functions

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const { title, price, image, rating } = product;

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user._id) {
       navigate('/admin')
       return
    }
    const productData = {
      id: product._id,
      quantity: 1,
      price: product.price,
      name: product.title,
      discount: "20%", // Add actual discount if needed
      image: product.image, // Add actual image URL
    };
  
    const result = await addToCart(productData);
  
    if (typeof result === 'string') {
      // Handle error message
      toast.error(result); // Show error toast
    } else {
      // Handle success
      toast.success("Product added to cart successfully"); // Show success toast
    }
  };

  const handleBuyNow = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user._id) {
       navigate('/admin')
       return
    }
    const productData = {
      id: product._id,
      quantity: 1,
      price: product.price,
      name: product.title,
      discount: "20%", // Add actual discount if needed
      image: product.image, // Add actual image URL
    };
  
    const result = await addToCart(productData);
  
    if (typeof result === 'string') {
      // Handle error message
      toast.error(result); // Show error toast
    } else {
      // Handle success
      toast.success("Product added to cart successfully"); // Show success toast
      navigate('/cart'); 
    }
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
          <button onClick={handleAddToCart} className='btn-warning'>
            + <Unicons.UilShoppingCartAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
