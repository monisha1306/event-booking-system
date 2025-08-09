import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: 1,
      title: "Music Festival 2023",
      date: "2023-12-15",
      location: "Central Park, NY",
      category: "Music",
      image: "https://i.pinimg.com/736x/9b/5c/37/9b5c37c776415d4a9428296dd3c318e1.jpg"
    },
    {
      id: 2,
      title: "Tech Conference",
      date: "2023-11-20",
      location: "San Francisco, CA",
      category: "Technology",
      image: "https://i.pinimg.com/736x/3b/72/56/3b72564037d7ed7673a43fbea303fb4a.jpg"
    },
    {
      id: 3,
      title: "Food Expo",
      date: "2023-10-30",
      location: "Chicago, IL",
      category: "Food",
      image: "https://i.pinimg.com/1200x/4f/25/4c/4f254c0dc7c7175f5b05990585c9d1bc.jpg"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Discover Amazing Events Near You</h1>
              <p className="lead">
                Book tickets for concerts, conferences, workshops and more. Never miss out on your favorite events!
              </p>
              <div className="cta-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => navigate('/events')}
                >
                  Browse Events
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  className="ms-3"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <img 
                src="https://i.pinimg.com/1200x/fc/68/4f/fc684f301ee23e44c53ae749e42b13b2.jpg" 
                alt="People at an event" 
                className="img-fluid rounded hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Events */}
      <section className="featured-events py-5">
        <Container>
          <h2 className="text-center mb-5">Featured Events</h2>
          <Row>
            {featuredEvents.map(event => (
              <Col key={event.id} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={event.image} className='event-card-img' />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                      <div className="event-meta">
                        <span className="date">
                          <i className="fas fa-calendar-alt me-2"></i>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="location">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {event.location}
                        </span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Details
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="link" onClick={() => navigate('/events')}>
              View All Events <i className="fas fa-arrow-right ms-2"></i>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Why Choose Us?</h2>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-ticket-alt fa-3x text-primary"></i>
              </div>
              <h3>Easy Booking</h3>
              <p>Simple and intuitive ticket booking process that takes just seconds.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-shield-alt fa-3x text-primary"></i>
              </div>
              <h3>Secure Payments</h3>
              <p>Industry-standard security for all your transactions.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-headset fa-3x text-primary"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Our team is always ready to help with any questions.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;