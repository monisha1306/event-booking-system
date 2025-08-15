import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Reusing same CSS as login

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // New field for Organizer or Attendee
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.role) {
      setError('Please select whether you are an Organizer or Attendee');
      return;
    }
    if (formData.role === "Organizer") {
      console.log('Signup data:', formData);
      navigate('/organizer/create');
    }
    else {
      navigate('/dashboard');
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Create Your Account</h2>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Role Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Registering as:</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Organizer"
                  name="role"
                  value="Organizer"
                  checked={formData.role === 'Organizer'}
                  onChange={handleChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Attendee"
                  name="role"
                  value="Attendee"
                  checked={formData.role === 'Attendee'}
                  onChange={handleChange}
                  inline
                />
              </div>
            </Form.Group>

            {/* Submit Button */}
            <div className="d-grid gap-2 mb-4">
              <Button variant="primary" type="submit" size="lg">
                Sign Up
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              Already have an account? <Link to="/login">LogIn</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
