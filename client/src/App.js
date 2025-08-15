import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './pages/EventList';
import BookEvent from './pages/BookEvent';
import AttendeeTransactions from './pages/AttendeeTransactions';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import OrganizerTransactions from './pages/OrganizerTransactions';
import AttendeeEventList from './pages/AttendeeEventList';
import ViewEvent from './pages/ViewEvent';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/book/:eventId" element={<BookEvent />} />
        <Route path="/my-transactions" element={<AttendeeTransactions />} />
        <Route path="/organizer/create" element={<CreateEvent />} />;
        <Route path="/organizer/edit/:eventId" element={<EditEvent />} />
        <Route path="/organizer/transactions" element={<OrganizerTransactions />} />
        <Route path="/attendee/events" element={<AttendeeEventList />} />
        <Route path="/view-event/:id" element={<ViewEvent />} />

      </Routes>
    </Router>
  );
}

export default App;
