const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./auth');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Utilisation des routes d'authentification sans préfixe
app.use(authRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
