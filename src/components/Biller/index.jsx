import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AdminCart } from "../AdminCart";
import './style.css'; // Import the CSS file

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = initialData.products.find(
      (product) => product._id === selectedProductId
    );
    if (selectedProduct) {
      setSelectedProduct(selectedProduct.title);
      setSelectedProductQuantity(selectedProduct.quantity);
      setSelectedProductPrice(selectedProduct.price);
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
    // Add functionality to handle adding the product to the cart
    if (quantity > 0 && selectedProductPrice > 0) {
      // Your logic to add to cart
      console.log(`Added ${quantity} of ${selectedProduct} to cart at $${selectedProductPrice} each.`);
    }
  };

  const options = initialData.products.map((product) => (
    <option key={product._id} value={product._id}>
      {product.title}
    </option>
  ));

  return (
    <div className="row justify-content-evenly pt-3 mt-3">
      <div className="card col-lg-5 shadow-sm rounded">
        <div className="card-body">
          <Form className="p-2">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="productSelect">Product</Form.Label>
              <Form.Select id="productSelect" size="lg" onChange={handleProductChange}>
                <option value="">Select a product</option>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label htmlFor="quantityInput">Quantity</Form.Label>
                <small className="form-text text-muted">
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
              <Form.Label htmlFor="priceInput">Price</Form.Label>
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
      <div className="card col-lg-5 shadow-sm rounded">
        <div className="card-body">
          <AdminCart />
        </div>
      </div>
    </div>
  );
};
