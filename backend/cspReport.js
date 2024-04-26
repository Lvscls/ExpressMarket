const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.post('/', csrfProtection, (req, res) => {
  const { documentUri, referrer, violatedDirective, blockedUri, originalPolicy } = req.body;

  db.run('INSERT INTO CspReports (documentUri, referrer, violatedDirective, blockedUri, originalPolicy) VALUES (?, ?, ?, ?, ?)', 
    [documentUri, referrer, violatedDirective, blockedUri, originalPolicy], 
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }
      res.sendStatus(200);
    }
  );
});

router.get('/', (req, res) => {
    db.all('SELECT * FROM CspReports', (err, rows) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
        }
    
        res.json(rows);
    });
    });

module.exports = router;
