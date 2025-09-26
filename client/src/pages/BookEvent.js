import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { BASE_URL } from "../config";

const BookEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [ticketType, setTicketType] = useState("Regular");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access"); // JWT from login

  // Load selected event from localStorage if available
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const selected = JSON.parse(localStorage.getItem("selectedEvent"));
    if (!selected || selected.id.toString() !== eventId) {
      // Optionally fetch from backend if localStorage not set
      axios.get(`${BASE_URL}api/events/${eventId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load event.");
      });
    } else {
      setEvent(selected);
    }
  }, [eventId, navigate, token]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!quantity || quantity < 1) {
      setError("Please enter a valid quantity.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}api/booking/`,
        {
          event: eventId,
          ticket_type: ticketType,
          quantity: quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Booking Successful!");
        // Optional: Clear selected event
        localStorage.removeItem("selectedEvent");
        // Redirect after 2 sec
        setTimeout(() => navigate("/ticketconfirmation"), 2000);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Booking Failed! Try again.");
    }
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <Container className="mt-4">
      <h2>Book Event: {event.title}</h2>
      <p>{event.description}</p>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleBooking}>
        <Form.Group className="mb-3">
          <Form.Label>Ticket Type</Form.Label>
          <Form.Select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            {event.ticket_tiers?.map(tier => (
              <option key={tier.id} value={tier.name}>{tier.name} - ₹{tier.price}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">Book Now</Button>
      </Form>
    </Container>
  );
};

export default BookEvent;
