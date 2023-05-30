// microservice3.js

const express = require('express');
const fs = require('fs');
const fastcsv = require('fast-csv');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3003;

// Connect to the SQLite database
const db = new sqlite3.Database('user_database.sqlite');

// Export user data to a CSV file
app.get('/export-csv', (req, res) => {
  const ws = fs.createWriteStream('user_data.csv');
  const csvStream = fastcsv.format({ headers: true });
  csvStream.pipe(ws);

  db.each('SELECT * FROM UserMaster', (err, row) => {
    if (err) {
      console.error(err);
    } else {
      csvStream.write(row);
    }
  });

  csvStream.end();
  res.send('CSV export completed successfully.');
});

app.listen(port, () => {
  console.log(`Microservice 3 listening at http://localhost:${port}`);
});
