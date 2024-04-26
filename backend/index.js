const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth');
const authenticate = require('./middleware');
const productsRouter = require('./getProducts');
const manageProductsRouter = require('./manageProducts');
const categoriesRouter = require('./getCategories');
const statsRouter = require('./stats');
const csrfRouter = require('./csrf');
const cspRouter = require('./cspReport');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(helmet.xssFilter());

app.use(cors({
    origin: 'http://localhost:5173'
  }));
  

app.use(authRouter);

app.use('/csp-report', cspRouter);

app.use('/products', productsRouter);

app.use('/categories', categoriesRouter);

app.use('/stats', cors(), statsRouter);

app.use(authenticate);
app.use(csrfRouter)

app.use('/manage', manageProductsRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
