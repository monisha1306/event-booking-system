import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ isLoggedIn, role, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname.toLowerCase() === "/login";

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
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* Show Login button only if not logged in and NOT on login page */}
            {!isLoggedIn && !isLoginPage && (
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {isLoggedIn && (
              <>
                {/* Attendee → My Transactions */}
                {role === "attendee" && (
                  <>
                    <Nav.Link as={Link} to="/events">
                      Events
                    </Nav.Link>
                  <Nav.Link as={Link} to="/my-transactions">
                    My Transactions
                  </Nav.Link>
                  
                  </>
                )}

                {/* Organizer → Transactions + Create Event */}
                {role === "organizer" && (
                  <>
                    
                    <Nav.Link as={Link} to="/organizer/create">
                      Create Event
                    </Nav.Link>
                    <Nav.Link as={Link} to="/my-events">
                     My Events
                    </Nav.Link>
                    <Nav.Link as={Link} to="/transactions">
                      Transactions
                    </Nav.Link>
                  </>
                )}

                {/* Logout Button */}
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