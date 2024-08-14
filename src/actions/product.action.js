import { userDNS } from "../config";

// Action to create a new product
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${userDNS}api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        throw new Error('Failed to parse error response');
      }
      throw new Error(errorData.message || 'An error occurred');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};

// Action to update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${userDNS}api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        throw new Error('Failed to parse error response');
      }
      throw new Error(errorData.message || 'An error occurred');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};

// Action to delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${userDNS}api/v1/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        throw new Error('Failed to parse error response');
      }
      throw new Error(errorData.message || 'An error occurred');
    }

    // Assuming the server returns some confirmation of deletion, or just return a success message
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};
