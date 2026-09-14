import React from "react";

const ViewEvents = () => {
  // Event data (including your provided events and two additional ones)
  const events = [
    {
      event_id: 1,
      event_name: "Eid Festival",
      date: "2024-04-15",
      location: "Karachi Expo Center",
      organizer_id: 1,
    },
    {
      event_id: 2,
      event_name: "Tech Meetup",
      date: "2024-05-10",
      location: "Lahore IT Park",
      organizer_id: 2,
    },
    {
      event_id: 3,
      event_name: "Book Fair",
      date: "2024-06-20",
      location: "Islamabad Convention Center",
      organizer_id: 3,
    },
    {
      event_id: 4,
      event_name: "Startup Workshop",
      date: "2024-07-15",
      location: "Peshawar Business Center",
      organizer_id: 4,
    },
    {
      event_id: 5,
      event_name: "Food Festival",
      date: "2024-08-10",
      location: "Multan Food Street",
      organizer_id: 5,
    },
  ];

  return (
    <div style={styles.container}>
      <h2>View Events</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Organizer ID</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.event_name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.organizer_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No events found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// CSS-in-JS styles for simplicity
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  table: {
    marginTop: "20px",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    borderCollapse: "collapse",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "8px",
    textAlign: "left",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },
};

export default ViewEvents;
