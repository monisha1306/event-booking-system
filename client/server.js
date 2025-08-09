const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pallavik@123",
  database: "eventbooking",
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

app.get("/events", (req, res) => {
  db.query("SELECT * FROM events_event", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
