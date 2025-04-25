const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "hostel",
});

function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error("MySQL connection failed, retrying in 2s...", err.message);
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log("MySQL connected.");
      startServer(); 
    }
  });
}

function startServer() {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

connectWithRetry();

// Routes for students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/students", (req, res) => {
  const { name, rollno, roomno } = req.body;
  db.query(
    "INSERT INTO students (name, rollno, roomno) VALUES (?, ?, ?)",
    [name, rollno, roomno],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(201);
    }
  );
});

app.delete("/students/:rollno", (req, res) => {
  const rollno = req.params.rollno;
  db.query("DELETE FROM students WHERE rollno = ?", [rollno], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Routes for complaints
app.post("/complaints", (req, res) => {
    const { roomno, complaint } = req.body;
  
    if (!roomno || !complaint) {
      return res.status(400).json({ error: "roomno and complaint are required" });
    }
  
    db.query(
      "INSERT INTO complaints (roomno, complaint) VALUES (?, ?)",
      [roomno, complaint],
      (err) => {
        if (err) {
          console.error("Failed to insert complaint:", err.message);
          return res.status(500).json({ error: "Failed to insert complaint", details: err.message });
        }
        res.sendStatus(201);
      }
    );
});

app.get("/complaints", (req, res) => {
  db.query("SELECT * FROM complaints", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.delete("/complaints/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM complaints WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});
