import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
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
              {event.banner && (
                <img src={event.banner} className="card-img-top" alt="banner" />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{event.date} | {event.location}</p>
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
