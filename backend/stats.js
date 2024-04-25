const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

router.get('/', (req, res) => {
    const query = `
        SELECT Categories.name AS nom, COUNT(Products.id) AS compte
        FROM Categories
        LEFT JOIN Products ON Categories.id = Products.category_id
        GROUP BY Categories.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }        res.json(rows);
    });
});

module.exports = router;