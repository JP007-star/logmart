import React, { useState } from 'react';
import { Card, Form, Button, Row, Alert } from 'react-bootstrap';

const AddProduct = ({ onCancel, onSubmit }) => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to http://localhost:3000/api/products
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
        return;
      }

      // Handle successful response
      setSuccessMessage('Product added successfully');

      // Call the onSubmit prop if needed
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      setError('An error occurred');
      console.error('Error:', error.message);
    }
  };

  return (
    <Card className='col-md-12'>
      <Card.Body>
        <Card.Title>Add Product</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
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
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
          <Form.Group controlId="image">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row className='flex-grow'>
            <Button className="form-control mt-3" variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="form-control mt-3"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddProduct;
