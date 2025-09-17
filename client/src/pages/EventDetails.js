import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => {
        const foundEvent = res.data.find(e => String(e.id) === String(id));
        setEvent(foundEvent || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching events:", err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  const handleBooking = () => {
  
    navigate(`/seating/${id}`);
  };

  if (loading) return <p className="text-center mt-5">Loading event details...</p>;
  if (!event) return <p className="text-center mt-5">Event not found</p>;

  return (
    <div className="container my-4">
      {/* Back Button */}
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back to Events</button>
      </div>

      {/* Event Card */}
      <div className="card shadow-sm p-3">
        <div className="row g-3">
          {/* Left: Small banner */}
          {event.banner_image && (
            <div className="col-md-4">
              <img
                src={event.banner_image.replace("http://localhost:5000", "http://localhost:8000/media")}
                alt={event.title}
                className="img-fluid rounded"
                style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
              />
            </div>
          )}

          {/* Right: Event Details */}
          <div className="col-md-8">
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            <p><strong>Time:</strong> {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>

            <div className="mt-3">
              <h5>About the Event</h5>
              <p>{event.description}</p>
            </div>

            <div className="mt-3">
              <h5>Venue Information</h5>
              <p>
                {event.venue_details 
                  ? event.venue_details 
                  : "This venue offers ample seating, modern facilities, and a comfortable environment for attendees. Located at the heart of the city, it is easily accessible via public transport and has nearby parking options."}
              </p>
                      </div>
                      <div className="mt-4">
  <h5>Do's and Don'ts</h5>
  <div className="row">
    {/* Do's */}
    <div className="col-md-6">
      <div className="card p-3 shadow-sm border-success">
        <h6 className="text-success">✅ Do's</h6>
        <ul>
          <li>Carry a valid ID proof for entry.</li>
          <li>Reach the venue at least 30 minutes early.</li>
          <li>Follow the seating arrangements provided.</li>
          <li>Respect fellow attendees and staff.</li>
                                          <li>Keep your ticket/QR code handy for scanning.</li>
                                          <li>Do switch your mobile phones to silent mode during sessions.</li>

        
        </ul>
      </div>
    </div>

    {/* Don'ts */}
    <div className="col-md-6">
      <div className="card p-3 shadow-sm border-danger">
        <h6 className="text-danger">❌ Don'ts</h6>
        <ul>
          <li>Do not carry outside food or drinks.</li>
          <li>Smoking or alcohol consumption is not allowed.</li>
          <li>Avoid bringing large bags or restricted items.</li>
          <li>Do not record or live-stream without permission.</li>
          <li>Please avoid littering inside or outside the venue.</li>
        
        </ul>
      </div>
    </div>
  </div>
</div>


            {/* Continue for Booking Button */}
            <div className="mt-4">
              <button 
                className="btn btn-success btn-lg"
                onClick={handleBooking}
              >
                Continue for Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
