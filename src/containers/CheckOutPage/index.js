// src/App.js
import React from 'react';
import Header from '../../components/Header';
import { ThemeProvider } from "../../components/ThemeContext";
import './style.css'
import CheckOut from '../../components/CheckOut';


const CheckOutPage = () => {
  
 

    return (
        <div >
        <ThemeProvider>
              
            <Header />
            <div className='contentWrapper'>
            <CheckOut/>
            </div>
          
            </ThemeProvider>
        </div>
    );
};

export default CheckOutPage;
