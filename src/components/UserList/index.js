import React, { useState, useMemo, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateUser, deleteUser } from '../../actions/user.action'; // Import actions

// Styled components
const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    height: '90vh',
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
  width: '100%',
});

const UserList = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = useCallback((event, user) => {
    event.stopPropagation();
    setEditUser(user);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((event, userId) => {
    event.stopPropagation();
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error('Failed to delete user:', error);
      });
  }, [users]);

  const handleUpdateUser = () => {
    setLoading(true);
    setError(null);

    // Simple validation
    if (!editUser.firstName || !editUser.lastName || !editUser.email) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    updateUser(editUser._id, editUser)
      .then((updatedUser) => {
        setUsers(
          users.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
        setShowEditModal(false);
      })
      .catch((error) => {
        setError('Failed to update user. Please try again.');
        console.error('Failed to update user:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowClick = (params) => {
    setSelectedUser(params.row);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const columns = useMemo(() => [
    {
      field: 'profilePicture',
      headerName: 'Profile Picture',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="User"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      ),
    },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 },
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
      field: 'firstName',
      sort: 'asc',
    },
  ]);

  const getRowId = (row) => row._id;

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className='user-card-div'>
      {users.length === 0 ? (
        <p>No users available</p>
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
            rows={filteredUsers}
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

      {/* Modal for displaying selected user */}
      {showModal && (
        <Overlay>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
          >
            <ModalHeader closeButton>
              <Modal.Title>{selectedUser.firstName} {selectedUser.lastName}</Modal.Title>
            </ModalHeader>
            <ModalBody>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
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

      {/* Edit Modal for updating user */}
      {showEditModal && (
        <Overlay>
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
            size="lg"
          >
            <ModalHeader closeButton>
              <Modal.Title>Edit User</Modal.Title>
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
                  <FormGroup controlId="formUserFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={editUser.firstName || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup controlId="formUserLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={editUser.lastName || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup controlId="formUserEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={editUser.email || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup controlId="formUserRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter role"
                      name="role"
                      value={editUser.role || ''}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <Button
                    variant="primary"
                    onClick={handleUpdateUser}
                  >
                    Save Changes
                  </Button>
                </Form>
              )}
            </ModalBody>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Overlay>
      )}
    </div>
  );
};

export default UserList;
