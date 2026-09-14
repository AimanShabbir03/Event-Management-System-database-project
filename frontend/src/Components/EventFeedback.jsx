import React from "react";

const EventFeedback = () => {
  // Hardcoded data
  const feedbackData = [
    {
      event_name: "Eid Festival",
      attendee_name: "Ali Hassan",
      rating: 5,
      comments: "Amazing event, well-organized!",
    },
    {
      event_name: "Tech Meetup",
      attendee_name: "Sara Ahmed",
      rating: 4,
      comments: "Great tech talks, but seating was limited.",
    },
    {
      event_name: "Book Fair",
      attendee_name: "Zainab Noor",
      rating: 5,
      comments: "Excellent book collection!",
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Event Feedback</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Event Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Attendee Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Comments</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((row, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.event_name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.attendee_name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.rating}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventFeedback;


