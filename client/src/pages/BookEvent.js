import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';

const BookEvent = () => {
  const { eventId } = useParams();
  const [booked, setBooked] = React.useState(false);

  const handlePayment = () => {
    setBooked(true);
  };

  return (
    <Container className="mt-4">
      <h2>Book Event #{eventId}</h2>
      {!booked ? (
        <Button onClick={handlePayment} variant="success">Simulate Payment</Button>
      ) : (
        <Alert variant="success" className="mt-3">Event booked successfully!</Alert>
      )}
    </Container>
  );
};

export default BookEvent;