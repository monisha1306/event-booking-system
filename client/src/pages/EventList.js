import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => {
        console.log("✅ Events received:", res.data);
        setEvents(res.data);
      })
      .catch(err => console.log("❌ Error fetching events:", err));
  }, []);

  const handleBook = (event) => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const newTransaction = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      amount: 100, // Fixed amount for demo
      date: new Date().toLocaleString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    alert('Booking Successful!');
    navigate('/my-transactions');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card">
              {event.banner_image && ( // ✅ use banner_image from DB
                <img src={event.banner_image} className="card-img-top" alt="banner" />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{new Date(event.date).toLocaleDateString()} | {event.location}</p>
                <p>{event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <button className="btn btn-success" onClick={() => handleBook(event)}>Book Now</button>
                <Link to={`/organizer/edit/${event.id}`} className="btn btn-warning mt-2 ms-2">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
