const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

router.get('/', (req, res) => {
  db.all('SELECT Products.*, GROUP_CONCAT(ProductImages.image_path) AS image_paths FROM Products LEFT JOIN ProductImages ON Products.id = ProductImages.product_id GROUP BY Products.id', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    // Transforming the concatenated image paths into arrays
    rows.forEach(row => {
      row.image_paths = row.image_paths ? row.image_paths.split(',') : [];
    });
    res.json(rows);
  });
});


router.get('/:id', (req, res) => {
  const productId = req.params.id;
  db.get('SELECT Products.*, GROUP_CONCAT(ProductImages.image_path) AS image_paths FROM Products LEFT JOIN ProductImages ON Products.id = ProductImages.product_id WHERE Products.id = ? GROUP BY Products.id', [productId], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    if (!row) {
      return res.status(404).send('Produit non trouvé');
    }
    row.image_paths = row.image_paths ? row.image_paths.split(',') : [];
    res.json(row);
  });
});


module.exports = router;
