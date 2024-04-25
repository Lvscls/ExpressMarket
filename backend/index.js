const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const csrf = require('csrf');
const authRouter = require('./auth');
const authenticate = require('./middleware');
const productsRouter = require('./getProducts');
const manageProductsRouter = require('./manageProducts');
const categoriesRouter = require('./getCategories');
const statsRouter = require('./stats');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(helmet.xssFilter());

const tokens = new csrf();
app.use((req, res, next) => {
  const secret = 'secret';
  const token = tokens.create(secret);
  res.cookie('XSRF-TOKEN', token);
  res.locals.csrfToken = token;
  next();
});

app.use(cors({
    origin: 'http://localhost:5173'
  }));
  

app.use(authRouter);


app.use('/products', productsRouter);

app.use('/categories', categoriesRouter);

app.use('/stats', cors(), statsRouter);

app.use(authenticate);

app.use('/manage', manageProductsRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
