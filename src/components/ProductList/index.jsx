import React, { useState, useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Modal, Button, Form, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateProduct, deleteProduct } from '../../actions/product.action'; // Import actions
import './style.css'

// Styled components (as defined earlier)
const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    height: '55vh',
    width: '100%',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#212529',
      color: '#fff',
    },
    '& .MuiDataGrid-cell': {
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem', // Reduce font size on small screens
    },
  },
}));

const StyledButton = styled('button')(({ variant }) => ({
  padding: '6px 12px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  backgroundColor: variant === 'edit' ? '#17a2b8' : '#dc3545',
  '&:hover': {
    backgroundColor: variant === 'edit' ? '#138496' : '#c82333',
  },
}));

const ModalHeader = styled(Modal.Header)({
  borderBottom: 'none',
  padding: '16px',
  backgroundColor: 'transparent',
});

const ModalBody = styled(Modal.Body)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ModalContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ImageContainer = styled('div')({
  flex: '1',
  marginRight: '20px',
  '@media (max-width: 768px)': {
    marginRight: '0',
    marginBottom: '20px',
  },
});

const ImageAndQRCode = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const QRCodeImage = styled('img')({
  maxWidth: '300px',
  maxHeight: '300px',
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  '@media (max-width: 768px)': {
    width: '250px',
  },
});

const ProductImage = styled('img')({
  maxWidth: '200px',
  maxHeight: '200px',
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  '@media (max-width: 768px)': {
    width: '150px',
  },
});

const Overlay = styled('div')({
  '.modal-backdrop': {
    opacity: 0.5,
  },
  '.modal-content': {
    '@media (min-width: 992px)': {
      maxWidth: '90vw',
      margin: '1.75rem auto',
    },
  },
});

const FormGroup = styled(Form.Group)({
  marginBottom: '1rem',
  width: '100%',
});

const ProductList = ({ products: initialProducts }) => {
  // Replace initialProducts with your provided JSON data


  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = useCallback((event, product) => {
    event.stopPropagation();
    setEditProduct(product);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((event, productId) => {
    event.stopPropagation();
    deleteProduct(productId)
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.error('Failed to delete product:', error);
      });
  }, [products]);

  const handleUpdateProduct = () => {
    setLoading(true);
    setError(null);

    // Simple validation
    if (!editProduct.title || !editProduct.price || !editProduct.category) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    updateProduct(editProduct._id, editProduct)
      .then((updatedProduct) => {
        setProducts(
          products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
        setShowEditModal(false);
      })
      .catch((error) => {
        setError('Failed to update product. Please try again.');
        console.error('Failed to update product:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
    setShowModal(true);
  };

  const handleInputRateChange = (event) => {
    const { name, value } = event.target;

    // Check for nested properties
    if (name.startsWith('rating.')) {
      // Handle nested rating properties
      const key = name.split('.')[1]; // Extract the key ('rate' or 'count')
      setEditProduct({
        ...editProduct,
        rating: {
          ...editProduct.rating,
          [key]: value,
        },
      });
    } else {
      // Handle non-nested properties
      setEditProduct({ ...editProduct, [name]: value });
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const columns = useMemo(() => [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{
            width: '80px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      ),
    },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'sgst', headerName: 'SGST (%)', width: 70 },
    { field: 'cgst', headerName: 'CGST (%)', width: 70 },
    { field: 'discount', headerName: 'Discount (%)', width: 70 },
    {
      field: 'qrCode',
      headerName: 'QR Code',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="QR Code"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <StyledButton
            variant="edit"
            onClick={(event) => handleEdit(event, params.row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </StyledButton>
          <StyledButton
            variant="delete"
            onClick={(event) => handleDelete(event, params.row._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </StyledButton>
        </>
      ),
    },
  ], [handleEdit, handleDelete]);

  return (
    <>
      <CustomDataGrid
        className='product-card-div'
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        onRowClick={handleRowClick}
        disableSelectionOnClick
        pagination
        pageSize={10}
      />

      {/* View Product Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-lg"
        centered
        backdropClassName="modal-backdrop"
      >
        <Overlay />
        <ModalHeader closeButton />
        <ModalBody>
          {selectedProduct && (
            <Card>
              <Card.Body>
                <ModalContent>
                  <ImageContainer>
                    <ProductImage src={selectedProduct.image} alt="Product Image" />
                  </ImageContainer>
                  <ImageAndQRCode>
                    <QRCodeImage src={selectedProduct.qrCode} alt="QR Code" />
                  </ImageAndQRCode>
                </ModalContent>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Title:</strong> {selectedProduct.title}</ListGroup.Item>
                  <ListGroup.Item><strong>Price:</strong> ₹{selectedProduct.price}</ListGroup.Item>
                  <ListGroup.Item><strong>Category:</strong> {selectedProduct.category}</ListGroup.Item>
                  <ListGroup.Item><strong>Quantity:</strong> {selectedProduct.quantity}</ListGroup.Item>
                  <ListGroup.Item><strong>SGST (%):</strong> {selectedProduct.sgst}</ListGroup.Item>
                  <ListGroup.Item><strong>CGST (%):</strong> {selectedProduct.cgst}</ListGroup.Item>
                  <ListGroup.Item><strong>Discount (%):</strong> {selectedProduct.discount}</ListGroup.Item>
                  <ListGroup.Item><strong>Rating:</strong> {selectedProduct.rating?.rate} (based on {selectedProduct.rating?.count} reviews)</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </ModalBody>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName="modal-lg"
        centered
        backdropClassName="modal-backdrop"
      >
        <Overlay />
        <ModalHeader closeButton />
        <ModalBody>
          <Form>
            <FormGroup controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editProduct.title || ''}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editProduct.price || ''}
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
            </FormGroup>

            <FormGroup controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={editProduct.category || ''}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editProduct.quantity || ''}
                onChange={handleInputChange}
                min="0"
              />
            </FormGroup>

            <FormGroup controlId="formSGST">
              <Form.Label>SGST (%)</Form.Label>
              <Form.Control
                type="number"
                name="sgst"
                value={editProduct.sgst || ''}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="100"
              />
            </FormGroup>

            <FormGroup controlId="formCGST">
              <Form.Label>CGST (%)</Form.Label>
              <Form.Control
                type="number"
                name="cgst"
                value={editProduct.cgst || ''}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="100"
              />
            </FormGroup>

            <FormGroup controlId="formDiscount">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={editProduct.discount || ''}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="100"
              />
            </FormGroup>

            <FormGroup controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating.rate" // Update name attribute to reflect the nested structure
                value={editProduct.rating?.rate || ''} // Use optional chaining
                onChange={handleInputRateChange}
                step="0.1"
                min="0"
                max="5"
              />
            </FormGroup>

            <FormGroup controlId="formCount">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                name="rating.count" // Update name attribute to reflect the nested structure
                value={editProduct.rating?.count || ''} // Use optional chaining
                onChange={handleInputRateChange}
                min="0"
              />
            </FormGroup>


            {error && <Alert variant="danger">{error}</Alert>}

            <Button
              variant="primary"
              onClick={handleUpdateProduct}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>


    </>
  );
};

export default ProductList;
