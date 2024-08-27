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
    sgst: 0, // Added SGST field
    cgst: 0, // Added CGST field
    rating: { rate: 0, count: 0 },
    status: 'available'
  });
  const [imageFile, setImageFile] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      // setImagePreview(data.image);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch product details');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      setImageFile(file);
      // setImagePreview(URL.createObjectURL(file)); // Preview the image
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

    if (!imageFile && !productId) {
      setError("Please select an image");
      return;
    }

    try {
      const imageUrl = imageFile ? await uploadImage(imageFile) : product.image;
      const updatedProduct = { ...product, image: imageUrl };

      let response;
      if (productId) {
        response = await updateProduct(productId, updatedProduct);
      } else {
        response = await createProduct(updatedProduct);
      }

      toast.success('Product saved successfully');
      setError(null);

      if (onSubmit) {
        onSubmit(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className='col-md-12 mb-3'>
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
                  rows={3}
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
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4}>
              <Form.Group controlId="sgst">
                <Form.Label>SGST (%):</Form.Label>
                <Form.Control
                  type="number"
                  name="sgst"
                  value={product.sgst}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="cgst">
                <Form.Label>CGST (%):</Form.Label>
                <Form.Control
                  type="number"
                  name="cgst"
                  value={product.cgst}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
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
                  required={!productId}
                />
                {/* {imagePreview && (
                  <div className="mt-2">
                    <Image src={imagePreview} rounded style={{ maxWidth: '200px' }} />
                  </div>
                )} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="d-flex justify-content-between">
              <Button
                variant="outline"
                
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
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
