// components/ProductUserCard.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import  './style.module.css'; // Assuming you have a module for styles

const ProductUserCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='productUserCardContainer'>
      {products.map((product, index) => (
        <ProductCard className='productCard' key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductUserCard;
