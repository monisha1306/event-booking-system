// src/components/CreateEvent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: '',
    banner: '', 
  });

  const [preview, setPreview] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData({ ...eventData, banner: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = {
      ...eventData,
      id: Date.now()
    };
    localStorage.setItem('events', JSON.stringify([...events, newEvent]));
    alert('Event Created!');
    navigate('/organizer-events');
  };

  return (
    <div className="container mt-4">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="title" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" name="date" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input type="text" name="location" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" required onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Banner Image</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
        </div>

        {preview && (
          <div className="mb-3">
            <label>Preview:</label><br />
            <img src={preview} alt="Banner Preview" className="img-fluid" style={{ maxHeight: '200px' }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
}
