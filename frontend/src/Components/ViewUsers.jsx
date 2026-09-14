import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUsers = () => {
  // Hardcoded user data
  const users = [
    { user_id: 1, username: "AhmedAli", email: "ahmed.ali@pakistan.com", password: "pass123", role: "admin" },
    { user_id: 2, username: "FatimaKhan", email: "fatima.khan@pakistan.com", password: "secure123", role: "planner" },
    { user_id: 3, username: "BilalSheikh", email: "bilal.sheikh@pakistan.com", password: "pakpass", role: "user" },
    { user_id: 4, username: "QuratulainBaloch", email: "quratulain.baloch@pakistan.com", password: "pass345", role: "manager" },
    { user_id: 5, username: "JohnDoe", email: "john.doe@example.com", password: "johnpass", role: "user" }, // Added extra user
  ];

  return (
    <div style={styles.container}>
      <h2>View Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
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

export default ViewUsers;

