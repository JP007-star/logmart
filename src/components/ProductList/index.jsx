import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-root': {
    height: '500px',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#212529',
      color: '#fff',
    },
    '& .MuiDataGrid-cell': {
      overflow: 'hidden',
    },
  },
});
const ProductList = ({ products, darkMode }) => {
  const columns = React.useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Image',
        width: 150,
        renderCell: (params) => (
          <img
            src={params.value}
            alt="Product"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        ),
      },
      { field: 'title', headerName: 'Title',width: 250 },
      { field: 'price', headerName: 'Price',width: 150 },
      {
        field: 'description',
        headerName: 'Description',
        width: 150 ,
        renderCell: (params) => (
          <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {params.value}
          </div>
        ),
      },
      { field: 'category', headerName: 'Category', width: 150 },
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

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchText.toLowerCase())
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
          components={{
            Toolbar: () => (
              <div style={{ padding: '8px' }}>
                {/* Search bar */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ padding: '8px', marginRight: '8px' }}
                />
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
