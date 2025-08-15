import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ isLoggedIn, role, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-primary"
          style={{ fontSize: "1.5rem" }}
        >
          <i className="fas fa-calendar-check me-2"></i>
          EventBook
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Side Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events">Events</Nav.Link>
            <Nav.Link as={Link} to="/my-transactions">My Transactions</Nav.Link>
            {role === "organizer" && (
              <>
                <Nav.Link as={Link} to="/organizer/create">Create Event</Nav.Link>
                <Nav.Link as={Link} to="/organizer/transactions">Organizer Transactions</Nav.Link>
              </>
            )}
          </Nav>

          {/* Right Side Navigation */}
          <Nav className="align-items-center">
            {!isLoggedIn ? (
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
