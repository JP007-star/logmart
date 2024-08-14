import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled components
const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-root': {
    height: '450px',
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
  width: '300px', // Set to desired QR code size
  height: '300px', // Set to desired QR code size
  objectFit: 'cover',
  '@media (max-width: 768px)': {
    width: '250px', // Adjust size for mobile screens
    height: '250px', // Adjust size for mobile screens
  },
});

const ProductImage = styled('img')({
  width: '300px', // Set to the same size as QR code
  height: '300px', // Set to the same size as QR code
  objectFit: 'cover',
  '@media (max-width: 768px)': {
    width: '250px', // Adjust size for mobile screens
    height: '250px', // Adjust size for mobile screens
  },
});

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Image',
        width: 250,
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
          <StyledButton variant="edit" onClick={() => handleEdit(params.value)}>
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
            onClick={() => handleDelete(params.value)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </StyledButton>
        ),
      },
    ],
    []
  );

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

  const handleEdit = (id) => {
    // Handle edit action here
  };

  const handleDelete = (id) => {
    // Handle delete action here
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
    setShowModal(true);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      {products.length === 0 ? (
        <div className="text-center">No products available.</div>
      ) : (
        <CustomDataGrid
          rows={filteredProducts}
          columns={columns}
          pageSize={10}
          sortingOrder={['asc', 'desc']}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={getRowId}
          onRowClick={handleRowClick}
          components={{
            Toolbar: () => (
              <div style={{ padding: '8px' }}>
                {/* Search bar */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{
                    padding: '8px',
                    marginRight: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    width: '100%',
                    maxWidth: '400px',
                  }}
                />
              </div>
            ),
          }}
        />
      )}

      {/* Modal for displaying product details */}
      {selectedProduct && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
          dialogClassName="modal-90w" // Increase modal width
        >
          <ModalHeader closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
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
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </ModalBody>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
