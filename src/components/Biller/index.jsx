import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AdminCart } from "../AdminCart";
import './style.css'; // Import the updated CSS file

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const product = initialData.products.find(
      (product) => product._id === selectedProductId
    );
    if (product) {
      setSelectedProduct(product.title);
      setSelectedProductQuantity(product.quantity);
      setSelectedProductPrice(product.price);
    } else {
      setSelectedProduct("");
      setSelectedProductQuantity(0);
      setSelectedProductPrice(0);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (quantity > 0 && selectedProductPrice > 0) {
      console.log(`Added ${quantity} of ${selectedProduct} to cart at $${selectedProductPrice} each.`);
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
          <Form className="p-3">
            <Form.Group className="mb-3">
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
                min="0"
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
        <div className="card-body">
          <AdminCart />
        </div>
      </div>
    </div>
  );
};
