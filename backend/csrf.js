const express = require('express');
const csrf = require('csrf');

const csrfRouter = express.Router();
const tokens = new csrf();
const secret = 'secret'; 

csrfRouter.get('/csrf-token', (req, res) => {
  const token = tokens.create(secret);
  res.json({ csrfToken: token });
});

module.exports = csrfRouter;