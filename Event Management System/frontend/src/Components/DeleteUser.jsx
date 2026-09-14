import React, { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [username, setUsername] = useState(""); // State for username input
  const [message, setMessage] = useState(""); // State for success/error messages

  // Function to handle the delete operation
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!username) {
      setMessage("Please enter a username.");
      return;
    }

    try {
      // Send DELETE request to the backend
      const response = await axios.delete("http://localhost:5000/delete-user", {
        data: { username }, // Pass username in request body
      });

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
      <h2>Delete User</h2>
      <form onSubmit={handleDelete} style={styles.form}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Delete User
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

export default DeleteUser;
