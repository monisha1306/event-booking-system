import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SeatingLayout.css";

export default function SeatingLayout() {
  const { id } = useParams(); 
  const [sections, setSections] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example booked seats (replace with backend data if needed)
  const bookedSeats = ["VIP-4", "General-10"]; // ✅ now consistent with seatNumber format

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/tickettier/${id}`)
      .then((res) => {
        setSections(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ticket tiers:", err);
        setLoading(false);
      });
  }, [id]);

  // Toggle seats using seatNumber format
  const toggleSeat = (sectionName, seatNumber) => {
    const seatKey = `${sectionName}-${seatNumber}`; // store as "VIP-22"
    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  if (loading) return <p>Loading seats...</p>;

  return (
    <div className="layout-container">
      <h2 className="title">🎬 Select Your Seats</h2>
      <div className="screen">SCREEN</div>

      <div className="seating-area">
        {sections && sections.length > 0 ? (
          sections.map((section, index) => {
            const rows = Math.ceil(section.quantity / 40); // 40 seats per row
            const seatsPerRow = 40;

            return (
              <div key={index} className="section">
                <h3 className="section-title">
                  {section.name} (₹{section.price})
                </h3>
                <div className="seat-grid">
                  {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                      <span className="row-label">
                        {String.fromCharCode(65 + rowIndex)}
                      </span>
                      {[...Array(seatsPerRow)].map((_, seatIndex) => {
                        const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                        if (seatNumber > section.quantity) return null;

                        // ✅ consistent key format
                        const seatKey = `${section.name}-${seatNumber}`;
                        const isSelected = selectedSeats.includes(seatKey);
                        const isBooked = bookedSeats.includes(seatKey);

                        return (
                          <div
                            key={seatIndex}
                            className={`seat ${
                              isBooked
                                ? "booked"
                                : isSelected
                                ? "selected"
                                : "available"
                            }`}
                            onClick={() => !isBooked && toggleSeat(section.name, seatNumber)}
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p>No seat data found.</p>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <h5>
          Selected Seats:{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </h5>
        <button
          className="btn continue"
          disabled={selectedSeats.length === 0}
          onClick={() =>
            alert(`Booking confirmed for ${selectedSeats.join(", ")}`)
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}
