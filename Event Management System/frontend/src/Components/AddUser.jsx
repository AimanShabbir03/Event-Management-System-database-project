import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [userData, setUserData] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState(""); // State for success/error messages

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle the add user operation
  const handleAddUser = async (e) => {
    e.preventDefault();

    const { user_id, username, email, password, role } = userData;

    // Validate inputs
    if (!user_id || !username || !email || !password || !role) {
      setMessage("Please fill all the fields.");
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:5000/add-user", userData);

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
      <h2>Add User</h2>
      <form onSubmit={handleAddUser} style={styles.form}>
        <input
          type="number"
          name="user_id"
          placeholder="Enter user_id"
          value={userData.user_id}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={userData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={userData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="role"
          placeholder="Enter role"
          value={userData.role}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add User
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

export default AddUser;
