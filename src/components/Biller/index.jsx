import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AdminCart } from '../AdminCart';
import './style.css'; // Import the updated CSS file
import { addToCart, clearCart, fetchCartDetails } from '../../actions/cart.action';
import QRCodeScanner from '../QRScanner'; // Import the QRCodeScanner component
import { UilCameraChange } from '@iconscout/react-unicons'

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductDiscount, setSelectedProductDiscount] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]); // State to hold the cart items
  const [isFlipped, setIsFlipped] = useState(false); // State to manage the card flip

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
      setSelectedProductId(product._id);
      setSelectedProduct(product.title);
      setSelectedProductDiscount(product.discount);
      setSelectedProductQuantity(product.quantity);
      setSelectedProductPrice(product.price);
      setSelectedProductImage(product.image);
      setQuantity(1); // Reset quantity to 1 on new product selection
    } else {
      setSelectedProductId("");
      setSelectedProduct("");
      setSelectedProductDiscount(0);
      setSelectedProductQuantity(0);
      setSelectedProductPrice(0);
      setSelectedProductImage("");
      setQuantity(0);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = async () => {
    if (!selectedProductId || quantity <= 0) {
      console.log("Please select a product and specify quantity");
      return;
    }

    const productData = {
      id: selectedProductId,
      quantity: quantity,
      price: selectedProductPrice,
      name: selectedProduct,
      discount: selectedProductDiscount, // Add actual discount if needed
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

  const handleScan = async (scannedData) => {
    const product = initialData.products.find(
      (product) => product._id === scannedData
    );
    if (product) {
      setSelectedProductId(product._id);
      setSelectedProduct(product.title);
      setQuantity(1);
      setSelectedProductDiscount(product.discount)
      setSelectedProductQuantity(product.quantity);
      setSelectedProductPrice(product.price);
      setSelectedProductImage(product.image);

      // Add the product to the cart automatically
      const productData = {
        id: product._id,
        quantity: 1,
        price: product.price,
        name: product.title,
        discount: product.discount, // Add actual discount if needed
        image: product.image, // Add actual image URL
      };

      const result = await addToCart(productData);

      if (typeof result === 'string') {
        console.log(result);
      } else {
        setCart(result.items);
        console.log("Product added to cart successfully");
      }
    } else {
      console.log("Product not found for QR code:", scannedData);
    }
  };

  const handleError = (error) => {
    console.error('QR Code scan error:', error);
  };

  const options = initialData.products.map((product) => (
    <option key={product._id} value={product._id}>
      {product.title}
    </option>
  ));

  return (

    <div className="biller-container">
      <div className={`biller-card m-3 ${isFlipped ? 'flipped' : ''}`}>
        {/* Form card (Front) */}
        <div className="biller-form front">
          <Form >
            <UilCameraChange className="float-end" onClick={() => setIsFlipped(true)} />
            <Form.Group className="mb-3">

              <Form.Label htmlFor="productSelect" className="form-label">Product</Form.Label>
              <Form.Select id="productSelect" size="lg" onChange={handleProductChange} value={selectedProductId}>
                <option value="">Select a product</option>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group >
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

            <Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Label htmlFor="priceInput" className="form-label">Price</Form.Label>
                <small className="form-text">
                  Discount: {selectedProductDiscount}%
                </small>
              </div>
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

        {/* QR Code Scanner card (Back) */}
        <div className="biller-form back">


          <UilCameraChange className="float-end" onClick={() => setIsFlipped(false)} />
          <div className="qr-scanner-container">
            <QRCodeScanner onScan={handleScan} onError={handleError} />
          </div>


        </div>

        {/* Cart container */}

      </div>
      <div className="admin-cart-container m-3">
        <AdminCart cartItems={cart} onClearCart={handleClearCart} />
      </div>
    </div>

  );
};
