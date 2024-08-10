import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

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
  const columns = React.useMemo(
    () => [
      { field: '_id', headerName: 'Order ID', width: 150 },
      { field: 'userId', headerName: 'User ID', width: 150 },
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
        field: 'products',
        headerName: 'Products',
        width: 400,
        renderCell: (params) => (
          <ProductsTableContainer>
            <ProductsTable>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {params.value.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productId}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </ProductsTable>
          </ProductsTableContainer>
        ),
      },
      {
        field: 'view',
        headerName: 'View',
        width: 100,
        renderCell: (params) => (
          <ViewButton onClick={() => handleViewDetails(params.row)}>
            View
          </ViewButton>
        ),
      },
    ],
    []
  );

  const handleViewDetails = (order) => {
    alert(
      `Order Details:\n\nOrder ID: ${order._id}\nUser ID: ${order.userId}\nTotal Amount: $${order.totalAmount.toFixed(
        2
      )}\nOrder Date: ${new Date(order.orderDate).toLocaleString()}\nProducts: ${order.products
        .map(
          (product) =>
            `\n  - Product ID: ${product.productId}, Quantity: ${product.quantity}`
        )
        .join('')}`
    );
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
            rows={filteredOrders}
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
    </OrderListContainer>
  );
};

export default OrderList;
