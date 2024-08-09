// src/App.js
import React from 'react';
import Header from '../../components/Header';
import Cart from '../../components/Cart';
import { ThemeProvider } from "../../components/ThemeContext";
import './style.css'
import Footer from '../../components/Footer';


const CartPage = () => {
    // Example data, replace with your actual data
    const products = [
        {
            cartId: 1,
            image: 'https://placehold.co/1400x300.jpg',
            productName: 'Product 1',
            productCategory: 'Category 1',
            productQuantity: 2,
            productPrice: 100,
            totalPrice: 200,
        },
        {
            cartId: 2,
            image: 'https://placehold.co/1400x300.jpg',
            productName: 'Product 1',
            productCategory: 'Category 1',
            productQuantity: 1,
            productPrice: 100,
            totalPrice: 100,
        },
        // Add more products as needed
    ];
    const cartCount = products.length;
    const grandTotal = products.reduce((total, product) => total + product.totalPrice, 0);

    return (
        <div >
        <ThemeProvider>
              
            <Header />
            <div className='contentWrapper'>
            <Cart  products={products} cartCount={cartCount} grandTotal={grandTotal} />
            </div>
            <Footer/>
            </ThemeProvider>
        </div>
    );
};

export default CartPage;
