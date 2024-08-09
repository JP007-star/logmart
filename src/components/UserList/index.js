import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  userDNS } from '../../config';
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

const UserList = ({ users, darkMode }) => {
  const columns = React.useMemo(
    () => [
      { field: 'profilePicture', headerName: 'Profile Picture', width: 150, renderCell: (params) => (<img src={userDNS+params.value} alt="Profile" style={{ width: 50, borderRadius: '50%' }} />) },
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 300 },
      { field: 'role', headerName: 'Role', width: 150 },
      { field: 'edit', headerName: 'Action', width: 100 , renderCell: (params) => (<button className='btn btn-outline-primary' onClick={() => handleEdit(params.value)}><FontAwesomeIcon icon={faEdit}/></button>), },
      { field: 'delete', headerName: 'Action', width: 100 , renderCell: (params) => (<button className='btn btn-outline-danger' onClick={() => handleDelete(params.value)}><FontAwesomeIcon icon={faTrash}/></button>), },

    ],
    []
  );

  const [sortModel, setSortModel] = useState([
    {
      field: 'firstName',
      sort: 'asc',
    },
  ]);

  const getRowId = (row) => row._id;

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const handleEdit = (event) => {
   
  };
  const handleDelete= (event) => {
   
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      {users.length === 0 ? (
        <div className="text-center">No users available.</div>
      ) : (
        <CustomDataGrid
          rows={filteredUsers}
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

export default UserList;
