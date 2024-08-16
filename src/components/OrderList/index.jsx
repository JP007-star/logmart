import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import the CSS file

// Styled components for DataGrid and other elements
const FixedContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  height: 100vh; /* Full viewport height for the container */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Hide overflow to control scrolling manually */
  
  @media (max-width: 768px) {
    padding: 8px; /* Reduce padding on medium screens */
  }

  @media (max-width: 480px) {
    padding: 4px; /* Further reduce padding on small screens */
  }
`;

const Header = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #fff;
  color: #111;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd; /* Add border for headers */
  z-index: 1; /* Ensure the header stays on top */
`;

const Footer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd; /* Border on top of footer */
`;

const CustomDataGrid = styled(DataGrid)`
  flex: 1; /* Allow grid to take up available space */
  overflow: hidden; /* Hide overflow within the grid container */

  .MuiDataGrid-columnHeader {
    background-color: #fff;
    color: #111;
  }

  .MuiDataGrid-cell {
    border-bottom: 1px solid #ddd; /* Add border for cells */
    padding: 8px; /* Adjust padding for cells */
    overflow: hidden;
  }

  .MuiDataGrid-row {
    border-bottom: 1px solid #ddd; /* Add border between rows */
  }

  .MuiDataGrid-footerContainer {
    background-color: #f5f5f5;
    border-top: 1px solid #ddd; /* Border on top of footer */
  }
`;

const SearchBar = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 480px) {
    width: 100%; /* Full width on small screens */
    margin-bottom: 8px; /* Reduce margin on small screens */
  }
`;

const ProductsTableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Add horizontal scroll for the table */
  max-height: 400px; /* Limit height to enable vertical scrolling */
`;

const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
    height: 40px; /* Fixed height for better alignment */
    vertical-align: middle; /* Center content vertically */
  }

  @media (max-width: 768px) {
    th, td {
      padding: 6px;
      font-size: 0.8rem; /* Adjust font size on medium screens */
    }
  }

  @media (max-width: 480px) {
    th, td {
      padding: 4px;
      font-size: 0.7rem; /* Adjust font size on small screens */
    }
  }
`;

const OrderList = ({ orders }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        field: 'name',
        headerName: 'User Name',
        width: 150,
      },
      {
        field: 'email',
        headerName: 'User Email',
        width: 200,
      },
      {
        field: 'shippingAddress',
        headerName: 'Shipping Address',
        width: 300,
        renderCell: (params) => (
          <div>
            {params.value.street === 'Take Away' ? 'Take Away' : (
              <>
                {params.value.street}, {params.value.city}, {params.value.state}, {params.value.country}, {params.value.postalCode}
              </>
            )}
          </div>
        ),
      },
      {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 120,
        renderCell: (params) => `₹${params.value.toFixed(2)}`,
      },
      {
        field: 'orderDate',
        headerName: 'Order Date',
        width: 180,
        renderCell: (params) => new Date(params.value).toLocaleString(),
      },
    ],
    []
  );

  const handleRowClick = (params) => {
    setSelectedOrder(params.row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const [sortModel, setSortModel] = useState([
    {
      field: 'orderDate',
      sort: 'asc',
    },
  ]);

  const getRowId = (row) => row._id;

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const { user, shippingAddress, totalAmount, orderDate, products } = order;
    const userName = user.name || '';
    const userEmail = user.email || '';
    const address = [
      shippingAddress.street || '',
      shippingAddress.city || '',
      shippingAddress.state || '',
      shippingAddress.country || '',
      shippingAddress.postalCode || '',
    ].join(' ');

    const productsList = products.map(product => `${product.name} ${product.quantity} ${product.price}`).join(' ');

    return (
      userName.toLowerCase().includes(searchText.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchText.toLowerCase()) ||
      address.toLowerCase().includes(searchText.toLowerCase()) ||
      totalAmount.toString().includes(searchText) ||
      new Date(orderDate).toLocaleString().toLowerCase().includes(searchText.toLowerCase()) ||
      productsList.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <FixedContainer className='order-card-div'>
      <Header>
        <SearchBar
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </Header>
      <CustomDataGrid
        rows={filteredOrders.map((order) => ({
          ...order,
          name: order.user.name || 'N/A',
          email: order.user.email || 'N/A',
          shippingAddress: order.shippingAddress || {
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
          },
        }))}
        columns={columns}
        pageSize={10}
        sortingOrder={['asc', 'desc']}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        checkboxSelection={false}
        disableSelectionOnClick
        onRowClick={handleRowClick} // Handle row click event
        getRowId={getRowId}
      />
      <Footer>
        {/* This is where the pagination controls will be placed */}
        {/* You can customize this based on DataGrid pagination component */}
      </Footer>
      {selectedOrder && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          size="lg"
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>User Name:</strong> {selectedOrder.user.name}</p>
            <p><strong>User Email:</strong> {selectedOrder.user.email}</p>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
            <p><strong>Shipping Address:</strong><br />
              {selectedOrder.shippingAddress.street === 'Take Away' ? 'Take Away' : (
                <>
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.country}, {selectedOrder.shippingAddress.postalCode}
                </>
              )}
            </p>
            <h6>Products</h6>
            <ProductsTableContainer>
              <ProductsTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products && selectedOrder.products.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>₹{product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </ProductsTable>
            </ProductsTableContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </FixedContainer>
  );
};

export default OrderList;
