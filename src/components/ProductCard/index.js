import React from 'react';
import styles from './style.module.css';
import { useTheme } from '../ThemeContext';
import classNames from 'classnames';
import * as Unicons from '@iconscout/react-unicons';

const ProductCard = ({ product }) => {
  const { isDarkTheme } = useTheme();
  const { title, price, image, rating } = product;

  const handleBuyNow = () => {
    alert(`Buying ${title} now!`);
    // Add logic for handling the "Buy Now" action
  };

  const handleAddToCart = () => {
    alert(`Adding ${title} to the cart!`);
    // Add logic for handling the "Add to Cart" action
  };

  return (
    <div className={classNames(styles.productCard, 'mt-2', { [styles.dark]: isDarkTheme, [styles.light]: !isDarkTheme })}>
      <img
        src={image}
        alt={title}
        className={classNames(styles.productImage, styles.responsiveImage)}
      />
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{title}</h2>
        <p className={styles.productPrice}>₹{price}</p>
        <div className={styles.productRating}>
          {rating && typeof rating === 'object' && 'rate' in rating && 'count' in rating ? (
            <p>{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
          ) : (
            <p>No rating available</p>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={handleBuyNow} className="btn btn-primary">
            Buy Now
          </button>
          <button onClick={handleAddToCart} className="btn btn-warning">
            Add to Cart <Unicons.UilShoppingCartAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
