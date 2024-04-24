const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const db = new sqlite3.Database('./database.db');

const secretKey = process.env.SECRET_KEY;

router.use(bodyParser.json());

function findUser(username, callback) {
  db.get('SELECT * FROM Users WHERE username = ?', [username], callback);
}

function validatePassword(password) {
    if (password.length < 12) {
      return false;
    }
  
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    if (!/\d/.test(password)) {
      return false;
    }
  
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return false;
    }
  
    return true;
  }


router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Nom d\'utilisateur et mot de passe requis');
    }

    if (!validatePassword(password)) {
        return res.status(400).send('Le mot de passe doit respecter les critères de sécurité');
      }

    findUser(username, async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      if (row) {
        return res.status(400).send('Nom d\'utilisateur déjà pris');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erreur serveur');
        }
        res.status(201).send('Inscription réussie');
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Nom d\'utilisateur et mot de passe requis');
    }

    findUser(username, async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      if (!row) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
      }

      const passwordMatch = await bcrypt.compare(password, row.password);
      if (!passwordMatch) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
      }

      const token = jwt.sign({ username: row.username }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});
module.exports = router;
