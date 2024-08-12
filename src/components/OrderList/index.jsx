import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './style.css'; // Import the CSS file

// Styled components for DataGrid and other elements
const CustomDataGrid = styled(DataGrid)`
  height: 100%;
  width: 100%;
  min-height: 400px;

  .MuiDataGrid-root {
    font-size: 0.9rem; /* Default font size */
  }

  @media (max-width: 768px) {
    .MuiDataGrid-root {
      font-size: 0.8rem; /* Smaller font size for medium screens */
    }
  }

  @media (max-width: 480px) {
    .MuiDataGrid-root {
      font-size: 0.7rem; /* Even smaller font size for small screens */
    }

    .MuiDataGrid-columnHeader {
      display: none; /* Hide headers on very small screens */
    }
  }
`;

const OrderListContainer = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow-x: auto; /* Horizontal scroll for the whole container */
  overflow-y: auto; /* Vertical scroll if needed */

  @media (max-width: 768px) {
    padding: 8px; /* Reduce padding on medium screens */
  }

  @media (max-width: 480px) {
    padding: 4px; /* Further reduce padding on small screens */
  }
`;

const SearchBar = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;

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

const ViewButton = styled.button`
  padding: 4px 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OrderList = ({ orders }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        field: 'userName',
        headerName: 'User Name',
        width: 150,
      },
      {
        field: 'userEmail',
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
        renderCell: (params) => `$${params.value.toFixed(2)}`,
      },
      {
        field: 'orderDate',
        headerName: 'Order Date',
        width: 180,
        renderCell: (params) => new Date(params.value).toLocaleString(),
      },
      {
        field: 'view',
        headerName: 'View',
        width: 100,
        renderCell: (params) => (
          <ViewButton onClick={() => handleOpenModal(params.row)}>
            View
          </ViewButton>
        ),
      },
    ],
    []
  );

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some(
      (value) =>
        value &&
        (typeof value === 'string' || typeof value === 'number') &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <OrderListContainer>
      {orders.length === 0 ? (
        <div className="text-center">No orders available.</div>
      ) : (
        <>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <CustomDataGrid
            rows={filteredOrders.map((order) => ({
              ...order,
              userName: 'John Doe', // Replace with actual user name if available
              userEmail: order.user.email || 'N/A', // Add user email here
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
            getRowId={getRowId}
          />
        </>
      )}
      {selectedOrder && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          className="modal-paper" // Apply custom CSS class
        >
          <Box className="modal-content">
            <IconButton
              className="modal-close-button" // Apply custom CSS class
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>User Name:</strong> {selectedOrder.userName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>User Email:</strong> {selectedOrder.userEmail}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Shipping Address:</strong><br />
              {selectedOrder.shippingAddress.street === 'Take Away' ? 'Take Away' : (
                <>
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.country}, {selectedOrder.shippingAddress.postalCode}
                </>
              )}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
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
                  {selectedOrder.products.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </ProductsTable>
            </ProductsTableContainer>
          </Box>
        </Modal>
      )}
    </OrderListContainer>
  );
};

export default OrderList;
