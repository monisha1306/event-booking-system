const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Serve static files from "event_banners" folder
app.use("/event_banners", express.static(path.join(__dirname, "event_banners")));
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pallavik@123",
  database: "eventbooking",
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

app.get("/tickettier/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  db.query(
    "SELECT * FROM events_tickettier WHERE event_id = ?",
    [eventId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});
// ✅ Get events and fix image URL
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events_event", (err, result) => {
    if (err) {
      console.error("❌ DB Query Error:", err);
      return res.status(500).send("DB Error");
    }

    // Add full URL for banner_image
    const updatedResults = result.map(event => {
      return {
        ...event,
        banner_image: event.banner_image
          ? `http://localhost:5000/${event.banner_image}`
          : null,
      };
    });

    res.json(updatedResults);
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
