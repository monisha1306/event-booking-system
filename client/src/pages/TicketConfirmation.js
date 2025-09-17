import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // You'll need to install: npm install react-qr-code
import './TicketConfirmation.css'
const TicketConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  // Mock data if no booking data passed
  const bookingData = booking || {
    id: 'BK123456',
    event: {
      title: "Music Festival 2023",
      date: "2023-12-15T19:00:00",
      location: "Central Park, New York",
      venue: "Main Stage"
    },
    tickets: [
      { type: "General Admission", quantity: 2, price: 49.99, seat: "GA-25" },
      { type: "General Admission", quantity: 1, price: 49.99, seat: "GA-26" }
    ],
    total: 149.97,
    bookingDate: new Date().toISOString(),
    qrData: `BK123456-${Date.now()}`
  };

  const downloadTicket = () => {
    // Implement ticket download functionality
    alert('Ticket download feature would be implemented here!');
  };

  const addToCalendar = () => {
    // Add to calendar functionality
    alert('Add to calendar feature would be implemented here!');
  };

  return (
    <div className="ticket-confirmation-page">
      <div className="container">
        {/* Success Header */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1 className="confirmation-title">Booking Confirmed!</h1>
            <p className="confirmation-subtitle">Your tickets are ready</p>
          </div>
        </div>

        {/* Ticket Cards */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {bookingData.tickets.map((ticket, index) => (
              <div key={index} className="ticket-card">
                <div className="ticket-header">
                  <h3 className="event-title">{bookingData.event.title}</h3>
                  <div className="qr-code">
                    <QRCode 
                      value={bookingData.qrData} 
                      size={80} 
                      level="M" 
                    />
                  </div>
                </div>

                <div className="ticket-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ticket-info">
                        <div className="info-item">
                          <i className="fas fa-calendar-alt"></i>
                          <span>
                            {new Date(bookingData.event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-clock"></i>
                          <span>
                            {new Date(bookingData.event.date).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{bookingData.event.location}</span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-building"></i>
                          <span>{bookingData.event.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="ticket-details">
                        <div className="detail-item">
                          <span className="label">Ticket Type:</span>
                          <span className="value">{ticket.type}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Seat Number:</span>
                          <span className="value">{ticket.seat || "General Admission"}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Ticket ID:</span>
                          <span className="value">{bookingData.id}-{index + 1}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Price:</span>
                          <span className="value">${ticket.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ticket-footer">
                  <div className="barcode">
                    <div className="barcode-line"></div>
                    <div className="barcode-line short"></div>
                    <div className="barcode-line"></div>
                    <div className="barcode-line short"></div>
                    <div className="barcode-line"></div>
                    <div className="barcode-number">{bookingData.id}-{index + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <div className="booking-summary-card">
              <h4>Booking Summary</h4>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Booking Reference:</span>
                  <span>{bookingData.id}</span>
                </div>
                <div className="summary-item">
                  <span>Booking Date:</span>
                  <span>{new Date(bookingData.bookingDate).toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span>Total Amount:</span>
                  <span>${bookingData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={downloadTicket}>
                <i className="fas fa-download me-2"></i>Download Tickets
              </button>
              <button className="btn btn-outline-primary" onClick={addToCalendar}>
                <i className="fas fa-calendar-plus me-2"></i>Add to Calendar
              </button>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/events')}>
                <i className="fas fa-ticket-alt me-2"></i>Find More Events
              </button>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div className="important-info">
              <h5>Important Information</h5>
              <ul>
                <li>Please bring a valid ID and this ticket to the event</li>
                <li>Tickets are non-transferable and non-refundable</li>
                <li>Do not share your QR code with others</li>
                <li>Gates open 1 hour before the event starts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;