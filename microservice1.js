// microservice1.js

const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;
const path = require('path');
// Connect to the SQLite database
const db = new sqlite3.Database('user_database.sqlite');

// Create the User Master table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS UserMaster (
    Id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    gender TEXT,
    status TEXT,
    Created_at TEXT,
    Updated_at TEXT
  )
`);

// Fetch data from the API and store it in the database
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/users');
    const users = response.data.result;

    // Insert users into the User Master table
    const stmt = db.prepare('INSERT INTO UserMaster (Id, name, email, gender, status, Created_at, Updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    users.forEach((user) => {
      stmt.run(user.Id, user.name, user.email, user.gender, user.status, user.Created_at, user.Updated_at);
    });
    stmt.finalize();

    res.send('Data fetched and stored successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching and storing data.');
  }
});

// Implement PUT and POST endpoints for updating and creating user data

app.listen(port, () => {
  console.log(`Microservice 1 listening at http://localhost:${port}`);
});
