import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { uploadImage } from '../../firebase'; // Adjust the path as necessary
import { createProduct, updateProduct } from '../../actions/product.action'; // Adjust the path as necessary
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const AddProduct = ({ productId, onCancel, onSubmit }) => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: '',
    quantity: 0,
    category: '',
    discount: 0,
    rating: { rate: 0, count: 0 },
    status: 'available'
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetch product data if editing
      // Replace with actual fetch logic
      fetchProductById(productId);
    }
  }, [productId]);

  const fetchProductById = async (id) => {
    // Replace with actual fetch logic
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch product details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImageFile(e.target.files[0]);
    } else if (name in product.rating) {
      setProduct(prevProduct => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: Number(value)
        }
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    try {
      // Upload image and get URL
      const imageUrl = await uploadImage(imageFile);
      
      // Update product with image URL
      const updatedProduct = { ...product, image: imageUrl };
      
      let response;
      if (productId) {
        // Update existing product
        response = await updateProduct(productId, updatedProduct);
      } else {
        // Create new product
        response = await createProduct(updatedProduct);
      }

      toast.success('Product saved successfully'); // Display success toast

      setError(null);

      if (onSubmit) {
        onSubmit(response); // Pass updated/new product back to parent component
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className='col-md-12'>
      <Card.Body>
        <Card.Title>{productId ? 'Update Product' : 'Add Product'}</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="discount">
                <Form.Label>Discount (%):</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="rating.rate">
                <Form.Label>Rating (Rate):</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  value={product.rating.rate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="rating.count">
                <Form.Label>Rating (Count):</Form.Label>
                <Form.Control
                  type="number"
                  name="count"
                  value={product.rating.count}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Button
                className="form-control"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col md={6}>
              <Button className="form-control" variant="warning" type="submit">
                {productId ? 'Update' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddProduct;
