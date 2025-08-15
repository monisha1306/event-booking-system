import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    organizationName: '' // Only for organizer
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Live validation for each field
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === 'name' && value.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = 'Invalid email address';
    } else if (name === 'password' && value.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (name === 'confirmPassword' && value !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else if (name === 'role' && value === '') {
      newErrors.role = 'Please select a role';
    } else if (name === 'organizationName' && formData.role === 'Organizer' && value.trim() === '') {
      newErrors.organizationName = 'Organization name is required for organizers';
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields at once
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));

    if (Object.keys(errors).length > 0) {
      return; // Don't submit if there are errors
    }

    console.log('Signup data:', formData);
    navigate('/dashboard');
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Create Your Account</h2>
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger" className="text-center">
              Please fix the errors before submitting
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
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
                  isInvalid={!!errors.role}
                />
                <Form.Check
                  type="radio"
                  label="Attendee"
                  name="role"
                  value="Attendee"
                  checked={formData.role === 'Attendee'}
                  onChange={handleChange}
                  inline
                  isInvalid={!!errors.role}
                />
              </div>
              {errors.role && <div className="text-danger small">{errors.role}</div>}
            </Form.Group>

            {/* Extra Field for Organizers */}
            {formData.role === 'Organizer' && (
              <Form.Group className="mb-3">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  name="organizationName"
                  placeholder="Enter your organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  isInvalid={!!errors.organizationName}
                />
                <Form.Control.Feedback type="invalid">{errors.organizationName}</Form.Control.Feedback>
              </Form.Group>
            )}

            {/* Submit Button */}
            <div className="d-grid gap-2 mb-4">
              <Button variant="primary" type="submit" size="lg">
                Sign Up
              </Button>
            </div>

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
