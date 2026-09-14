import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    event_id: "",
    event_name: "",
    date: "",
    location: "",
    organizer_id: "",
  });
  const [message, setMessage] = useState(""); // State for success/error messages

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle the create event operation
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const { event_id, event_name, date, location, organizer_id } = eventData;

    // Validate inputs
    if (!event_id || !event_name || !date || !location || !organizer_id) {
      setMessage("Please fill all the fields.");
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:5000/create-event", eventData);

      // If successful, display a success message
      setMessage(response.data.message);
    } catch (error) {
      // Handle any errors returned from the backend
      if (error.response) {
        setMessage(error.response.data.error); // Backend error
      } else {
        setMessage("Something went wrong. Please try again."); // General error
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent} style={styles.form}>
        <input
          type="number"
          name="event_id"
          placeholder="Enter event_id"
          value={eventData.event_id}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="event_name"
          placeholder="Enter event_name"
          value={eventData.event_name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          placeholder="Enter date"
          value={eventData.date}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          value={eventData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="organizer_id"
          placeholder="Enter organizer_id"
          value={eventData.organizer_id}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>
      {/* Display message */}
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
    marginRight: "10px",
    marginBottom: "10px",
    display: "block",
    width: "200px",
    marginLeft: "auto",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
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

export default CreateEvent;
