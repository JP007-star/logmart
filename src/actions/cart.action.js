import { cartApi } from "../config";

export const fetchCartDetails = async () => {
    try {
        // Retrieve the user data from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user || !user._id) {
            throw new Error('User ID not found in session storage.');
        }

        const userId = user._id;
        const url=cartApi+userId;
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

      const url=cartApi+'add-cart/'+userId;
  
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
    // API call to update cart item quantity (increment or decrement)
    // Return updated cart data
};

export const deleteCartItem = async (cartId) => {
    // API call to delete cart item
    // Return updated cart data
};
