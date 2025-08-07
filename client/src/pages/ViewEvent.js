import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const found = events.find(ev => ev.id.toString() === id); // Ensure string comparison
    setEvent(found);
  }, [id]);

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="container mt-4">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <img src={event.banner} alt="Banner" style={{ maxWidth: '100%', maxHeight: '300px' }} />
    </div>
  );
}
