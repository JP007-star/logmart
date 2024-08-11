import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AdminCart } from "../AdminCart";
import './style.css'; // Import the updated CSS file
import { addToCart, clearCart, fetchCartDetails } from "../../actions/cart.action";

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]); // State to hold the cart items

  // Fetch cart details when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const userId = JSON.parse(sessionStorage.getItem('user'))._id;
      const cartData = await fetchCartDetails(userId);
      if (cartData) {
        setCart(cartData.items);
      }
    };
    fetchCart();
  }, []);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const product = initialData.products.find(
      (product) => product._id === selectedProductId
    );
    if (product) {
      setSelectedProductId(product._id)
      setSelectedProduct(product.title);
      setQuantity(1);
      setSelectedProductQuantity(product.quantity);
      setSelectedProductPrice(product.price);
      setSelectedProductImage(product.image);
    } else {
      setSelectedProductId("")
      setSelectedProduct("");
      setQuantity(0);
      setSelectedProductQuantity(1);
      setSelectedProductPrice(0);
      setSelectedProductImage("");
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = async () => {
    const productData = {
      id: selectedProductId,
      quantity: quantity,
      price: selectedProductPrice,
      name: selectedProduct,
      discount: "20%", // Add actual discount if needed
      image: selectedProductImage, // Add actual image URL
    };
  
    const result = await addToCart(productData);
  
    if (typeof result === 'string') {
      // Handle error message
      console.log(result);
    } else {
      // Handle success, update cart state
      setCart(result.items); // Assuming result contains updated cart items
      console.log("Product added to cart successfully");
    }
  };

 
  const handleClearCart = async () => {
    const result = await clearCart();

    if (typeof result === 'string') {
      // Handle error message
      console.log(result);
    } else {
      // Handle success, clear cart state
      setCart([]);
      console.log("Cart cleared successfully");
    }
  };
  const options = initialData.products.map((product) => (
    <option key={product._id} value={product._id}>
      {product.title}
    </option>
  ));

  return (
    <div className="biller-container">
      <div className="biller-form card shadow-sm rounded">
        <div className="card-body">
          <Form className="p-2">
            <Form.Group className="mb-2">
              <Form.Label htmlFor="productSelect" className="form-label">Product</Form.Label>
              <Form.Select id="productSelect" size="lg" onChange={handleProductChange}>
                <option value="">Select a product</option>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label htmlFor="quantityInput" className="form-label">Quantity</Form.Label>
                <small className="form-text">
                  Stock: {selectedProductQuantity}
                </small>
              </div>
              <Form.Control
                type="number"
                id="quantityInput"
                placeholder="Enter Quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="priceInput" className="form-label">Price</Form.Label>
              <Form.Control
                type="number"
                id="priceInput"
                value={selectedProductPrice}
                placeholder="Product Price"
                disabled
              />
            </Form.Group>

            <button
              className="btn btn-primary form-control shadow-sm rounded"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </Form>
        </div>
      </div>
      <div className="biller-cart card shadow-sm rounded">
        
          {/* Pass the cart state to the AdminCart component */}
          <AdminCart cartItems={cart} onClearCart={handleClearCart}/>
        
      </div>
    </div>
  );
};
