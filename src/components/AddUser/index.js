import React, { useState } from 'react';
import { Card, Form, Button, Row, Alert } from 'react-bootstrap';

const AddUser = ({ onCancel, onSubmit }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: null, // Add profilePicture field to user state
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      profilePicture: e.target.files[0], // Set profilePicture to the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('profilePicture', user.profilePicture); // Append profilePicture to the form data

    try {
      const response = await fetch('http://localhost:9001/api/v1/admin/signup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
        return;
      }

      setSuccessMessage('User added successfully');

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      setError('An error occurred');
      console.error('Error:', error.message);
    }
  };

  return (
    <Card className='col-md-12'>
      <Card.Body>
        <Card.Title>Add User</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="profilePicture">
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Row className='flex-grow'>
            <Button className="form-control mt-3" variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="form-control mt-3"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
