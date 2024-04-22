import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AdminCart } from "../AdminCart";

export const Biller = ({ initialData }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

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

  const options = initialData.products.map((option) => (
    <option key={option._id} value={option._id}>
      {option.title}
    </option>
  ));

  return (
    <>
      <div className="row justify-content-evenly pt-lg-3 mt-lg-3">
        <div className="card col-lg-5">
          <div className="card-body">
            <form className="p-1">
              <label htmlFor="formGroupExampleInput">Product</label>
              <Form.Select size="sm" onChange={handleProductChange}>
                <option>Select a product</option>
                {options}
              </Form.Select>
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="formGroupExampleInput">Quantity</label>
                  <small id="helpId" className="form-text text-muted">
                    stock: {selectedProductQuantity}
                  </small>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Enter Quantity"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput"
                  value={selectedProductPrice}
                  placeholder="Product Price"
                  disabled
                />
              </div>
              <button
                className="btn form-control mt-3 btn-primary"
                type="button"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
        <div className="card col-lg-5">
          <div className="card-body">
            <AdminCart />
          </div>
        </div>
      </div>
    </>
  );
};
