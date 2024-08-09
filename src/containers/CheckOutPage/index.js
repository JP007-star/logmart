// src/App.js
import React from 'react';
import Header from '../../components/Header';
import { ThemeProvider } from "../../components/ThemeContext";
import './style.css'
import CheckOut from '../../components/CheckOut';
import Footer from '../../components/Footer';


const CheckOutPage = () => {
  
 

    return (
        <div >
        <ThemeProvider>
              
            <Header />
            <div className='contentWrapper'>
            <CheckOut/>
            </div>
            <Footer />
          
            </ThemeProvider>
        </div>
    );
};

export default CheckOutPage;
