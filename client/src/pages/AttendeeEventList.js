import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
import { Link } from 'react-router-dom';
>>>>>>> 6820a09a86b2f4f31fb16469316b2c75dd2b7379

export default function AttendeeEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Events</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="row">
          {events.map(event => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div className="card h-100 shadow-sm">
                {event.banner && (
                  <img 
                    src={event.banner} 
                    className="card-img-top" 
                    alt="Event Banner" 
                    style={{ maxHeight: '180px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text"><strong>Date:</strong> {event.date}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <Link to={`/event/${event.id}`} className="btn btn-primary mt-auto">
                    View Details
                  </Link>
                </div>
>>>>>>> 6820a09a86b2f4f31fb16469316b2c75dd2b7379
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
