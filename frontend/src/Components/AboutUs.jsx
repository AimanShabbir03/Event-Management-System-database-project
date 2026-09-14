import React, { useEffect, useState } from "react";
import axios from "axios";

function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState(null); // State to store data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/about-us"); // Backend API
        setAboutUsData(response.data); // Set the received data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the About Us data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Event Management System</h1>
      <p>{aboutUsData.description}</p>

      <h2>Services We Provide</h2>
      <ul>
        {aboutUsData.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <h2>Event Types We Handle</h2>
      <ul>
        {aboutUsData.eventTypes.map((eventType, index) => (
          <li key={index}>{eventType}</li>
        ))}
      </ul>

      <h2>Event Tasks and Responsibilities</h2>
      <ul>
        {aboutUsData.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

// CSS-in-JS styles for simplicity
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    lineHeight: "1.6",
    fontFamily: "'Arial', sans-serif",
  },
};

export default AboutUs;
