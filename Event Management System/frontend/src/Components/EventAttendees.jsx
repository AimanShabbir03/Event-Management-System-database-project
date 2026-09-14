import React from "react";

const EventAttendees = () => {
  // Hardcoded event data
  const events = [
    { event_name: "Book Fair", total_attendees: 1 },
    { event_name: "Eid Festival", total_attendees: 1 },
    { event_name: "Tech Meetup", total_attendees: 1 },
  ];

  return (
    <div>
      <h1>Event Attendees</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Total Attendees</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.event_name}</td>
              <td>{event.total_attendees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventAttendees;
