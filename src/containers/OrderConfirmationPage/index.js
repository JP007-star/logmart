// src/App.js
import React from 'react';
import Header from '../../components/Header';
import { ThemeProvider } from "../../components/ThemeContext";
import './style.css'
import OrderConfirmation from '../../components/OrderConfirmation';


const OrderConfirmationPage = () => {
  
 

    return (
        <div >
        <ThemeProvider>
              
            <Header />
            <div className='contentWrapper'>
            <OrderConfirmation/>
            </div>
          
            </ThemeProvider>
        </div>
    );
};

export default OrderConfirmationPage;
