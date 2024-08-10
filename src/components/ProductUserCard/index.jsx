// components/ProductUserCard.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import {productApi } from '../../config';
import './style.css'



const ProductUserCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        console.log(productApi);
        const response = await fetch(productApi);
        const data = await response.json();
        setProducts(data.products);
        console.log(data);
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
