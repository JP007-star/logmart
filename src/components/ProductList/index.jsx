import React, { useState, useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateProduct, deleteProduct } from '../../actions/product.action'; // Import actions

// Styled components
const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-root': {
    height: '450px',
    width: '100%', // Ensure it takes full width of its container
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#212529',
      color: '#fff',
    },
    '& .MuiDataGrid-cell': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-row': {
      height: '120px !important',
    },
  },
});

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
  padding: '20px',
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
  width: '100%', // Ensures the QR code scales with its container
  height: 'auto', // Maintains aspect ratio
  '@media (max-width: 768px)': {
    width: '250px', // Adjusted for responsiveness
    height: 'auto',
  },
});

const ProductImage = styled('img')({
  maxWidth: '200px',
  maxHeight: '200px',
  objectFit: 'cover',
  width: '100%', // Ensures the product image scales with its container
  height: 'auto', // Maintains aspect ratio
  '@media (max-width: 768px)': {
    width: '250px',
    height: 'auto',
  },
});

// Modal overlay styling
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

// Form styling
const FormGroup = styled(Form.Group)({
  marginBottom: '1rem',
});

const ProductList = ({ products: initialProducts }) => {
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
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'count', headerName: 'Count', width: 100 }, // Ensure this is included
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
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <StyledButton
          variant="edit"
          onClick={(e) => handleEdit(e, params.row)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </StyledButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <StyledButton
          variant="delete"
          onClick={(e) => handleDelete(e, params.row._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </StyledButton>
      ),
    },
  ], [handleDelete, handleEdit]);

  const [sortModel, setSortModel] = useState([
    {
      field: 'title',
      sort: 'asc',
    },
  ]);

  const getRowId = (row) => row._id;

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ padding: '20px' }}>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search..."
            style={{
              marginBottom: '10px',
              padding: '8px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <CustomDataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            onRowClick={handleRowClick}
            getRowId={getRowId}
          />
        </>
      )}

      {/* Modal for displaying selected product */}
      {showModal && (
        <Overlay>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
          >
            <ModalHeader closeButton>
              <Modal.Title>Product Details</Modal.Title>
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <ImageAndQRCode>
                  <ImageContainer>
                    <ProductImage
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                    />
                  </ImageContainer>
                  <QRCodeImage
                    src={selectedProduct.qrCode}
                    alt="QR Code"
                  />
                </ImageAndQRCode>
              </ModalContent>
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <p>
                <strong>Count:</strong> {selectedProduct.count}
              </p>
            </ModalBody>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Overlay>
      )}

      {/* Edit Modal for updating product */}
      {showEditModal && (
        <Overlay>
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
            size="lg"
          >
            <ModalHeader closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </ModalHeader>
            <ModalBody>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Updating...</p>
                </div>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              {!loading && (
                <Form>
                  <FormGroup controlId="formProductTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editProduct.title || ''}
                      onChange={handleInputChange}
                      isInvalid={!editProduct.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a title.
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={editProduct.price || ''}
                      onChange={handleInputChange}
                      isInvalid={!editProduct.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a price.
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup controlId="formProductCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={editProduct.category || ''}
                      onChange={handleInputChange}
                      isInvalid={!editProduct.category}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a category.
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup controlId="formProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={editProduct.description || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="formProductRating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating"
                      value={editProduct.rating || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="formProductCount">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      type="number"
                      name="count"
                      value={editProduct.count || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Form>
              )}
            </ModalBody>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateProduct}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Overlay>
      )}
    </div>
  );
};

export default ProductList;
