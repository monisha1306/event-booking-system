import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    startAmPm: 'AM',
    endTime: '',
    endAmPm: 'AM',
    location: '',
    description: '',
    category: '',
    banner: '',
    tickets: {
      vip: { quantity: '', price: '' },
      earlyBird: { quantity: '', price: '' },
      general: { quantity: '', price: '' }
    },
    organizerName: '',
    organizerContact: ''
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleTicketChange = (type, field, value) => {
    setEventData((prev) => ({
      ...prev,
      tickets: {
        ...prev.tickets,
        [type]: { ...prev.tickets[type], [field]: value }
      }
    }));
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

    // Combine time and AM/PM for saving
    const formattedStartTime = `${eventData.startTime} ${eventData.startAmPm}`;
    const formattedEndTime = `${eventData.endTime} ${eventData.endAmPm}`;

    // Calculate total tickets and total revenue
    const totalTickets =
      Number(eventData.tickets.vip.quantity || 0) +
      Number(eventData.tickets.earlyBird.quantity || 0) +
      Number(eventData.tickets.general.quantity || 0);

    const totalRevenue =
      (Number(eventData.tickets.vip.quantity || 0) * Number(eventData.tickets.vip.price || 0)) +
      (Number(eventData.tickets.earlyBird.quantity || 0) * Number(eventData.tickets.earlyBird.price || 0)) +
      (Number(eventData.tickets.general.quantity || 0) * Number(eventData.tickets.general.price || 0));

    const newEvent = {
      id: Date.now(),
      ...eventData,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      totalTickets,
      totalRevenue
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
          <div className="d-flex gap-2">
            <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} className="form-control" required />
            <select name="startAmPm" value={eventData.startAmPm} onChange={handleChange} className="form-select" style={{ maxWidth: '80px' }}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label>End Time:</label>
          <div className="d-flex gap-2">
            <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} className="form-control" required />
            <select name="endAmPm" value={eventData.endAmPm} onChange={handleChange} className="form-select" style={{ maxWidth: '80px' }}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
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

        <h4>Ticket Details</h4>
        {['vip', 'earlyBird', 'general'].map((type) => (
          <div key={type} className="border p-3 mb-3">
            <h5>{type === 'vip' ? 'VIP' : type === 'earlyBird' ? 'Early Bird' : 'General'}</h5>
            <div className="mb-3">
              <label>Tickets Available:</label>
              <input
                type="number"
                min="0"
                value={eventData.tickets[type].quantity}
                onChange={(e) => handleTicketChange(type, 'quantity', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Ticket Price:</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={eventData.tickets[type].price}
                onChange={(e) => handleTicketChange(type, 'price', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        ))}

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
