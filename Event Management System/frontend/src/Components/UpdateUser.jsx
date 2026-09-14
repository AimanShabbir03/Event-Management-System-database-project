import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [user_id, setUserId] = useState(""); // State for user_id input
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [role, setRole] = useState(""); // State for role
  const [message, setMessage] = useState(""); // State for success/error messages

  // Function to fetch user details when user_id is entered
  const fetchUserDetails = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-user-details/${user_id}`);
      const user = response.data.user;
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
    } catch (error) {
      setMessage("User not found.");
    }
  };

  // Function to handle the update operation
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!user_id || !username || !email || !password || !role) {
      setMessage("Please fill in all fields.");
      return;
    }
  
    try {
      // Sending PUT request
      const response = await axios.put("http://localhost:5000/update-user", {
        user_id, // Use user_id for the update
        username,
        email,
        password,
        role,
      });
  
      console.log("Response:", response.data); // Log response data
      setMessage(response.data.message); // Success message
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error); // Error message from backend
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };
  
  // Handle user_id input change and fetch details on change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    if (e.target.value) {
      fetchUserDetails(e.target.value); // Fetch user details when user_id is entered
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update User Details</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={user_id}
          onChange={handleUserIdChange} // Update user_id state
          style={styles.input}
        />
        {user_id && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              style={styles.input}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)} // Update role state
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="planner">Planner</option>
            </select>
            <button type="submit" style={styles.button}>
              Update User
            </button>
          </>
        )}
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

export default UpdateUser;
