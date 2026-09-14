import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    message: "",
    response_status: "Pending",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send form data to backend
    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
        setFormData({
          user_id: "",
          message: "",
          response_status: "Pending",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Something went wrong. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="user_id"
          placeholder="Enter your user ID"
          value={formData.user_id}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      {responseMessage && <p style={styles.message}>{responseMessage}</p>}
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
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

export default ContactUs;



