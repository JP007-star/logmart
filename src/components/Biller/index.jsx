import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AdminCart } from '../AdminCart';
import './style.css'; // Import the updated CSS file
import { addToCart, clearCart, fetchCartDetails } from '../../actions/cart.action';
import QRCodeScanner from '../QRScanner';
import { UilCameraChange } from '@iconscout/react-unicons';

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductDiscount, setSelectedProductDiscount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [selectedProductSGST, setSelectedProductSGST] = useState(0);
  const [selectedProductCGST, setSelectedProductCGST] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sgst, setSGST] = useState(0);
  const [cgst, setCGST] = useState(0);

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

  useEffect(() => {
    // Update SGST and CGST when product or quantity changes
    const calculateTaxes = () => {
      const priceAfterDiscount = selectedProductPrice * (1 - selectedProductDiscount / 100);
      const sgstAmount = priceAfterDiscount * (selectedProductSGST / 100);
      const cgstAmount = priceAfterDiscount * (selectedProductCGST / 100);

      setSGST(sgstAmount);
      setCGST(cgstAmount);
    };

    calculateTaxes();
  }, [selectedProductPrice, selectedProductDiscount, selectedProductSGST, selectedProductCGST, quantity]);

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
      setSelectedProductSGST(product.sgst);
      setSelectedProductCGST(product.cgst);
      setQuantity(1);
    } else {
      setSelectedProductId("");
      setSelectedProduct("");
      setSelectedProductDiscount(0);
      setSelectedProductQuantity(0);
      setSelectedProductPrice(0);
      setSelectedProductImage("");
      setSelectedProductSGST(0);
      setSelectedProductCGST(0);
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
      discount: selectedProductDiscount,
      image: selectedProductImage,
      sgst: selectedProductSGST,
      cgst: selectedProductCGST,
    };

    console.log("Product Data Before Adding to Cart:", productData);

    const result = await addToCart(productData);

    if (typeof result === 'string') {
      console.log(result);
    } else {
      setCart(result.items);
      console.log("Product added to cart successfully");
    }
  };

  const handleClearCart = async () => {
    const result = await clearCart();

    if (typeof result === 'string') {
      console.log(result);
    } else {
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
      setSelectedProductDiscount(product.discount);
      setSelectedProductQuantity(product.quantity);
      setSelectedProductPrice(product.price);
      setSelectedProductImage(product.image);
      setSelectedProductSGST(product.sgst);
      setSelectedProductCGST(product.cgst);

      // Add the product to the cart automatically
      const productData = {
        id: product._id,
        quantity: 1,
        price: product.price,
        name: product.title,
        discount: product.discount,
        image: product.image,
        sgst: product.sgst,
        cgst: product.cgst,
      };

      console.log("Scanned Product Data Before Adding to Cart:", productData);

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
          <Form>
            <UilCameraChange className="float-end" onClick={() => setIsFlipped(true)} />
            <Form.Group className="mb-3">
              <Form.Label htmlFor="productSelect" className="form-label">Product</Form.Label>
              <Form.Select id="productSelect" size="lg" onChange={handleProductChange} value={selectedProductId}>
                <option value="">Select a product</option>
                {options}
              </Form.Select>
            </Form.Group>
            <div className='row'>
              <div className='col-6'>
                <Form.Group>
                  <div className="d-flex justify-content-between">
                    <Form.Label htmlFor="quantityInput" className="form-label">Quantity</Form.Label>
                    <small className="form-text">Stock: {selectedProductQuantity}</small>
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
              </div>
              <div className='col-6'>
                <Form.Group>
                  <div className="d-flex justify-content-between">
                    <Form.Label htmlFor="priceInput" className="form-label">Price</Form.Label>
                    <small className="form-text">Discount: {selectedProductDiscount}%</small>
                  </div>
                  <Form.Control
                    type="number"
                    id="priceInput"
                    value={selectedProductPrice}
                    placeholder="Product Price"
                    disabled
                  />
                </Form.Group>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <Form.Group>
                  <div className="d-flex justify-content-between">
                    <Form.Label htmlFor="sgstInput" className="form-label">SGST</Form.Label>
                    <small className="form-text">Rate: {selectedProductSGST}%</small>
                  </div>
                  <Form.Control
                    type="number"
                    id="sgstInput"
                    value={sgst.toFixed(2)}
                    placeholder="SGST"
                    disabled
                  />
                </Form.Group>
              </div>
              <div className='col-6'>
                <Form.Group>
                  <div className="d-flex justify-content-between">
                    <Form.Label htmlFor="cgstInput" className="form-label">CGST</Form.Label>
                    <small className="form-text">Rate: {selectedProductCGST}%</small>
                  </div>
                  <Form.Control
                    type="number"
                    id="cgstInput"
                    value={cgst.toFixed(2)}
                    placeholder="CGST"
                    disabled
                  />
                </Form.Group>
              </div>
            </div>


            <div className="m-3">
              <button
                className="btn btn-primary form-control shadow-sm rounded"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </Form>
        </div>

        {/* QR Code Scanner card (Back) */}
        <div className="biller-form back">
          <UilCameraChange className="float-end" onClick={() => setIsFlipped(false)} />
          <div className="qr-scanner-container">
            <QRCodeScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
      </div>

      {/* Cart container */}
      <div className="admin-cart-container m-3">
        <AdminCart cartItems={cart} onClearCart={handleClearCart} />
      </div>
    </div>
  );
};
