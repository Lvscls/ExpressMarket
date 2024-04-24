const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

router.post('/', (req, res) => {
    const { name, category_id, price, description, image_path } = req.body;
    db.run('INSERT INTO Products (name, category_id, price, description) VALUES (?, ?, ?, ?)', [name, category_id, price, description], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }
      const productId = this.lastID;
      db.run('INSERT INTO ProductImages (product_id, image_path) VALUES (?, ?)', [productId, image_path], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Erreur serveur');
        }
        res.status(201).send(`Produit ajouté avec l'ID: ${productId}`);
      });
    });
  });
  
  router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, category_id, price, description, image_path } = req.body;
    db.run('UPDATE Products SET name = ?, category_id = ?, price = ?, description = ? WHERE id = ?', [name, category_id, price, description, productId], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }
      db.run('UPDATE ProductImages SET image_path = ? WHERE product_id = ?', [image_path, productId], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Erreur serveur');
        }
        res.send(`Produit avec l'ID ${productId} modifié`);
      });
    });
  });
  
  router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    db.run('DELETE FROM Products WHERE id = ?', [productId], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }
      db.run('DELETE FROM ProductImages WHERE product_id = ?', [productId], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Erreur serveur');
        }
        res.send(`Produit avec l'ID ${productId} supprimé`);
      });
    });
  });
  
  module.exports = router;