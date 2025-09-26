import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SeatingLayout.css";

export default function SeatingLayout() {
  const { id } = useParams(); // Event ID
  const [ticketTiers, setTicketTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTicketTiers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/tickets/?event=${id}`);
        const tickets = res.data.map((tier) => ({
          ...tier,
          selectedCount: 0, // track user selection
          available_seats: tier.quantity - tier.booked_quantity, // compute available seats
        }));
        setTicketTiers(tickets);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ticket tiers:", err);
        setLoading(false);
      }
    };

    fetchTicketTiers();
  }, [id]);

  // Handle seat selection
  const handleSeatChange = (tierId, delta) => {
    setTicketTiers((prev) =>
      prev.map((tier) => {
        if (tier.id === tierId) {
          const newCount = tier.selectedCount + delta;
          if (newCount >= 0 && newCount <= tier.available_seats) {
            return { ...tier, selectedCount: newCount };
          }
        }
        return tier;
      })
    );
  };

  // Handle booking
  const handleBooking = async () => {
    const selected = ticketTiers
      .filter((tier) => tier.selectedCount > 0)
      .map((tier) => ({ ticket_tier: tier.id, quantity: tier.selectedCount }));

    if (selected.length === 0) return alert("Select at least one seat.");

    try {
      const token = localStorage.getItem("access");
      if (!token) return alert("You must be logged in to book.");

      const res = await axios.post(
        "http://localhost:8000/api/booking/bookings/",
        {
          event: id,
          ticket_items: selected,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201 || res.status === 200) {
        alert("Booking confirmed!");
        // Update available seats locally
        setTicketTiers((prev) =>
          prev.map((tier) => ({
            ...tier,
            available_seats: tier.available_seats - tier.selectedCount,
            selectedCount: 0,
          }))
        );
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error. Please try again.");
    }
  };

  if (loading) return <p>Loading seat tiers...</p>;
  if (!ticketTiers || ticketTiers.length === 0)
    return <p>No ticket tiers available for this event.</p>;

  return (
    <div className="layout-container">
      <h2 className="title">🎬 Select Your Seats</h2>

      {ticketTiers.map((tier) => (
        <div key={tier.id} className="tier-container mb-3 p-3 border">
          <h4>
            {tier.name} (₹{tier.price}) — Available: {tier.available_seats}
          </h4>
          <div className="d-flex align-items-center gap-2 mt-2">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleSeatChange(tier.id, -1)}
              disabled={tier.selectedCount === 0}
            >
              -
            </button>
            <span>{tier.selectedCount}</span>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleSeatChange(tier.id, 1)}
              disabled={tier.selectedCount >= tier.available_seats}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h5>
          Selected Seats:{" "}
          {ticketTiers
            .filter((tier) => tier.selectedCount > 0)
            .map((tier) => `${tier.name}: ${tier.selectedCount}`)
            .join(", ") || "None"}
        </h5>
        <button
          className="btn btn-primary mt-2"
          disabled={ticketTiers.every((t) => t.selectedCount === 0)}
          onClick={handleBooking}
        >
          Continue
        </button>
      </div>
    </div>
  );
}