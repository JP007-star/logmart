import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import addUser from "../../actions/user.action";

const AddUser = ({ onCancel, onSubmit }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
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
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(user);
      setSuccessMessage('User added successfully');
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
      console.error('Error:', error.message);
    }
  };

  return (
    <Card className="col-md-12">
      <Card.Body>
        <Card.Title>Add User</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
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
            </Col>
            <Col>
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
            </Col>
          </Row>
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
              name="profilePicture"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Row className="m-3">
            <Col>
              <Button variant="secondary" onClick={onCancel} className="w-100">
                Back
              </Button>
            </Col>
            <Col>
              <Button variant="warning" type="submit" className="w-100">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
