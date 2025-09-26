import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

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
    banner: null,
    tickets: {
      vip: { quantity: '', price: '' },
      earlyBird: { quantity: '', price: '' },
      general: { quantity: '', price: '' },
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
        [type]: { ...prev.tickets[type], [field]: value },
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, banner: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertTo24Hour = (time, ampm) => {
    if (!time) return '';
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2,'0')}:${minutes}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      alert("You must be logged in to create an event");
      return;
    }

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("start_time", convertTo24Hour(eventData.startTime, eventData.startAmPm));
    formData.append("end_time", convertTo24Hour(eventData.endTime, eventData.endAmPm));
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    formData.append("category", eventData.category);

    if (eventData.banner) formData.append("banner_image", eventData.banner);

    formData.append("organizer_name", eventData.organizerName);
    formData.append("organizer_contact", eventData.organizerContact);

    const ticketArray = [
      { name: "VIP", price: eventData.tickets.vip.price, quantity: eventData.tickets.vip.quantity },
      { name: "Early Bird", price: eventData.tickets.earlyBird.price, quantity: eventData.tickets.earlyBird.quantity },
      { name: "General", price: eventData.tickets.general.price, quantity: eventData.tickets.general.quantity },
    ].filter(t => t.name && t.price && t.quantity);

    formData.append("ticket_tiers", JSON.stringify(ticketArray));

    try {
      const res = await fetch(`${BASE_URL}api/events/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Event created successfully!");
        navigate("/");
      } else {
        const err = await res.json();
        console.error("Create Event Error:", err);
        alert("Failed to create event. Check console for details.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Event fields */}
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

        {/* Ticket Details */}
        <h4>Ticket Details</h4>
        {['vip', 'earlyBird', 'general'].map((type) => (
          <div key={type} className="border p-3 mb-3">
            <h5>{type === 'vip' ? 'VIP' : type === 'earlyBird' ? 'Early Bird' : 'General'}</h5>
            <div className="mb-3">
              <label>Tickets Available:</label>
              <input type="number" min="0" value={eventData.tickets[type].quantity} onChange={(e) => handleTicketChange(type, 'quantity', e.target.value)} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Ticket Price:</label>
              <input type="number" min="0" step="0.01" value={eventData.tickets[type].price} onChange={(e) => handleTicketChange(type, 'price', e.target.value)} className="form-control" required />
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