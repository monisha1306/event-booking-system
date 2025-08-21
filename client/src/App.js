import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EventList from './pages/EventList';
import BookEvent from './pages/BookEvent';
import AttendeeTransactions from './pages/AttendeeTransactions';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import OrganizerTransactions from './pages/OrganizerTransactions';
import AttendeeEventList from './pages/AttendeeEventList';
import ViewEvent from './pages/ViewEvent';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
//import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  
  useEffect(() => {
    const token = localStorage.getItem('access');
    const savedRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} role={role} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/book/:eventId" element={<BookEvent />} />
        <Route path="/my-transactions" element={<AttendeeTransactions />} />
        <Route path="/organizer/create" element={<CreateEvent />} />
        <Route path="/organizer/edit/:eventId" element={<EditEvent />} />
        <Route path="/organizer/transactions" element={<OrganizerTransactions />} />
        <Route path="/events" element={<AttendeeEventList />} />
        <Route path="/view-event/:id" element={<ViewEvent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
      </Routes>
    </Router>
  );
}

export default App;