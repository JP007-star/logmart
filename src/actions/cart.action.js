import { cartApi, userDNS } from "../config";

export const fetchCartDetails = async () => {
  try {
    // Retrieve the user data from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user || !user._id) {
      throw new Error('User ID not found in session storage.');
    }

    const userId = user._id;
    const url = cartApi + userId;
    console.log(url);


    // Make the GET API call to fetch cart details
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Include the token for authenticated requests
      },
    });

    // Handle the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch cart details.');
    }

    const responseData = await response.json();

    // Check if the cart is empty or if the response data is in the expected format
    if (!responseData || !responseData.items || !Array.isArray(responseData.items)) {
      throw new Error('Unexpected response format or empty cart.');
    }

    // Return the cart details
    return responseData;
  } catch (error) {
    console.error('Error fetching cart details:', error.message);
    return { error: error.message };
  }
};


export const addToCart = async (product) => {
  try {
    // Retrieve user data from session storage
    const sessionData = JSON.parse(sessionStorage.getItem('user'));
    const userId = sessionData?._id;

    if (!userId) {
      console.error("User ID is missing from session storage.");
      return "User ID is missing from session storage.";
    }

    const url = cartApi + 'add-cart/' + userId;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
            productName: product.name,
            discount: product.discount,
            image: product.image,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData.message);
      return `Error: ${errorData.message}`;
    }

    const data = await response.json();
    console.log('Cart updated:', data);
    return data;  // Return data if needed for further processing
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return 'An unexpected error occurred';
  }
};




export const updateCartQuantity = async (cartId, quantityChange) => {
  const sessionData = JSON.parse(sessionStorage.getItem('user'));
  const userId = sessionData?._id;

  if (!userId) {
    console.error("User ID is missing from session storage.");
    return "User ID is missing from session storage.";
  }

  try {
      const response = await fetch(userDNS+`api/v1/cart/${userId}/item/${cartId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantityChange }), // Send quantity change to the server
      });

      if (!response.ok) {
          throw new Error(`Failed to update cart. Status: ${response.status}`);
      }

      const updatedCart = await response.json(); // Parse the JSON response
      return updatedCart; // Return the updated cart data
  } catch (error) {
      console.error('Error updating cart quantity:', error.message);
      throw error; // Re-throw the error to be handled by the calling function
  }
};


export const deleteCartItem = async (productId) => {
  const sessionData = JSON.parse(sessionStorage.getItem('user'));
  const userId = sessionData?._id;

  if (!userId) {
    console.error("User ID is missing from session storage.");
    return "User ID is missing from session storage.";
  }
  const url=userDNS+"api/v1/cart/"+userId+"/item/"+productId;
  try {
    // Send a DELETE request to the server
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the item');
    }

    const data = await response.json();

    // Return the updated cart data
    return data;
  } catch (error) {
    console.error('Error deleting item from cart:', error.message);
    throw error;  // Re-throw the error for further handling in the component
  }
};




// actions/cart.action.js

export const clearCart = async () => {
  const sessionData = JSON.parse(sessionStorage.getItem('user'));
  const userId = sessionData?._id;

  if (!userId) {
    return "User ID is missing from session storage.";
  }

  const url = cartApi + userId;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData.message);
      return "Error clearing cart.";
    }

    const data = await response.json();
    console.log('Cart cleared:', data);
    return data; // Return the response to handle in the component
  } catch (error) {
    console.error('Error:', error);
    return "Error clearing cart.";
  }
};

