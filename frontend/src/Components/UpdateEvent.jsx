import React, { useState } from "react";
import axios from "axios";

const UpdateEvent = () => {
  const [event_id, setEventId] = useState(""); // State for event_id input
  const [event_name, setEventName] = useState(""); // State for event_name
  const [date, setDate] = useState(""); // State for date
  const [location, setLocation] = useState(""); // State for location
  const [message, setMessage] = useState(""); // State for success/error messages

  // Function to fetch event details when event_id is entered
  const fetchEventDetails = async (event_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-event-details/${event_id}`);
      const event = response.data.event;
      setEventName(event.event_name);
      setDate(event.date);
      setLocation(event.location);
      setMessage("");
    } catch (error) {
      setMessage("Event not found.");
      setEventName("");
      setDate("");
      setLocation("");
    }
  };

  // Function to handle the update operation
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!event_id || !event_name || !date || !location) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/update-event", {
        event_id,
        event_name,
        date,
        location,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  // Handle event_id input change and fetch details
  const handleEventIdChange = (e) => {
    const id = e.target.value;
    setEventId(id);
    if (id) {
      fetchEventDetails(id);
    } else {
      setEventName("");
      setDate("");
      setLocation("");
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Event Details</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Event ID"
          value={event_id}
          onChange={handleEventIdChange}
          style={styles.input}
        />
        {event_id && (
          <>
            <input
              type="text"
              placeholder="Event Name"
              value={event_name}
              onChange={(e) => setEventName(e.target.value)}
              style={styles.input}
            />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Update Event
            </button>
          </>
        )}
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// CSS-in-JS styles for simplicity
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  form: {
    display: "inline-block",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },
};

export default UpdateEvent;
