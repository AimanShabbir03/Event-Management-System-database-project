import React from "react";

const EventList = () => {
  // Hardcoded values
  const events = ["Eid Festival", "Tech Meetup", "Book Fair"];

  return (
    <div>
      <h1>Available Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
