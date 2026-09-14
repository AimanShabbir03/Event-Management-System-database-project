import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import AboutUs from "./Components/AboutUs";
import AddUser from "./Components/AddUser";
import DeleteUser from "./Components/DeleteUser";
import UpdateUser from "./Components/UpdateUser";
import ViewUsers from "./Components/ViewUsers";
import CreateEvent from "./Components/CreateEvent";
import ViewEvents from "./Components/ViewEvents";
import UpdateEvent from "./Components/UpdateEvent";
import DeleteEvent from "./Components/DeleteEvent";
import ContactUs from "./Components/ContactUs";
import EventFeedback from "./Components/EventFeedback";
import EventList from "./Components/EventList";
import EventAttendees from "./Components/EventAttendees";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Mock login handler
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
  };

  // Logout handler (optional)
  const handleLogout = () => {
    setIsLoggedIn(false); // Set login status to false
  };

  return (
    <Router>
      {/* Navigation Bar */}
      {isLoggedIn && (
        <div style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about-us" style={styles.link}>About Us</Link>
          <Link to="/add-user" style={styles.link}>Add User</Link>
          <Link to="/delete-user" style={styles.link}>Delete User</Link>
          <Link to="/update-user" style={styles.link}>Update User</Link>
          <Link to="/view-users" style={styles.link}>View Users</Link>
          <Link to="/create-event" style={styles.link}>Create Event</Link>
          <Link to="/view-events" style={styles.link}>View Events</Link>
          <Link to="/update-event" style={styles.link}>Update Event</Link>
          <Link to="/delete-event" style={styles.link}>Delete Event</Link>
          <Link to="/event-feedback" style={styles.link}>Event Feedback</Link>
          <Link to="/contact-us" style={styles.link}>Contact Us</Link>
          <Link to="/event-list" style={styles.link}>Event List</Link>
          <Link to="/event-attendees" style={styles.link}>Event Attendees</Link>
          <Link to="/login" onClick={handleLogout} style={styles.link}>Logout</Link>
        </div>
      )}

      {/* Routes */}
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/delete-user" element={<DeleteUser />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/view-users" element={<ViewUsers />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/view-events" element={<ViewEvents/>} />
            <Route path="/update-event" element={<UpdateEvent />} />
            <Route path="/delete-event" element={<DeleteEvent />} />
            <Route path="/event-feedback" element={<EventFeedback/>} />
            <Route path="/event-list" element={<EventList/>} />
            <Route path="/event-attendees" element={<EventAttendees/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
          </>
        ) : (
          // Redirect to login if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

// CSS-in-JS styles
const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",  // Align links horizontally
    backgroundColor: "#007BFF",
    padding: "10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 15px", // Spacing between links
    fontSize: "18px",
  },
};

export default App;


