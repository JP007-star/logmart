// actions/order.action.js

import { userDNS } from "../config";
import { clearCart } from "./cart.action";

// Function to create an order
export const createOrder = async (orderDetails) => {
    try {
      const response = await fetch(userDNS+'api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }
  
      const result = await response.json();
      clearCart();
      return result;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw error;
    }
  };


  
  export const deleteOrder= ()=>{
  
  }
  
  