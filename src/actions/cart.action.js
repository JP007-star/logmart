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



export const updateCartQuantity = async (cartId, quantityChange) => {
    // API call to update cart item quantity (increment or decrement)
    // Return updated cart data
};

export const deleteCartItem = async (cartId) => {
    // API call to delete cart item
    // Return updated cart data
};
