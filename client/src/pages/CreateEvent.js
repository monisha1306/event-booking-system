import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    category: '',
    banner: '',
    ticketType: 'VIP', 
    quantity: '',
    price: '',
    organizerName: '',
    organizerContact: '',
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

    const newEvent = {
      id: Date.now(),
      ...eventData,
    };

    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    existingEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(existingEvents));

    alert('Event created successfully!');
    navigate(`/view-event/${newEvent.id}`);
  };

  return (
    <div className="container mt-5">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label>Title:</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} className="form-control" required />
        </div>

       
        <div className="mb-3">
          <label>Date:</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} className="form-control" required />
        </div>

        
        <div className="mb-3">
          <label>Start Time:</label>
          <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} className="form-control" required />
        </div>

        
        <div className="mb-3">
          <label>End Time:</label>
          <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} className="form-control" required />
        </div>

        
        <div className="mb-3">
          <label>Location:</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} className="form-control" required />
        </div>

        
        <div className="mb-3">
          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} className="form-control" required />
        </div>

     
        <div className="mb-3">
          <label>Category:</label>
          <input type="text" name="category" value={eventData.category} onChange={handleChange} className="form-control" required />
        </div>

        
        <div className="mb-3">
          <label>Banner Image:</label>
          <input type="file" onChange={handleImageChange} className="form-control" />
          {preview && <img src={preview} alt="Preview" className="mt-3" style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>

        
        <div className="mb-3">
          <label>Ticket Type:</label>
          <select name="ticketType" value={eventData.ticketType} onChange={handleChange} className="form-control">
            <option value="VIP">VIP</option>
            <option value="Early Bird">Early Bird</option>
            <option value="General">General</option>
          </select>
        </div>

        
        <div className="mb-3">
          <label>Total Tickets Available:</label>
          <input type="number" name="quantity" value={eventData.quantity} onChange={handleChange} className="form-control" min="1" required />
        </div>

        <div className="mb-3">
          <label>Ticket Price:</label>
          <input type="number" name="price" value={eventData.price} onChange={handleChange} className="form-control" min="0" step="0.01" required />
        </div>

       
        <div className="mb-3">
          <label>Organizer Name:</label>
          <input type="text" name="organizerName" value={eventData.organizerName} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Organizer Contact:</label>
          <input type="text" name="organizerContact" value={eventData.organizerContact} onChange={handleChange} className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
}
