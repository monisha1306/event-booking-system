import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AttendeeEventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
  console.log("🔄 useEffect triggered");
  axios.get('http://localhost:5000/events')
    .then(res => {
      console.log("✅ Events received:", res.data);
      setEvents(res.data);
    })
    .catch(err => console.log("❌ Axios error:", err));
}, []);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredEvents = events.filter(event => {
    const matchesKeyword = event.title.toLowerCase().includes(search.toLowerCase()) ||
                           event.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? event.category.toLowerCase().includes(category.toLowerCase()) : true;
    const matchesDate = date ? event.date.startsWith(date) : true; // ✅ match date string
    const matchesLocation = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesKeyword && matchesCategory && matchesDate && matchesLocation;
  });

  const handleBook = (eventId) => {
    const bookedEvent = events.find(e => e.id === eventId);
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const newTransaction = {
      id: Date.now(),
      eventId: bookedEvent.id,
      eventTitle: bookedEvent.title,
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
    alert('Booked successfully!');
  };

  return (
    <div className="container mt-4">
      <h2>Available Events</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <input type="text" placeholder="Search by keyword" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="text" placeholder="Category" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="text" placeholder="Location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>

      <div className="row">
        {filteredEvents.map(event => (
          <div key={event.id} className="col-md-4 mb-3">
            <div className="card h-100">
              {event.banner_image && (
                <img src={event.banner_image} className="card-img-top" alt="Event Banner" style={{ maxHeight: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text"><strong>Date:</strong> {formatDate(event.date)}</p>
                <p className="card-text"><strong>Time:</strong> {event.time}</p>
                <p className="card-text"><strong>Location:</strong> {event.location}</p>
                <p className="card-text">{event.description}</p>
                <p className="card-text"><strong>Category:</strong> {event.category}</p>
                <button className="btn btn-success" onClick={() => handleBook(event.id)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
