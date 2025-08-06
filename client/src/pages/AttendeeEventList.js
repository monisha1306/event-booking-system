import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AttendeeEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
