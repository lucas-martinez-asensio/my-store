const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:3000/',
  'https://my-store.up.railway.app/',
];
const options = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error('not allowed ' + origin));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send(`hi im a server made with express

  These are my main routes:
    /api/v1/products
    /api/v1/categories
    /api/v1/users

  To see each route content:
    add to previous routes /id

  `);
});

app.get('/new-rout', (req, res) => {
  res.send('hi im a new rout');
});

app.get('/home', (req, res) => {
  res.send('Home Sweet Home');
});

app.listen(PORT, () => {
  console.log('my port ' + PORT);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
