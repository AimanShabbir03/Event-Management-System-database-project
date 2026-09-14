const express = require('express');
const cors = require('cors'); // Import CORS middleware
const sql = require('mssql');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// SQL Server Configuration
const dbConfig = {
    user: 'aiman',
    password: 'mnbvc',
    server: 'localhost', // SQL Server instance
    database: 'EventtManagementSystem',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

// Connect to SQL Server
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to SQL Server!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  try {
    // Connect to the database
    const pool = await sql.connect(dbConfig);
    const query = `
      SELECT * FROM Userr WHERE email = @Email AND password = @Password
    `;
    const request = pool.request();
    request.input('Email', sql.VarChar, email);
    request.input('Password', sql.VarChar, password);

    const result = await request.query(query);

    // Check if user exists
    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({ success: true, message: `Welcome ${user.username}!`, user });
    } else {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/contact-us", async (req, res) => {
  try {
    const { user_id, message, response_status } = req.body;

    // Connect to SQL Server
    const pool = await sql.connect(dbConfig);

    // Insert the form data into the database
    await pool.request()
      .input("user_id", sql.Int, user_id)
      .input("message", sql.Text, message)
      .input("response_status", sql.VarChar, response_status)
      .query(`
        INSERT INTO ContactUs (user_id, message, response_status)
        VALUES (@user_id, @message, @response_status)
      `);

    res.status(201).json({ message: "Thank you for contacting us. We'll get back to you soon!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

app.post("/add-user", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Generate a new user ID (optional, depending on your database setup)
    const userIdResult = await pool.request().query(`SELECT MAX(user_id) AS maxId FROM Userr`);
    const newUserId = userIdResult.recordset[0].maxId + 1 || 1; // Default to 1 if no users exist

    // Insert into the Userr table
    await pool.request()
      .input("user_id", sql.Int, newUserId)
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password) // Use hashing for security in production
      .input("role", sql.VarChar, role)
      .query(`INSERT INTO Userr (user_id, username, email, password, role) VALUES (@user_id, @username, @email, @password, @role)`);

    res.status(201).send("User added successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user.");
  }
});

  app.put('/update-user', async (req, res) => {
    const { user_id, username, email, password, role } = req.body;
  
    // Log the incoming data to check
    console.log("Updating user with data:", req.body);
  
    // Ensure all fields are provided
    if (!user_id || !username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      // SQL query to update user details
      const query = `
        UPDATE Userr
        SET username = @username, email = @email, password = @password, role = @role
        WHERE user_id = @user_id
      `;
  
      const request = new sql.Request();
      request.input("user_id", sql.Int, user_id);
      request.input("username", sql.VarChar, username);
      request.input("email", sql.VarChar, email);
      request.input("password", sql.VarChar, password);
      request.input("role", sql.VarChar, role);
  
      const result = await request.query(query);
  
      // Log the result of the update query
      console.log("Update result:", result);
  
      // Check if any rows were updated
      if (result.rowsAffected[0] > 0) {
        return res.json({ message: "User details updated successfully." });
      } else {
        console.log(`User with ID ${user_id} not found or no changes made.`);
        return res.status(404).json({ error: "User not found or no changes made." });
      }
    } catch (error) {
      console.error("Error updating user:", error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  
app.delete('/delete-user', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const query = `DELETE FROM Userr WHERE username = @username`;
        const request = new sql.Request();
        request.input('username', sql.VarChar, username); // Use parameterized queries to prevent SQL injection

        const result = await request.query(query);

        if (result.rowsAffected[0] > 0) {
            res.json({ message: `User '${username}' deleted successfully.` });
        } else {
            res.status(404).json({ error: `User '${username}' not found.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/api/create-event", async (req, res) => {
  const { event_name, date, location, organizer_id } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Generate a new event ID (optional, depending on your database setup)
    const eventIdResult = await pool.request().query(`SELECT MAX(event_id) AS maxId FROM Event`);
    const newEventId = eventIdResult.recordset[0].maxId + 1 || 1; // Default to 1 if no events exist

    // Insert into the Event table
    await pool.request()
      .input("event_id", sql.Int, newEventId)
      .input("event_name", sql.VarChar, event_name)
      .input("date", sql.Date, date)
      .input("location", sql.VarChar, location)
      .input("organizer_id", sql.Int, organizer_id)
      .query(`INSERT INTO Event (event_id, event_name, date, location, organizer_id) VALUES (@event_id, @event_name, @date, @location, @organizer_id)`);

    res.status(201).send("Event created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating event.");
  }
});

app.get('/about-us', (req, res) => {
  res.json({
    description: "Our Event Management System is a comprehensive solution designed to streamline event planning and execution...",
    services: [
      "Event Planning and Coordination",
      "Venue Booking and Management",
      "Vendor Coordination and Management",
      "Ticketing and Registration",
      "Budgeting and Payment Tracking",
      "Event Marketing and Promotion",
      "On-site Event Support and Staffing",
      "Feedback Collection and Analysis"
    ],
    eventTypes: [
      "Corporate Events (Conferences, Seminars, Meetings)",
      "Social Events (Weddings, Birthdays, Anniversaries)",
      "Public Events (Festivals, Concerts, Community Gatherings)",
      "Nonprofit Events (Fundraisers, Charity Events)",
      "Trade Shows and Exhibitions",
      "Educational and Training Events"
    ],
    tasks: [
      "Event Setup and Decoration",
      "Registration and Guest Check-in",
      "Coordination with Vendors (Catering, Audio/Visual, Decor)",
      "Managing Schedules and Timelines",
      "Providing On-site Assistance and Troubleshooting",
      "Ensuring Attendee Engagement and Satisfaction",
      "Overseeing Event Clean-up and Breakdown"
    ]
  });
});
app.put("/update-event", async (req, res) => {
  const { event_id, event_name, date, location } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("event_id", sql.Int, event_id)
      .input("event_name", sql.NVarChar, event_name)
      .input("date", sql.Date, date)
      .input("location", sql.NVarChar, location)
      .query(
        "UPDATE Event SET event_name = @event_name, date = @date, location = @location WHERE event_id = @event_id"
      );

    res.json({ message: "Event details updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error updating event details." });
  }
});
app.delete("/delete-event", async (req, res) => {
  const { event_name } = req.body;

  if (!event_name) {
    return res.status(400).json({ error: "Event name is required." });
  }

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("event_name", sql.NVarChar, event_name)
      .query("DELETE FROM Event WHERE event_name = @event_name");

    if (result.rowsAffected > 0) {
      res.json({ message: `Event '${event_name}' deleted successfully.` });
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting event." });
  }
});
app.get("/event-feedback", (req, res) => {
  const query = `
    SELECT e.event_name, a.name AS attendee_name, f.rating, f.comments
    FROM Event e
    JOIN Attendee a ON e.event_id = a.event_id
    JOIN Feedback f ON e.event_id = f.event_id AND a.attendee_id = f.attendee_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
    res.json(results);
  });
});
app.get("/api/events", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT event_name
      FROM Event
      WHERE event_id IN (
          SELECT event_id
          FROM Budget
          WHERE total_budget > spent
      );
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving events.");
  }
});
app.get("/events-attendees", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT e.event_name, COUNT(a.attendee_id) AS total_attendees
      FROM Event e
      LEFT JOIN Attendee a ON e.event_id = a.event_id
      GROUP BY e.event_name;
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving event data.");
  }
});
// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Fixed syntax here
});
