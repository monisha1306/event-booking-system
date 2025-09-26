import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config";

export default function AttendeeEventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  // Fetch events from backend after login
  useEffect(() => {
    console.log("🔄 useEffect triggered");

    const token = localStorage.getItem("access"); // get JWT token
    if (!token) {
      console.log("⚠️ No token found, user not logged in");
      return;
    }

   axios.get('http://127.0.0.1:8000/api/events/', {
      headers: {
        Authorization: `Bearer ${token}` // attach token
      }
    })
    .then(res => setEvents(res.data))
    .catch(err => console.log("Axios error:", err));
  }, [navigate]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // Format time (HH:MM -> 12hr format)
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesKeyword = event.title.toLowerCase().includes(search.toLowerCase()) ||
                           event.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? event.category.toLowerCase().includes(category.toLowerCase()) : true;
    const matchesDate = date ? event.date.startsWith(date) : true;
    const matchesLocation = location ? event.location?.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesKeyword && matchesCategory && matchesDate && matchesLocation;
  });

  // Navigate to event booking page
  const handleBook = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container mt-4">
      <h2>Available Events</h2>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search by keyword"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Event Cards */}
      <div className="row">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="col-md-4 mb-3">
              <div className="card h-100">
                {event.banner_image && (
                  <img
                    src={event.banner_image.replace("http://localhost:5000", "http://127.0.0.1:8000/media")}
                    className="card-img-top"
                    alt={event.title}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text"><strong>Date:</strong> {formatDate(event.date)}</p>
                  <p className="card-text"><strong>Start Time:</strong> {formatTime(event.start_time)}</p>
                  <p className="card-text"><strong>End Time:</strong> {formatTime(event.end_time)}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <p className="card-text"><strong>Category:</strong> {event.category}</p>
                  <button className="btn btn-success" onClick={() => handleBook(event.id)}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
