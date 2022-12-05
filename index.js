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
  res.send(`
  <head><style>
  body {
    background-color: rgb(41,42,43);
    color: rgb(243,243,230);
    font-family: verdana
  }
  </style></head>
  <h3>Hi! This is an API RESTful developed using Express.</h3>
  Other libraries used: <br>
  Faker <br>
  Boom <br>
  Joi <br>
  Cors <br> <br>




  These are my main routes: <br>
  /api/v1/products <br>
  /api/v1/categories <br>
  /api/v1/users <br><br>

  To filter each route content:<br>
  add to previous routes /id<br><br><br>

  Implemententing Separation of Concerns and Clean Architecture principles: <br>
  Creation and Management of Entities,<br>
  Services and business logic,<br>
  Routing and Middlewares <br><br>

  Access Management <br>
  Data Validation <br>
  Error Management specifing correct http status codes.<br> <br>

  Deploy with Railway

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
