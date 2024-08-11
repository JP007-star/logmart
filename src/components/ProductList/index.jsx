import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  },
});

const StyledButton = styled('button')(({ theme, variant }) => ({
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

const ProductList = ({ products }) => {
  console.log(products);
  
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
      { field: 'title', headerName: 'Title', width: 400 },
      { field: 'price', headerName: 'Price', width: 150 },
      
      { field: 'category', headerName: 'Category', width: 150 },
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
      // {
      //   field: 'description',
      //   headerName: 'Description',
      //   width: 250,
      //   renderCell: (params) => (
      //     <div
      //       style={{
      //         maxHeight: '100px',
      //         overflowY: 'auto',
      //         textOverflow: 'ellipsis',
      //       }}
      //     >
      //       {params.value}
      //     </div>
      //   ),
      // },
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
    </div>
  );
};

export default ProductList;
