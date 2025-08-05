import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: '',
    banner: null,
    bannerPreview: ''
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const eventToEdit = storedEvents.find(event => event.id === parseInt(eventId));
    if (eventToEdit) setFormData(eventToEdit);
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'banner') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, banner: file, bannerPreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = storedEvents.map(event => event.id === parseInt(eventId) ? { ...formData, id: parseInt(eventId) } : event);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h2>Edit Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Banner Image</Form.Label>
          <Form.Control type="file" name="banner" accept="image/*" onChange={handleChange} />
          {formData.bannerPreview && <img src={formData.bannerPreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        </Form.Group>
        <Button type="submit">Update Event</Button>
      </Form>
    </Container>
  );
};

export default EditEvent;
