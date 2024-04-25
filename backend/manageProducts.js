const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const csrf = require('csrf');
const db = new sqlite3.Database('./database.db');

const tokens = new csrf();

const csrfProtection = (req, res, next) => {
  const secret = 'secret';
  const token = req.body._csrf || req.query._csrf || req.headers['x-csrf-token'];
  if (!tokens.verify(secret, token)) {
    return res.status(403).send('Invalid CSRF token');
  }
  next();
};

router.post('/', csrfProtection,(req, res) => {
  const { name, category_id, price, description, images } = req.body;

  db.run('INSERT INTO Products (name, category_id, price, description) VALUES (?, ?, ?, ?)', [name, category_id, price, description], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    const productId = this.lastID;

    if (images) {
      images.forEach(image => {
        db.run('INSERT INTO ProductImages (product_id, image_path) VALUES (?, ?)', [productId, image], function (err) {
          if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
          }
        });
      });
    }

    res.status(201).send(`Produit ajouté avec l'ID: ${productId}`);
  });
});

router.put('/:id', csrfProtection, (req, res) => {
  const productId = req.params.id;
  const { name, category_id, price, description } = req.body; 
  db.run('UPDATE Products SET name = ?, category_id = ?, price = ?, description = ? WHERE id = ?', [name, category_id, price, description, productId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    res.send(`Produit avec l'ID ${productId} modifié`);
  });
});

router.delete('/:id', csrfProtection,(req, res) => {
  const productId = req.params.id;
  db.run('DELETE FROM Products WHERE id = ?', [productId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    db.run('DELETE FROM ProductImages WHERE product_id = ?', [productId], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }
      res.send(`Produit avec l'ID ${productId} supprimé`);
    });
  });
});

module.exports = router;

