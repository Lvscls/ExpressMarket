const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

router.get('/', (req, res) => {
    db.all('SELECT * FROM Categories', (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      res.json(rows);
    });
  });
  
module.exports = router;