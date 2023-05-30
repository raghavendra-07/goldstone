// microservice2.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3002;
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database('user_database.sqlite');

// API endpoint to fetch user data
app.get('/users', (req, res) => {
  db.all('SELECT * FROM UserMaster', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user data.');
    } else {
      res.json(rows);
    }
  });
});

// Implement PUT endpoint for updating user data
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const stmt = db.prepare(`
    UPDATE UserMaster
    SET name = ?,
        email = ?,
        gender = ?,
        status = ?,
        Updated_at = ?
    WHERE Id = ?
  `);
  stmt.run(
    updatedData.name,
    updatedData.email,
    updatedData.gender,
    updatedData.status,
    updatedData.Updated_at,
    id,
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating user data.');
      } else {
        res.send('User data updated successfully.');
      }
    }
  );
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Microservice 2 listening at http://localhost:${port}`);
});
