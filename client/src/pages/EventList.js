import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Get JWT token from localStorage (assuming user is logged in)
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("✅ Events received:", res.data);
        setEvents(res.data);
      })
      .catch(err => console.error("❌ Error fetching events:", err));
  }, [token]);

  const handleBook = async (event) => {
    const seatNumber = prompt("Enter seat number:");
    if (!seatNumber) return alert("Booking cancelled");

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', {
        event: event.id,
        seat_number: seatNumber
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ Booking response:", response.data);
      alert("Booking Successful!");
      navigate('/my-transactions');
    } catch (error) {
      console.error("❌ Booking error:", error);
      if (error.response) {
        alert(error.response.data.detail || "Booking failed.");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Events</h2>
      <div className="row">
        {events.length > 0 ? events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card">
              {event.banner_image && (
                <img src={event.banner_image} className="card-img-top" alt="banner" />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{event.date ? new Date(event.date).toLocaleDateString() : "No date"} | {event.location}</p>
                <p>{event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <button className="btn btn-success" onClick={() => handleBook(event)}>Book Now</button>
                <Link to={`/organizer/edit/${event.id}`} className="btn btn-warning mt-2 ms-2">Edit</Link>
              </div>
            </div>
          </div>
        )) : <p>No events available</p>
        }
      </div>
    </div>
  );
}